/**
 * Attribuzione ambassador — raccogliere il codice `?ref=` e rimandarlo indietro.
 *
 * Un ambassador manda a un contatto il link di una nostra pagina con un codice
 * appeso (`/digital/web?ref=vitt-7k2`). Se quel contatto poi ci scrive, la
 * segnalazione deve risultare sua: su quella si paga una provvigione.
 *
 * Qui si conserva il codice e la pagina di atterraggio, e basta. Nessun
 * conteggio di clic, nessun evento, nessun invio a terzi: il codice torna a noi
 * solo quando la persona compila il modulo di contatto (vedi form/useErpForm,
 * colonne `ambassador_ref` e `landed_from` di contact_submissions).
 *
 * QUANTO DURA — e qui c'è una scelta consapevole:
 *  • sessionStorage → la visita in corso. NESSUN consenso: serve a completare
 *    un'azione che l'utente sta facendo ora, ed è il caso della maggioranza
 *    (si clicca il link e si scrive nella stessa visita). Quel caso deve
 *    funzionare sempre, banner o no.
 *  • localStorage → 90 giorni. SOLO col consenso "marketing" dato nel banner:
 *    un'attribuzione che dura tre mesi è marketing, non tecnica. Se il consenso
 *    manca o viene revocato, la copia lunga non esiste / viene cancellata.
 *
 * Il PRIMO codice visto vince: se la persona apre due link di due ambassador
 * diversi, la paternità è di chi è arrivato prima — stessa regola che l'ERP
 * applica alle segnalazioni.
 *
 * L'assenza del codice è il caso normale, non un errore: senza `ref` tutte le
 * funzioni qui dentro restituiscono null e il sito si comporta come sempre.
 */

export type Referral = {
  /** Il codice pubblico dell'ambassador, così com'era nel link. */
  ref: string;
  /** La pagina di atterraggio (solo il percorso, es. "/digital/web"). */
  from: string;
};

type StoredReferral = Referral & { at: number };

const REF_PARAM = "ref";
const SESSION_KEY = "gleeye_ref";
const PERSIST_KEY = "gleeye_ref_90d";
/** Stessa chiave di hooks/useConsent.ts: il consenso è uno solo, non se ne inventa un secondo. */
const CONSENT_KEY = "gleeye_cookie_consent";
const PERSIST_MS = 90 * 24 * 60 * 60 * 1000;

/** Forma attesa del codice: lettere, cifre e trattini, max 64. Il resto si ignora in silenzio. */
const REF_SHAPE = /^[A-Za-z0-9-]{1,64}$/;
/** Il percorso di atterraggio non serve lungo: si tiene corto per non gonfiare lo storage. */
const MAX_PATH = 200;

// ── Storage: qualunque accesso può LANCIARE (Safari privato, WebView in-app,
//    cookie di terze parti bloccati). Nessuna di queste eccezioni deve arrivare
//    al chiamante: al massimo si perde l'attribuzione, non la pagina.
function read(store: Storage | null, key: string): StoredReferral | null {
  try {
    const raw = store?.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredReferral>;
    if (!parsed || typeof parsed.ref !== "string" || !REF_SHAPE.test(parsed.ref)) return null;
    return {
      ref: parsed.ref,
      from: typeof parsed.from === "string" ? parsed.from : "/",
      at: typeof parsed.at === "number" ? parsed.at : 0,
    };
  } catch {
    return null;
  }
}

function write(store: Storage | null, key: string, value: StoredReferral): void {
  try {
    store?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage non disponibile: l'attribuzione vale per quel che riesce a durare */
  }
}

function drop(store: Storage | null, key: string): void {
  try {
    store?.removeItem(key);
  } catch {
    /* niente da fare, e niente di grave */
  }
}

function sessionStore(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

function localStore(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Il consenso "marketing" del banner: senza, i 90 giorni non esistono. */
function marketingGranted(): boolean {
  try {
    const raw = localStore()?.getItem(CONSENT_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as { marketing?: string })?.marketing === "granted";
  } catch {
    return false;
  }
}

function readPersistent(): StoredReferral | null {
  if (!marketingGranted()) return null;
  const stored = read(localStore(), PERSIST_KEY);
  if (!stored) return null;
  if (Date.now() - stored.at > PERSIST_MS) {
    drop(localStore(), PERSIST_KEY);
    return null;
  }
  return stored;
}

function readStored(): StoredReferral | null {
  return read(sessionStore(), SESSION_KEY) ?? readPersistent();
}

function tidyPath(path: string): string {
  const clean = (path || "/").split("#")[0].split("?")[0];
  return clean.slice(0, MAX_PATH) || "/";
}

/**
 * Legge `?ref=` dall'indirizzo e lo conserva. Da chiamare a ogni cambio pagina:
 * costa niente e il codice può arrivare su qualunque pagina, non solo la prima.
 */
export function captureReferral(search: string, path: string): void {
  if (typeof window === "undefined") return;

  let incoming: string | null = null;
  try {
    const raw = new URLSearchParams(search).get(REF_PARAM);
    if (raw && REF_SHAPE.test(raw)) incoming = raw;
  } catch {
    /* query illeggibile: si ignora, come qualunque altro valore fuori forma */
  }

  // Il primo vince: un secondo link non ruba la paternità al primo.
  const referral: StoredReferral | null =
    readStored() ?? (incoming ? { ref: incoming, from: tidyPath(path), at: Date.now() } : null);
  if (!referral) return;

  // La sessione si riscrive sempre (anche quando il codice arriva dalla copia
  // lunga): così la visita in corso funziona senza rileggere localStorage.
  write(sessionStore(), SESSION_KEY, referral);
  syncPersistence(referral);
}

/** Allinea la copia a 90 giorni al consenso attuale: la scrive o la cancella. */
function syncPersistence(referral: StoredReferral | null): void {
  if (!marketingGranted()) {
    drop(localStore(), PERSIST_KEY);
    return;
  }
  if (referral) write(localStore(), PERSIST_KEY, referral);
}

/**
 * Da chiamare quando l'utente tocca il banner cookie: se ha appena dato il
 * consenso marketing l'attribuzione diventa lunga, se l'ha tolto la copia
 * lunga sparisce. La sessione in corso resta in piedi in entrambi i casi.
 */
export function syncReferralConsent(): void {
  if (typeof window === "undefined") return;
  syncPersistence(read(sessionStore(), SESSION_KEY) ?? read(localStore(), PERSIST_KEY));
}

/**
 * L'attribuzione da consegnare all'ERP, se c'è. `null` è il caso normale:
 * senza codice i link restano quelli di sempre.
 */
export function getReferral(): Referral | null {
  if (typeof window === "undefined") return null;
  const stored = readStored();
  return stored ? { ref: stored.ref, from: stored.from } : null;
}

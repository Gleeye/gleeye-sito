/**
 * Lettura del consenso cookie salvato nel browser, in un posto solo: la usano
 * il banner (useConsent), Google Analytics (AnalyticsGate) e l'attribuzione
 * ambassador (referral.ts).
 *
 * Una scelta vale finché:
 *  - la versione dell'informativa è la stessa di quando è stata data
 *    (cambia POLICY_VERSION → il banner si ripresenta a tutti);
 *  - non sono passati 6 mesi (linee guida del Garante, 10/6/2021).
 * Una scelta scaduta conta come mai data: niente Analytics, niente 90 giorni.
 */

export const CONSENT_KEY = 'gleeye_cookie_consent';

/** Da aggiornare a ogni modifica sostanziale di privacy o cookie policy. */
export const POLICY_VERSION = '2026-10-12';

const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000; // ~6 mesi

export type ConsentStatus = 'granted' | 'denied' | 'pending';

export interface CookieConsents {
  necessary: ConsentStatus; // Always granted
  analytics: ConsentStatus;
  marketing: ConsentStatus;
}

interface StoredConsent extends CookieConsents {
  version?: string;
  at?: number;
}

/** La scelta salvata se è ancora valida, altrimenti null. */
export function readStoredConsent(): CookieConsents | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as StoredConsent;
    if (s.version !== POLICY_VERSION) return null;
    if (typeof s.at !== 'number' || Date.now() - s.at > MAX_AGE_MS) return null;
    return { necessary: 'granted', analytics: s.analytics, marketing: s.marketing };
  } catch {
    return null;
  }
}

export function writeStoredConsent(c: CookieConsents) {
  const s: StoredConsent = { ...c, version: POLICY_VERSION, at: Date.now() };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(s));
}

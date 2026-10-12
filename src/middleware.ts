import { NextRequest, NextResponse } from 'next/server';

/**
 * Tre responsabilità, in quest'ordine:
 * 1. auth dell'area /admin (com'era)
 * 2. 301 dagli URL del vecchio WordPress alle pagine nuove (mappa esplicita)
 * 3. catch-all: ogni percorso che non è una rotta del sito nuovo riceve la
 *    404 del sito nuovo. NON si manda più nessuno su old.gleeye.eu: il vecchio
 *    WordPress carica Google Tag Manager, Google Fonts e reCAPTCHA prima di
 *    qualsiasi consenso (controllo privacy del 12/10/2026). Gli indirizzi
 *    vecchi che servono ancora stanno tutti in WP_REDIRECTS.
 *
 * Le immagini /wp-content/* NON passano da qui: le serve il rewrite esterno
 * in next.config.ts, così gli URL restano identici a prima.
 */

/* Vecchio WordPress → sito nuovo. Chiavi SENZA slash finale (normalizzato prima
   del confronto). Le pagine con lo stesso percorso (es. /chi-siamo/) non servono
   qui: perdono lo slash e diventano direttamente la rotta nuova. */
const WP_REDIRECTS: Record<string, string> = {
  // Factory — fotografia
  '/servizi/servizi-fotografici': '/factory/fotografia',
  '/servizi/servizi-fotografici/ritratto-fotografico': '/factory/fotografia',
  '/servizi/servizi-fotografici/servizi-foto-di-location': '/factory/fotografia',
  '/servizi/servizi-fotografici/servizi-foto-di-prodotti': '/factory/fotografia',
  '/foto-per-annunci-strutture-ricettive': '/factory/fotografia',
  // Factory — grafica
  '/servizi/servizi-grafica': '/factory/grafica',
  // Factory — copywriting
  '/servizi/servizi-di-copywriting': '/factory/copywriting',
  '/servizi/content-marketing': '/factory/copywriting',
  '/content-creation': '/factory/copywriting',
  // Factory — video
  '/servizi/servizi-video-aziendali': '/factory/video',
  '/servizi/video-explainer-digitalizzazione': '/video-explainer',
  // Digital
  '/servizi/servizi-seo': '/digital/seo',
  '/servizi/servizi-social': '/digital/social',
  '/servizi/social-side-politica': '/digital/social',
  '/servizi/realizzazione-siti-web-e-e-commerce': '/digital/web',
  '/servizi/sviluppo-siti-web-e-e-commerce': '/digital/web',
  '/servizi/servizi-di-manutenzione-siti-web-e-e-commerce': '/digital/web',
  '/servizi/web-marketing': '/digital',
  '/servizi/media-relations': '/identity',
  '/servizi/gestione-della-reputazione-e-media-relation': '/identity',
  '/servizi/digital-marketing': '/digital',
  // Identity
  '/servizi/logo-e-brand-guideline': '/identity/brand-guidelines',
  '/branding': '/identity',
  // Metodo / verticali
  '/servizi/consulenze-di-marketing': '/metodo',
  '/servizi/consulenze-strategiche': '/metodo',
  '/servizi/podcast-da-remoto-essential': '/podcast',
  '/servizi/comunicazione-e-marketing-per-eventi-aziendali': '/events',
  '/modulo-di-contatto-eventi': '/events',
  '/blog/eventi-aziendali': '/events',
  // Pagine-modulo che i clienti possono avere ancora in una mail: la pagina
  // nuova ha la prenotazione o il modulo assegnato dal gestionale
  '/prenotazione-registrazione-da-remoto-podcast': '/podcast',
  '/calendario-registrazioni-podcast-da-remoto-essential': '/podcast',
  '/servizi/video-explainer-digitalizzazione/form-onboarding': '/video-explainer',
  '/prenotazione-videomaker': '/factory/video',
  '/company-profile-10pag': '/factory/grafica',
  '/company-profile-10pag/form-company-profile-10pag': '/factory/grafica',
  '/inserimento-dati-anagrafici-aziendali': '/contatti',
  '/pannello-appuntamenti': '/contatti',
  '/servizi/servizi-di-comunicazione-e-marketing-per-eventi-aziendali': '/events',
  // Contatti — schede persona
  '/contatti/andrea-visentin': '/contatti',
  '/contatti/davide-gentile': '/contatti',
  '/contatti/gabriele-picone': '/contatti',
  // Legali
  '/privacy-policy/destinatari-del-trattamento-dei-dati-personali': '/privacy-policy',
  '/cookie-policy-ue': '/cookie-policy',
  // Pagine tecniche / spazzatura Elementor → home
  '/manutenzione': '/',
  '/elementor-5166': '/',
  '/elementor-7565': '/',
  '/9896-2': '/',
  '/nuova-home': '/',
  '/thank-you': '/',
  '/servizi': '/',
  '/i-nostri-lavori': '/',
};

/* Rotte del sito nuovo (pagine con page.tsx, senza slash finale).
   ⚠️ OGNI PAGINA NUOVA VA AGGIUNTA QUI: un percorso assente da questa lista
   riceve la 404 dal catch-all qui sotto. */
const ROUTES = new Set([
  '/',
  '/admin',
  '/admin/copy',
  '/admin/dashboard',
  '/admin/visuals',
  '/blog',
  '/chi-siamo',
  '/contatti',
  '/cookie-policy',
  '/copy',
  '/digital',
  '/digital/advertising',
  '/digital/seo',
  '/digital/social',
  '/digital/web',
  '/events',
  '/factory',
  '/factory/copywriting',
  '/factory/fotografia',
  '/factory/grafica',
  '/factory/podcast',
  '/factory/video',
  '/identity',
  '/identity/brand-guidelines',
  '/identity/brand-strategy',
  '/identity/naming',
  '/identity/visual-identity',
  '/lavora-con-noi',
  '/manifesto',
  '/metodo',
  '/mission-e-vision',
  /* L'immagine di anteprima generata da src/app/opengraph-image.tsx: non ha un
     punto nel percorso, quindi senza questa riga il catch-all la manda alla
     404 e ogni link condiviso resta senza figura. */
  '/opengraph-image',
  '/podcast',
  '/privacy-policy',
  '/proposte',
  '/video-explainer',
]);

/* Sotto /blog il vecchio WordPress tiene, oltre agli articoli, le tassonomie,
   la paginazione e i tipi del vecchio portfolio. Questi primi segmenti NON sono
   slug di articolo: il blog nuovo non ha archivi, quindi vanno all'indice. */
const BLOG_RESERVED_SEGMENTS = new Set([
  'category', 'tag', 'author', 'page', 'project-type', 'project-tag',
]);

/* Percorso che non esiste di sicuro: riscriverci sopra fa rispondere a Next
   con la 404 del sito (not-found.tsx), senza cambiare l'indirizzo. */
const NOT_FOUND_PATH = '/__pagina-inesistente';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ——— 1. area admin: auth com'era ———
  if (pathname === '/admin') return NextResponse.next();
  if (pathname.startsWith('/admin/')) {
    const token = req.cookies.get('admin_token')?.value;
    const validToken = Buffer.from(process.env.ADMIN_PASSWORD || 'gleeye2026').toString('base64');
    if (token !== validToken) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // ——— asset e interni: non toccarli ———
  // /wp-content va al rewrite in next.config; i file statici hanno un punto.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/wp-content') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  // ——— 2. mappa 301 dal vecchio WordPress ———
  const target = WP_REDIRECTS[clean];
  if (target && target !== clean) {
    return NextResponse.redirect(new URL(target + search, req.url), 301);
  }

  // ——— rotte del sito nuovo: passa (normalizzando l'eventuale slash) ———
  if (ROUTES.has(clean)) {
    if (clean !== pathname) {
      return NextResponse.redirect(new URL(clean + search, req.url), 301);
    }
    return NextResponse.next();
  }

  // ——— blog nativo ———
  // L'indice /blog è in ROUTES; gli articoli /blog/<slug> li serve la rotta
  // /blog/[slug] (slug sconosciuto → 404 di Next). Tassonomie, paginazione e
  // percorsi a più segmenti del vecchio WordPress → indice del blog.
  if (clean.startsWith('/blog/') && clean.length > '/blog/'.length) {
    const rest = clean.slice('/blog/'.length); // es. "mio-slug" o "category/x"
    const firstSeg = rest.split('/')[0];
    if (rest.includes('/') || BLOG_RESERVED_SEGMENTS.has(firstSeg)) {
      return NextResponse.redirect(new URL('/blog', req.url), 301);
    }
    // articolo nativo → Next (normalizzando l'eventuale slash finale con 301)
    if (clean !== pathname) {
      return NextResponse.redirect(new URL(clean + search, req.url), 301);
    }
    return NextResponse.next();
  }

  // ——— 3. tutto il resto: 404 del sito nuovo ———
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, req.url), { status: 404 });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

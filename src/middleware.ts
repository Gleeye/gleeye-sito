import { NextRequest, NextResponse } from 'next/server';

/**
 * Tre responsabilità, in quest'ordine:
 * 1. auth dell'area /admin (com'era)
 * 2. 301 dagli URL del vecchio WordPress alle pagine nuove (mappa esplicita)
 * 3. catch-all: ogni percorso che non è una rotta del sito nuovo finisce
 *    sullo stesso percorso di old.gleeye.eu (il WordPress resta vivo lì)
 *
 * Le immagini /wp-content/* NON passano da qui: le serve il rewrite esterno
 * in next.config.ts, così gli URL restano identici a prima.
 */

const OLD_HOST = 'https://old.gleeye.eu';

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
  '/servizi/digital-marketing': '/digital',
  // Identity
  '/servizi/logo-e-brand-guideline': '/identity/brand-guidelines',
  '/branding': '/identity',
  // Metodo / verticali
  '/servizi/consulenze-di-marketing': '/metodo',
  '/servizi/consulenze-strategiche': '/metodo',
  '/servizi/podcast-da-remoto-essential': '/podcast',
  '/servizi/comunicazione-e-marketing-per-eventi-aziendali': '/events',
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
};

/* Rotte del sito nuovo (pagine con page.tsx, senza slash finale).
   ⚠️ OGNI PAGINA NUOVA VA AGGIUNTA QUI: un percorso assente da questa lista
   viene rimandato con 301 a old.gleeye.eu dal catch-all qui sotto. */
const ROUTES = new Set([
  '/',
  '/admin',
  '/admin/copy',
  '/admin/dashboard',
  '/admin/visuals',
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
  '/podcast',
  '/privacy-policy',
  '/proposte',
  '/video-explainer',
]);

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

  // ——— portfolio: index + dettagli dinamici /portfolio/[slug] → sito nuovo ———
  // Le rotte dettaglio sono dinamiche, quindi non stanno in ROUTES: le lasciamo
  // passare per prefisso (normalizzando l'eventuale slash finale come sopra).
  if (clean === '/portfolio' || clean.startsWith('/portfolio/')) {
    if (clean !== pathname) {
      return NextResponse.redirect(new URL(clean + search, req.url), 301);
    }
    return NextResponse.next();
  }

  // ——— 3. tutto il resto vive su old.gleeye.eu, stesso percorso ———
  return NextResponse.redirect(new URL(pathname + search, OLD_HOST), 301);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

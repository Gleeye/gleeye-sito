'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

/* Titolo della CTA di chiusura, diverso per pagina. Match esatto, poi per area,
   poi default. Rimpiazza le vecchie CTA per-pagina (ora rimosse). */
const CTA_TITLES: Record<string, string> = {
  '/': "Raccontaci un'idea.",
  /* Chiusa del viaggio di /mission-e-vision: riprende il titolo ("e perché")
     e ricombina missione (vali/vede) e visione in un invito. */
  '/mission-e-vision': 'Fatti vedere per ciò che vali.',
  /* Chiusa del viaggio di /metodo: il caos del progetto → la linea retta. */
  '/metodo': 'Portiamo ordine nel tuo progetto.',
  '/identity': 'Scopriamo chi sei davvero.',
  '/identity/brand-strategy': 'Partiamo dalla strategia.',
  '/identity/naming': 'Troviamo il nome giusto.',
  '/identity/visual-identity': 'Diamo un volto al tuo brand.',
  '/identity/brand-guidelines': 'Mettiamo ordine nel brand.',
  '/digital': 'Costruiamo la tua infrastruttura.',
  '/digital/web': 'Costruiamo il tuo sito.',
  '/digital/social': 'Presidiamo i tuoi social.',
  '/digital/seo': 'Ti facciamo trovare.',
  '/digital/advertising': "Facciamo rendere l'advertising.",
  '/factory': 'Mettiamo in produzione la tua immagine.',
  '/factory/video': 'Giriamo il tuo video.',
  '/factory/fotografia': 'Scattiamo la tua immagine.',
  '/factory/copywriting': 'Diamo voce al tuo brand.',
  '/factory/grafica': 'Diamo forma alle idee.',
  '/events': 'Comunichiamo il tuo evento.',
  '/podcast': 'Lanciamo il tuo podcast.',
  '/video-explainer': 'Spieghiamo con un video.',
  '/lavora-con-noi': 'Entra nel team.',
  '/contatti': 'Parliamone.',
};

function ctaTitleFor(path: string): string {
  if (CTA_TITLES[path]) return CTA_TITLES[path];
  const area = '/' + (path.split('/').filter(Boolean)[0] || '');
  if (CTA_TITLES[area]) return CTA_TITLES[area];
  return "Raccontaci un'idea.";
}

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Identity', href: '/identity' },
  { label: 'Digital', href: '/digital' },
  { label: 'Factory', href: '/factory' },
  { label: 'Lavora con noi', href: '/lavora-con-noi' },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/gleeye' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gleeye/' },
  { label: 'Facebook', href: 'https://www.facebook.com/gleeye/' },
];

export default function Footer() {
  const pathname = usePathname();
  const ctaTitle = ctaTitleFor(pathname || '/');
  // Su /lavora-con-noi la CTA parla al candidato, non al cliente.
  const isCareers = (pathname || '').startsWith('/lavora-con-noi');
  const router = useRouter();

  // I CTA del footer stanno fuori da <main>, quindi non vengono intercettati:
  // aprono il popup lanciando gli eventi del PageWidgetOverlay.
  //
  // ⛔ IL PARACADUTE. Fino al 17/9/26 questi due pulsanti lanciavano l'evento e
  //    basta: se nessuno lo raccoglieva — ERP che non risponde, permesso
  //    saltato, pagina senza widget — il click non faceva NIENTE. È durata
  //    settimane senza che si vedesse. Ora l'overlay cancella l'evento quando
  //    lo prende in carico: se non lo cancella, il pulsante porta comunque il
  //    visitatore ai contatti. Un pulsante può aprire la cosa sbagliata, non
  //    può non fare niente.
  const lancia = (nome: string) =>
    !window.dispatchEvent(new CustomEvent(nome, { cancelable: true }));

  const openContact = () => {
    if (!lancia('gleeye:open-contact-form')) router.push('/contatti');
  };
  const openBooking = () => {
    // Prenotazione non assegnata a questa pagina: meglio il modulo che niente.
    if (!lancia('gleeye:open-booking') && !lancia('gleeye:open-contact-form')) {
      router.push('/contatti');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/20 blur-[160px]" />

      {/* CTA di chiusura — su tutte le pagine. id="parliamone": ci atterrano i
          pulsanti "vai in fondo" delle hero (Parliamone, oppure Candidati su
          /lavora-con-noi), via lo scroll-to-anchor di SmoothScroll. */}
      <div id="parliamone" className="relative mx-auto max-w-7xl scroll-mt-24 border-b border-white/10 px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
          {/* titolone — dinamico per pagina, va a capo da solo, responsive */}
          <h2 className="voice-display max-w-[15ch] text-[8.5vw] leading-[0.94] text-[#f8f9fa] sm:text-[6.5vw] md:text-[min(5vw,4.4rem)]">
            {ctaTitle}
          </h2>

          {/* colonna destra: testo + pulsanti allineati in basso */}
          <div className="flex flex-col justify-end gap-12 md:pb-2 md:pt-3">
            <div>
              <p className="mb-9 max-w-sm font-jakarta text-lg font-medium leading-relaxed text-white/65">
                {isCareers
                  ? 'Due righe su chi sei e un link a quello che hai fatto: un portfolio vale più di mille CV. Le candidature le leggiamo tutte.'
                  : 'Scrivici e raccontaci il tuo progetto. Lo mettiamo a fuoco insieme.'}
              </p>
              {/* Tutti e due PIENI di colore e più grandi: sul fondo nero del
                  footer un bordo sottile spariva. Il primo porta il gradiente
                  di brand (blu→viola), il secondo il viola pieno: si vedono
                  entrambi, ma restano distinguibili a colpo d'occhio. */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openContact}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-6 py-4 md:px-7 font-satoshi text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_34px_-8px_rgba(78,146,216,0.75)] transition-shadow duration-500 hover:shadow-[0_0_46px_-6px_rgba(110,181,255,0.85)]"
                >
                  {/* stesso gradiente al contrario: sfuma in hover, niente salti */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#614aa2] to-[#4e92d8] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative">
                    {isCareers ? 'Invia la candidatura' : 'Scrivici due righe'}
                  </span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                {!isCareers && (
                  <button
                    onClick={openBooking}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#614aa2] px-6 py-4 md:px-7 font-satoshi text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_34px_-10px_rgba(97,74,162,0.9)] transition-shadow duration-500 hover:shadow-[0_0_46px_-6px_rgba(155,123,255,0.8)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#614aa2] to-[#9b7bff] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">Prenota una call</span>
                    <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-20">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            {/* Il PNG è quadrato 1080×1080 ma la scritta occupa solo il 23.6%
                centrale (38% di vuoto sopra e sotto): va dimensionato sulla
                larghezza e ritagliato, altrimenti resta minuscolo. */}
            <div className="mb-7 h-8 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo%20bianco.png"
                alt="Gleeye"
                className="w-[130px] max-w-none -translate-y-[50px]"
              />
            </div>
            <p className="voice-mono mb-5 text-white/40">Sede legale</p>
            <p className="font-jakarta leading-relaxed text-white/70">
              Piazza Brignole 2/3
              <br />
              16122 Genova
            </p>
            <a href="mailto:info@gleeye.eu" className="mt-4 inline-block font-satoshi font-bold text-white transition-colors hover:text-[#6db5ff]">
              info@gleeye.eu
            </a>
            <br />
            <a href="tel:+390100954533" className="mt-1 inline-block font-jakarta text-white/70 transition-colors hover:text-[#6db5ff]">
              +39 010 09 54 533
            </a>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Naviga</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Segui</p>
            <ul className="space-y-2.5">
              {SOCIAL.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Legale</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy-policy" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy#preferenze" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                  Preferenze cookie
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dati societari: gli stessi del sito precedente. */}
      <div className="relative mt-8 border-t border-white/10 px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="voice-mono text-white/35">
              N. REA GE 521871 — Capitale sociale: 10.000,00 €
            </p>
            <p className="voice-mono text-white/35">P.IVA 02944020995</p>
          </div>
          <p className="voice-mono text-white/35">
            © {new Date().getFullYear()} Gleeye srl. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}

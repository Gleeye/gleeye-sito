'use client';

import Link from 'next/link';

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
  return (
    <footer className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
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

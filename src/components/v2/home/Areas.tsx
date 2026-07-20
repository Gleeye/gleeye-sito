'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Icone d'area. Griglia 48, tratto 1.6, `currentColor`: il colore lo decide
 * il contenitore. Costruite sulla stessa geometria (stesso peso ottico,
 * stessi raccordi) perché lette in fila devono sembrare una famiglia sola.
 */
const iconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/* Identity — impronta ad archi annidati (∩): nucleo chiuso, creste che salgono,
   scavalcano e ridiscendono con le code a altezze tutte diverse, una cresta
   interrotta a destra. È l'archetipo che si riconosce in un decimo di secondo. */
const IconIdentity = (
  <svg {...iconProps} aria-hidden="true">
    <g transform="rotate(-8 24 22)">
      <ellipse cx="24" cy="21.6" rx="2.1" ry="2.9" />
      <path d="M24 27.8V30.6" opacity={0.7} />
      <path d="M18.8 30.5V20A5.2 5.2 0 0 1 29.2 20V28.5" />
      <path d="M15.6 33.4V20A8.4 8.4 0 0 1 32.4 20V31" />
      <path d="M12.4 30V20A11.6 11.6 0 0 1 35.6 20V25.4" />
      <path d="M35.6 28.6V34.4" />
      <path d="M9.2 26.2V20A14.8 14.8 0 0 1 38.8 20V31.6" />
    </g>
  </svg>
);

/* Digital — il momento del click: finestra inclinata, il cursore (dritto, in
   tensione con la finestra) sta premendo il bottone della pagina. Dettagli
   interni più fini e più tenui della struttura: gerarchia, non wireframe. */
const IconDigital = (
  <svg {...iconProps} aria-hidden="true">
    <g transform="rotate(-8 24 24)">
      <rect x="6" y="11.5" width="36" height="24" rx="5" />
      <path d="M6 18.6h36" opacity={0.8} />
      <circle cx="11.2" cy="15.1" r="0.8" fill="currentColor" stroke="none" opacity={0.75} />
      <circle cx="14.4" cy="15.1" r="0.8" fill="currentColor" stroke="none" opacity={0.75} />
      <path d="M12 24.2h9.5" strokeWidth={1.1} opacity={0.55} />
      <path d="M12 28.9h6" strokeWidth={1.1} opacity={0.55} />
      <rect x="24" y="25.4" width="9.4" height="5.4" rx="2.7" />
    </g>
    <path
      d="M31.8 29.8V39.52L34.32 37.29 35.9 41.03 37.56 40.31 35.98 36.64 38.71 36.42Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

/* Factory — ciak aperto sul punto dello scatto: la barra ruota su una cerniera
   vera (perno pieno in alto a sinistra), le strisce vivono dentro la barra,
   corpo e barra condividono la stessa inclinazione d'insieme. */
const IconFactory = (
  <svg {...iconProps} aria-hidden="true">
    <g transform="rotate(-5 24 26)">
      <rect x="7" y="19" width="34" height="20" rx="3" />
      <path d="M13 27.5h10.5" strokeWidth={1.1} opacity={0.55} />
      <path d="M13 32.5h15" strokeWidth={1.1} opacity={0.55} />
      <g transform="rotate(-14 8.8 17.6)">
        <rect x="7" y="13.6" width="34" height="6.6" rx="3.2" />
        <path d="M14 19.6l3.2-5.4" strokeWidth={1.2} opacity={0.7} />
        <path d="M21 19.6l3.2-5.4" strokeWidth={1.2} opacity={0.7} />
        <path d="M28 19.6l3.2-5.4" strokeWidth={1.2} opacity={0.7} />
        <path d="M35 19.6l3.2-5.4" strokeWidth={1.2} opacity={0.7} />
      </g>
      <circle cx="8.8" cy="17.6" r="1.1" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

const AREAS = [
  {
    name: 'Identity',
    tag: 'Branding e Strategia',
    claim: "Chi sei, a colpo d'occhio.",
    desc:
      'Prima di farti notare, decidiamo per cosa. DNA, nome, volto: senza questa base, ogni euro di marketing è un euro a rischio.',
    services: ['Brand Discovery', 'Naming & Verbal Identity', 'Visual Identity System', 'Brand Guidelines & Rebranding'],
    href: '/identity',
    icon: IconIdentity,
  },
  {
    name: 'Digital',
    tag: 'Web e Social Marketing',
    claim: 'Il posto dove ti trovano.',
    desc:
      'Siti velocissimi, social presidiati, autorità su Google, advertising con numeri veri. La strategia che diventa infrastruttura.',
    services: ['Web Design & Development', 'Social Strategy', 'SEO & Positioning', 'Performance Marketing'],
    href: '/digital',
    icon: IconDigital,
  },
  {
    name: 'Factory',
    tag: 'Content Creation',
    claim: 'Fatto bene. Ogni volta.',
    desc:
      'Video, foto, parole, grafica: qualità da boutique, tempi da factory. Ogni frame risponde alla promessa del piacere per gli occhi.',
    services: ['Video Production', 'Photography', 'Strategic Copywriting', 'Podcast & Audio', 'Graphic & Motion Design'],
    href: '/factory',
    icon: IconFactory,
  },
];

/* Un solo gradiente per tutte e tre le aree: niente colore proprietario per area. */
const GRADIENT = 'linear-gradient(100deg, #4e92d8 0%, #614aa2 100%)';

/* Testo riempito col gradiente. */
const gradientText = {
  backgroundImage: GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

/**
 * Trittico su fondo chiaro: tre pannelli paritari fianco a fianco,
 * quello sotto il mouse si apre e rivela il resto.
 */
export default function Areas() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('.areas-title > *', {
        y: 26,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%', once: true },
      });
      gsap.from('.area-panel', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.areas-strip', start: 'top 82%', once: true },
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="aree" className="relative overflow-hidden bg-[#f8f9fa] py-20 md:py-32">
      {/* titolo */}
      <div className="areas-title px-5 pb-12 md:px-10 md:pb-16">
        <h2 className="voice-display text-4xl leading-tight text-[#0a0a10] md:text-6xl">
          Un solo interlocutore.<br />
          <span className="text-gradient-flow">Tutta la catena del valore.</span>
        </h2>
      </div>

      {/* trittico: il pannello sotto il mouse si apre */}
      <div className="areas-strip flex flex-col border-y border-black/10 md:h-[68vh] md:flex-row">
        {AREAS.map((area) => (
          <div
            key={area.name}
            className="area-panel group relative flex flex-1 flex-col justify-end overflow-hidden border-t border-black/10 px-6 py-10 transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] first:border-t-0 hover:flex-[2.4] hover:bg-white md:border-l md:border-t-0 md:px-8 md:py-12 md:first:border-l-0"
          >
            {/* alone d'accento che si accende dal basso */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(120% 90% at 50% 115%, rgba(78,146,216,0.16) 0%, rgba(97,74,162,0.10) 45%, transparent 68%)',
              }}
            />

            {/* Grande e leggerissima: riempie il vuoto sopra il testo e, quando
                il pannello si apre, scivola nello spazio libero a destra.
                Posizione in percentuale: segue il pannello mentre si allarga. */}
            <span aria-hidden="true" className="area-ico">
              {area.icon}
            </span>

            <div className="relative">
              <p className="voice-mono mb-4 text-black/40">{area.tag}</p>
              <h3 className="voice-display leading-none text-[#0a0a10]" style={{ fontSize: 'clamp(2.2rem, 4.6vw, 5rem)' }}>
                {area.name}
                <span style={gradientText}>.</span>
              </h3>
              <p className="mt-3 font-satoshi text-base font-black uppercase tracking-tight md:text-lg" style={gradientText}>
                {area.claim}
              </p>

              {/* si rivela quando il pannello si apre */}
              <div className="mt-5 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:max-h-0 md:opacity-0 md:group-hover:max-h-96 md:group-hover:opacity-100">
                <p className="max-w-md font-jakarta text-sm font-medium leading-relaxed text-black/60 md:text-base">
                  {area.desc}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {area.services.map((s) => (
                    <li key={s} className="voice-mono rounded-full border border-black/15 px-3 py-1.5 text-black/55">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={area.href}
                  className="mt-8 inline-flex items-center gap-2 font-satoshi text-sm font-black uppercase tracking-wide text-[#0a0a10]"
                >
                  <span className="relative">
                    Esplora {area.name}
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ backgroundImage: GRADIENT }}
                    />
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

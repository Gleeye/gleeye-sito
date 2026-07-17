'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AREAS = [
  {
    name: 'Identity',
    tag: 'Branding e Strategia',
    claim: "Chi sei, a colpo d'occhio.",
    desc:
      'Prima di farti notare, decidiamo per cosa. DNA, nome, volto: senza questa base, ogni euro di marketing è un euro a rischio.',
    services: ['Brand Discovery', 'Naming & Verbal Identity', 'Visual Identity System', 'Brand Guidelines & Rebranding'],
    href: '/identity',
    accent: '#8257e6',
  },
  {
    name: 'Digital',
    tag: 'Web e Social Marketing',
    claim: 'Il posto dove ti trovano.',
    desc:
      'Siti velocissimi, social presidiati, autorità su Google, advertising con numeri veri. La strategia che diventa infrastruttura.',
    services: ['Web Design & Development', 'Social Strategy', 'SEO & Positioning', 'Performance Marketing'],
    href: '/digital',
    accent: '#4e92d8',
  },
  {
    name: 'Factory',
    tag: 'Content Creation',
    claim: 'Fatto bene. Ogni volta.',
    desc:
      'Video, foto, parole, grafica: qualità da boutique, tempi da factory. Ogni frame risponde alla promessa del piacere per gli occhi.',
    services: ['Video Production', 'Photography', 'Strategic Copywriting', 'Podcast & Audio', 'Graphic & Motion Design'],
    href: '/factory',
    accent: '#4757c4',
  },
];

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
              style={{ background: `radial-gradient(120% 90% at 50% 115%, ${area.accent}26 0%, transparent 65%)` }}
            />

            <div className="relative">
              <p className="voice-mono mb-4 text-black/40">{area.tag}</p>
              <h3 className="voice-display leading-none text-[#0a0a10]" style={{ fontSize: 'clamp(2.2rem, 4.6vw, 5rem)' }}>
                {area.name}
                <span style={{ color: area.accent }}>.</span>
              </h3>
              <p className="mt-3 font-satoshi text-base font-black uppercase tracking-tight md:text-lg" style={{ color: area.accent }}>
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
                      style={{ backgroundColor: area.accent }}
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

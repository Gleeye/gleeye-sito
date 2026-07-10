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
    n: '01',
    name: 'Identity',
    tag: 'Boutique — strategia e genesi',
    claim: 'Chi sei, reso visibile.',
    desc:
      "La fase in cui si risponde alla domanda: chi siamo e come vogliamo essere percepiti? Senza questa base, ogni investimento in marketing è un potenziale spreco di budget.",
    services: ['Brand Discovery', 'Naming & Verbal Identity', 'Visual Identity System', 'Brand Guidelines & Rebranding'],
    href: '/identity',
    accent: '#9b7bff',
    accentSoft: 'rgba(155,123,255,0.12)',
  },
  {
    n: '02',
    name: 'Digital',
    tag: 'Infrastruttura — presenza e conversione',
    claim: 'Il posto dove il tuo brand vive.',
    desc:
      "Qui la strategia diventa infrastruttura: siti ad architettura piuma, ecosistemi social, autorità sui motori di ricerca e advertising monitorato senza fuffa.",
    services: ['Web Design & Development', 'Social Strategy', 'SEO & Positioning', 'Performance Marketing'],
    href: '/digital',
    accent: '#6db5ff',
    accentSoft: 'rgba(109,181,255,0.12)',
  },
  {
    n: '03',
    name: 'Factory',
    tag: 'Produzione — artigianato scalabile',
    claim: "L'eccellenza come output prevedibile.",
    desc:
      "Il braccio produttivo che trasforma la strategia in oggetti tangibili. Qualità d'agenzia, efficienza di processo industriale: ogni frame risponde alla promessa del piacere per gli occhi.",
    services: ['Video Production', 'Photography', 'Strategic Copywriting', 'Podcast & Audio', 'Graphic & Motion Design'],
    href: '/factory',
    accent: '#4e92d8',
    accentSoft: 'rgba(78,146,216,0.12)',
  },
];

export default function Areas() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to('.areas-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.5,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.area-panel', root);
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="aree" className="relative overflow-hidden bg-[#f8f9fa]">
      <div className="blueprint-ink absolute inset-0" />

      <div className="relative flex min-h-svh flex-col justify-center py-20 md:h-svh md:py-0">
        {/* header */}
        <div className="px-5 pb-10 md:px-10 md:pb-8">
          <p className="voice-mono mb-4 text-[#614aa2]">[ 01 — Le aree ]</p>
          <h2 className="voice-display text-4xl text-[#0a0a10] md:text-6xl">
            Tre anime.{' '}
            <span className="voice-serif normal-case text-[#614aa2]">un solo</span>{' '}
            metodo.
          </h2>
        </div>

        {/* horizontal track */}
        <div ref={trackRef} className="flex flex-col gap-6 px-5 md:h-[62vh] md:flex-row md:gap-8 md:px-10">
          {AREAS.map((area) => (
            <article
              key={area.n}
              className="area-panel group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-[#0a0a10]/10 bg-white/70 p-7 backdrop-blur-sm transition-colors duration-500 md:w-[68vw] md:p-12 lg:w-[56vw]"
              style={{ boxShadow: '0 24px 60px -30px rgba(10,10,16,0.18)' }}
            >
              {/* accent wash on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `radial-gradient(80% 90% at 80% 10%, ${area.accentSoft}, transparent 70%)` }}
              />
              {/* ghost index */}
              <span
                className="voice-display pointer-events-none absolute -right-4 -top-10 select-none text-[11rem] leading-none opacity-[0.07] md:-top-16 md:text-[19rem]"
                aria-hidden="true"
              >
                {area.n}
              </span>

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ backgroundColor: area.accent }} />
                  <p className="voice-mono text-[#0a0a10]/50">{area.tag}</p>
                </div>
                <h3 className="voice-display text-6xl text-[#0a0a10] md:text-8xl">{area.name}</h3>
                <p className="voice-serif mt-3 text-2xl text-[#0a0a10]/70 md:text-3xl">{area.claim}</p>
                <p className="mt-6 max-w-lg font-jakarta text-sm font-medium leading-relaxed text-black/55 md:text-base">
                  {area.desc}
                </p>
              </div>

              <div className="relative mt-8">
                <ul className="mb-8 flex flex-wrap gap-2">
                  {area.services.map((s) => (
                    <li
                      key={s}
                      className="voice-mono rounded-full border border-[#0a0a10]/15 px-3.5 py-1.5 text-[#0a0a10]/60 transition-colors duration-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={area.href}
                  data-cursor="ESPLORA"
                  className="inline-flex items-center gap-2 font-satoshi text-sm font-black uppercase tracking-wide text-[#0a0a10]"
                >
                  <span className="relative">
                    Esplora {area.name}
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ backgroundColor: area.accent }}
                    />
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}

          {/* end card */}
          <div className="hidden shrink-0 items-center pr-10 md:flex md:w-[30vw]">
            <p className="voice-display text-5xl leading-tight text-transparent [-webkit-text-stroke:1.5px_rgba(10,10,16,0.35)]">
              Un solo interlocutore. Tutta la catena del valore.
            </p>
          </div>
        </div>

        {/* progress */}
        <div className="mt-10 hidden px-10 md:block">
          <div className="h-px w-full bg-[#0a0a10]/10">
            <div className="areas-progress h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e92d8] to-[#614aa2]" />
          </div>
        </div>
      </div>
    </section>
  );
}

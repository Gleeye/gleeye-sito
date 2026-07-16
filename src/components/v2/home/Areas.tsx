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
    tag: 'Branding e Strategia',
    claim: "Chi sei, a colpo d'occhio.",
    desc:
      'Prima di farti notare, decidiamo per cosa. DNA, nome, volto: senza questa base, ogni euro di marketing è un euro a rischio.',
    services: ['Brand Discovery', 'Naming & Verbal Identity', 'Visual Identity System', 'Brand Guidelines & Rebranding'],
    href: '/identity',
    accent: '#8257e6',
    accentSoft: 'rgba(130,87,230,0.14)',
    world: 'linear-gradient(135deg, #ffffff 0%, #f1eafc 100%)',
  },
  {
    n: '02',
    name: 'Digital',
    tag: 'Web e Social Marketing',
    claim: 'Il posto dove ti trovano.',
    desc:
      'Siti velocissimi, social presidiati, autorità su Google, advertising con numeri veri. La strategia che diventa infrastruttura.',
    services: ['Web Design & Development', 'Social Strategy', 'SEO & Positioning', 'Performance Marketing'],
    href: '/digital',
    accent: '#4e92d8',
    accentSoft: 'rgba(78,146,216,0.14)',
    world: 'linear-gradient(135deg, #ffffff 0%, #e9f2fc 100%)',
  },
  {
    n: '03',
    name: 'Factory',
    tag: 'Content Creation',
    claim: 'Fatto bene. Ogni volta.',
    desc:
      'Video, foto, parole, grafica: qualità da boutique, tempi da factory. Ogni frame risponde alla promessa del piacere per gli occhi.',
    services: ['Video Production', 'Photography', 'Strategic Copywriting', 'Podcast & Audio', 'Graphic & Motion Design'],
    href: '/factory',
    accent: '#4757c4',
    accentSoft: 'rgba(71,87,196,0.14)',
    world: 'linear-gradient(135deg, #ffffff 0%, #e8eafb 100%)',
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

      /* i numerali giganti scorrono più lenti del track: parallasse */
      gsap.to('.area-ghost', {
        x: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
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

      <div className="relative flex min-h-svh flex-col justify-center py-20 md:h-svh md:py-0">
        {/* header */}
        <div className="px-5 pb-10 md:px-10 md:pb-8">
          <h2 className="voice-display text-4xl md:text-6xl">
            <span className="text-gradient">Tre anime in un solo colpo d&apos;occhio.</span>
          </h2>
        </div>

        {/* horizontal track */}
        <div ref={trackRef} className="flex flex-col gap-6 px-5 md:h-[62vh] md:flex-row md:gap-8 md:px-10">
          {AREAS.map((area) => (
            <article
              key={area.n}
              className="area-panel group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-7 md:w-[68vw] md:p-12 lg:w-[56vw]"
              style={{ boxShadow: '0 30px 70px -35px rgba(10,10,16,0.3)', background: area.world }}
            >
              {/* blob d'accento */}
              <div
                className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 opacity-80 transition-transform duration-700 group-hover:scale-110"
                style={{ background: `radial-gradient(closest-side, ${area.accentSoft}, transparent)`, borderRadius: '58% 42% 55% 45% / 55% 48% 52% 45%' }}
              />
              {/* numerale gigante */}
              <span
                className="area-ghost voice-display pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[16rem] leading-none md:text-[26rem]"
                style={{ color: area.accent, opacity: 0.1 }}
                aria-hidden="true"
              >
                {area.n}
              </span>

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ backgroundColor: area.accent }} />
                  <p className="voice-mono text-[#0a0a10]/50">{area.tag}</p>
                </div>
                <h3 className="voice-display text-6xl text-[#0a0a10] md:text-8xl">
                  {area.name}
                  <span style={{ color: area.accent }}>.</span>
                </h3>
                <p className="mt-4 font-satoshi text-xl font-black uppercase tracking-tight md:text-2xl" style={{ color: area.accent }}>
                  {area.claim}
                </p>
                <p className="mt-5 max-w-lg font-jakarta text-sm font-medium leading-relaxed text-black/55 md:text-base">
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
            <p className="voice-display text-5xl leading-tight text-[#0a0a10]">
              Un solo interlocutore.<br />
              <span className="text-gradient">Tutta la catena del valore.</span>
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

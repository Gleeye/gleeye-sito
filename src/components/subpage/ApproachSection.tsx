'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #614aa2, #4e92d8)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export type ApproachData = {
  /** etichetta in alto a destra, es. "Web Design & Dev · Genova" */
  eyebrowRight: string;
  /** frase forte: parte nera + parte in gradiente */
  statement: { plain: string; accent: string };
  /** due paragrafi sotto la linea */
  body: [string, string];
};

/**
 * "Il nostro approccio" (sottopagine). Frase + due testi a sinistra, reel
 * verticale a fianco (placeholder finché non c'è il video). Impaginazione
 * presa dalla pagina eventi.
 */
export default function ApproachSection({ data }: { data: ApproachData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sub-pos-label', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      // clearProps: la frase contiene testo in gradiente; un transform residuo
      // romperebbe background-clip:text in Chrome
      gsap.from('.sub-pos-statement', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1, clearProps: 'transform',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.sub-pos-reel', {
        opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.sub-pos-body', {
        opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.35,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-start justify-between gap-10 md:mb-24">
          <span className="sub-pos-label font-satoshi pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25">
            Il nostro approccio
          </span>
          <span className="sub-pos-label font-satoshi hidden pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 md:block">
            {data.eyebrowRight}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
          <div className="order-2 md:order-1">
            <h2 className="sub-pos-statement max-w-4xl font-satoshi text-[8vw] font-black leading-[1.06] tracking-tight text-black md:text-[4.6vw] lg:text-[3.8vw]">
              {data.statement.plain}
              <span className="mt-2 block pb-[0.14em]" style={gradientText}>
                {data.statement.accent}
              </span>
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-black/10 pt-8 md:grid-cols-2 md:gap-14">
              <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                {data.body[0]}
              </p>
              <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                {data.body[1]}
              </p>
            </div>
          </div>

          {/* reel verticale — placeholder in attesa del video definitivo */}
          <div className="sub-pos-reel order-1 mx-auto w-full max-w-[300px] md:order-2 md:-mt-2 lg:max-w-[340px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-[#0a0a10] shadow-[0_20px_50px_-20px_rgba(10,10,16,0.4)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4e92d8]/25 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#614aa2]/25 blur-[70px]" />
              <div className="grain pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur">
                  <Play className="h-5 w-5 translate-x-[1px] text-white/80" fill="currentColor" />
                </span>
                <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Reel · presto
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

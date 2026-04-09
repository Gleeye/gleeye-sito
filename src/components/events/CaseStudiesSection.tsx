'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const cases = [
  { title: 'Confindustria – Assemblea Generale', tags: ['Foto', 'Media Relations'] },
  { title: 'SIITECHNOLOGY – HACKA4GE', tags: ['Foto', 'Video'] },
  { title: 'Convegno Start 4.0 — Trasformazione Digitale', tags: ['Foto', 'Video', 'Media Relations'] },
  { title: 'Convegno — Verso un nuovo umanesimo aziendale', tags: ['Foto', 'Digital'] },
  { title: 'Inaugurazione Agenzia Generali Piazza Dante', tags: ['Foto', 'Grafica'] },
  { title: 'Presentazione Open Lab', tags: ['Foto', 'Video'] },
];

export default function EventsCaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ecs-head', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.ecs-item', { opacity: 0, y: 30, duration: 0.9, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.ecs-item', start: 'top 88%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="ecs-head flex items-end justify-between gap-6 mb-4">
          <div>
            <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/20 mb-3">Case studies</span>
            <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-white">
              Un estratto di ciò che<br className="hidden md:block" /> abbiamo già realizzato.
            </h2>
          </div>
        </div>

        <div className="mt-12">
          {cases.map((c, i) => (
            <div key={i} className="ecs-item group border-t border-white/[0.07] py-7 md:py-8 flex items-center justify-between gap-6 cursor-default">
              <div className="flex items-start gap-6 md:gap-10">
                <span className="font-satoshi font-black text-sm text-white/10 tabular-nums pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-satoshi font-black uppercase tracking-tight text-base md:text-xl lg:text-2xl text-white leading-tight group-hover:text-white/70 transition-colors duration-300">
                  {c.title}
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {c.tags.map(tag => (
                  <span key={tag} className="font-satoshi text-[9px] font-bold uppercase tracking-[0.15em] text-white/20 border border-white/10 px-3 py-1.5 rounded-full group-hover:text-white/40 group-hover:border-white/20 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>

      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    label: 'Produzione e strategia insieme',
    body: 'Non siamo operatori video. Siamo comunicatori che usano il video. Ogni progetto nasce da una strategia editoriale, non da un ordine di ripresa.',
  },
  {
    label: 'Crew compatta, nessun overhead',
    body: 'Lavoriamo con crew piccole e molto competenti. Meno logistica, più focus sul risultato. Senza i costi di una casa di produzione strutturata.',
  },
  {
    label: 'Consegna multi-formato',
    body: "Un'unica sessione di ripresa, più formati in output: 16:9 per il sito, vertical per Instagram, cut breve per ADV. Massima efficienza.",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gvid-why-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.gvid-why-item', {
        opacity: 0, x: -30, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.gvid-why-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="gvid-why-head grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-24 pb-12 border-b border-white/[0.07]">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-white">
            Perché Gleeye
          </h2>
          <p className="font-jakarta font-medium leading-relaxed text-white/35 text-base md:text-lg self-end">
            Ci sono operatori video. E ci sono agenzie che usano il video per costruire comunicazione. La differenza si vede nel risultato.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {reasons.map((r, i) => (
            <div key={i} className="gvid-why-item group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-10 md:py-12">
              <div className="flex items-start gap-4">
                <span className="font-satoshi font-black text-xs text-white/15 tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-satoshi font-black uppercase tracking-tight text-base md:text-lg text-white leading-snug">
                  {r.label}
                </h3>
              </div>
              <p className="font-jakarta font-medium leading-relaxed text-white/40 text-sm md:text-base group-hover:text-white/60 transition-colors duration-500">
                {r.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

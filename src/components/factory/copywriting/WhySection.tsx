'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    label: 'Strategia prima di tutto',
    body: 'Non scriviamo senza capire. Ogni progetto parte da un\'analisi del brand, del mercato e del pubblico. Il copy è l\'ultimo step — non il primo.',
  },
  {
    label: 'Coerenza su tutti i canali',
    body: 'Dalla homepage al post Instagram, dalla newsletter alla brochure: il tono rimane riconoscibile. Gestiamo la verbal identity come un sistema, non come testi separati.',
  },
  {
    label: 'Zero ghostwriting generico',
    body: "Niente testi interscambiabili che potrebbero appartenere a chiunque. Il copy che scriviamo suona come te — solo più chiaro, più diretto, più efficace.",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.why-item', {
        opacity: 0, x: -30, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="why-head grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-24 pb-12 border-b border-white/[0.07]">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-white">
            Perché Gleeye
          </h2>
          <p className="font-jakarta font-medium leading-relaxed text-white/35 text-base md:text-lg self-end">
            Ci sono agenzie che scrivono. E ci sono agenzie che costruiscono linguaggio. La differenza si vede nel tempo.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {reasons.map((r, i) => (
            <div key={i} className="why-item group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-10 md:py-12">
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

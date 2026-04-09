'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    label: 'Sistema, non singoli pezzi',
    body: 'Non consegniamo loghi isolati. Ogni progetto parte dalla costruzione di regole che funzionano su tutti i touchpoint, oggi e in futuro.',
  },
  {
    label: 'Grafica e strategia insieme',
    body: 'Il nostro lavoro nasce dalle stesse fondamenta dell\'identità di marca. Non decoriamo i contenuti — li progettiamo.',
  },
  {
    label: 'Coerenza garantita nel tempo',
    body: 'Il sistema che costruiamo è documentato e trasferibile. Chiunque lavori con il tuo brand in futuro avrà le istruzioni giuste.',
  },
];

export default function GraficaWhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ggra-why-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.ggra-why-item', {
        opacity: 0, x: -30, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ggra-why-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="ggra-why-head grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-24 pb-12 border-b border-white/[0.07]">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-white">
            Perché Gleeye
          </h2>
          <p className="font-jakarta font-medium leading-relaxed text-white/35 text-base md:text-lg self-end">
            Ci sono studi che fanno loghi. E ci sono agenzie che costruiscono sistemi visivi. La differenza si vede su ogni formato.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {reasons.map((r, i) => (
            <div key={i} className="ggra-why-item group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-10 md:py-12">
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

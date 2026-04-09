'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    label: 'Luce come linguaggio',
    body: 'Non usiamo la fotografia per documentare. La usiamo per costruire una percezione. Ogni scatto è progettato prima di essere scattato: luce, angolo, contesto sono scelte narrative, non casuali.',
  },
  {
    label: 'Coerenza visiva totale',
    body: 'Il nostro lavoro segue le linee guida del tuo brand. Non produciamo foto isolate — costruiamo un sistema di immagini riconoscibile su tutti i canali, consistente nel tempo.',
  },
  {
    label: 'Post-produzione inclusa',
    body: "Niente consegna di raw grezzi. Ogni scatto viene editato, ottimizzato per colore e formato, consegnato pronto all'uso. Senza lavoro aggiuntivo da parte tua.",
  },
];

export default function FotografiaWhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fwhy-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.fwhy-item', {
        opacity: 0, x: -30, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.fwhy-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="fwhy-head grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-24 pb-12 border-b border-white/[0.07]">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-white">
            Perché Gleeye
          </h2>
          <p className="font-jakarta font-medium leading-relaxed text-white/35 text-base md:text-lg self-end">
            Ci sono fotografi che scattano. E ci sono fotografi che costruiscono identità visiva. Non è la stessa cosa.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.06]">
          {reasons.map((r, i) => (
            <div key={i} className="fwhy-item group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-10 md:py-12">
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

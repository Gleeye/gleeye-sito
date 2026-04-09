'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: '01',
    title: 'Audit iniziale',
    desc: 'Scansione tecnica del sito, analisi delle keyword attuali, benchmark competitor. Sappiamo da dove partiamo.',
  },
  {
    number: '02',
    title: 'Strategia',
    desc: 'Definizione delle keyword target, priorità d\'intervento, piano contenuti. Un documento condiviso, non un file dimenticato nel cloud.',
  },
  {
    number: '03',
    title: 'Esecuzione',
    desc: 'Ottimizzazione tecnica, produzione contenuti, outreach per link building. Tutto tracciato e aggiornato.',
  },
  {
    number: '04',
    title: 'Monitoraggio',
    desc: 'Report mensile su ranking, traffico organico e conversioni. La SEO è un investimento: monitoriamo che renda.',
  },
];

export default function SeoProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dseo-proc-title', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.dseo-proc-step', {
        opacity: 0, y: 40, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.dseo-proc-step', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="dseo-proc-title mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-black">
            Come lavoriamo
          </h2>
          <p className="font-jakarta text-sm text-black/40 max-w-xs leading-relaxed">
            Un processo chiaro, senza sorprese. Dal brief alla consegna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.05]">
          {steps.map((step) => (
            <div key={step.number} className="dseo-proc-step bg-[#F8F9FA] p-8 md:p-10 flex flex-col gap-10">
              <div className="flex items-start justify-between">
                <span
                  className="font-satoshi font-black text-[4rem] leading-none select-none"
                  style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.1)' }}
                >
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-satoshi font-black uppercase tracking-tight text-base md:text-lg text-black">
                  {step.title}
                </h3>
                <p className="font-jakarta font-medium leading-relaxed text-black/45 text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

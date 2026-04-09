'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ibg-pos-label', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.ibg-pos-statement', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.ibg-pos-body', {
        opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex items-start justify-between gap-10 mb-16 md:mb-24">
          <span className="ibg-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1">
            Il nostro approccio
          </span>
          <span className="ibg-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1 hidden md:block">
            Brand Guidelines · Genova
          </span>
        </div>

        {/* Main statement */}
        <div className="ibg-pos-statement mb-16 md:mb-24">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] text-black leading-[0.95] max-w-5xl">
            Il brand guidelines non è un documento.{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(90deg, #614aa2, #4e92d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              È il garante della coerenza nel tempo.
            </span>
          </h2>
        </div>

        {/* Two columns body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/08">
          <p className="ibg-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Ogni azienda che cresce lavora con più fornitori: agenzie, designer freelance, sviluppatori, uffici stampa. Senza un sistema di regole condiviso, ogni collaboratore reinterpreta il brand — spesso in buona fede, spesso con risultati diversi. Il risultato è un brand che nel tempo diventa irriconoscibile.
          </p>
          <p className="ibg-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Costruiamo brand guidelines operative: non un documento da mettere in un cassetto, ma uno strumento di lavoro quotidiano. Regole chiare, esempi pratici, specifiche tecniche. Qualcosa che chiunque possa seguire — anche senza formazione specifica nel brand design.
          </p>
        </div>

      </div>
    </section>
  );
}

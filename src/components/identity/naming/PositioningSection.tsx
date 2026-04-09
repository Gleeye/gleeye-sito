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
      gsap.from('.inam-pos-label', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.inam-pos-statement', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.inam-pos-body', {
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
          <span className="inam-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1">
            Il nostro approccio
          </span>
          <span className="inam-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1 hidden md:block">
            Naming · Genova
          </span>
        </div>

        {/* Main statement */}
        <div className="inam-pos-statement mb-16 md:mb-24">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] text-black leading-[0.95] max-w-5xl">
            Un nome sbagliato costa più di quanto sembri.{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(90deg, #614aa2, #4e92d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Uno giusto vale più di qualsiasi campagna.
            </span>
          </h2>
        </div>

        {/* Two columns body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/08">
          <p className="inam-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Il nome è la prima cosa che un cliente sente, legge, ricorda. È il punto di contatto più frequente con il brand — prima del logo, prima dei contenuti, prima di qualsiasi campagna. Eppure viene scelto spesso in fretta, per intuizione, senza un processo.
          </p>
          <p className="inam-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Costruiamo naming con un metodo: strategia prima, creatività dopo. Partiamo dal posizionamento del brand, dalle caratteristiche del mercato e dai vincoli legali e linguistici. Generiamo centinaia di opzioni, filtriamo con criteri precisi, consegniamo una shortlist testata e motivata.
          </p>
        </div>

      </div>
    </section>
  );
}

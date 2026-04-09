'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SeoPositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dseo-pos-label', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.dseo-pos-statement', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.dseo-pos-body', {
        opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-start justify-between gap-10 mb-16 md:mb-24">
          <span className="dseo-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1">
            Il nostro approccio
          </span>
          <span className="dseo-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1 hidden md:block">
            SEO · Genova
          </span>
        </div>

        <div className="dseo-pos-statement mb-16 md:mb-24">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] text-black leading-[0.95] max-w-5xl">
            Su Google vince chi merita di vincere.{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(90deg, #614aa2, #4e92d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              O chi sa come farlo.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/08">
          <p className="dseo-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Il 90% dei clic va ai risultati sulla prima pagina. Essere in seconda posizione non è quasi vincere — è quasi perdere. La SEO non è un trucco: è il lavoro sistematico che porta un sito dove i clienti lo cercano, prima che vadano dai competitor.
          </p>
          <p className="dseo-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Lavoriamo su tre assi: tecnico (sito veloce, indexabile, senza errori), contenuto (testi che rispondono alle domande giuste) e autorità (link di qualità che aumentano la credibilità del dominio). Tre leve, una strategia.
          </p>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    number: '01',
    text: 'Chi ha già investito in advertising senza risultati soddisfacenti — e sospetta che il problema fosse nella struttura delle campagne o nella creatività.',
  },
  {
    number: '02',
    text: 'Chi vuole scalare un business e ha bisogno di un canale di acquisizione pagato prevedibile e ottimizzabile.',
  },
  {
    number: '03',
    text: 'Chi gestisce internamente le campagne ma non ha le competenze o il tempo per ottimizzarle al livello necessario.',
  },
];

export default function AdvForWhoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dadv-forwho-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.dadv-forwho-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.dadv-forwho-item',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="dadv-forwho-title mb-16">
          <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/20 mb-4">
            A chi è rivolto
          </span>
          <h2 className="font-satoshi font-black tracking-tight uppercase text-3xl md:text-4xl lg:text-5xl text-white">
            Per chi è questo servizio
          </h2>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {items.map((item) => (
            <div
              key={item.number}
              className="dadv-forwho-item flex items-start gap-8 md:gap-16 py-10 md:py-12 group"
            >
              <span className="font-satoshi font-black text-sm text-white/15 shrink-0 pt-1 tabular-nums tracking-wide">
                {item.number}
              </span>

              <p className="font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed flex-1">
                {item.text}
              </p>

              <div className="shrink-0 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={20} className="text-white/30" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

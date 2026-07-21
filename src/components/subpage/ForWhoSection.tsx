'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gradientText = {
  backgroundImage: 'linear-gradient(135deg, #6db5ff, #9b7bff)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

/**
 * "Per chi è questo servizio" (sottopagine). Vive DIRETTAMENTE sullo sfondo
 * scuro condiviso (DarkBand), senza card — la sezione "fuori". Header sticky a
 * sinistra, profili come statement con marcatore a freccia (niente numeri:
 * non è una sequenza logica).
 */
export default function ForWhoSection({
  items,
  supporting = 'Ti riconosci in uno di questi?',
}: {
  items: string[];
  supporting?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const ctx = gsap.context(() => {
      gsap.from('.forwho-head > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.utils.toArray<HTMLElement>('.forwho-item').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 pt-24 pb-12 md:pt-36 md:pb-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div className="forwho-head md:sticky md:top-32 md:h-fit">
          <h2 className="font-satoshi text-3xl font-black uppercase leading-[1] tracking-tight text-white md:text-4xl lg:text-5xl">
            Per chi è<br />questo servizio
          </h2>
          <p className="mt-6 max-w-xs font-jakarta text-base font-medium leading-relaxed text-white/40">
            {supporting}
          </p>
        </div>

        <div>
          {items.map((text, i) => (
            <div
              key={i}
              className="forwho-item group flex items-start gap-5 border-t border-white/[0.08] py-9 first:border-t-0 md:gap-7 md:py-11"
            >
              <span
                className="shrink-0 select-none pt-1 text-2xl font-black transition-transform duration-300 group-hover:translate-x-1 md:text-3xl"
                style={gradientText}
                aria-hidden="true"
              >
                →
              </span>
              <p className="font-jakarta text-lg font-medium leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white md:text-xl lg:text-2xl">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AreaConfig } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Three principles of the area — ink band with oversized ordinals. */
export default function AreaEssence({ area }: { area: AreaConfig }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.es-card', root);
      gsap.set(cards, { opacity: 0, y: 60 });
      ScrollTrigger.create({
        trigger: root,
        start: 'top 70%',
        once: true,
        onEnter: () =>
          gsap.to(cards, { opacity: 1, y: 0, stagger: 0.14, duration: 1, ease: 'power3.out' }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-36">
      <div className="grain absolute inset-0" />
      <div
        className="absolute -right-40 top-0 h-[55vh] w-[55vh] rounded-full opacity-25 blur-[150px]"
        style={{ backgroundColor: area.accent2 }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <p className="voice-mono mb-14 md:mb-20" style={{ color: area.accent1 }}>
          [ I principi ]
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {area.principles.map((p, i) => (
            <div key={p.title} className="es-card relative border-t border-white/12 pt-8">
              <span
                className="voice-display pointer-events-none absolute -top-6 right-0 select-none text-7xl opacity-[0.12] md:text-8xl"
                style={{ color: area.accent1 }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="voice-display mb-4 max-w-[16ch] text-2xl md:text-3xl">{p.title}</h3>
              <p className="font-jakarta text-sm font-medium leading-relaxed text-white/50 md:text-base">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

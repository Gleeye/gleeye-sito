'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AreaConfig } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Cosa ottieni": tre benefici come affermazioni editoriali. Ognuno sotto una
 * linea che si disegna, con un numerone fantasma dietro che vaga piano.
 * L'ultimo — il beneficio più forte — è in gradiente. Sfondo non piatto.
 */
export default function AreaEssence({ area }: { area: AreaConfig }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set('.es-label', { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: root, start: 'top 80%', once: true,
        onEnter: () => gsap.to('.es-label', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
      });

      const cards = gsap.utils.toArray<HTMLElement>('.es-card', root);
      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.set('.es-line', { scaleX: 0 });
      ScrollTrigger.create({
        trigger: '.es-grid', start: 'top 78%', once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out',
            // i titoli possono essere in gradiente: clearProps evita che un
            // transform residuo rompa background-clip:text in Chrome
            clearProps: 'transform',
          });
          gsap.to('.es-line', { scaleX: 1, stagger: 0.14, duration: 0.9, ease: 'power2.inOut', delay: 0.1 });
        },
      });

      // numeri fantasma che vagano piano
      gsap.utils.toArray<HTMLElement>('.es-ghost').forEach((g, i) => {
        gsap.to(g, { y: i % 2 ? 24 : -24, duration: 8 + i * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-28 md:py-36">
      {/* alone tenue in gradiente brand — non piatto, ma delicato sul chiaro */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[50vh] w-[50vh] rounded-full opacity-[0.07] blur-[130px]"
        style={{ backgroundColor: area.accent2 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <p className="es-label voice-mono mb-14 text-[#0a0a10]/45 md:mb-20">Cosa ottieni</p>

        <div className="es-grid grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
          {area.outcomes.map((o, i) => {
            const isLast = i === area.outcomes.length - 1;
            return (
              <div key={o.title} className="es-card relative">
                {/* numerone fantasma dietro */}
                <span
                  className="es-ghost voice-display pointer-events-none absolute -top-12 right-2 select-none text-[7rem] leading-none opacity-[0.06] md:text-[9rem]"
                  style={{ color: isLast ? area.accent2 : '#0a0a10' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* linea che si disegna */}
                <div
                  className="es-line h-[3px] w-full origin-left"
                  style={{
                    background: isLast
                      ? `linear-gradient(90deg, ${area.accent1}, ${area.accent2})`
                      : '#0a0a10',
                  }}
                />

                <h3
                  className="voice-display mt-6 text-2xl leading-[1.02] md:text-[1.7rem]"
                  style={
                    isLast
                      ? {
                          backgroundImage: `linear-gradient(100deg, ${area.accent1}, ${area.accent2})`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }
                      : { color: '#0a0a10' }
                  }
                >
                  {o.title}
                </h3>
                <p className="mt-4 max-w-sm font-jakarta text-sm font-medium leading-relaxed text-[#0a0a10]/55 md:text-base">
                  {o.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AreaConfig } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Cosa ottieni": tre benefici come affermazioni editoriali. Ognuno sotto una
 * linea, con un numerone fantasma dietro che vaga piano. A scorrimento un solo
 * faretto acceso alla volta scorre 01 → 02 → 03: la card "attiva" passa al
 * gradiente brand (linea + titolo), le altre restano nere. L'highlight è legato
 * alla posizione di scroll (scrub), quindi va avanti e indietro col movimento.
 * Lo stato di riposo è sempre leggibile (nero) — niente sparisce se un trigger
 * non scatta.
 */
export default function AreaEssence({ area }: { area: AreaConfig }) {
  const rootRef = useRef<HTMLElement>(null);
  // indice dell'unica card accesa in questo momento (faretto singolo)
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const n = area.outcomes.length;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.es-card', root);
      const mm = gsap.matchMedia();

      // ── Reveal d'entrata solo su desktop (su mobile il contenuto resta ──
      //    visibile: iOS misura male i trigger post-navigazione e lascerebbe
      //    tutto invisibile).
      mm.add('(min-width: 768px)', () => {
        gsap.set('.es-label', { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: root, start: 'top 88%', once: true,
          onEnter: () => gsap.to('.es-label', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
        });

        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: '.es-grid', start: 'top 85%', once: true,
          onEnter: () => gsap.to(cards, {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            clearProps: 'transform',
          }),
        });
      });

      // ── Faretto singolo legato allo scroll (desktop + mobile): mentre la ──
      //    sezione attraversa lo schermo, l'unica card accesa passa 01→02→03.
      //    scrub = segue il movimento in entrambi i versi.
      ScrollTrigger.create({
        trigger: root, start: 'top 75%', end: 'bottom 55%', scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      // numeri fantasma che vagano piano
      gsap.utils.toArray<HTMLElement>('.es-ghost', root).forEach((g, i) => {
        gsap.to(g, { y: i % 2 ? 24 : -24, duration: 8 + i * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }, root);

    return () => ctx.revert();
  }, [area.outcomes]);

  const gradient = `linear-gradient(100deg, ${area.accent1}, ${area.accent2})`;

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
            const on = i === active; // un solo faretto acceso alla volta
            return (
              <div key={o.title} className="es-card relative">
                {/* numerone fantasma dietro — si tinge appena quando la card si accende */}
                <span
                  className="es-ghost voice-display pointer-events-none absolute -top-12 right-2 select-none text-[7rem] leading-none md:text-[9rem]"
                  style={{
                    color: on ? area.accent2 : '#0a0a10',
                    opacity: on ? 0.1 : 0.06,
                    transition: 'color 0.5s ease, opacity 0.5s ease',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* linea: nera a riposo, il gradiente ci sale sopra quando è attiva */}
                <div className="es-line relative h-[3px] w-full overflow-hidden bg-[#0a0a10]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${area.accent1}, ${area.accent2})`,
                      opacity: on ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  />
                </div>

                {/* titolo: nero a riposo, sfuma al gradiente quando è attivo */}
                <h3
                  className="voice-display mt-6 text-2xl leading-[1.02] md:text-[1.7rem]"
                  style={{
                    backgroundImage: gradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: on ? 'transparent' : '#0a0a10',
                    transition: 'color 0.5s ease',
                  }}
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

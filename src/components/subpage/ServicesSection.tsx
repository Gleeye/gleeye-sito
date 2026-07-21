'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ServiceItem = { title: string; desc: string; tags: string[]; Icon: LucideIcon };

/**
 * "Cosa facciamo" (sottopagine). Sfondo chiaro, righe editoriali con icona in
 * gradiente. Mentre si scorre, la riga più vicina al centro del viewport si
 * "accende" (icona piena, titolo spostato, barra in gradiente) — così non è
 * piatta. Si accende anche in hover.
 */
export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sub-svc-header > *', {
        opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.utils.toArray<HTMLElement>('.sub-svc-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // riga attiva = quella col centro più vicino al centro del viewport
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const onScroll = () => {
      const rows = Array.from(root.querySelectorAll<HTMLElement>('.sub-svc-row'));
      const mid = window.innerHeight / 2;
      let best = -1, bestD = Infinity;
      rows.forEach((r, i) => {
        const rect = r.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const c = rect.top + rect.height / 2;
        const d = Math.abs(c - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-36">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="subSvcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4e92d8" />
            <stop offset="100%" stopColor="#614aa2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl">
        <div className="sub-svc-header mb-4">
          <h2 className="font-satoshi text-3xl font-black uppercase tracking-tight text-[#0a0a10] md:text-4xl">
            Cosa facciamo
          </h2>
        </div>

        <div className="mt-12 border-t border-black/10">
          {services.map((s, i) => {
            const { Icon } = s;
            const isActive = i === active;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setActive(i)}
                className="sub-svc-row group relative cursor-default overflow-hidden border-b border-black/10 py-11 md:py-14"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                />

                <div className="relative z-10 grid grid-cols-[2.5rem_1fr] items-start gap-6 md:grid-cols-[4rem_1fr_auto] md:gap-12">
                  <Icon
                    className="mt-1 h-7 w-7 shrink-0 transition-transform duration-500 md:h-9 md:w-9"
                    style={{ transform: isActive ? 'scale(1.12)' : 'scale(1)' }}
                    strokeWidth={1.5}
                    color="url(#subSvcGrad)"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-16">
                    <h3
                      className="shrink-0 font-satoshi text-xl font-black uppercase leading-tight tracking-tight text-[#0a0a10] transition-transform duration-500 md:w-64 md:text-2xl lg:text-3xl"
                      style={{ transform: isActive ? 'translateX(0.5rem)' : 'translateX(0)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="max-w-lg font-jakarta text-sm font-medium leading-relaxed text-black/50 md:text-base">
                      {s.desc}
                    </p>
                  </div>

                  <div className="hidden flex-col items-end gap-2 pt-1 md:flex">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-satoshi text-[9px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                        style={{ color: isActive ? 'rgba(10,10,16,0.45)' : 'rgba(10,10,16,0.25)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-500"
                  style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)', background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

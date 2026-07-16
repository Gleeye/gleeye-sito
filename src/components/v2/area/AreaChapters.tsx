'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { AreaConfig } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The services as an editorial chapter index: giant numbered rows,
 * expanding in place (CSS grid-rows trick — no height animation jank).
 */
export default function AreaChapters({ area }: { area: AreaConfig }) {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set('.ch-head > *', { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.ch-head',
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.to('.ch-head > *', { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }),
      });

      const rows = gsap.utils.toArray<HTMLElement>('.ch-row', root);
      rows.forEach((row) => {
        gsap.set(row, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: row,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(row, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-28 md:py-36">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="ch-head mb-16 md:mb-24">
          <h2 className="voice-display max-w-4xl text-4xl text-[#0a0a10] md:text-6xl">
            Cosa facciamo, <span className="text-gradient">capitolo</span> per capitolo.
          </h2>
        </div>

        <div className="border-t border-[#0a0a10]/12">
          {area.services.map((s, i) => {
            const isOpen = open === i;
            return (
              <article key={s.n} className="ch-row border-b border-[#0a0a10]/12">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-5 py-8 text-left md:gap-10 md:py-10"
                >
                  <span
                    className="voice-display text-2xl transition-colors duration-300 md:text-4xl"
                    style={{ color: isOpen ? area.accent2 : 'rgba(10,10,16,0.25)' }}
                  >
                    {s.n}
                  </span>
                  <span className="flex-1">
                    <span className="voice-display block text-2xl text-[#0a0a10] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                      {s.title}
                    </span>
                    <span className="voice-mono mt-2 block text-[#0a0a10]/45">
                      {s.tag}
                    </span>
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border transition-all duration-500"
                    style={{
                      borderColor: isOpen ? area.accent2 : 'rgba(10,10,16,0.2)',
                      backgroundColor: isOpen ? area.accent2 : 'transparent',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" style={{ color: isOpen ? '#fff' : 'rgba(10,10,16,0.5)' }} />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.6,0.05,0.15,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-8 pb-10 pl-0 md:grid-cols-[1.3fr_1fr] md:pb-14 md:pl-24">
                      <div>
                        <p className="max-w-xl font-jakarta font-medium leading-relaxed text-black/55">
                          {s.desc}
                        </p>
                        {s.href && (
                          <Link
                            href={s.href}
                            className="mt-6 inline-flex items-center gap-2 font-satoshi text-sm font-black uppercase tracking-wide text-[#0a0a10] transition-colors duration-300"
                          >
                            <span className="relative">
                              Approfondisci
                              <span
                                className="absolute -bottom-1 left-0 h-0.5 w-full"
                                style={{ backgroundColor: area.accent2 }}
                              />
                            </span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      <ul className="flex flex-wrap content-start gap-2">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="voice-mono h-fit rounded-full border px-3.5 py-1.5 text-[#0a0a10]/60"
                            style={{ borderColor: 'rgba(10,10,16,0.15)' }}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

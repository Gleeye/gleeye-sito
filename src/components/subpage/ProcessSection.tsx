'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ProcessStep = { num: string; title: string; desc: string; Icon: LucideIcon };

/**
 * "Come lavoriamo" (sottopagine). Pin + scrub come nella pagina podcast:
 * scorrendo la pagina la sezione si fissa, le card avanzano in orizzontale e
 * si illumina una card alla volta (01 → 02 → …). Fatto più pulito.
 */
export default function ProcessSection({
  steps,
  subtitle = 'Un processo chiaro, senza sorprese. Dal brief alla consegna.',
}: {
  steps: ProcessStep[];
  subtitle?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const onUpdate = useCallback((self: ScrollTrigger) => {
    setProgress(self.progress);
    setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
  }, [steps.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.from('.sub-proc-title > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });

      const overflow = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      const distance = () => Math.max(overflow(), steps.length * 220);

      gsap.to(track, {
        x: () => -overflow(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [onUpdate, steps.length]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-t border-black/[0.03] bg-[#F8F9FA]">
      <div className="pointer-events-none absolute left-[-5%] top-[15%] h-[40vw] w-[40vw] rounded-full bg-[#4e92d8]/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#614aa2]/[0.05] blur-[150px]" />

      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="subProcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4e92d8" />
            <stop offset="100%" stopColor="#614aa2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 flex h-screen flex-col justify-center">
        <div className="sub-proc-title mb-10 flex flex-col gap-4 px-6 md:mb-14 md:px-16">
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">
            Come lavoriamo
          </span>
          <h2 className="max-w-3xl font-satoshi text-3xl font-black uppercase leading-[1.02] tracking-tight text-[#0a0a10] md:text-4xl lg:text-5xl">
            {subtitle}
          </h2>
        </div>

        <div ref={trackRef} className="flex items-stretch gap-5 px-6 will-change-transform md:gap-6 md:px-16">
          {steps.map((s, i) => {
            const isActive = i === active;
            const { Icon } = s;
            return (
              <div
                key={s.num}
                className={`group relative flex w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-all duration-700 ease-out md:w-[380px] md:p-10 ${
                  isActive
                    ? 'scale-[1.02] bg-gradient-to-br from-[#0c0e18] to-[#141628] text-white shadow-[0_20px_60px_-15px_rgba(78,146,216,0.3)]'
                    : 'bg-white text-[#0a0a10] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                }`}
              >
                {isActive && (
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#4e92d8]/20 blur-[80px]" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#614aa2]/15 blur-[60px]" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between">
                    <span
                      className={`font-satoshi text-5xl font-black leading-none tabular-nums transition-all duration-700 md:text-6xl ${
                        isActive ? 'text-white/25' : 'text-black/[0.06]'
                      }`}
                    >
                      {s.num}
                    </span>
                    <Icon
                      className="h-7 w-7 transition-all duration-500"
                      strokeWidth={1.5}
                      color={isActive ? '#8fb8f0' : 'url(#subProcGrad)'}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 font-satoshi text-xl font-black uppercase leading-snug tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                  <p className={`font-jakarta text-sm font-medium leading-relaxed ${isActive ? 'text-white/55' : 'text-black/45'}`}>
                    {s.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-10">
                  <div
                    className={`h-[2px] rounded-full transition-all duration-700 ${
                      isActive ? 'w-20 bg-gradient-to-r from-[#4e92d8] to-[#614aa2]' : 'w-12 bg-black/[0.07]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 px-6 md:mt-14 md:px-16">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2]"
              style={{ width: `${8 + progress * 92}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

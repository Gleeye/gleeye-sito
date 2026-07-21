'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Ear, Compass, PenTool, BookOpen, BarChart3, Ruler, Code2, Activity,
  ClipboardList, Lightbulb, Clapperboard, PackageCheck, Circle, type LucideIcon,
} from 'lucide-react';
import type { AreaConfig } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON: Record<string, LucideIcon> = {
  ear: Ear, compass: Compass, pen: PenTool, book: BookOpen,
  chart: BarChart3, ruler: Ruler, code: Code2, activity: Activity,
  clipboard: ClipboardList, lightbulb: Lightbulb, clapperboard: Clapperboard, package: PackageCheck,
};

/**
 * "Come lavoriamo": il metodo come percorso. Una spina in gradiente si disegna
 * allo scroll, i cerchi si accendono in sequenza. Sfondo non piatto: grain,
 * aloni, e icone del metodo oversize che vagano lente dietro.
 */
export default function AreaMethod({ area, bare = false }: { area: AreaConfig; bare?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // testata
      gsap.set('.am-head > *', { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: root, start: 'top 78%', once: true,
        onEnter: () =>
          gsap.to('.am-head > *', {
            opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
            // il titolo contiene un accento in gradiente: senza clearProps il
            // transform residuo romperebbe background-clip:text in Chrome
            clearProps: 'transform',
          }),
      });

      // spine (orizzontale desktop + verticale mobile): si disegnano
      gsap.set('.am-spine', { scaleX: 0 });
      gsap.set('.am-spine-v', { scaleY: 0 });
      ScrollTrigger.create({
        trigger: '.am-steps', start: 'top 72%', once: true,
        onEnter: () => {
          gsap.to('.am-spine', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' });
          gsap.to('.am-spine-v', { scaleY: 1, duration: 1.4, ease: 'power2.inOut' });
        },
      });

      // step: cerchio + testo si accendono in sequenza
      const steps = gsap.utils.toArray<HTMLElement>('.am-step', root);
      gsap.set(steps, { opacity: 0, y: 30 });
      gsap.set('.am-dot', { scale: 0.4 });
      ScrollTrigger.create({
        trigger: '.am-steps', start: 'top 72%', once: true,
        onEnter: () => {
          gsap.to(steps, { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out', delay: 0.2 });
          gsap.to('.am-dot', { scale: 1, stagger: 0.18, duration: 0.7, ease: 'back.out(2)', delay: 0.3 });
        },
      });

      // icone di sfondo che vagano lente
      gsap.utils.toArray<HTMLElement>('.am-ghost').forEach((g, i) => {
        gsap.to(g, {
          x: i % 2 ? -40 : 40, y: i % 2 ? 40 : -40,
          duration: 10 + i * 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const ghostIcons = area.method.slice(0, 3).map((m) => ICON[m.icon] ?? Circle);

  return (
    <section
      ref={rootRef}
      className={
        bare
          ? 'relative py-28 text-[#f8f9fa] md:py-36'
          : 'relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-36'
      }
    >
      {/* con bare lo sfondo (base + grana + aloni) lo mette la fascia contenitore */}
      {!bare && (
        <>
          <div className="grain pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -left-32 top-1/4 h-[50vh] w-[50vh] rounded-full opacity-20 blur-[150px]"
            style={{ backgroundColor: area.accent1 }}
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-0 h-[45vh] w-[45vh] rounded-full opacity-15 blur-[150px]"
            style={{ backgroundColor: area.accent2 }}
          />
        </>
      )}
      {/* icone oversize di sfondo */}
      {ghostIcons.map((G, i) => (
        <G
          key={i}
          className="am-ghost pointer-events-none absolute h-64 w-64 text-white/[0.03] md:h-80 md:w-80"
          style={{ top: `${12 + i * 30}%`, left: i % 2 ? 'auto' : '4%', right: i % 2 ? '6%' : 'auto' }}
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div className="am-head mb-16 md:mb-24">
          <p
            className="voice-mono mb-4"
            style={{
              backgroundImage: `linear-gradient(100deg, ${area.accent1}, ${area.accent2})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              width: 'fit-content',
            }}
          >
            Come lavoriamo
          </p>
          <h2 className="voice-display max-w-3xl text-4xl leading-[0.95] text-white md:text-6xl">
            Un metodo,{' '}
            <span
              style={{
                backgroundImage: `linear-gradient(100deg, ${area.accent1}, ${area.accent2})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              non improvvisazione.
            </span>
          </h2>
        </div>

        {/* percorso */}
        <div className="am-steps relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
          {/* spina orizzontale (desktop) */}
          <div
            className="am-spine pointer-events-none absolute left-6 right-6 top-[27px] hidden h-0.5 origin-left lg:block"
            style={{ background: `linear-gradient(90deg, ${area.accent1}, ${area.accent2})` }}
          />
          {/* spina verticale (mobile) */}
          <div
            className="am-spine-v pointer-events-none absolute left-[27px] top-6 bottom-6 w-0.5 origin-top lg:hidden"
            style={{ background: `linear-gradient(180deg, ${area.accent1}, ${area.accent2})` }}
          />

          {area.method.map((step, i) => {
            const StepIcon = ICON[step.icon] ?? Circle;
            // i cerchi seguono il verso della spina: blu all'inizio, viola alla fine
            const dotColor = i === area.method.length - 1 ? area.accent2 : area.accent1;
            return (
              <div key={step.title} className="am-step relative flex gap-5 lg:flex-col lg:gap-0">
                <div
                  className="am-dot relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-2 bg-[#0a0a10]"
                  style={{ borderColor: dotColor }}
                >
                  <StepIcon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="lg:mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="voice-mono" style={{ color: area.accent1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-satoshi text-lg font-black uppercase tracking-tight text-white md:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[24ch] font-jakarta text-sm font-medium leading-relaxed text-white/50">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

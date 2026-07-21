'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight, Plus,
  Fingerprint, Type, Shapes, BookOpen,
  LayoutTemplate, Share2, Search, Target,
  Clapperboard, Camera, PenLine, Mic, Palette,
  Circle, type LucideIcon,
} from 'lucide-react';
import type { AreaConfig } from './data';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* I servizi non hanno un ordine: icone al posto dei numeri, come sulla pagina
   eventi. La chiave arriva dai dati (stringa, serializzabile dal server). */
const ICON: Record<string, LucideIcon> = {
  fingerprint: Fingerprint, type: Type, shapes: Shapes, book: BookOpen,
  layout: LayoutTemplate, share: Share2, search: Search, target: Target,
  clapperboard: Clapperboard, camera: Camera, pen: PenLine, mic: Mic, palette: Palette,
};

/**
 * The services as an editorial chapter index: giant numbered rows,
 * expanding in place (CSS grid-rows trick — no height animation jank).
 */
export default function AreaChapters({ area }: { area: AreaConfig }) {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set('.ch-head > *', { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.ch-head',
        start: 'top 85%',
        once: true,
        onEnter: () =>
          // clearProps: il titolo contiene "nel concreto" in gradiente; un
          // transform residuo romperebbe background-clip:text (→ rettangolo)
          gsap.to('.ch-head > *', { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out', clearProps: 'transform' }),
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
      {/* def del gradiente brand per lo stroke delle icone aperte (SVG non
          accetta un linear-gradient CSS: serve un <linearGradient> referenziato) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="chGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4e92d8" />
            <stop offset="100%" stopColor="#614aa2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="ch-head mb-16 md:mb-24">
          {/* Titolo in Satoshi (voice-display) ma in caso normale, non maiuscolo;
              "nel concreto" in gradiente. textTransform inline: .voice-display è
              CSS non-layered e batterebbe la utility normal-case (layered). */}
          <h2
            className="voice-display text-5xl text-[#0a0a10] md:text-6xl lg:text-7xl"
            style={{ textTransform: 'none' }}
          >
            Cosa facciamo,{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                // respiro a destra: senza, il letter-spacing negativo taglia
                // l'inchiostro dell'ultima "O" nel box di background-clip
                paddingRight: '0.12em',
                marginRight: '-0.12em',
              }}
            >
              nel concreto
            </span>
            .
          </h2>
        </div>

        <div className="border-t border-[#0a0a10]/12">
          {area.services.map((s, i) => {
            const isOpen = open === i;
            const Icon = ICON[s.icon] ?? Circle;
            return (
              <article key={s.n} className="ch-row border-b border-[#0a0a10]/12">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-8 text-left md:gap-10 md:py-10"
                >
                  <Icon
                    className="h-7 w-7 shrink-0 self-start transition-colors duration-300 md:h-9 md:w-9 md:mt-1"
                    strokeWidth={1.5}
                    color={isOpen ? 'url(#chGrad)' : 'rgba(10,10,16,0.35)'}
                    aria-hidden="true"
                  />
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
                      borderColor: isOpen ? 'transparent' : 'rgba(10,10,16,0.2)',
                      backgroundImage: isOpen ? 'linear-gradient(135deg, #4e92d8, #614aa2)' : 'none',
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
                                style={{ backgroundImage: 'linear-gradient(90deg, #4e92d8, #614aa2)' }}
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

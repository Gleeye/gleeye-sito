'use client';

import Link from 'next/link';
import Magnetic from '../Magnetic';
import type { AreaConfig } from './data';

/** Pre-footer CTA band: marquee + magnetic button. */
export default function AreaCTA({ area }: { area: AreaConfig }) {
  const words = Array(8).fill(area.ctaLine);

  return (
    <section className="relative overflow-hidden border-y border-[#0a0a10]/10 bg-[#f8f9fa] py-20 md:py-28">
      <div className="blueprint-ink absolute inset-0" />

      <div className="animate-marquee pointer-events-none flex w-max select-none items-center [--marquee-speed:34s]" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="voice-display px-6 text-5xl text-transparent md:px-10 md:text-7xl" style={{ WebkitTextStroke: `1.5px ${area.accent2}55` }}>
              {w}
            </span>
            <span className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: area.accent1 }} />
          </span>
        ))}
      </div>

      <div className="relative mt-14 flex flex-col items-center gap-6 px-5 text-center">
        <p className="voice-serif text-2xl text-[#0a0a10]/60 md:text-3xl">
          Un solo interlocutore, tutta la catena del valore.
        </p>
        <Magnetic strength={0.25}>
          <Link
            href="/contatti"
            data-cursor="ANDIAMO"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0a0a10] px-10 py-5 font-satoshi text-sm font-black uppercase tracking-wide text-white"
          >
            <span
              className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
              style={{ background: `linear-gradient(90deg, ${area.accent2}, ${area.accent1})` }}
            />
            <span className="relative">Parliamo del tuo progetto</span>
            <span className="relative h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

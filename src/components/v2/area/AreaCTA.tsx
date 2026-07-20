'use client';

import Link from 'next/link';
import Magnetic from '../Magnetic';
import type { AreaConfig } from './data';

/**
 * Banda CTA pre-footer. Statica: niente marquee a scorrimento — il claim
 * grande in gradiente brand, fermo. Il movimento è solo il magnetic del
 * bottone e il pallino che pulsa (non a scorrimento).
 */
export default function AreaCTA({ area }: { area: AreaConfig }) {
  return (
    <section className="relative overflow-hidden border-y border-[#0a0a10]/10 bg-[#f8f9fa] py-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-5 text-center">
        <p className="voice-mono text-[#0a0a10]/40">Un solo interlocutore, tutta la catena del valore</p>

        <h2
          className="voice-display text-4xl leading-[0.98] md:text-6xl lg:text-7xl"
          style={{
            backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {area.ctaLine}
        </h2>

        <Magnetic strength={0.25}>
          <Link
            href="/contatti"
            data-cursor="ANDIAMO"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0a0a10] px-10 py-5 font-satoshi text-sm font-black uppercase tracking-wide text-white"
          >
            <span
              className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
              style={{ background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }}
            />
            <span className="relative">Parliamo del tuo progetto</span>
            <span className="relative h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

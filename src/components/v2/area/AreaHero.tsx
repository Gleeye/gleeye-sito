'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Magnetic from '../Magnetic';
import AreaBackdrop from './AreaBackdrop';
import type { AreaConfig } from './data';

export default function AreaHero({ area }: { area: AreaConfig }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.set('.ah-line-inner', { yPercent: 120, skewY: 5 });
      gsap.set('.ah-fade', { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.35 });
      tl.to('.ah-line-inner', { yPercent: 0, skewY: 0, duration: 1.3, stagger: 0.13, ease: 'power4.out' })
        .to('.ah-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.8');
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#0a0a10] text-[#f8f9fa]"
    >
      {area.bgImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={area.bgImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <AreaBackdrop from="#6db5ff" to="#9b7bff" />
      )}
      {/* overlay per leggibilità del testo a sinistra */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a10] via-[#0a0a10]/85 to-[#0a0a10]/30" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pt-32 md:px-10 md:pt-36">
        <nav className="ah-fade voice-mono mb-6 flex items-center gap-3 text-white/45" aria-label="breadcrumb">
          <Link href="/" className="transition-colors hover:text-white">Gleeye</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: area.accent1 }}>{area.name}</span>
        </nav>

        <h1 className="voice-display max-w-5xl">
          <span className="block overflow-hidden">
            <span className="ah-line-inner block text-[8.5vw] leading-[0.98] md:text-[min(5.4vw,4.3rem)]">
              {area.claim.plain}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="ah-line-inner text-gradient block text-[8.5vw] leading-[0.98] md:text-[min(5.4vw,4.3rem)]">
              {area.claim.serif}
            </span>
          </span>
        </h1>

        <p className="ah-fade mt-8 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/60 md:text-lg">
          {area.intro}
        </p>

        <div className="ah-fade mt-10">
          <Magnetic strength={0.25}>
            <Link
              href="/contatti"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
            >
              <span
                className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                style={{ background: `linear-gradient(90deg, ${area.accent2}, ${area.accent1})` }}
              />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Parliamo del tuo progetto
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-8">
        <p className="ah-fade voice-mono text-white/35">{area.soul}</p>
        <p className="ah-fade voice-mono hidden text-white/35 md:block">
          {area.services.length} servizi — un solo presidio
        </p>
      </div>
    </section>
  );
}

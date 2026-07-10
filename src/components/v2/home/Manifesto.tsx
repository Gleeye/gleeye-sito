'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SENTENCE =
  "In un mercato saturo di rumore, la bellezza non è decorazione: è cortesia verso chi guarda. Riduciamo l'attrito, restituiamo ordine, e trasformiamo la comunicazione da voce di spesa ad asset patrimoniale.";

const HIGHLIGHTS = ['bellezza', 'cortesia', 'ordine,', 'asset', 'patrimoniale.'];

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.mf-word', root);
      gsap.fromTo(
        words,
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.mf-text',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );

      gsap.from('.mf-sig', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.mf-sig', start: 'top 88%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] py-24 text-[#f8f9fa] md:py-32">
      <div className="grain absolute inset-0" />
      <div className="absolute right-0 top-0 h-[45vh] w-[45vh] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#614aa2]/25 blur-[130px]" />
      <div className="absolute bottom-0 left-0 h-[40vh] w-[40vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#4e92d8]/20 blur-[130px]" />

      {/* rotating seal */}
      <div className="pointer-events-none absolute right-8 top-16 hidden h-36 w-36 md:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
          <defs>
            <path id="mf-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-white/35" style={{ fontSize: '8.2px', fontFamily: 'var(--font-plex-mono)', letterSpacing: '0.18em' }}>
            <textPath href="#mf-circle">GLEE TO EYE · GLEE TO EYE ·</textPath>
          </text>
        </svg>
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6db5ff] animate-pulse-dot" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <div className="mb-14 flex items-center justify-between">
          <p className="voice-mono text-[#6db5ff]">[ 02 — Manifesto ]</p>
          <p className="voice-mono hidden text-white/30 md:block">Glee to eye — ontologia</p>
        </div>

        <p className="mf-text voice-display text-[7.5vw] leading-[1.04] md:text-[3.4vw]">
          {SENTENCE.split(' ').map((word, i) => {
            const hot = HIGHLIGHTS.includes(word.toLowerCase());
            return (
              <span key={i} className={`mf-word mr-[0.28em] inline-block ${hot ? 'text-gradient' : ''}`}>
                {word}
              </span>
            );
          })}
        </p>

        <div className="mf-sig mt-16 flex items-center gap-5">
          <span className="h-px w-16 bg-gradient-to-r from-[#4e92d8] to-[#9b7bff]" />
          <p className="voice-serif text-2xl text-white/70 md:text-3xl">
            Questo è il <span className="text-white">Glee to eye</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

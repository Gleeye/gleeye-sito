'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Intro "iride": il buio si apre dal centro come una pupilla che si dilata —
 * Gleeye, l'occhio. Il logo respira una volta e svanisce nell'apertura.
 * Gira una volta per sessione, mai con prefers-reduced-motion.
 *
 * Regole di sicurezza (lezione imparata): è DECORAZIONE —
 * - pointer-events-none: non cattura mai click/tap;
 * - failsafe: comunque vada, dopo 4s si toglie di mezzo;
 * - side-effect (overflow, storage) blindati in finish()/try-catch.
 */
export default function Intro() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('gleeye-intro');
    } catch {
      /* private mode */
    }
    if (reduced || seen) {
      setDone(true);
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = 'hidden';

    const finish = () => {
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('gleeye-intro', '1');
      } catch {
        /* private mode: l'intro girerà di nuovo, pazienza */
      }
      setDone(true);
    };

    /* Failsafe: comunque vada, l'intro si smonta. */
    const failsafe = window.setTimeout(finish, 4000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(
        '.intro-mark',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
      )
        /* un respiro solo */
        .to('.intro-mark', {
          opacity: 0.55,
          scale: 0.985,
          duration: 0.38,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        })
        /* il logo svanisce ingrandendosi appena: risucchiato nell'apertura */
        .to('.intro-mark', { opacity: 0, scale: 1.07, duration: 0.32, ease: 'power2.in' }, '+=0.05')
        /* la pupilla si dilata: il buio si apre dal centro (mask radiale) */
        .to('.intro-veil', { '--r': '130%', duration: 1.0, ease: 'expo.inOut' }, '-=0.18')
        /* cintura: se il mask non animasse (browser esotici), dissolve comunque */
        .to('.intro-veil', { opacity: 0, duration: 0.15 }, '-=0.12');
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [mounted]);

  if (done || !mounted) return null;

  return (
    /* pointer-events-none: non deve MAI catturare input, nemmeno un frame */
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[9990]" aria-hidden="true">
      {/* il velo: nero pieno, con un foro radiale morbido guidato da --r */}
      <div
        className="intro-veil absolute inset-0 bg-[#07070c]"
        style={{
          ['--r' as string]: '-14%',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 14%))',
          maskImage:
            'radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 14%))',
        }}
      />
      {/* marchio al centro, sopra il velo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.png" alt="" className="intro-mark w-[min(42vw,230px)] opacity-0" />
      </div>
    </div>
  );
}

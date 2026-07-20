'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Intro "blink": lo schermo è un occhio chiuso che si apre sul sito.
 * Gira una volta per sessione, mai con prefers-reduced-motion.
 */
export default function Intro() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem('gleeye-intro')) {
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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          sessionStorage.setItem('gleeye-intro', '1');
          setDone(true);
        },
      });

      tl.fromTo(
        '.intro-mark',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      )
        // respiro: il marchio pulsa due volte
        .to('.intro-mark', {
          opacity: 0.4,
          scale: 0.975,
          duration: 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        })
        .to('.intro-mark', { opacity: 0, scale: 1.03, duration: 0.35, ease: 'power2.in' }, '+=0.15')
        .to('.intro-lid-top', { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, '-=0.1')
        .to('.intro-lid-bottom', { yPercent: 100, duration: 0.95, ease: 'expo.inOut' }, '<');
    }, root);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [mounted]);

  if (done || !mounted) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9990]" aria-hidden="true">
      {/* palpebra superiore */}
      <div
        className="intro-lid-top absolute inset-x-0 top-0 h-[51%] bg-[#07070c]"
        style={{ borderBottomLeftRadius: '100% 22%', borderBottomRightRadius: '100% 22%' }}
      />
      {/* palpebra inferiore */}
      <div
        className="intro-lid-bottom absolute inset-x-0 bottom-0 h-[51%] bg-[#07070c]"
        style={{ borderTopLeftRadius: '100% 22%', borderTopRightRadius: '100% 22%' }}
      />
      {/* marchio al centro */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo.png"
          alt=""
          className="intro-mark w-[min(42vw,230px)] opacity-0"
        />
      </div>
    </div>
  );
}

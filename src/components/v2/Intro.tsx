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

      tl.fromTo('.intro-word', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        .to('.intro-word', { opacity: 0.25, duration: 0.12 }, '+=0.3')
        .to('.intro-word', { opacity: 1, duration: 0.12 })
        .to('.intro-word', { opacity: 0, duration: 0.3 }, '+=0.25')
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
      {/* wordmark al centro */}
      <div className="intro-word absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 opacity-0">
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#6db5ff] to-[#9b7bff]" />
        <p className="voice-mono text-white/70">Gleeye — glee to eye</p>
      </div>
    </div>
  );
}

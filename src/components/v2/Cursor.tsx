'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom cursor: precision dot + lagging optical ring.
 * Elements can request a state via `data-cursor="<label>"` —
 * the ring expands and shows the label (e.g. "APRI", "DRAG").
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add('has-custom-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const target = (e.target as HTMLElement)?.closest?.('[data-cursor], a, button');
      if (target) {
        const custom = (target as HTMLElement).getAttribute?.('data-cursor');
        if (custom) {
          label.textContent = custom;
          gsap.to(ring, { scale: 3.2, backgroundColor: 'rgba(155,123,255,0.92)', borderColor: 'rgba(155,123,255,0)', duration: 0.35, ease: 'power3.out' });
          gsap.to(label, { opacity: 1, duration: 0.25 });
          gsap.to(dot, { scale: 0, duration: 0.25 });
        } else {
          gsap.to(ring, { scale: 1.8, backgroundColor: 'rgba(109,181,255,0.14)', borderColor: 'rgba(109,181,255,0.7)', duration: 0.35, ease: 'power3.out' });
          gsap.to(label, { opacity: 0, duration: 0.2 });
          gsap.to(dot, { scale: 0.6, duration: 0.25 });
        }
      } else {
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(109,181,255,0)', borderColor: 'rgba(109,181,255,0.55)', duration: 0.35, ease: 'power3.out' });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      gsap.killTweensOf([dot, ring, label]);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-[#6db5ff] opacity-0 pointer-events-none mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-[#6db5ff]/55 opacity-0 pointer-events-none"
      >
        <span
          ref={labelRef}
          className="voice-mono text-[8px] tracking-[0.18em] text-white opacity-0 select-none"
        />
      </div>
    </>
  );
}

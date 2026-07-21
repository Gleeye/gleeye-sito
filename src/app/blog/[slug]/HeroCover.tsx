'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Copertina hero:
   - con foto  → foto VERA (nessun ritocco di colore) + parallax leggero.
   - senza foto → fondo brand sobrio (tinta di categoria) + grana. Niente WebGL. */
export default function HeroCover({
  src,
  alt,
  c1,
  c2,
}: {
  src?: string;
  alt: string;
  c1: string;
  c2: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const wrapEl = wrap.current;
    const img = imgRef.current;
    if (!src || !wrapEl || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, wrapEl);
    return () => ctx.revert();
  }, [src]);

  if (!src) {
    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 18% 0%, ${c1}30, transparent 58%), radial-gradient(120% 100% at 100% 100%, ${c2}38, transparent 55%), #0a0a10`,
          }}
        />
        <div className="grain absolute inset-0" />
      </div>
    );
  }

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-x-0 h-[114%] w-full object-cover"
        style={{ top: '-7%' }}
      />
    </div>
  );
}

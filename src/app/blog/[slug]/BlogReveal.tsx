'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Rende il corpo WP (già con gli id iniettati sui titoli) e fa un reveal
   robusto blocco-per-blocco allo scroll. Pattern anti-StrictMode: gsap.set +
   ScrollTrigger.create({onEnter}), MAI gsap.from({scrollTrigger}). Se reduced
   motion, non nascondiamo nulla (niente contenuto invisibile). */
export default function BlogReveal({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(root.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 22 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, [html]);

  return (
    <div
      ref={ref}
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

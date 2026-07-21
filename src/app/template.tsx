'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/** Route-level enter transition: content rises out of the ink. */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    /* Su touch niente fade: il contenuto parte già visibile. Su iOS, sotto
       carico, il tween d'opacità poteva restare in pausa a metà lasciando un
       velo grigio e la pagina apparentemente vuota. */
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;

    /* opacity only — a transform here would turn the wrapper into the
       containing block for every position:fixed child (header, overlay) */
    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity' }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

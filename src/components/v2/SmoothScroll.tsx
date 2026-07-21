'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    if (new URLSearchParams(window.location.search).has('nolenis')) return;

    // Su dispositivi touch niente Lenis: lo scroll nativo è più fluido e non si
    // incolla. Teniamo però lagSmoothing(0) così le animazioni GSAP (transizione
    // pagina, reveal) si completano comunque anche durante i lag di carico su iOS.
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) {
      gsap.ticker.lagSmoothing(0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Hash anchors land wrong when pinned sections insert extra scroll space
     after the browser's native jump — re-scroll once layout has settled. */
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      /* Links to hashes use scroll={false}: the browser never jumps, we glide
         there with lenis (which feeds ScrollTrigger frame by frame). */
      setTimeout(() => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (lenisRef.current) {
            /* re-measure: pins may have grown the document past lenis' cached limit */
            lenisRef.current.resize();
            lenisRef.current.scrollTo(top, { duration: 1.4, lock: true });
          } else {
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      }, 450);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  return <>{children}</>;
}

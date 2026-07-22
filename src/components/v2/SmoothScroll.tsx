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
  const firstNavRef = useRef(true);

  /* Ogni navigazione client apre la pagina nuova DALL'INIZIO. Senza questo,
     la posizione di scroll della pagina precedente (o il restore del browser,
     sfasato dai pin che cambiano le altezze) restava applicata al layout
     nuovo → pagine che si aprivano "a caso" a metà. Salta il primo mount
     (reload: lasciamo il restore nativo) e i casi con hash (li gestisce il
     glide qui sotto). */
  useEffect(() => {
    if (firstNavRef.current) {
      firstNavRef.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

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

  /* Dopo ogni navigazione client-side vanno ricalcolate le posizioni dei
     ScrollTrigger (e rimisurato Lenis su desktop): altrimenti le sezioni pinnate
     della nuova pagina calcolano posizioni sbagliate e BLOCCANO lo scroll finché
     non si ricarica la pagina a mano. Due passate: subito e dopo che i media
     (immagini/video) hanno cambiato le altezze. */
  useEffect(() => {
    const refresh = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };
    const timers = [
      window.setTimeout(refresh, 200),
      window.setTimeout(refresh, 800),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname]);

  /* Hash anchors land wrong when pinned sections insert extra scroll space
     after the browser's native jump — re-scroll once layout has settled. */
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
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

    /* I click sui link con hash verso la STESSA pagina li gestiamo NOI, in
       capture. Perché: i <Link scroll={false}> di Next navigano via pushState
       — che NON genera hashchange — e col pathname invariato nessun effect
       ri-gira: l'URL cambiava e la pagina restava ferma (i CTA "Parliamone"
       della home sembravano morti). In più i plain <a href="#…"> facevano il
       jump nativo che Lenis risucchiava subito (snap-back). Qui: preventDefault,
       pushState manuale, glide — identico per Link e <a>, su ogni pagina. */
    const onDocClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== '_self') return;
      const href = a.getAttribute('href') || '';
      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return;
      const hash = href.slice(hashIdx);
      if (hash.length < 2) return;
      /* solo hash della pagina corrente ('#x', '/#x' sulla home, '/pagina#x') */
      const pathPart = href.slice(0, hashIdx);
      if (pathPart && pathPart !== window.location.pathname) return;
      /* '#contatti' è del PageWidgetOverlay (apre il form): non toccarlo */
      if (hash === '#contatti') return;
      if (!document.querySelector(hash)) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, '', hash);
      scrollToHash();
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    window.addEventListener('popstate', scrollToHash);
    document.addEventListener('click', onDocClick, true);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      window.removeEventListener('popstate', scrollToHash);
      document.removeEventListener('click', onDocClick, true);
    };
  }, [pathname]);

  return <>{children}</>;
}

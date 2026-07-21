'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Voci principali: tutte sullo stesso livello. */
const PRIMARY = [
  { n: '01', label: 'Identity', href: '/identity', note: 'chi sei, reso visibile' },
  { n: '02', label: 'Digital', href: '/digital', note: "l'infrastruttura del brand" },
  { n: '03', label: 'Factory', href: '/factory', note: 'produzione d’élite' },
  { n: '04', label: 'Lavora con noi', href: '/lavora-con-noi', note: 'unisciti al team' },
  { n: '05', label: 'Contatti', href: '/contatti', note: 'parliamone' },
];

/* Pannello a fianco.
   - pages: le pagine di storytelling dell'area (prima colonna, una per riga)
   - landings: le landing dei servizi più richiesti (seconda colonna) */
const AREAS = [
  {
    name: 'Identity',
    href: '/identity',
    pages: [
      { label: 'Brand Strategy', href: '/identity/brand-strategy' },
      { label: 'Naming', href: '/identity/naming' },
      { label: 'Visual Identity', href: '/identity/visual-identity' },
      { label: 'Brand Guidelines', href: '/identity/brand-guidelines' },
    ],
    landings: [],
  },
  {
    name: 'Digital',
    href: '/digital',
    pages: [
      { label: 'Web Design', href: '/digital/web' },
      { label: 'Social', href: '/digital/social' },
      { label: 'SEO', href: '/digital/seo' },
      { label: 'Advertising', href: '/digital/advertising' },
    ],
    landings: [],
  },
  {
    name: 'Factory',
    href: '/factory',
    pages: [
      { label: 'Video', href: '/factory/video' },
      { label: 'Fotografia', href: '/factory/fotografia' },
      { label: 'Copywriting', href: '/factory/copywriting' },
      { label: 'Grafica', href: '/factory/grafica' },
    ],
    landings: [
      { label: 'Podcast', href: '/podcast' },
      { label: 'Video Explainer', href: '/video-explainer' },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  /* Reading-progress hairline under the top edge */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, [pathname]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { clipPath: 'inset(0% 0% 100% 0%)', visibility: 'hidden' });
      const tl = gsap.timeline({ paused: true });
      tl.set(overlay, { visibility: 'visible' })
        .to(overlay, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut' })
        .from('.menu-link-row', { yPercent: 130, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power4.out' }, '-=0.35')
        .from('.menu-aside-group', { opacity: 0, y: 28, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
        .from('.menu-foot', { opacity: 0, duration: 0.5 }, '-=0.4');
      tlRef.current = tl;
    }, overlay);

    return () => ctx.revert();
  }, []);

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    if (next) {
      document.body.style.overflow = 'hidden';
      tlRef.current?.timeScale(1).play();
    } else {
      document.body.style.overflow = '';
      tlRef.current?.timeScale(1.5).reverse();
    }
  }, []);

  /* Close on navigation */
  useEffect(() => {
    if (open) toggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) toggle(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, toggle]);

  return (
    <>
      {/* ——— Reading progress ——— */}
      <div className="fixed inset-x-0 top-0 z-[110] h-[3px] pointer-events-none">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#4e92d8] via-[#9b7bff] to-[#614aa2]"
        />
      </div>

      {/* ——— Top bar ——— */}
      <header className="fixed inset-x-0 top-0 z-[100] pointer-events-none">
        <div className="flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Link
            href="/"
            aria-label="Gleeye — home"
            className="pointer-events-auto"
            onClick={() => open && toggle(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Gleeye" className="h-14 w-auto md:h-20" />
          </Link>

          <Magnetic className="pointer-events-auto">
            <button
              onClick={() => toggle(!open)}
              aria-expanded={open}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              className="group flex items-center gap-3 mix-blend-difference"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition-colors duration-300 group-hover:border-white">
                <span
                  className={`absolute h-px w-4 bg-white transition-all duration-300 ${
                    open ? 'rotate-45' : '-translate-y-[3.5px]'
                  }`}
                />
                <span
                  className={`absolute h-px w-4 bg-white transition-all duration-300 ${
                    open ? '-rotate-45' : 'translate-y-[3.5px]'
                  }`}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      {/* ——— Fullscreen overlay ——— */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-[#0a0a10] text-[#f8f9fa] invisible"
        aria-hidden={!open}
      >
        <div className="grain absolute inset-0" />
        {/* fluo aura */}
        <div className="absolute -right-40 top-1/4 h-[60vh] w-[60vh] rounded-full bg-[#614aa2]/25 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[50vh] w-[50vh] rounded-full bg-[#4e92d8]/20 blur-[140px]" />

        <div className="relative flex h-full flex-col justify-between px-5 pt-28 pb-6 md:px-10 md:pt-36 md:pb-10">
          <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto md:grid-cols-[1.15fr_1fr] md:gap-10 md:overflow-visible">
            {/* Primary nav — tutte le voci sullo stesso livello */}
            <nav className="flex flex-col justify-center">
              {PRIMARY.map((item) => (
                <div key={item.href} className="overflow-hidden">
                  <div className="menu-link-row">
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-4 py-1 md:gap-6"
                    >
                      <span className="voice-mono text-[10px] text-[#6db5ff]">{item.n}</span>
                      <span className="voice-display text-[8.5vw] leading-[1.04] text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_rgba(248,249,250,0.6)] group-hover:text-[#f8f9fa] group-hover:[-webkit-text-stroke:1.5px_transparent] md:whitespace-nowrap md:text-[4.6vw]">
                        {item.label}
                      </span>
                      <span className="voice-mono hidden text-white/0 transition-all duration-500 group-hover:text-[#6db5ff] lg:block">
                        {item.note}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </nav>

            {/* Aside — per ogni area: storytelling a sinistra, i suoi servizi
                più richiesti a destra (vuoto se non ne ha) */}
            <aside className="flex flex-col justify-center gap-8 md:border-l md:border-white/10 md:pl-10">
              {AREAS.map((area) => (
                <div key={area.href} className="menu-aside-group grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
                  {/* Storytelling dell'area, una per riga */}
                  <div>
                    <Link href={area.href} className="group mb-2 inline-flex items-center gap-2">
                      <span
                        className="font-satoshi text-base font-black uppercase tracking-tight"
                        style={{
                          backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {area.name}
                      </span>
                      <span className="text-[#6db5ff] opacity-60 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                    <ul className="space-y-1.5">
                      {area.pages.map((p) => (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            className="font-jakarta text-[15px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
                          >
                            {p.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Servizi più richiesti dell'area (solo dove esistono) */}
                  {area.landings.length > 0 && (
                    <div>
                      <p className="voice-mono mb-2 text-white/40">Servizi più richiesti</p>
                      <ul className="space-y-1.5">
                        {area.landings.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className="font-jakarta text-[15px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </aside>
          </div>

          {/* Footer strip */}
          <div className="menu-foot flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <a
              href="mailto:info@gleeye.eu"
              className="font-satoshi text-sm font-bold text-white/80 transition-colors hover:text-[#9b7bff]"
            >
              info@gleeye.eu
            </a>
            <div className="flex gap-6">
              {[
                ['IG', 'https://www.instagram.com/gleeye'],
                ['LI', 'https://www.linkedin.com/company/gleeye/'],
                ['FB', 'https://www.facebook.com/gleeye/'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="voice-mono text-white/60 transition-colors hover:text-[#6db5ff]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

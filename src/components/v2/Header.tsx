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
  { n: '04', label: 'Eventi aziendali', href: '/events', note: 'comunicazione per eventi' },
  { n: '05', label: 'Lavora con noi', href: '/lavora-con-noi', note: 'unisciti al team' },
];

/* Le istituzionali: peso leggero, una riga sola (due su mobile). */
const ISTITUZIONALI = [
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Mission e Vision', href: '/mission-e-vision' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Metodo', href: '/metodo' },
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
      { label: 'Podcast', href: '/factory/podcast' },
      { label: 'Copywriting', href: '/factory/copywriting' },
      { label: 'Grafica', href: '/factory/grafica' },
    ],
    landings: [
      { label: 'Podcast da Remoto Essential', href: '/podcast' },
      { label: 'Video Explainer', href: '/video-explainer' },
    ],
  },
];

/* Vista mobile: una sola lista ordinata. Le prime tre voci sono aree con
   sotto-servizi (accordion); le ultime due sono link diretti. */
type SubLink = { label: string; href: string };
const MOBILE: { label: string; href: string; pages: SubLink[]; landings: SubLink[] }[] = [
  { label: 'Identity', href: '/identity', pages: AREAS[0].pages, landings: AREAS[0].landings },
  { label: 'Digital', href: '/digital', pages: AREAS[1].pages, landings: AREAS[1].landings },
  { label: 'Factory', href: '/factory', pages: AREAS[2].pages, landings: AREAS[2].landings },
  { label: 'Eventi aziendali', href: '/events', pages: [], landings: [] },
  { label: 'Lavora con noi', href: '/lavora-con-noi', pages: [], landings: [] },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [onLight, setOnLight] = useState(false);
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
      setExpanded(null);
    }
  }, []);

  /* Close on navigation — SEMPRE sblocca lo scroll e chiudi il menu.
     Il vecchio `if (open) toggle(false)` a volte non scattava (open già false)
     e lasciava document.body.style.overflow = 'hidden': su iOS lo scroll touch
     restava bloccato sulla pagina nuova finché non si ricaricava a mano. */
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
    document.body.style.overflow = '';
    tlRef.current?.timeScale(1.5).reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Colore hamburger adattivo: mix-blend-difference a volte non "vede" lo
     sfondo (contesto di impilamento da Lenis/transform) e resta bianco → sparisce
     sul chiaro. Campioniamo lo sfondo dietro l'header e decidiamo il colore. */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), 36);
      let node: Element | null = el;
      let bg = '';
      while (node) {
        const c = getComputedStyle(node).backgroundColor;
        if (c && c !== 'transparent' && !c.startsWith('rgba(0, 0, 0, 0')) { bg = c; break; }
        node = node.parentElement;
      }
      const m = bg.match(/\d+(\.\d+)?/g);
      if (!m) return;
      const [r, g, b] = m.map(Number);
      setOnLight(0.299 * r + 0.587 * g + 0.114 * b > 140);
    };
    const sample = () => { if (!raf) raf = requestAnimationFrame(measure); };
    // ScrollTrigger è sincronizzato con Lenis (il native 'scroll' non scatta)
    const st = ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: sample, onRefresh: sample });
    sample();
    const t = window.setTimeout(sample, 200);
    window.addEventListener('resize', sample);
    return () => {
      st.kill();
      window.clearTimeout(t);
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', sample);
    };
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
              className="group flex items-center gap-3"
            >
              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
                  open || !onLight ? 'border-white/40 group-hover:border-white' : 'border-[#0a0a10]/25 group-hover:border-[#0a0a10]'
                }`}
              >
                <span
                  className={`absolute h-px w-4 transition-all duration-300 ${
                    open || !onLight ? 'bg-white' : 'bg-[#0a0a10]'
                  } ${open ? 'rotate-45' : '-translate-y-[3.5px]'}`}
                />
                <span
                  className={`absolute h-px w-4 transition-all duration-300 ${
                    open || !onLight ? 'bg-white' : 'bg-[#0a0a10]'
                  } ${open ? '-rotate-45' : 'translate-y-[3.5px]'}`}
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
            {/* ——— Mobile: lista pulita e leggibile, accordion per area ——— */}
            <div className="flex flex-col md:hidden">
              {MOBILE.map((item) => {
                const isOpen = expanded === item.label;
                const hasChildren = item.pages.length > 0 || item.landings.length > 0;
                return (
                  <div key={item.href} className="menu-link-row border-b border-white/10">
                    <div className="flex items-stretch">
                      <Link href={item.href} className="flex flex-1 items-center py-5">
                        <span className="voice-display text-[7.5vw] leading-none text-[#f8f9fa]">
                          {item.label}
                        </span>
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Chiudi' : 'Apri'} i servizi ${item.label}`}
                          className="flex w-14 items-center justify-center text-white/55 transition-colors active:text-white"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : ''}`}
                          >
                            <path d="M11 4.5v13M4.5 11h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0">
                          <ul>
                            {item.pages.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className="block py-3.5 font-jakarta text-[16px] font-medium text-white/60 transition-colors active:text-white"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {item.landings.length > 0 && (
                            <>
                              <p className="voice-mono mt-3 mb-1 text-white/40">Servizi più richiesti</p>
                              <ul>
                                {item.landings.map((c) => (
                                  <li key={c.href}>
                                    <Link
                                      href={c.href}
                                      className="block py-3.5 font-jakarta text-[16px] font-medium text-white/60 transition-colors active:text-white"
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          <div aria-hidden className="h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Istituzionali: peso leggero, si dispongono su una-due righe */}
              <div className="menu-link-row mt-7 flex flex-wrap gap-x-7 gap-y-3.5">
                {ISTITUZIONALI.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="font-jakarta text-[15px] font-medium text-white/55 transition-colors active:text-white"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary nav — tutte le voci sullo stesso livello */}
            <nav className="hidden flex-col justify-center md:flex">
              {PRIMARY.map((item) => (
                <div key={item.href} className="overflow-hidden">
                  <div className="menu-link-row">
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-4 py-1 md:gap-6"
                    >
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
            <aside className="hidden flex-col justify-center gap-8 md:flex md:border-l md:border-white/10 md:pl-10">
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
          <div className="menu-foot border-t border-white/10 pt-5">
            {/* Istituzionali (desktop): una riga sola, peso leggero */}
            <div className="mb-4 hidden flex-wrap gap-x-9 md:flex">
              {ISTITUZIONALI.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="font-jakarta text-[15px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
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
      </div>
    </>
  );
}

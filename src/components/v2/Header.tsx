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

const PRIMARY = [
  { n: '01', label: 'Home', href: '/', note: 'glee to eye' },
  { n: '02', label: 'Identity', href: '/identity', note: 'chi sei, reso visibile' },
  { n: '03', label: 'Digital', href: '/digital', note: "l'infrastruttura del brand" },
  { n: '04', label: 'Factory', href: '/factory', note: 'produzione d’élite' },
];

const SECONDARY = [
  { label: 'Podcast', href: '/podcast' },
  { label: 'Video Explainer', href: '/video-explainer' },
  { label: 'Lavora con noi', href: '/lavora-con-noi' },
  { label: "Contatti", href: "/contatti" },
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
        .from('.menu-aside', { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out' }, '-=0.6')
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
          <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto md:grid-cols-[1.6fr_1fr] md:gap-6 md:overflow-visible">
            {/* Primary nav */}
            <nav className="flex flex-col justify-center">
              {PRIMARY.map((item) => (
                <div key={item.href} className="overflow-hidden">
                  <div className="menu-link-row">
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-4 py-1 md:gap-8"
                    >
                      <span className="voice-mono text-[10px] text-[#6db5ff]">{item.n}</span>
                      <span className="voice-display text-[13vw] leading-[1.02] text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_rgba(248,249,250,0.6)] group-hover:text-[#f8f9fa] group-hover:[-webkit-text-stroke:1.5px_transparent] md:text-[6.5vw]">
                        {item.label}
                      </span>
                      <span className="voice-mono hidden text-white/0 transition-all duration-500 group-hover:text-[#6db5ff] md:block">
                        {item.note}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </nav>

            {/* Aside */}
            <aside className="menu-aside flex flex-col justify-center gap-10 md:border-l md:border-white/10 md:pl-10">
              <div>
                <p className="voice-mono mb-4 text-white/40">Verticali & extra</p>
                <ul className="space-y-2">
                  {SECONDARY.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-satoshi text-xl font-bold text-white/70 transition-colors duration-300 hover:text-[#6db5ff]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="voice-mono mb-4 text-white/40">Sede legale</p>
                <p className="font-jakarta text-white/70">
                  Piazza Brignole 2/3
                  <br />
                  16122 Genova
                </p>
                <a
                  href="mailto:info@gleeye.eu"
                  className="mt-3 inline-block font-satoshi text-lg font-bold text-white transition-colors hover:text-[#9b7bff]"
                >
                  info@gleeye.eu
                </a>
              </div>
            </aside>
          </div>

          {/* Footer strip */}
          <div className="menu-foot flex items-center justify-between border-t border-white/10 pt-5">
            <span className="voice-mono text-white/40">Gleeye — Glee to eye</span>
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

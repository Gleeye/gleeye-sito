'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Identity', href: '/identity' },
  { label: 'Digital', href: '/digital' },
  { label: 'Factory', href: '/factory' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Lavora con noi', href: '/lavora-con-noi' },
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/gleeye' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gleeye/' },
  { label: 'Facebook', href: 'https://www.facebook.com/gleeye/' },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Giant wordmark rises from below as footer enters */
      gsap.from('.footer-wordmark span', {
        yPercent: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.footer-wordmark', start: 'top 95%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="blueprint absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
        {/* CTA */}
        <div className="mb-24 flex flex-col items-start gap-8 md:mb-32">
          <p className="voice-serif text-2xl text-white/60 md:text-3xl">Hai un progetto in testa?</p>
          <Magnetic strength={0.2}>
            <Link
              href="/contatti"
              data-cursor="SCRIVICI"
              className="group relative inline-block"
            >
              <span className="voice-display block text-[13vw] leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:2px_#f8f9fa] group-hover:text-[#f8f9fa] group-hover:[-webkit-text-stroke:2px_transparent] md:text-[7vw]">
                Parliamone.
              </span>
              <span className="absolute -bottom-2 left-0 h-[3px] w-0 bg-gradient-to-r from-[#4e92d8] to-[#9b7bff] transition-all duration-700 group-hover:w-full" />
            </Link>
          </Magnetic>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 border-t border-white/10 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="voice-mono mb-5 text-white/40">Quartier generale</p>
            <p className="font-jakarta leading-relaxed text-white/70">
              Piazza Brignole 2/3
              <br />
              16122 Genova
            </p>
            <a href="mailto:info@gleeye.eu" className="mt-4 inline-block font-satoshi font-bold text-white transition-colors hover:text-[#6db5ff]">
              info@gleeye.eu
            </a>
            <br />
            <a href="tel:+390100954533" className="mt-1 inline-block font-jakarta text-white/70 transition-colors hover:text-[#6db5ff]">
              +39 010 09 54 533
            </a>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Naviga</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Segui</p>
            <ul className="space-y-2.5">
              {SOCIAL.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="voice-mono mb-5 text-white/40">Legale</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy-policy" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="font-jakarta text-white/70 transition-colors duration-300 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
            <p className="voice-mono mt-8 text-white/30">P.IVA 02944020995</p>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="footer-wordmark relative flex select-none justify-center overflow-hidden leading-none" aria-hidden="true">
        {'GLEEYE'.split('').map((ch, i) => (
          <span
            key={i}
            className="voice-display inline-block text-[24vw] leading-[0.78] text-transparent [-webkit-text-stroke:1.5px_rgba(248,249,250,0.22)] transition-colors duration-500 hover:text-[#6db5ff] hover:[-webkit-text-stroke:1.5px_transparent] md:[-webkit-text-stroke:2px_rgba(248,249,250,0.22)]"
          >
            {ch}
          </span>
        ))}
      </div>

      <div className="relative border-t border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 md:flex-row">
          <p className="voice-mono text-white/35">© {new Date().getFullYear()} Gleeye — Tutti i diritti riservati</p>
          <p className="voice-mono text-white/35">Comunicazione & marketing · Genova, operativi ovunque</p>
        </div>
      </div>
    </footer>
  );
}

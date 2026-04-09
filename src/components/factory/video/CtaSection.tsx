'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gvid-cta-content', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contatti"
      ref={sectionRef}
      className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40"
    >
      <div className="max-w-5xl mx-auto gvid-cta-content text-center">

        <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 mb-8">
          Inizia da qui
        </span>

        <h2 className="font-satoshi font-black tracking-tight uppercase text-4xl md:text-6xl lg:text-7xl text-black leading-tight mb-6">
          Il tuo prossimo video parte da qui.
        </h2>

        <p className="font-jakarta font-medium text-lg md:text-xl text-black/45 leading-relaxed mb-14 max-w-xl mx-auto">
          Raccontaci il progetto. Scriviamo insieme lo script.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:info@gleeye.eu"
            className="group relative px-10 py-5 rounded-full overflow-hidden flex items-center justify-center min-w-[200px] transition-all duration-700"
            style={{ background: 'linear-gradient(135deg, #614aa2, #4e92d8)' }}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <span className="relative z-10 font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Scrivici
            </span>
          </a>

          <Link
            href="/factory"
            className="group relative px-10 py-5 bg-transparent border border-black/15 text-black rounded-full flex items-center justify-center min-w-[200px] hover:border-black/30 transition-all duration-500"
          >
            <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 group-hover:text-black transition-colors duration-300">
              Torna a Factory
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

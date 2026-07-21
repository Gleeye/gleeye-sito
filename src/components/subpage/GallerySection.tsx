'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #614aa2, #4e92d8)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export type GalleryItem = { img: string; label: string; desc: string };

export type GalleryData = {
  eyebrow: string;
  title: { plain: string; accent: string };
  items: GalleryItem[];
};

/**
 * Gallery visiva (dark) di tipologie/categorie con foto reale. Card con zoom
 * su hover e descrizione che sale. Reveal robusto (gsap.set + ScrollTrigger).
 */
export default function GallerySection({ data }: { data: GalleryData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set('.sub-gal-head', { opacity: 0, y: 22 });
      gsap.set('.sub-gal-card', { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          gsap.to('.sub-gal-head', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' });
          gsap.to('.sub-gal-card', { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#F8F9FA] py-24 md:py-32">
      <div className="pointer-events-none absolute left-[-6%] top-[15%] h-[34vw] w-[34vw] rounded-full bg-[#4e92d8]/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[-6%] h-[34vw] w-[34vw] rounded-full bg-[#614aa2]/[0.05] blur-[150px]" />

      <div className="relative z-10">
        <div className="mx-auto mb-14 max-w-7xl px-6 md:mb-20 md:px-16">
          <span className="sub-gal-head font-satoshi block text-[10px] font-bold uppercase tracking-[0.3em] text-black/25">
            {data.eyebrow}
          </span>
          <h2 className="sub-gal-head mt-5 max-w-3xl font-satoshi text-3xl font-black uppercase leading-[1.05] tracking-tight text-black md:text-4xl lg:text-5xl">
            {data.title.plain}{' '}
            <span style={gradientText}>{data.title.accent}</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:gap-5 md:px-16 lg:max-w-none lg:grid-cols-4 lg:gap-6 lg:px-8">
          {data.items.map((it) => (
            <article
              key={it.label}
              className="sub-gal-card group relative aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-black/[0.03] shadow-[0_20px_50px_-25px_rgba(10,10,16,0.4)] ring-1 ring-black/[0.06] will-change-transform lg:aspect-[3/5]"
            >
              <Image
                src={it.img}
                alt={it.label}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-satoshi text-lg font-black uppercase tracking-tight text-white md:text-xl">
                  {it.label}
                </h3>
                <p className="mt-2 max-h-0 overflow-hidden font-jakarta text-sm font-medium leading-relaxed text-white/70 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                  {it.desc}
                </p>
                <div className="mt-3 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-all duration-500 group-hover:w-14" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

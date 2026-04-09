'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Replace src with actual photo paths — leave null to show gradient placeholder
const shots = [
  { src: null, aspect: 'aspect-[4/5]', gradient: 'from-[#614aa2]/30 to-[#08080C]', label: 'Reportage' },
  { src: null, aspect: 'aspect-[3/2]', gradient: 'from-[#4e92d8]/25 to-[#08080C]', label: 'Product' },
  { src: null, aspect: 'aspect-[3/4]', gradient: 'from-[#614aa2]/20 to-[#4e92d8]/20', label: 'Editorial' },
  { src: null, aspect: 'aspect-[4/3]', gradient: 'from-[#08080C] to-[#4e92d8]/30', label: 'Corporate' },
  { src: null, aspect: 'aspect-square', gradient: 'from-[#4e92d8]/20 to-[#614aa2]/30', label: 'Portrait' },
  { src: null, aspect: 'aspect-[3/2]', gradient: 'from-[#614aa2]/25 to-[#08080C]', label: 'Event' },
];

export default function FotografiaGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fgal-label', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.fgal-item', {
        opacity: 0, y: 40, scale: 0.97, duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.fgal-item', start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">

        <div className="fgal-label flex items-center justify-between mb-8">
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
            Portfolio
          </span>
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/10">
            Alcuni lavori
          </span>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {shots.map((shot, i) => (
            <div
              key={i}
              className={`fgal-item relative ${shot.aspect} rounded-xl overflow-hidden group`}
            >
              {shot.src ? (
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient}`} />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <span className="font-satoshi text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {shot.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

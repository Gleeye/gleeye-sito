'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: '80+',  label: 'Identità visive create',        sub: 'da startup a rebranding aziendali completi' },
  { value: '8+',   label: 'Anni di brand design',          sub: 'con aggiornamento costante alle tendenze internazionali' },
  { value: '15+',  label: 'Touchpoint coperti',            sub: 'in media per ogni progetto di identity completo' },
  { value: '0',    label: 'Simboli da stock',              sub: 'ogni segno è originale e pensato per il brand specifico' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ivi-stat-item', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
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
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-20 md:py-28 border-b border-black/[0.05]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.05]">
        {stats.map((s) => (
          <div key={s.label} className="ivi-stat-item bg-[#F8F9FA] px-8 py-10 md:px-12 md:py-14 flex flex-col gap-3">
            <span
              className="font-satoshi font-black leading-none"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                background: 'linear-gradient(135deg, #614aa2, #4e92d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {s.value}
            </span>
            <span className="font-satoshi font-black uppercase tracking-tight text-base md:text-lg text-black">
              {s.label}
            </span>
            <span className="font-jakarta text-sm text-black/35 leading-snug">
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

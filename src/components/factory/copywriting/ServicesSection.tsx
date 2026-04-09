'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    number: '01',
    title: 'COPY STRATEGY',
    desc: "Costruiamo l'architettura editoriale della tua comunicazione. Tono di voce, struttura dei messaggi, gerarchia dei canali. Prima si progetta, poi si scrive.",
    tags: ['Tone of voice', 'Piano editoriale', 'Verbal identity'],
  },
  {
    number: '02',
    title: 'COPY CONTENT',
    desc: 'Testi per siti, landing page, newsletter, social, campagne ADV. Ogni formato ha la sua grammatica. Ogni parola deve guadagnarsi il posto che occupa.',
    tags: ['Web copy', 'Social content', 'Email marketing'],
  },
  {
    number: '03',
    title: 'BLOGGING & SEO COPY',
    desc: "Articoli che intercettano domanda organica, costruiscono autorità di settore e tengono il lettore. Scritti per le persone, ottimizzati per i motori di ricerca.",
    tags: ['SEO content', 'Blog aziendale', 'Long-form'],
  },
  {
    number: '04',
    title: 'NAMING, CLAIM & PAYOFF',
    desc: 'Il nome è il primo racconto che un brand fa di sé. Lo costruiamo con metodo e creatività, perché resti nel tempo e sia vero prima ancora di essere bello.',
    tags: ['Naming', 'Tagline', 'Brand language'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-header', {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });

        const line = row.querySelector('.svc-progress') as HTMLElement;
        const enter = () => gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
        const leave = () => gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power3.in' });
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mouseleave', leave);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="svc-header flex items-end justify-between gap-6 mb-4">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-white">
            Cosa facciamo
          </h2>
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hidden md:block pb-1">
            4 aree di intervento
          </span>
        </div>

        {/* Table rows */}
        <div className="mt-12">
          {services.map((s) => (
            <div
              key={s.number}
              className="svc-row group relative border-t border-white/[0.07] py-8 md:py-10 cursor-default overflow-hidden"
            >
              {/* Hover fill bg */}
              <div className="absolute inset-0 bg-white/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_auto] gap-6 md:gap-12 items-start">
                {/* Number */}
                <span className="font-satoshi font-black text-sm text-white/15 tabular-nums pt-1">
                  {s.number}
                </span>

                {/* Main content */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                  <h3 className="font-satoshi font-black uppercase tracking-tight text-xl md:text-2xl lg:text-3xl text-white md:w-64 shrink-0 leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-jakarta font-medium leading-relaxed text-white/40 text-sm md:text-base max-w-lg">
                    {s.desc}
                  </p>
                </div>

                {/* Tags — desktop only */}
                <div className="hidden md:flex flex-col items-end gap-2 pt-1">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-satoshi text-[9px] font-bold uppercase tracking-[0.18em] text-white/20 group-hover:text-white/40 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom progress line */}
              <div
                className="svc-progress absolute bottom-0 left-0 h-px origin-left"
                style={{
                  width: '100%',
                  transform: 'scaleX(0)',
                  background: 'linear-gradient(90deg, #614aa2, #4e92d8)',
                }}
              />
            </div>
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>

      </div>
    </section>
  );
}

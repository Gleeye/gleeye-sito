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
    title: 'REPORTAGE AZIENDALE',
    desc: "Ritratti del team, ambienti di lavoro, momenti del processo produttivo. Le immagini che raccontano chi sei prima ancora che tu lo dica.",
    tags: ['Team portrait', 'Corporate lifestyle', 'Workplace'],
  },
  {
    number: '02',
    title: 'PRODUCT PHOTOGRAPHY',
    desc: 'Shot di prodotto su sfondo neutro o in contesto d\'uso. Immagini che vendono prima del copy, su e-commerce, catalogo, social e campagne ADV.',
    tags: ['Still life', 'E-commerce', 'Packshot'],
  },
  {
    number: '03',
    title: 'EDITORIAL & BRAND',
    desc: 'Shooting editoriali costruiti attorno all\'identità del brand. Luce, composizione, casting e location: ogni scelta è una decisione narrativa, non estetica.',
    tags: ['Brand photography', 'Mood board', 'Art direction'],
  },
  {
    number: '04',
    title: 'EVENT PHOTOGRAPHY',
    desc: 'Copertura di eventi aziendali, fiere, lanci di prodotto e conferenze. Documentazione professionale che diventa contenuto editoriale e archivio di valore.',
    tags: ['Fiere', 'Lanci prodotto', 'Corporate events'],
  },
];

export default function FotografiaServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fsvc-header', {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.utils.toArray<HTMLElement>('.fsvc-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });

        const line = row.querySelector('.fsvc-progress') as HTMLElement;
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

        <div className="fsvc-header flex items-end justify-between gap-6 mb-4">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-white">
            Cosa facciamo
          </h2>
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hidden md:block pb-1">
            4 aree di intervento
          </span>
        </div>

        <div className="mt-12">
          {services.map((s) => (
            <div
              key={s.number}
              className="fsvc-row group relative border-t border-white/[0.07] py-8 md:py-10 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.025] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_auto] gap-6 md:gap-12 items-start">
                <span className="font-satoshi font-black text-sm text-white/15 tabular-nums pt-1">
                  {s.number}
                </span>

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                  <h3 className="font-satoshi font-black uppercase tracking-tight text-xl md:text-2xl lg:text-3xl text-white md:w-64 shrink-0 leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-jakarta font-medium leading-relaxed text-white/40 text-sm md:text-base max-w-lg">
                    {s.desc}
                  </p>
                </div>

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

              <div
                className="fsvc-progress absolute bottom-0 left-0 h-px origin-left"
                style={{
                  width: '100%',
                  transform: 'scaleX(0)',
                  background: 'linear-gradient(90deg, #4e92d8, #614aa2)',
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

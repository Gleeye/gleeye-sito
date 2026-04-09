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
    title: 'VIDEO ISTITUZIONALE',
    desc: 'Il racconto ufficiale della tua azienda. Chi siete, cosa fate, perché vale la pena scegliervi. Girato con cura, montato per durare nel tempo.',
    tags: ['Company story', 'Brand film', 'Istituzionale'],
  },
  {
    number: '02',
    title: 'VIDEO PRODOTTO & ADV',
    desc: 'Spot e video prodotto per campagne digitali e offline. Format ottimizzati per ogni piattaforma: dal 16:9 classico ai vertical per social.',
    tags: ['Spot ADV', 'Product video', 'Reels'],
  },
  {
    number: '03',
    title: 'VIDEO EXPLAINER',
    desc: 'Animazione o live action per spiegare un servizio complesso in modo semplice e visivamente efficace. Massimo 90 secondi, zero noia.',
    tags: ['Explainer', 'Motion graphic', 'Tutorial'],
  },
  {
    number: '04',
    title: 'SOCIAL VIDEO CONTENT',
    desc: 'Video pensati nativamente per i social: formati verticali, ritmo veloce, copy integrato. Dal singolo contenuto alla produzione in batch.',
    tags: ['Short form', 'Instagram', 'LinkedIn'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gvid-svc-header', {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.utils.toArray<HTMLElement>('.gvid-svc-row').forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });

        const line = row.querySelector('.gvid-svc-progress') as HTMLElement;
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

        <div className="gvid-svc-header flex items-end justify-between gap-6 mb-4">
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
              className="gvid-svc-row group relative border-t border-white/[0.07] py-8 md:py-10 cursor-default overflow-hidden"
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
                className="gvid-svc-progress absolute bottom-0 left-0 h-px origin-left"
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

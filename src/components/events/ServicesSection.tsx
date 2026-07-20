'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Megaphone, Globe, Camera, Clapperboard, PenTool, type LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const services: { icon: LucideIcon; title: string; desc: string; tags: string[] }[] = [
  {
    icon: Megaphone,
    title: 'MEDIA RELATION',
    desc: 'Comunicati stampa, conferenze stampa, media kit e relazioni con gli stakeholder. Gestiamo il rapporto con i giornalisti prima, durante e dopo — per garantire la massima copertura mediatica.',
    tags: ['Comunicati stampa', 'Ufficio stampa', 'Media kit'],
  },
  {
    icon: Globe,
    title: 'DIGITAL MARKETING',
    desc: "Sito web dedicato all'evento, gestione social in tempo reale, campagne di sponsorizzazione, newsletter e digital PR. Trasformiamo il tuo evento in un'esperienza online memorabile.",
    tags: ['Social media', 'ADV online', 'Newsletter'],
  },
  {
    icon: Camera,
    title: 'SERVIZI FOTO',
    desc: "Reportage fotografico completo dell'evento: momenti chiave, ospiti, relatori, backstage. Immagini professionali pronte per la comunicazione post-evento su tutti i canali.",
    tags: ['Reportage', 'Photobooth', 'Editorial'],
  },
  {
    icon: Clapperboard,
    title: 'SERVIZI VIDEO',
    desc: "Riprese dell'evento con una o più camere, aftermovie, interviste a relatori e ospiti, format Multivox. Tutto il materiale video di cui hai bisogno, prima e dopo.",
    tags: ['Aftermovie', 'Interviste', 'Riprese live'],
  },
  {
    icon: PenTool,
    title: 'SERVIZI GRAFICA',
    desc: "Logo e immagine coordinata dell'evento, materiali online e offline (locandine, brochure, flyer), cartellonistica (roll-up, striscioni, totem). Un'identità visiva coerente dall'invito al giorno dopo.",
    tags: ['Brand evento', 'Print', 'Cartellonistica'],
  },
];

export default function EventsServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.esvc-header', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

      gsap.utils.toArray<HTMLElement>('.esvc-row').forEach((row, i) => {
        gsap.from(row, { opacity: 0, y: 30, duration: 0.9, delay: i * 0.07, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%' } });

        const line = row.querySelector('.esvc-progress') as HTMLElement;
        const enter = () => gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
        const leave = () => gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power3.in' });
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mouseleave', leave);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        <div className="esvc-header flex items-end justify-between gap-6 mb-4">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-[#0a0a10]">Cosa facciamo</h2>
          <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 hidden md:block pb-1">5 aree di intervento</span>
        </div>

        <div className="mt-12">
          {services.map((s) => (
            <div key={s.title} className="esvc-row group relative border-t border-black/[0.1] py-8 md:py-10 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_auto] gap-6 md:gap-12 items-start">
                <s.icon
                  className="h-7 w-7 text-black/40 transition-colors duration-300 group-hover:text-[#4e92d8] md:h-8 md:w-8"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                  <h3 className="font-satoshi font-black uppercase tracking-tight text-xl md:text-2xl lg:text-3xl text-[#0a0a10] md:w-64 shrink-0 leading-tight">{s.title}</h3>
                  <p className="font-jakarta font-medium leading-relaxed text-black/55 text-sm md:text-base max-w-lg">{s.desc}</p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 pt-1">
                  {s.tags.map(tag => (
                    <span key={tag} className="font-satoshi text-[9px] font-bold uppercase tracking-[0.18em] text-black/35 group-hover:text-black/60 transition-colors duration-300">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="esvc-progress absolute bottom-0 left-0 h-px origin-left" style={{ width: '100%', transform: 'scaleX(0)', background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }} />
            </div>
          ))}
          <div className="border-t border-black/[0.1]" />
        </div>

      </div>
    </section>
  );
}

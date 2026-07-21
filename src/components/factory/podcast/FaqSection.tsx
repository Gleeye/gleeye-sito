'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    q: 'Devo avere già un’idea per il podcast?',
    a: 'No. Possiamo partire da zero: definiamo insieme tema, format e struttura. Se invece hai già un progetto, lo prendiamo e lo portiamo a livello professionale.',
  },
  {
    q: 'Posso registrare senza venire in studio?',
    a: 'Sì. Gestiamo registrazioni da remoto in qualità broadcast: tu e i tuoi ospiti vi collegate da dove volete, alla regia e all’audio pensiamo noi.',
  },
  {
    q: 'Fate anche il video del podcast?',
    a: 'Sì. Possiamo girare il podcast in multi-camera e ricavarne clip verticali per Instagram, TikTok e YouTube, oltre all’episodio completo.',
  },
  {
    q: 'Vi occupate anche della pubblicazione?',
    a: 'Sì. Copertina, note episodio, capitoli e upload su Spotify, Apple Podcasts e le altre piattaforme. Tu ricevi il podcast già online.',
  },
  {
    q: 'Ogni quanto si pubblica un episodio?',
    a: 'Dipende dal format: c’è chi pubblica ogni settimana, chi a stagioni. Definiamo insieme una cadenza sostenibile e la rispettiamo.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gpod-faq-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.gpod-faq-item', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.gpod-faq-item', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    const el = answerRefs.current[i];
    if (!el) return;

    if (open === i) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
      setOpen(null);
    } else {
      if (open !== null && answerRefs.current[open]) {
        gsap.to(answerRefs.current[open], { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
      }
      gsap.set(el, { height: 'auto', opacity: 1 });
      const h = el.offsetHeight;
      gsap.from(el, { height: 0, opacity: 0, duration: 0.5, ease: 'power3.out' });
      gsap.set(el, { height: h });
      setOpen(i);
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">

        <div className="gpod-faq-head mb-14">
          <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 mb-4">
            Domande frequenti
          </span>
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-black">
            FAQ
          </h2>
        </div>

        <div className="divide-y divide-black/[0.07]">
          {faqs.map((faq, i) => (
            <div key={i} className="gpod-faq-item">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-6 py-7 text-left group"
              >
                <span className="font-satoshi font-black uppercase tracking-tight text-base md:text-lg text-black group-hover:text-black/70 transition-colors duration-300">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full border border-black/12 flex items-center justify-center transition-all duration-300 group-hover:border-black/30"
                  style={{ rotate: open === i ? '45deg' : '0deg', transition: 'rotate 0.3s ease' }}
                >
                  <Plus size={13} className="text-black/40" />
                </span>
              </button>

              <div
                ref={el => { answerRefs.current[i] = el; }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="font-jakarta font-medium leading-relaxed text-black/50 text-sm md:text-base pb-7 max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-black/[0.07]" />
        </div>

      </div>
    </section>
  );
}

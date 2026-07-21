'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    q: 'Quanto dura uno shooting aziendale?',
    a: 'Dipende dal perimetro. Un reportage aziendale standard (team + ambienti) si completa in mezza giornata o una giornata intera. Shooting di prodotto o editoriali più elaborati richiedono più tempo — definiamo tutto nel brief.',
  },
  {
    q: 'Lavorate in studio o anche in location esterna?',
    a: 'Entrambi. Lavoriamo in studio attrezzato per product shot e ritratti controllati, ma ci spostiamo volentieri in location — uffici, spazi industriali, ambienti naturali. La scelta dipende dal mood che vogliamo costruire.',
  },
  {
    q: 'Come vengono consegnate le foto?',
    a: "Consegniamo tramite link di download sicuro, organizzato per categoria. I file sono ottimizzati nei formati richiesti: alta risoluzione per stampa, web-ready per digitale, specifici per social se necessario. Niente raw grezzi da processare.",
  },
  {
    q: 'Posso partecipare alla direzione creativa dello shooting?',
    a: "Sì, e lo incoraggiamo. Il brief visivo iniziale è una conversazione — non un modulo da compilare. Più capiamo la tua visione, il tuo brand e i tuoi obiettivi, più le immagini finali saranno quello che vuoi.",
  },
  {
    q: 'Producete anche video oltre alle foto?',
    a: "Sì. Gleeye Factory copre anche la produzione video — dal video istituzionale al contenuto social, dai reel agli spot. Possiamo integrare foto e video in un'unica sessione di produzione per ottimizzare tempi e costi.",
  },
];

export default function FotografiaFaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const ctx = gsap.context(() => {
      gsap.from('.ffaq-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.ffaq-item', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.ffaq-item', start: 'top 85%' },
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

        <div className="ffaq-head mb-14">
          <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 mb-4">
            Domande frequenti
          </span>
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-black">
            FAQ
          </h2>
        </div>

        <div className="divide-y divide-black/[0.07]">
          {faqs.map((faq, i) => (
            <div key={i} className="ffaq-item">
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

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
    q: 'Quanto costa un video istituzionale?',
    a: 'Il budget varia in base a durata, location, crew e post-produzione. Forniamo preventivi dettagliati dopo un brief iniziale. Partiamo da progetti anche contenuti per le PMI.',
  },
  {
    q: 'Quanto dura una produzione?',
    a: 'Dalla firma del brief alla consegna del video finale: in media 3-5 settimane per un video istituzionale. Video social più brevi si completano in 1-2 settimane.',
  },
  {
    q: 'Scrivete anche lo script?',
    a: 'Sì. La scrittura dello script è parte integrante del nostro processo. Non riceviamo solo un brief — lo trasformiamo in narrazione.',
  },
  {
    q: 'Dove girate?',
    a: 'Ovunque serva. Abbiamo attrezzatura per riprese in studio, in ufficio, in location esterna, in ambienti industriali. Valutiamo caso per caso.',
  },
  {
    q: 'Producete anche animazioni?',
    a: 'Sì, per video explainer e motion graphic. Realizziamo animazioni 2D e motion design integrabili con riprese live action.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const ctx = gsap.context(() => {
      gsap.from('.gvid-faq-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.gvid-faq-item', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.gvid-faq-item', start: 'top 85%' },
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
      // Close previous
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

        <div className="gvid-faq-head mb-14">
          <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 mb-4">
            Domande frequenti
          </span>
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-black">
            FAQ
          </h2>
        </div>

        <div className="divide-y divide-black/[0.07]">
          {faqs.map((faq, i) => (
            <div key={i} className="gvid-faq-item">
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

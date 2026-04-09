'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'È possibile scegliere solo alcuni servizi o bisogna prendere il pacchetto completo?',
    a: 'Puoi scegliere liberamente i singoli servizi di cui hai bisogno. Siamo strutturati per fornire la copertura totale, ma lavoriamo anche su incarichi specifici: solo foto, solo video, solo ufficio stampa. Il preventivo si costruisce sul tuo progetto.',
  },
  {
    q: 'Con quanto anticipo è necessario contattarvi?',
    a: "Prima ci contatti, meglio è — soprattutto per eventi con un forte lavoro di pre-comunicazione (lancio stampa, sito dedicato, campagne social). Per la sola copertura durante l'evento, anche qualche settimana può essere sufficiente. Valutare caso per caso.",
  },
  {
    q: 'Lavorate anche per eventi fuori Genova?',
    a: "Sì. Operiamo su tutto il territorio nazionale. Per eventi in altre città o regioni, i costi di trasferta vengono inclusi nel preventivo in modo trasparente.",
  },
  {
    q: 'Quanto tempo dopo l\'evento vengono consegnati i materiali?',
    a: "Dipende dai servizi richiesti. Le foto vengono consegnate in genere entro 5-7 giorni lavorativi. I video richiedono più tempo a seconda della complessità del montaggio. I materiali di comunicazione post-evento vengono prodotti e condivisi entro le prime 48 ore.",
  },
  {
    q: 'Gestite anche la moderazione dell\'evento?',
    a: "Sì. Offriamo un servizio di moderazione professionale per convegni, tavole rotonde e presentazioni. Il moderatore lavora in sinergia con il team di comunicazione per garantire coerenza tra il racconto dell'evento e il messaggio da veicolare.",
  },
];

export default function EventsFaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.efaq-head', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.efaq-item', { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.efaq-item', start: 'top 85%' } });
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
        <div className="efaq-head mb-14">
          <span className="block font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 mb-4">Domande frequenti</span>
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl text-black">FAQ</h2>
        </div>

        <div className="divide-y divide-black/[0.07]">
          {faqs.map((faq, i) => (
            <div key={i} className="efaq-item">
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between gap-6 py-7 text-left group">
                <span className="font-satoshi font-black uppercase tracking-tight text-base md:text-lg text-black group-hover:text-black/70 transition-colors duration-300">{faq.q}</span>
                <span className="shrink-0 w-7 h-7 rounded-full border border-black/12 flex items-center justify-center group-hover:border-black/30 transition-all duration-300" style={{ rotate: open === i ? '45deg' : '0deg', transition: 'rotate 0.3s ease' }}>
                  <Plus size={13} className="text-black/40" />
                </span>
              </button>
              <div ref={el => { answerRefs.current[i] = el; }} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <p className="font-jakarta font-medium leading-relaxed text-black/50 text-sm md:text-base pb-7 max-w-2xl">{faq.a}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-black/[0.07]" />
        </div>
      </div>
    </section>
  );
}

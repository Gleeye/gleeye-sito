'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Le affermazioni: dal manifesto Gleeye. Ognuna ha un trattamento diverso. */
const STATEMENTS = [
  {
    lines: [
      { t: 'La bellezza non è', style: 'fill' },
      { t: 'un vezzo.', style: 'outline' },
      { t: 'È cortesia', style: 'fill' },
      { t: 'verso chi guarda.', style: 'gradient' },
    ],
    note: 'Un messaggio confuso chiede lavoro a chi lo riceve. E nessuno lavora volentieri per capire una pubblicità. Noi riduciamo l’attrito della decodifica: il messaggio arriva fluido, e resta.',
    align: 'left',
    tilt: -1.5,
  },
  {
    lines: [
      { t: 'La comunicazione', style: 'fill' },
      { t: 'definisce chi sei.', style: 'gradient' },
      { t: 'Il marketing è il suo', style: 'fill' },
      { t: 'braccio armato.', style: 'outline' },
    ],
    note: 'Prima l’identità, poi lo strumento. Mai il contrario. Una campagna può portarti mille sguardi: se quello che vedono non ha carattere, li hai pagati per niente.',
    align: 'right',
    tilt: 1.5,
  },
  {
    lines: [
      { t: 'Cura da', style: 'fill' },
      { t: 'boutique.', style: 'gradient' },
      { t: 'Tempi da', style: 'fill' },
      { t: 'factory.', style: 'outline' },
    ],
    note: 'L’eccellenza non può dipendere dall’ispirazione del momento: l’abbiamo trasformata in protocollo. Ogni progetto passa per lo stesso standard, con tempi certi. La qualità che si ripete non è fortuna — è processo.',
    align: 'center',
    tilt: 0,
  },
  {
    lines: [
      { t: 'Difendiamo le aziende', style: 'fill' },
      { t: 'dal rischio di apparire', style: 'fill' },
      { t: 'mediocri.', style: 'gradient' },
    ],
    note: 'Il low cost a tutti i costi è un lento sabotaggio d’immagine. Ogni asset sciatto racconta al mercato che vali meno di quanto vali davvero. Noi siamo lo scudo: niente che porti il tuo nome esce sotto standard.',
    align: 'left',
    tilt: 1,
  },
  {
    lines: [
      { t: 'Assorbiamo', style: 'outline' },
      { t: 'la complessità.', style: 'fill' },
      { t: 'Restituiamo', style: 'outline' },
      { t: 'chiarezza.', style: 'gradient' },
    ],
    note: 'Fornitori, tecnica, revisioni, imprevisti: il dietro le quinte è nostro, e non lo vedrai mai. A te restano le decisioni chiare e il risultato finito. Della complessità ti accorgi solo per una cosa: quanto sembra tutto semplice.',
    align: 'right',
    tilt: -1,
  },
] as const;

const styleFor = (style: string) =>
  style === 'outline'
    ? { color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }
    : style === 'gradient'
      ? undefined /* corsivo gradiente del sito: classi sulla riga */
      : { color: '#f8f9fa' };

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Su touch: niente scrub (su iOS post-navigazione lascerebbero le righe
         a yPercent 110 — spinte fuori dal wrapper overflow-hidden, invisibili —
         e le note a opacity 0). Portiamo tutto allo stato finale. */
      if (isTouchDevice()) {
        gsap.set('.mfp-line', { yPercent: 0 });
        gsap.set('.mfp-statement', { rotate: 0, scale: 1 });
        gsap.set('.mfp-note', { opacity: 1, y: 0 });
        gsap.from('.mf-hero-line', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 });
        return;
      }

      gsap.from('.mf-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'power4.out', delay: 0.2,
      });

      /* barra di lettura globale */
      gsap.fromTo('.mfp-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      });

      /* ogni statement: righe che salgono + leggera rotazione che si raddrizza */
      gsap.utils.toArray<HTMLElement>('.mfp-statement', root).forEach((st) => {
        const tilt = Number(st.dataset.tilt || 0);
        gsap.fromTo(st.querySelectorAll('.mfp-line'),
          { yPercent: 110 },
          {
            yPercent: 0, stagger: 0.09, ease: 'none',
            scrollTrigger: { trigger: st, start: 'top 78%', end: 'center 48%', scrub: 0.5 },
          },
        );
        gsap.fromTo(st, { rotate: tilt * 2, scale: 0.96 }, {
          rotate: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: st, start: 'top 85%', end: 'center 45%', scrub: 0.6 },
        });
        gsap.from(st.querySelector('.mfp-note'), {
          opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: st, start: 'center 60%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* barra di lettura */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent">
        <div className="mfp-progress h-full w-full origin-left bg-gradient-to-r from-[#8257e6] to-[#4e92d8]" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* ------- hero: il nome come tesi ------- */}
      <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
        <div className="pointer-events-none absolute left-[-10%] top-[15%] h-[55vh] w-[55vh] rounded-full bg-[#614aa2]/20 blur-[140px]" />
        <h1>
          <span className="block overflow-hidden py-[0.03em]">
            <span className="mf-hero-line voice-display block text-[15vw] leading-[0.88] md:text-[11vw]">Glee,</span>
          </span>
          <span className="block overflow-hidden py-[0.03em]">
            <span className="mf-hero-line voice-display block text-[15vw] leading-[0.88] md:text-[11vw]" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.45)' }}>
              to
            </span>
          </span>
          <span className="block overflow-hidden pt-[0.03em] pb-[0.18em]">
            <span className="mf-hero-line text-gradient block w-fit font-playfair italic font-medium normal-case leading-[0.95] tracking-[-0.01em] pb-[0.16em] pr-[0.05em] text-[15vw] md:text-[11vw]">eye.</span>
          </span>
        </h1>
        <p className="mf-hero-line mt-10 max-w-xl font-jakarta text-lg font-medium leading-relaxed text-white/55 md:text-xl">
          Il nostro nome è la nostra tesi: il piacere per gli occhi non è un fine artistico — è un parametro di efficacia. Quello che segue è ciò in cui crediamo.
        </p>
      </div>

      {/* ------- statements ------- */}
      {STATEMENTS.map((s, i) => (
        <div
          key={i}
          className={`mfp-statement relative flex min-h-[60vh] flex-col justify-center px-5 py-16 md:min-h-[85vh] md:py-20 md:px-10 ${
            s.align === 'right' ? 'items-end text-right' : s.align === 'center' ? 'items-center text-center' : 'items-start'
          }`}
          data-tilt={s.tilt}
        >
          <div>
            {s.lines.map((l, j) => (
              <span
                key={j}
                className={`block overflow-hidden ${l.style === 'gradient' ? 'pt-[0.03em] pb-[0.24em]' : 'py-[0.03em]'}`}
              >
                <span
                  className={`mfp-line block text-[6.5vw] md:text-[clamp(2.6rem,7.5vw,7rem)] ${
                    l.style === 'gradient'
                      ? /* corsivo gradiente del sito; pb sulla span = il box del
                           gradiente copre i discendenti (g di guarda, q di boutique).
                           w-fit: il gradiente si stende sul testo, non sul blocco —
                           sennò le righe corte pescano solo il blu iniziale e i
                           corsivi sembrano avere gradienti diversi tra loro */
                        `text-gradient w-fit font-playfair italic font-medium normal-case leading-[1.02] tracking-[-0.01em] pb-[0.2em] pr-[0.05em] ${
                          s.align === 'right' ? 'ml-auto' : s.align === 'center' ? 'mx-auto' : ''
                        }`
                      : 'voice-display leading-[0.92]'
                  }`}
                  style={styleFor(l.style)}
                >
                  {l.t}
                </span>
              </span>
            ))}
            <p className={`mfp-note mt-8 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/55 md:text-xl ${s.align === 'center' ? 'mx-auto' : s.align === 'right' ? 'ml-auto' : ''}`}>
              {s.note}
            </p>
          </div>
        </div>
      ))}

      {/* respiro finale prima del footer */}
      <div className="h-20 md:h-28" />
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    note: 'Riduciamo l’attrito della decodifica: il messaggio arriva fluido, e resta.',
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
    note: 'Prima l’identità, poi lo strumento. Mai il contrario.',
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
    note: 'L’eccellenza non può dipendere dall’ispirazione del momento: l’abbiamo trasformata in protocollo.',
    align: 'center',
    tilt: 0,
  },
  {
    lines: [
      { t: 'Difendiamo le aziende', style: 'fill' },
      { t: 'dal rischio di apparire', style: 'fill' },
      { t: 'mediocri.', style: 'gradient' },
    ],
    note: 'Il low cost a tutti i costi è un lento sabotaggio d’immagine. Noi siamo lo scudo.',
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
    note: 'Il dietro le quinte è nostro. Al cliente restano le decisioni chiare e il risultato finito.',
    align: 'right',
    tilt: -1,
  },
] as const;

const styleFor = (style: string) =>
  style === 'outline'
    ? { color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }
    : style === 'gradient'
      ? undefined /* usa la classe text-gradient-flow */
      : { color: '#f8f9fa' };

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
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
          <span className="block overflow-hidden py-[0.03em]">
            <span className="mf-hero-line voice-display text-gradient-flow block text-[15vw] leading-[0.88] md:text-[11vw]">eye.</span>
          </span>
        </h1>
        <p className="mf-hero-line mt-10 max-w-lg font-jakarta text-base font-medium leading-relaxed text-white/50 md:text-lg">
          Il nostro nome è la nostra tesi: il piacere per gli occhi non è un fine artistico — è un parametro di efficacia. Quello che segue è ciò in cui crediamo.
        </p>
      </div>

      {/* ------- statements ------- */}
      {STATEMENTS.map((s, i) => (
        <div
          key={i}
          className={`mfp-statement relative flex min-h-[85vh] flex-col justify-center px-5 py-20 md:px-10 ${
            s.align === 'right' ? 'items-end text-right' : s.align === 'center' ? 'items-center text-center' : 'items-start'
          }`}
          data-tilt={s.tilt}
        >
          <div>
            {s.lines.map((l, j) => (
              <span key={j} className="block overflow-hidden py-[0.03em]">
                <span
                  className={`mfp-line voice-display block leading-[0.92] ${l.style === 'gradient' ? 'text-gradient-flow' : ''}`}
                  style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7rem)', ...styleFor(l.style) }}
                >
                  {l.t}
                </span>
              </span>
            ))}
            <p className={`mfp-note mt-8 max-w-md font-jakarta text-sm font-medium leading-relaxed text-white/45 md:text-base ${s.align === 'center' ? 'mx-auto' : s.align === 'right' ? 'ml-auto' : ''}`}>
              {s.note}
            </p>
          </div>
        </div>
      ))}

      {/* ------- chiusura ------- */}
      <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-5 pb-32 text-center">
        <p className="voice-display text-3xl md:text-5xl">
          Questo è il <span className="text-gradient-flow">Gleeye Way</span>.
        </p>
        <a
          href="/metodo"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/20 px-10 py-5 font-satoshi text-xs font-black uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/60"
        >
          Guarda come lo mettiamo a terra <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

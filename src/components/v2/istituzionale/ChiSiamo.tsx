'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPITOLI = [
  {
    ghost: 'CHI',
    label: 'Chi siamo',
    accent: '#8257e6',
    text: "Un team multidisciplinare progettato per la sintesi. Uniamo visione strategica e capacità esecutiva per offrire un interlocutore unico a chi ha bisogno di trasformare un'idea in un progetto solido.",
    align: 'left',
  },
  {
    ghost: 'COSA',
    label: 'Cosa facciamo',
    accent: '#4e92d8',
    text: "Trasformiamo necessità in asset tangibili. Gestiamo ogni fase della comunicazione: dal branding al posizionamento, dallo sviluppo dell'infrastruttura digitale alla produzione di contenuti originali.",
    align: 'right',
  },
  {
    ghost: 'COME',
    label: 'Come lo facciamo',
    accent: '#8257e6',
    text: "Con un metodo che elimina l'incertezza. Presidiamo ogni passaggio — dalla strategia alla messa a terra — garantendo che ogni investimento si traduca in un valore reale, senza dispersioni.",
    align: 'left',
  },
  {
    ghost: 'PER CHI',
    label: 'Per chi lavoriamo',
    accent: '#4e92d8',
    text: 'Realtà, organizzazioni e professionisti che cercano solidità. Ci rivolgiamo a chi vuole un partner operativo capace di governare la complessità, non solo di descriverla.',
    align: 'right',
  },
];

export default function ChiSiamo() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Su touch: niente scrub scroll-triggered (su iOS post-navigazione
         misurano male e lascerebbero le parole a opacity 0.08 / ghost vuoto).
         Portiamo tutto allo stato finale, teniamo solo l'intro della hero. */
      if (isTouchDevice()) {
        gsap.set('.cs-word', { opacity: 1 });
        gsap.set('.cs-ghost-fill', { clipPath: 'inset(0% 0 0 0)' });
        gsap.set('.cs-thread', { scaleY: 1 });
        gsap.from('.cs-hero-line', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 });
        return;
      }

      /* hero */
      gsap.from('.cs-hero-line', {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2,
      });

      /* filo verticale che cuce i capitoli */
      gsap.fromTo('.cs-thread', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.cs-chapters', start: 'top 60%', end: 'bottom 80%', scrub: 0.6 },
      });

      /* per ogni capitolo: parola gigante che si riempie + testo parola per parola */
      gsap.utils.toArray<HTMLElement>('.cs-chapter', root).forEach((ch) => {
        const fill = ch.querySelector('.cs-ghost-fill');
        gsap.fromTo(fill,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: { trigger: ch, start: 'top 75%', end: 'center 45%', scrub: 0.5 },
          },
        );
        gsap.fromTo(ch.querySelectorAll('.cs-word'), { opacity: 0.08 }, {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: { trigger: ch, start: 'top 62%', end: 'center 42%', scrub: 0.5 },
        });
        /* la parola gigante deriva lateralmente: profondità */
        gsap.fromTo(ch.querySelector('.cs-ghost'),
          { x: ch.dataset.align === 'right' ? 60 : -60 },
          {
            x: ch.dataset.align === 'right' ? -40 : 40,
            ease: 'none',
            scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* ------- hero ------- */}
      <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
        <div className="pointer-events-none absolute right-[-15%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-[#614aa2]/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[5%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#4e92d8]/15 blur-[130px]" />

        <h1 className="relative">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="cs-hero-line voice-display block text-[9.5vw] leading-[0.95] md:text-[9vw]">
              Un interlocutore.
            </span>
          </span>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="cs-hero-line voice-display text-gradient-flow block text-[9.5vw] leading-[0.95] md:text-[9vw]">
              Tutte le risposte.
            </span>
          </span>
        </h1>
        <div className="cs-hero-line mt-10 max-w-xl border-l-2 border-[#4e92d8]/50 pl-6">
          <p className="font-jakarta text-base font-medium leading-relaxed text-white/50 md:text-lg">
            Quattro domande bastano per capire con chi stai parlando. Le stesse che faresti tu — con le risposte che diamo a tutti, prima ancora che ce le chiedano.
          </p>
        </div>
      </div>

      {/* ------- capitoli ------- */}
      <div className="cs-chapters relative">
        {/* filo che cuce */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.06] md:block">
          <div className="cs-thread h-full w-full origin-top bg-gradient-to-b from-[#8257e6] via-[#4e92d8] to-[#8257e6] opacity-60" style={{ transform: 'scaleY(0)' }} />
        </div>

        {CAPITOLI.map((c) => (
          <div
            key={c.ghost}
            data-align={c.align}
            className="cs-chapter relative flex min-h-[58vh] items-center overflow-hidden px-5 py-16 md:min-h-[90vh] md:py-24 md:px-10"
          >
            {/* parola gigante: contorno + riempimento gradiente che sale */}
            <div
              className={`cs-ghost pointer-events-none absolute top-1/2 -translate-y-1/2 select-none whitespace-nowrap ${
                c.align === 'right' ? 'right-[-2%]' : 'left-[-2%]'
              }`}
              aria-hidden="true"
            >
              <span className="voice-display relative block leading-none" style={{ fontSize: 'clamp(7rem, 22vw, 24rem)' }}>
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.13)' }}>{c.ghost}</span>
                <span
                  className="cs-ghost-fill absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${c.accent}, #4e92d8)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    clipPath: 'inset(100% 0 0 0)',
                    opacity: 0.55,
                  }}
                >
                  {c.ghost}
                </span>
              </span>
            </div>

            {/* testo */}
            <div className={`relative w-full md:w-1/2 ${c.align === 'right' ? '' : 'md:ml-auto'}`}>
              <p className="voice-mono mb-6" style={{ color: c.accent }}>
                {c.label}
              </p>
              <p className="font-satoshi text-2xl font-black leading-snug tracking-tight md:text-4xl">
                {c.text.split(' ').map((w, j) => (
                  <span key={j} className="cs-word inline-block" style={{ marginRight: '0.28em' }}>
                    {w}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ------- chiusura ------- */}
      <div className="relative px-5 pb-32 pt-10 text-center md:px-10">
        <p className="font-jakarta text-base font-medium text-white/40">La quinta domanda falla di persona.</p>
        <a
          href="/contatti"
          className="mt-8 inline-flex items-center gap-3 rounded-full px-10 py-5 font-satoshi text-xs font-black uppercase tracking-[0.2em] text-white"
          style={{ background: 'linear-gradient(120deg, #8257e6, #4e92d8)' }}
        >
          Parliamone <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

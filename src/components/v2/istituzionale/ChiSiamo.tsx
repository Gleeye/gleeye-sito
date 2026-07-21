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
    accent: '#614aa2',
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
    accent: '#614aa2',
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
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;

    const ctx = gsap.context(() => {
      /* Stato iniziale della sequenza hero: all'inizio si vede solo "Piacere,",
         le altre parole entrano dopo (dal basso). */
      gsap.set(['.cs-n', '.cs-s', '.cs-g'], { opacity: 0, yPercent: 90 });

      /* Su touch: niente pin (su iOS blocca/desincronizza lo scroll) né scrub.
         La sequenza hero parte in autoplay al load; i capitoli allo stato finale. */
      if (isTouchDevice()) {
        gsap.set('.cs-word', { opacity: 1 });
        gsap.set('.cs-ghost-fill', { clipPath: 'inset(0% 0 0 0)' });
        gsap.set('.cs-thread', { scaleY: 1 });
        gsap.set('.cs-p', { scale: 1.7, y: () => -window.innerHeight * 0.06, transformOrigin: '50% 50%' });
        gsap.timeline({ delay: 0.25 })
          .to('.cs-p', { scale: 1, y: 0, duration: 1.2, ease: 'power2.inOut' })
          .to('.cs-n', { opacity: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15')
          .to('.cs-s', { opacity: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
          .to('.cs-g', { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
        return;
      }

      /* Desktop: hero pinnata. "Piacere," è GIGANTE — alto quanto lo schermo —
         e all'inizio se ne vede solo l'inizio; scrollando STRISCIA in orizzontale
         rivelando tutta la parola, poi si rimpicciolisce nella posizione finale
         ed entrano NOI, SIAMO, Gleeye. Misuriamo la parola a runtime (font vw)
         per calcolare scala e corsa orizzontale a ogni refresh. */
      const measureNat = () => {
        const el = root.querySelector<HTMLElement>('.cs-p');
        if (!el?.parentElement) return { w: 0, h: 1 };
        const clone = el.cloneNode(true) as HTMLElement;
        Object.assign(clone.style, { transform: 'none', position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', left: '0', top: '0' });
        el.parentElement.appendChild(clone);
        const r = clone.getBoundingClientRect();
        clone.remove();
        return { w: r.width, h: r.height || 1 };
      };
      let nat = measureNat();
      const bigScale = () => Math.max(1, (window.innerHeight * 0.9) / nat.h);
      const halfOver = () => (nat.w * bigScale() - window.innerWidth) / 2 + window.innerWidth * 0.05;

      gsap.set('.cs-p', { transformOrigin: '50% 50%', scale: bigScale, x: halfOver, y: () => nat.h * 1.5 });
      gsap.timeline({
        scrollTrigger: {
          trigger: hero, start: 'top top', end: '+=440%', pin: true, scrub: 0.6, anticipatePin: 1,
          invalidateOnRefresh: true, onRefresh: () => { nat = measureNat(); },
        },
      })
        .to('.cs-p', { x: () => -halfOver(), ease: 'none', duration: 2 })
        .to('.cs-p', { scale: 1, x: 0, y: 0, ease: 'power2.inOut', duration: 1.3 })
        .to('.cs-n', { opacity: 1, yPercent: 0, ease: 'power3.out', duration: 0.8 }, '>-0.1')
        .to('.cs-s', { opacity: 1, yPercent: 0, ease: 'power3.out', duration: 0.8 }, '>-0.05')
        .to('.cs-g', { opacity: 1, yPercent: 0, ease: 'power3.out', duration: 1.0 }, '>-0.05')
        .to({}, { duration: 0.5 });

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

      {/* ------- hero: sequenza "Piacere, noi siamo Gleeye." guidata dallo scroll ------- */}
      <div ref={heroRef} className="relative h-svh overflow-hidden">
        <div className="pointer-events-none absolute right-[-15%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-[#614aa2]/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[5%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#4e92d8]/15 blur-[130px]" />

        <h1 className="voice-display absolute inset-0 flex flex-col items-center justify-center gap-y-1 px-5 text-center leading-[0.88]">
          <span className="cs-p block whitespace-nowrap text-[13vw] will-change-transform md:text-[8.5vw]">Piacere,</span>
          <span className="cs-n block text-[13vw] will-change-transform md:text-[8.5vw]">noi</span>
          <span className="cs-s block text-[13vw] will-change-transform md:text-[8.5vw]">siamo</span>
          <span className="cs-g block font-playfair text-gradient text-[15vw] font-medium normal-case italic leading-[1.08] will-change-transform md:text-[9.5vw] pb-[0.16em]">Gleeye.</span>
        </h1>
      </div>

      {/* ------- capitoli ------- */}
      <div className="cs-chapters relative">
        {/* filo che cuce */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.06] md:block">
          <div className="cs-thread h-full w-full origin-top bg-gradient-to-b from-[#614aa2] via-[#4e92d8] to-[#614aa2] opacity-60" style={{ transform: 'scaleY(0)' }} />
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
            <div className={`relative w-full md:w-1/2 ${c.align === 'right' ? 'md:pr-16' : 'md:ml-auto md:pl-16'}`}>
              <p
                className="voice-mono mb-6"
                style={{ backgroundImage: 'linear-gradient(100deg, #6db5ff, #9b7bff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
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

      {/* respiro finale prima del footer (il contatto vive già nel footer) */}
      <div className="h-16 md:h-24" />
    </section>
  );
}

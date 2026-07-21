'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Accento in gradiente su fondo chiaro: blu→viola del sito, leggibile su bianco.
   backgroundImage (non la shorthand) per non azzerare il background-clip. */
const accentGrad = {
  backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

/* Parola-fantasma gigante dietro un atto: contorno tenue + riempimento in
   gradiente che sale con lo scroll. Deriva lateralmente per dare profondità. */
function Ghost({ word, side }: { word: string; side: 'left' | 'right' }) {
  return (
    <div
      className={`mv-ghost pointer-events-none absolute top-1/2 -translate-y-1/2 z-0 select-none whitespace-nowrap ${side === 'right' ? 'right-[-4%]' : 'left-[-4%]'}`}
      aria-hidden="true"
    >
      <span className="voice-display relative block leading-none" style={{ fontSize: 'clamp(5.5rem, 19vw, 20rem)' }}>
        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(10,10,16,0.05)' }}>{word}</span>
        <span
          className="mv-ghost-fill absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(160deg, #4e92d8, #614aa2)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            clipPath: 'inset(100% 0 0 0)',
            opacity: 0.14,
          }}
        >
          {word}
        </span>
      </span>
    </div>
  );
}

export default function MissionVision() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Su touch: niente scrub (su iOS post-navigazione lascerebbero parole,
         titoli e fantasmi invisibili). Stato finale + intro hero al load.
         I bagliori sono CSS e comunque nascosti su mobile dal GPU-diet. */
      if (isTouchDevice()) {
        gsap.set('.mv-word', { opacity: 1 });
        gsap.set('.mv-act-title', { opacity: 1, y: 0 });
        gsap.set('.mv-ghost-fill', { clipPath: 'inset(0% 0 0 0)' });
        gsap.from('.mv-hero-line', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 });
        return;
      }

      gsap.from('.mv-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out', delay: 0.2,
      });

      /* per ogni atto: fantasma che si riempie + deriva laterale (parallax) */
      gsap.utils.toArray<HTMLElement>('.mv-act', root).forEach((act) => {
        const side = act.dataset.side;
        gsap.fromTo(act.querySelector('.mv-ghost-fill'),
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', ease: 'none', scrollTrigger: { trigger: act, start: 'top 80%', end: 'center 45%', scrub: 0.5 } },
        );
        gsap.fromTo(act.querySelector('.mv-ghost'),
          { x: side === 'right' ? 70 : -70 },
          { x: side === 'right' ? -50 : 50, ease: 'none', scrollTrigger: { trigger: act, start: 'top bottom', end: 'bottom top', scrub: 1 } },
        );
      });

      /* testi: parola per parola */
      gsap.utils.toArray<HTMLElement>('.mv-body', root).forEach((b) => {
        gsap.fromTo(b.querySelectorAll('.mv-word'), { opacity: 0.12 }, {
          opacity: 1, stagger: 0.03, ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 78%', end: 'center 45%', scrub: 0.5 },
        });
      });

      /* titoli d'atto: reveal dal basso con wipe */
      gsap.utils.toArray<HTMLElement>('.mv-act-title', root).forEach((t) => {
        gsap.fromTo(t,
          { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: t, start: 'top 85%', once: true } },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const missionBody =
    "Il mercato è saturo di rumore visivo. La nostra missione è ripristinare l'ordine: comunicazione che non chiede sforzo a chi la riceve, bellezza intesa come cortesia verso chi guarda — non come decorazione. Ogni asset che produciamo deve smettere di essere una voce di spesa e diventare patrimonio dell'azienda.";
  const visionBody =
    "Lavoriamo per un'economia in cui nessuna buona impresa appaia mediocre per colpa della propria comunicazione. Dove ogni azienda possa presentarsi per ciò che vale davvero — e il lavoro fatto bene torni a essere lo standard, non l'eccezione.";

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] text-[#0a0a10]">

      {/* bagliori ambientali: colore vivo ma tenue sul bianco (nascosti su mobile) */}
      <div className="mv-glow pointer-events-none absolute -left-[12%] top-[10%] h-[46vw] w-[46vw] rounded-full opacity-[0.12] blur-[130px]" style={{ background: '#4e92d8', animation: 'mv-drift-a 20s ease-in-out infinite' }} />
      <div className="mv-glow pointer-events-none absolute right-[-14%] top-[48%] h-[42vw] w-[42vw] rounded-full opacity-[0.12] blur-[140px]" style={{ background: '#614aa2', animation: 'mv-drift-b 26s ease-in-out infinite' }} />
      <div className="mv-glow pointer-events-none absolute bottom-[2%] left-[18%] h-[34vw] w-[34vw] rounded-full opacity-[0.10] blur-[120px]" style={{ background: '#4e92d8', animation: 'mv-drift-a 23s ease-in-out infinite 3s' }} />

      {/* ------- hero ------- */}
      <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
        <h1 className="relative">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mv-hero-line voice-display block text-[13vw] leading-[0.9] md:text-[9vw]">Dove siamo</span>
          </span>
          <span className="block overflow-hidden text-[13vw] leading-[0] pb-[0.22em] md:text-[9vw]">
            <span className="mv-hero-line voice-display block leading-[1.05]">
              diretti,{' '}
              <span
                className="inline-block align-baseline font-playfair font-medium normal-case italic leading-none pb-[0.34em] -mb-[0.3em]"
                style={accentGrad}
              >
                e perché.
              </span>
            </span>
          </span>
        </h1>
        <p className="mv-hero-line mt-10 max-w-md font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
          La missione è il lavoro di ogni giorno. La visione è il punto all&apos;orizzonte.
        </p>
      </div>

      {/* ------- atto I: la missione ------- */}
      <div className="mv-act relative overflow-hidden px-5 py-24 md:px-10 md:py-40" data-side="right">
        <Ghost word="MISSIONE" side="right" />
        <div className="relative z-10">
          <p className="voice-mono mb-8 text-black/40">La missione</p>
          <h2 className="mv-act-title voice-display max-w-5xl text-4xl leading-[1.02] md:text-7xl">
            Ridurre l&apos;attrito tra ciò che <span style={accentGrad}>vali</span> e ciò che si <span style={accentGrad}>vede</span>.
          </h2>
          <p className="mv-body mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight md:ml-[26%] md:text-3xl">
            {missionBody.split(' ').map((w, i) => (
              <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
            ))}
          </p>
        </div>
      </div>

      {/* ------- separatore ------- */}
      <div className="relative z-10 mx-5 border-t border-black/[0.08] md:mx-10" />

      {/* ------- atto II: la visione ------- */}
      <div className="mv-act relative overflow-hidden px-5 py-24 pb-32 md:px-10 md:py-40" data-side="left">
        <Ghost word="VISIONE" side="left" />
        <div className="relative z-10">
          <p className="voice-mono mb-8 text-black/40">La visione</p>
          <h2 className="mv-act-title voice-display max-w-5xl text-4xl leading-[1.02] md:ml-[18%] md:text-7xl">
            Un mercato dove la forma non tradisce più il <span style={accentGrad}>valore</span>.
          </h2>
          <p className="mv-body mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight md:ml-[18%] md:text-3xl">
            {visionBody.split(' ').map((w, i) => (
              <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
            ))}
          </p>

          <div className="mt-24 border-t border-black/[0.08] pt-10">
            <p className="font-jakarta text-sm font-medium text-black/50">
              Il tragitto tra i due punti è il nostro{' '}
              <a href="/metodo" className="font-semibold text-[#0a0a10] underline decoration-[#4e92d8] underline-offset-4">metodo</a>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mv-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(5vw,-4vh) scale(1.08); } }
        @keyframes mv-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-6vw,5vh) scale(1.1); } }
      `}</style>
    </section>
  );
}

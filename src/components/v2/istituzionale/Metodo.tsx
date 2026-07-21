'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ————————————————————————————————————————————————————————————————
   CONCEPT — "La linea".
   Un filo aggrovigliato attraversa lo schermo e, scrollando, si srotola
   fino a diventare una retta. I testi vivono SOLO sopra la linea: tutto
   ciò che sta sotto la sua quota è tagliato via (clip), in discesa e in
   risalita. Alla chiusura la linea mobile si scambia con una linea REALE
   nel flusso della pagina, ferma sotto "una linea retta." — da lì non
   può più sparire: è contenuto, scrolla con la pagina.
   ———————————————————————————————————————————————————————————————— */

const FASI = [
  {
    num: '01',
    label: 'Analisi del bisogno',
    tesi: { plain: 'Ogni progetto comincia con', accent: 'una domanda scomoda.' },
    body: 'Cosa serve davvero — e cosa è solo rumore? Scaviamo dietro la richiesta fino alla necessità reale. Prima di produrre qualsiasi cosa, mettiamo a fuoco il problema.',
  },
  {
    num: '02',
    label: 'Strategia',
    tesi: { plain: 'La rotta si disegna', accent: 'prima di salpare.' },
    body: 'Posizionamento, identità, priorità: un sistema in cui ogni scelta sostiene le altre. Niente pezzi separati — ogni investimento sa dove sta andando.',
  },
  {
    num: '03',
    label: 'Produzione',
    tesi: { plain: 'La strategia diventa', accent: 'materia.' },
    body: 'Video, siti, contenuti, campagne. La factory trasforma la rotta in asset finiti: tempi certi, standard costante, zero dipendenza dall’ispirazione del momento.',
  },
  {
    num: '04',
    label: 'Presidio',
    tesi: { plain: 'Il risultato va difeso,', accent: 'ogni giorno.' },
    body: 'Ogni uscita resta coerente, ogni fornitore allineato, ogni dettaglio sotto controllo. Il valore costruito non si disperde: si consolida.',
  },
];

/* Corsivo gradiente del sito, ricetta inline-block anti-taglio discendenti. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gradient inline-block align-baseline font-playfair italic font-medium normal-case leading-[1.05] pb-[0.18em] -mb-[0.14em] pr-[0.04em]">
      {children}
    </span>
  );
}

const LINE_QUOTA = 0.78; /* quota della linea in viewport */

export default function Metodo() {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const parkRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const world = worldRef.current;
    const parkEl = parkRef.current;
    if (!root || !svg || !path || !world || !parkEl) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let worldTop = 0;
    let worldH = 1;
    let parked = false;
    const N = 420;

    const measure = () => {
      const sy = window.scrollY;
      worldTop = world.getBoundingClientRect().top + sy;
      worldH = world.offsetHeight;
    };

    /* i testi vivono solo sopra la linea: taglia tutto ciò che sta sotto */
    const clipNow = () => {
      if (parked) return;
      const cut = window.scrollY + H * LINE_QUOTA - worldTop;
      world.style.clipPath = `inset(0px 0px ${Math.max(0, worldH - cut).toFixed(0)}px 0px)`;
    };

    /* lo scambio: linea mobile ↔ linea reale in flusso (stessa quota a schermo) */
    const swap = (toParked: boolean) => {
      parked = toParked;
      svg.style.display = toParked ? 'none' : '';
      parkEl.style.opacity = toParked ? '1' : '0';
      if (toParked) world.style.clipPath = 'none';
      else clipNow();
    };

    const draw = (p: number) => {
      progressRef.current = p;
      /* filo aggrovigliato → retta: curva PARAMETRICA, non y(x). Quando
         l'ampiezza è alta la x oscilla anche all'indietro e il filo si
         avvolge su sé stesso (riccioli sovrapposti); calando, si srotola. */
      const amp = H * 0.14 * Math.pow(1 - p, 1.6);
      const base = H * LINE_QUOTA;
      const span = W + 40;
      let d = '';
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const cx = Math.sin(t * 29 + 1.3) * 0.55 + Math.sin(t * 13.7 + 4.1) * 0.45;
        const cy = Math.cos(t * 23 + 0.7) * 0.5 + Math.sin(t * 31.3 + 2.9) * 0.35 + Math.sin(t * 7.9) * 0.15;
        const x = -20 + t * span + cx * amp * 1.2;
        const y = base + cy * amp;
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      path.setAttribute('d', d);
      clipNow();
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      measure();
      draw(progressRef.current);
    };
    window.addEventListener('resize', onResize);
    measure();
    /* rimisura quando i font sono pronti: il layout si assesta */
    const remeasure = window.setTimeout(() => {
      measure();
      draw(progressRef.current);
    }, 700);

    const ctx = gsap.context(() => {
      /* entrata hero: le righe salgono dalla maschera con una leggera
         inclinazione che si raddrizza (il tema della pagina, in piccolo),
         il sottotitolo si svela con un wipe da sinistra */
      gsap.timeline({ delay: 0.15 })
        .from('.mt-hero-line', {
          yPercent: 120, skewY: 5, transformOrigin: '0% 100%',
          duration: 1.3, stagger: 0.14, ease: 'power4.out',
        })
        .fromTo('.mt-hero-sub',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' },
          '-=0.65');

      /* Anche su touch: niente pin qui, solo scrub e trigger — lo scroll
         nativo li guida e lo swap parcheggia la retta come su desktop. */

      draw(0);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => draw(self.progress),
      });

      /* I testi appartengono al mondo SOPRA la linea: oltre al clip continuo,
         ogni fase entra in sequenza quando attraversa la quota della linea
         e fa il percorso inverso se torna sotto. */
      gsap.utils.toArray<HTMLElement>('.mt-fase', root).forEach((fase) => {
        const num = fase.querySelector('.mt-f-num');
        const label = fase.querySelector('.mt-f-label');
        const tesi = fase.querySelector('.mt-f-tesi');
        const body = fase.querySelector('.mt-f-body');
        gsap.set(num, { opacity: 0, y: 44, scale: 0.94 });
        gsap.set(label, { opacity: 0, x: -24 });
        gsap.set(tesi, { yPercent: 115 });
        gsap.set(body, { opacity: 0, y: 26 });
        const tl = gsap.timeline({ paused: true })
          .to(num, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' })
          .to(label, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.55')
          .to(tesi, { yPercent: 0, duration: 1.1, ease: 'power4.out' }, '-=0.45')
          .to(body, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
        ScrollTrigger.create({
          trigger: fase,
          start: `top ${LINE_QUOTA * 100}%`,
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });
      });

      /* chiusura: emerge attraversando la linea */
      const closeLines = gsap.utils.toArray<HTMLElement>('.mt-close-line', root);
      gsap.set(closeLines, { yPercent: 115 });
      const closeTl = gsap.timeline({ paused: true })
        .to(closeLines, { yPercent: 0, duration: 1.2, stagger: 0.14, ease: 'power4.out' });
      ScrollTrigger.create({
        trigger: '.mt-close',
        start: `top ${LINE_QUOTA * 100}%`,
        onEnter: () => closeTl.play(),
        onLeaveBack: () => closeTl.reverse(),
      });

      /* lo scambio: quando la linea reale raggiunge la quota della linea
         mobile, le due coincidono a schermo — swap istantaneo, invisibile.
         Da lì la retta è contenuto in flusso: non può più sparire. */
      ScrollTrigger.create({
        trigger: parkEl,
        start: `top ${LINE_QUOTA * 100}%`,
        onEnter: () => swap(true),
        onLeaveBack: () => swap(false),
      });
    }, root);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(remeasure);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* ————— la linea mobile: dal groviglio alla retta ————— */}
      <svg ref={svgRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mtLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6db5ff" />
            <stop offset="100%" stopColor="#9b7bff" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#mtLine)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.7"
          style={{ filter: 'drop-shadow(0 0 8px rgba(109,181,255,0.35))' }}
        />
      </svg>

      {/* ————— il mondo sopra la linea (clippato alla sua quota) ————— */}
      <div ref={worldRef} className="relative z-10" style={{ willChange: 'clip-path' }}>

        {/* hero */}
        <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
          <h1>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="mt-hero-line voice-display block text-[12vw] leading-[0.92] md:text-[8.5vw]">Il caos non è</span>
            </span>
            <span className="block overflow-hidden pt-[0.03em] pb-[0.2em]">
              <span className="mt-hero-line text-gradient block w-fit font-playfair italic font-medium normal-case leading-[1.02] tracking-[-0.01em] pb-[0.14em] pr-[0.05em] text-[13vw] md:text-[9vw]">
                un metodo.
              </span>
            </span>
          </h1>
          <p className="mt-hero-sub mt-8 max-w-xl font-jakarta text-lg font-medium leading-relaxed text-white/55 md:text-xl">
            Quattro fasi, una direzione. Ogni progetto entra come una domanda ed esce come una certezza.
          </p>
        </div>

        {/* le quattro fasi */}
        {FASI.map((f, i) => (
          <div
            key={f.num}
            className="relative flex min-h-[70vh] items-center px-5 py-16 md:min-h-[85vh] md:px-10 md:py-24"
          >
            <div className={`mt-fase w-full max-w-2xl ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
              <span
                className="mt-f-num voice-display block text-7xl leading-none md:text-9xl"
                style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
              >
                {f.num}
              </span>
              <p className="mt-f-label voice-mono mb-6 mt-5 text-white/40">{f.label}</p>
              {/* maschera con pb generoso (discendenti dell'accento) compensato dal -mb */}
              <span className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
                <h2 className="mt-f-tesi voice-display text-3xl leading-[1.08] md:text-5xl">
                  {f.tesi.plain} <Accent>{f.tesi.accent}</Accent>
                </h2>
              </span>
              <p className="mt-f-body mt-6 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/55 md:text-xl">
                {f.body}
              </p>
            </div>
          </div>
        ))}

        {/* chiusura: il payoff — e la linea reale, ferma sotto la scritta */}
        <div className="mt-close relative flex min-h-[60vh] flex-col items-center justify-center px-5 pb-40 text-center">
          <h2 className="voice-display text-3xl leading-[1.1] md:text-6xl">
            <span className="block overflow-hidden py-[0.05em]">
              <span className="mt-close-line block">Dal primo dubbio alla consegna:</span>
            </span>
            <span className="block overflow-hidden pt-[0.03em] pb-[0.2em]">
              <span className="mt-close-line text-gradient mx-auto mt-3 block w-fit pb-[0.16em] pr-[0.05em] font-playfair italic font-medium normal-case leading-[1.05] tracking-[-0.01em]">
                una linea retta.
              </span>
            </span>
          </h2>
          <div
            ref={parkRef}
            aria-hidden="true"
            className="mt-16 h-[2px] w-screen opacity-0"
            style={{
              background: 'linear-gradient(90deg, #6db5ff, #9b7bff)',
              boxShadow: '0 0 8px rgba(109,181,255,0.35)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

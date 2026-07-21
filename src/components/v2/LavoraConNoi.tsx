'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IrisCanvas from '@/components/v2/IrisCanvas';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Un solo punto di conversione: la CTA "Invia la candidatura" del footer
   (apre il form nativo del widget ERP). Qui la pagina racconta e basta. */

const PERKS = [
  {
    title: 'Progetti veri, subito',
    text: 'Niente anni di gavetta a guardare gli altri: dal primo giorno metti le mani su brand, siti, video e campagne che vanno in scena davvero.',
  },
  {
    title: 'Uno standard che ti alza',
    text: "Il modo più veloce per diventare bravi è lavorare accanto a chi non si accontenta. Qui la qualità è un'abitudine quotidiana: il tuo livello sale di conseguenza.",
  },
  {
    title: 'Persone, non caselle',
    text: "Squadra corta, zero burocrazia interna. Un'idea buona arriva al tavolo delle decisioni in un pomeriggio — chiunque l'abbia avuta.",
  },
  {
    title: 'Tutti i mestieri, una stanza',
    text: 'Strategia, design, video, digital: discipline che altrove non si parlano, qui lavorano gomito a gomito. Impari per osmosi, ogni singolo giorno.',
  },
];

const FIGURE = [
  'Designer',
  'Videomaker',
  'Fotografo',
  'Copywriter',
  'Social media manager',
  'Developer',
  'Strategist',
];

const SKILLS_A = [
  'Branding',
  'Motion design',
  'SEO',
  'UX/UI',
  'Podcast',
  'Color grading',
  'Advertising',
  'Illustrazione',
  '3D',
];

const SKILLS_B = [
  'Sound design',
  'AI workflow',
  'Analytics',
  'Direzione creativa',
  'E-commerce',
  'Naming',
  'Editing video',
  'Project management',
];

export default function LavoraConNoi() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* hero: righe che salgono dalla maschera */
      gsap.from('.lcn-hero-line', {
        yPercent: 110,
        duration: 1.25,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.15,
      });
      gsap.from('.lcn-hero-sub', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.65,
      });

      /* reveal robusti: set + onEnter (mai from+scrollTrigger) */
      const reveal = (targets: string, stagger = 0.1) => {
        const els = gsap.utils.toArray<HTMLElement>(targets, root);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: 44 });
        els.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () =>
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: (i % 2) * stagger,
                ease: 'power3.out',
              }),
          });
        });
      };
      reveal('.lcn-head');
      reveal('.lcn-figura', 0.06);
      reveal('.lcn-outro');

      /* perk: il filo sopra si tende, il titolo esce dalla maschera,
         il testo si accende parola per parola mentre scorri */
      gsap.utils.toArray<HTMLElement>('.lcn-perk', root).forEach((row) => {
        const line = row.querySelector('.lcn-perk-line');
        const title = row.querySelector('.lcn-perk-title');

        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(title, { yPercent: 115 });
        ScrollTrigger.create({
          trigger: row,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(line, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' });
            gsap.to(title, { yPercent: 0, duration: 1, delay: 0.15, ease: 'power4.out' });
          },
        });

        gsap.fromTo(
          row.querySelectorAll('.lcn-word'),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.03,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 78%', end: 'top 35%', scrub: 0.5 },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ——— HERO — riempie esattamente la prima schermata ——— */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-[#0a0a10] px-5 py-20 text-[#f8f9fa] md:min-h-[calc(100svh-5rem)] md:px-10">
        {/* Iride liquida (WebGL riusabile), tinta brand come la home. Full-bleed
            su mobile, pesata a destra da md in su (il claim sta a sinistra). */}
        <div className="absolute inset-0 md:left-auto md:w-[72%] lg:w-[64%]">
          <IrisCanvas color1="#6db5ff" color2="#9b7bff" zoom={1.2} className="h-full w-full" />
        </div>
        {/* Overlay leggibilità: da md velo da sinistra; su mobile scrim in basso
            (il centro scuro dell'iride regge il titolo, come in home). */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0a0a10] via-[#0a0a10]/85 to-[#0a0a10]/25 md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a10]/30 via-transparent to-[#0a0a10]/85 md:hidden" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="lcn-hero-sub voice-mono mb-8 text-white/40">
            [ Lavora con noi ]
          </p>

          <h1>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="lcn-hero-line voice-display block text-[12.5vw] leading-[0.92] md:text-[8.5vw]">
                Il lavoro bello
              </span>
            </span>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="lcn-hero-line voice-display text-gradient-flow block pb-[0.08em] text-[12.5vw] leading-[0.92] md:text-[8.5vw]">
                esiste.
              </span>
            </span>
          </h1>

          <div className="lcn-hero-sub mt-12 max-w-xl border-l-2 border-[#4e92d8]/50 pl-6">
            <p className="font-jakarta text-base font-medium leading-relaxed text-white/75 md:text-lg">
              Alzarti ogni mattina per fare la cosa che ti appassiona, accanto a
              gente con il tuo stesso fuoco dentro. Per noi lavorare è questo.
              Se per te vale lo stesso, sei nel posto giusto.
            </p>
          </div>
        </div>
      </section>

      {/* ——— COSA TI ASPETTA ——— */}
      <section className="relative overflow-hidden bg-[#F8F9FA] py-28 text-[#0a0a10] md:py-40">
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="lcn-head max-w-3xl">
            <p className="voice-mono mb-6 text-[#614aa2]">[ La vita in Gleeye ]</p>
            <h2 className="voice-display text-[11vw] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              Cosa ti aspetta
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                qui dentro.
              </span>
            </h2>
          </div>

          <div className="mt-16 md:mt-24">
            {PERKS.map((p) => (
              <div key={p.title} className="lcn-perk relative py-10 md:py-14">
                <span className="lcn-perk-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#4e92d8]/60 via-[#0a0a10]/15 to-transparent" />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.2fr] md:gap-16">
                  <span className="block overflow-hidden py-[0.06em]">
                    <h3 className="lcn-perk-title block font-satoshi text-3xl font-black uppercase leading-[1.02] tracking-tight md:text-4xl lg:text-[2.6rem]">
                      {p.title}
                    </h3>
                  </span>
                  <p className="max-w-xl font-jakarta text-lg font-medium leading-relaxed text-black/85 md:pt-1">
                    {p.text.split(' ').map((w, j) => (
                      <span key={j} className="lcn-word inline-block" style={{ marginRight: '0.26em' }}>
                        {w}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CHI CERCHIAMO ——— */}
      <section className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
        <div className="grain absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="lcn-head grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
            <div>
              <p className="voice-mono mb-6 text-white/40">[ Chi cerchiamo ]</p>
              <h2 className="voice-display text-[11vw] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                Cerchiamo mestieri.
                <br />
                <span className="text-gradient">E cerchiamo skill.</span>
              </h2>
            </div>
            <p className="max-w-md font-jakarta font-medium leading-relaxed text-white/55 md:pb-2">
              Non pubblichiamo annunci per riempire caselle: teniamo la porta
              aperta a chi vale. A volte ci serve una figura precisa, più
              spesso una competenza in più da portare dentro ai progetti.
            </p>
          </div>

          {/* Figure professionali */}
          <div className="mt-16 md:mt-20">
            <p className="voice-mono mb-6 text-white/35">[ Le figure ]</p>
            <div className="border-b border-white/10">
              {FIGURE.map((role) => (
                <div
                  key={role}
                  className="lcn-figura group border-t border-white/10 py-4 md:py-6"
                >
                  <span
                    className="voice-display relative block w-fit py-[0.1em] leading-none"
                    style={{ fontSize: 'clamp(1.55rem, 5.6vw, 4.2rem)' }}
                  >
                    <span className="text-stroke-ice transition-opacity duration-300 group-hover:opacity-0">
                      {role}
                    </span>
                    <span
                      className="text-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      {role}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill — doppio marquee */}
          <div className="mt-16 md:mt-20">
            <p className="voice-mono mb-8 px-1 text-white/35">[ Le skill che ci accendono ]</p>
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/5 bg-gradient-to-r from-[#0a0a10] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/5 bg-gradient-to-l from-[#0a0a10] to-transparent" />
          <div className="animate-marquee flex w-max gap-4 pr-4 [--marquee-speed:46s]">
            {[...SKILLS_A, ...SKILLS_A].map((s, i) => (
              <span
                key={i}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/15 px-6 py-3 font-jakarta text-sm font-semibold text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="animate-marquee-reverse flex w-max gap-4 pr-4 [--marquee-speed:54s]">
            {[...SKILLS_B, ...SKILLS_B].map((s, i) => (
              <span
                key={i}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/15 px-6 py-3 font-jakarta text-sm font-semibold text-white/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="lcn-outro mt-20 md:mt-28">
            <p className="font-jakarta text-lg font-medium text-white/55">
              Il tuo mestiere non è in lista?{' '}
              <span className="voice-serif text-xl text-white/85">
                Ancora meglio: sorprendici.
              </span>
            </p>
            <p className="voice-mono mt-4 text-white/35">
              La candidatura è qui sotto ↓
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

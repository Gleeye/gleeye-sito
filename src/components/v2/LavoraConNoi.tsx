'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/v2/Magnetic';

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
      /* hero: come gli altri hero del sito (AreaHero). Le righe salgono dalla
         maschera; clearProps sul transform perché la riga in gradiente,
         con un transform residuo, romperebbe background-clip:text in Chrome. */
      gsap.set('.lcn-hero-line', { yPercent: 120, skewY: 5 });
      gsap.set('.lcn-hero-fade', { opacity: 0, y: 24 });
      gsap
        .timeline({ delay: 0.35 })
        .to('.lcn-hero-line', {
          yPercent: 0,
          skewY: 0,
          duration: 1.3,
          stagger: 0.13,
          ease: 'power4.out',
          clearProps: 'transform',
        })
        .to('.lcn-hero-fade', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
        }, '-=0.8');

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
      {/* ——— HERO — stesso impianto degli hero del sito (AreaHero) ———
          min-h-svh e sfondo full-bleed sotto l'header trasparente: il padding
          per l'header sta nel contenuto (pt-32), non sul <main>, così in cima
          non resta la striscia nera. */}
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#0a0a10] px-5 pb-20 pt-32 text-[#f8f9fa] md:px-10 md:pt-36">
        <div className="grain absolute inset-0" />
        <div className="pointer-events-none absolute right-[-15%] top-[8%] h-[60vh] w-[60vh] rounded-full bg-[#614aa2]/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[4%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#4e92d8]/15 blur-[130px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="lcn-hero-fade voice-mono mb-6">
            <span
              className="inline-block"
              style={{
                backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Lavora con noi
            </span>
          </p>

          <h1 className="voice-display max-w-none">
            <span className="block overflow-hidden">
              <span className="lcn-hero-line block text-[8.5vw] leading-[1.02] md:text-[min(7vw,5.6rem)]">
                Il lavoro bello
              </span>
            </span>
            {/* Corsivo in gradiente come le altre pagine (font-playfair italic).
                w-fit: il gradiente si estende sul testo, non sul blocco.
                pb per non tagliare i discendenti col background-clip:text. */}
            <span className="block overflow-hidden">
              <span className="lcn-hero-line text-gradient block w-fit pb-[0.18em] pr-[0.08em] font-playfair italic font-medium normal-case leading-[1.12] tracking-[-0.01em] text-[13vw] md:text-[min(9vw,7rem)]">
                esiste.
              </span>
            </span>
          </h1>

          <p className="lcn-hero-fade mt-8 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/60 md:text-lg">
            Alzarti ogni mattina per fare la cosa che ti appassiona, accanto a
            gente con il tuo stesso fuoco dentro. Per noi lavorare è questo.
            Se per te vale lo stesso, sei nel posto giusto.
          </p>

          {/* Porta alla candidatura (unico CTA, in fondo, id="parliamone").
              Stesso pattern delle altre hero: Link hash con scroll={false}, la
              planata la fa SmoothScroll via Lenis. */}
          <div className="lcn-hero-fade mt-10">
            <Magnetic strength={0.25}>
              <Link
                href="#parliamone"
                scroll={false}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
              >
                <span
                  className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                  style={{ background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }}
                />
                <span className="relative transition-colors duration-500 group-hover:text-white">
                  Candidati
                </span>
                <span className="relative transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden>
                  ↓
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ——— COSA TI ASPETTA ——— */}
      <section className="relative overflow-hidden bg-[#F8F9FA] py-28 text-[#0a0a10] md:py-40">
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="lcn-head max-w-3xl">
            <p className="voice-mono mb-6 text-[#614aa2]">La vita in Gleeye</p>
            <h2 className="voice-display text-[11vw] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              Cosa ti aspetta
              <br />
              {/* Payoff in corsivo + gradiente come l'hero. Su fondo chiaro il
                  gradiente è anchor blue→purple (il fluo sbiadirebbe). pb: i
                  discendenti (q, p) non vengono tagliati dal clip:text. */}
              <span
                className="inline-block pb-[0.16em] font-playfair text-[1.12em] font-medium italic normal-case leading-[1.05] tracking-[-0.01em]"
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
              <p className="voice-mono mb-6 text-white/40">Chi cerchiamo</p>
              <h2 className="voice-display text-[11vw] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
                Cerchiamo mestieri.
                <br />
                {/* Payoff in corsivo + gradiente fluo, come "esiste." nell'hero. */}
                <span className="text-gradient inline-block pb-[0.16em] font-playfair text-[1.12em] font-medium italic normal-case leading-[1.05] tracking-[-0.01em]">
                  E cerchiamo skill.
                </span>
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
            <p className="voice-mono mb-6 text-white/35">Le figure</p>
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
            <p className="voice-mono mb-8 px-1 text-white/35">Le skill che ci accendono</p>
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
              <span className="font-playfair text-2xl italic text-white/85">
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

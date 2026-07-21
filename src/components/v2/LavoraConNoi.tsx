'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* I CTA sono mailto:info@gleeye.eu dentro <main>: il PageWidgetOverlay li
   intercetta e apre il form nativo "Lavora con noi" assegnato dall'ERP a
   questa rotta. Con JS spento (o senza attacco) restano mailto funzionanti. */
const CANDIDATI = 'mailto:info@gleeye.eu?subject=Candidatura';

const PERKS = [
  {
    n: '01',
    title: 'Progetti veri, subito',
    text: "Niente anni di gavetta a guardare gli altri. Dal primo giorno metti le mani su brand, siti, video e campagne che vanno in scena davvero — con la tua firma sopra.",
  },
  {
    n: '02',
    title: 'Uno standard che ti alza',
    text: "Il modo più veloce per diventare bravi è lavorare accanto a chi non si accontenta. Qui la qualità è un'abitudine quotidiana: il tuo livello sale di conseguenza.",
  },
  {
    n: '03',
    title: 'Persone, non caselle',
    text: "Squadra corta, zero burocrazia interna. Un'idea buona arriva al tavolo delle decisioni in un pomeriggio — chiunque l'abbia avuta.",
  },
  {
    n: '04',
    title: 'Tutti i mestieri, una stanza',
    text: 'Strategia, design, video, digital: discipline che altrove non si parlano, qui lavorano gomito a gomito. Impari per osmosi, ogni singolo giorno.',
  },
];

const ROLES = [
  'Designer',
  'Videomaker',
  'Fotografo',
  'Copywriter',
  'Social & Digital',
  'Developer',
  'Strategist',
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
      reveal('.lcn-card', 0.12);
      reveal('.lcn-role', 0.05);
      reveal('.lcn-outro');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ——— HERO ——— */}
      <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-[#0a0a10] px-5 py-28 text-[#f8f9fa] md:px-10">
        <div className="grain absolute inset-0" />
        <div className="pointer-events-none absolute right-[-15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-[#614aa2]/25 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-[0%] left-[-12%] h-[50vh] w-[50vh] rounded-full bg-[#4e92d8]/20 blur-[140px]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <p className="lcn-hero-sub voice-mono mb-8 text-white/40">
            [ Lavora con noi ]
          </p>

          <h1>
            <span className="block overflow-hidden py-[0.05em]">
              <span className="lcn-hero-line voice-display block text-[13vw] leading-[0.92] md:text-[8.5vw]">
                Il lavoro <em className="voice-serif pr-[0.06em]">bello</em>
              </span>
            </span>
            <span className="block overflow-hidden py-[0.05em]">
              <span className="lcn-hero-line voice-display text-gradient-flow block pb-[0.08em] text-[13vw] leading-[0.92] md:text-[8.5vw]">
                esiste.
              </span>
            </span>
          </h1>

          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="lcn-hero-sub max-w-xl border-l-2 border-[#4e92d8]/50 pl-6">
              <p className="font-jakarta text-base font-medium leading-relaxed text-white/55 md:text-lg">
                Brand che restano, siti che si fanno guardare, video che fermano
                il pollice: li facciamo ogni giorno, per clienti che pretendono
                il massimo. Per continuare a farlo ci serve una cosa sola —
                gente con il fuoco dentro. Se ti riconosci, continua a leggere.
              </p>
            </div>

            <a
              href={CANDIDATI}
              className="lcn-hero-sub group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-black uppercase tracking-tight text-[#0a0a10] transition-colors duration-300 hover:bg-[#6db5ff]"
            >
              Candidati ora
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
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
              <span className="pill-word">qui dentro.</span>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-14 md:mt-24 md:grid-cols-2 md:gap-y-20">
            {PERKS.map((p) => (
              <div key={p.n} className="lcn-card border-t border-[#0a0a10]/12 pt-7">
                <div className="flex items-baseline gap-4">
                  <span className="voice-mono text-[#4e92d8]">{p.n}</span>
                  <h3 className="font-satoshi text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-lg font-jakarta font-medium leading-relaxed text-black/55 md:pl-12">
                  {p.text}
                </p>
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
                Se fai questo,
                <br />
                <span className="text-gradient">parliamone.</span>
              </h2>
            </div>
            <p className="max-w-md font-jakarta font-medium leading-relaxed text-white/55 md:pb-2">
              Non pubblichiamo annunci per riempire caselle: teniamo la porta
              aperta a chi vale. Trova il tuo mestiere e presentati — al resto
              pensiamo noi.
            </p>
          </div>

          <div className="mt-16 md:mt-20">
            {ROLES.map((role, i) => (
              <a
                key={role}
                href={`${CANDIDATI}%20—%20${encodeURIComponent(role)}`}
                className="lcn-role group flex items-center justify-between gap-4 border-t border-white/10 py-5 last:border-b md:py-7"
              >
                <span className="flex items-baseline gap-5 md:gap-8">
                  <span className="voice-mono text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="voice-display relative block py-[0.1em] leading-none"
                    style={{ fontSize: 'clamp(1.9rem, 6vw, 4.6rem)' }}
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
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="voice-mono hidden text-white/0 transition-colors duration-300 group-hover:text-white/60 md:block">
                    Candidati
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#6db5ff] md:h-8 md:w-8" />
                </span>
              </a>
            ))}
          </div>

          <div className="lcn-outro mt-16 flex flex-col items-start gap-5 md:mt-24 md:flex-row md:items-center md:justify-between">
            <p className="font-jakarta text-lg font-medium text-white/55">
              Il tuo mestiere non è in lista?{' '}
              <span className="voice-serif text-xl text-white/85">
                Ancora meglio: sorprendici.
              </span>
            </p>
            <a
              href={`${CANDIDATI}%20libera`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 font-satoshi text-xs font-black uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#f8f9fa] hover:text-[#0a0a10]"
            >
              Candidatura libera
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

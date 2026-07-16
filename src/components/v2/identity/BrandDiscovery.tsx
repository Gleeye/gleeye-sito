'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AreaBackdrop from '../area/AreaBackdrop';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT = '#9b7bff';
const BLUE = '#6db5ff';
const PURPLE = '#614aa2';

const SIGNALS = [
  "L'immagine della tua azienda non rende quello che vali davvero.",
  'Stai per lanciare o rilanciare e non vuoi ripartire da un logo a caso.',
  'Ogni fornitore ti dice una cosa diversa e ti manca una direzione unica.',
  'Investi in marketing ma i risultati non tornano: forse manca la base.',
];

const STEPS = [
  { n: '01', t: 'Analisi del posizionamento e dei competitor diretti', d: 'Dove siete davvero, rispetto a chi vi sta intorno — senza illusioni.' },
  { n: '02', t: "Audit dei punti di sabotaggio d'immagine", d: 'Le crepe tra ciò che valete e ciò che sembrate: lì si perde il cliente.' },
  { n: '03', t: 'Workshop strategici con il management', d: 'La verità non si indovina: si estrae, insieme a chi guida l’azienda.' },
  { n: '04', t: 'Mappa di posizionamento e value proposition', d: 'Il territorio che è vostro, messo nero su bianco. La bussola di tutto il resto.' },
];

const DELIVERABLES = ['Audit di percezione', 'Analisi competitiva', 'Mappa di posizionamento', 'Report strategico'];

const OUTCOMES = [
  { t: 'Un criterio, non un gusto', d: 'Ogni scelta di comunicazione ha una ragione. Si smette di decidere a naso.' },
  { t: 'Riconoscibile a colpo d’occhio', d: 'Chi ti guarda capisce subito chi sei e perché scegliere te, non un altro.' },
  { t: 'Marketing che rende', d: 'Ogni euro speso lavora sopra una base solida, invece che nel vuoto.' },
];

const WHY = [
  { t: 'Boutique', d: 'Presidiamo il valore, non eseguiamo e basta. Sei seguito da una direzione, non da un fornitore a ore.' },
  { t: 'Factory', d: 'Un metodo replicabile: tempi certi e qualità costante, anche quando il lavoro cresce.' },
  { t: 'Esperienza sul campo', d: 'Ogni soluzione che proponiamo è già stata testata contro la dura realtà del mercato.' },
];

const FAQ = [
  { q: 'Serve anche se ho già un logo e un sito?', a: 'Sì. Il Brand Discovery non tocca la forma: chiarisce la sostanza sotto. Spesso è proprio quello che manca a un’immagine che “non funziona”.' },
  { q: 'Quanto dura?', a: 'Poche settimane, non mesi. È un affondo intenso e mirato, non un cantiere infinito.' },
  { q: 'In cosa è diverso da una consulenza qualsiasi?', a: 'Non ti lasciamo un PDF e un in bocca al lupo. Il risultato diventa la base operativa di tutto quello che costruiamo dopo.' },
  { q: 'E se emergono cose scomode?', a: 'Meglio scoprirle qui che dal mercato. La verità sulla tua immagine è il primo asset su cui lavorare.' },
];

const NEXT = [
  { t: 'Naming & Verbal Identity', href: '/identity/naming' },
  { t: 'Visual Identity System', href: '/identity/visual-identity' },
  { t: 'Brand Guidelines', href: '/identity/brand-guidelines' },
];

function Kicker({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="reveal voice-mono mb-6" style={{ color }}>
      {children}
    </p>
  );
}

export default function BrandDiscovery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.set('.bd-line-inner', { yPercent: 120, skewY: 5 });
      gsap.set('.bd-fade', { opacity: 0, y: 24 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to('.bd-line-inner', { yPercent: 0, skewY: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out' })
        .to('.bd-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.7');
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal', root).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ——— HERO ——— */}
      <section
        ref={heroRef}
        className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#0a0a10] text-[#f8f9fa]"
      >
        <AreaBackdrop from={BLUE} to={ACCENT} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a10] via-[#0a0a10]/85 to-[#0a0a10]/30" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-32 md:px-10 md:pt-36">
          <nav className="bd-fade voice-mono mb-6 flex items-center gap-3 text-white/45" aria-label="breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">Gleeye</Link>
            <span aria-hidden="true">/</span>
            <Link href="/identity" className="transition-colors hover:text-white">Identity</Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: ACCENT }}>Brand Discovery</span>
          </nav>

          <h1 className="voice-display max-w-4xl">
            <span className="block overflow-hidden">
              <span className="bd-line-inner block text-[9vw] leading-[0.98] md:text-[min(5.6vw,4.6rem)]">Partiamo da dove</span>
            </span>
            <span className="block overflow-hidden">
              <span className="bd-line-inner text-gradient block text-[9vw] leading-[0.98] md:text-[min(5.6vw,4.6rem)]">nessuno guarda.</span>
            </span>
          </h1>

          <p className="bd-fade mt-7 max-w-xl font-jakarta text-lg font-medium leading-relaxed text-white/70 md:text-xl">
            Le contraddizioni tra quello che siete e quello che comunicate. Ogni
            brand ha un DNA — spesso ignorato, spesso tradito. Lo troviamo, lo
            documentiamo, lo usiamo come bussola per tutto quello che viene dopo.
          </p>

          <div className="bd-fade mt-10">
            <Link href="/contatti" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]">
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">Parliamo del tuo progetto</span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-8">
          <p className="bd-fade voice-mono text-white/35">Identity — servizio 01</p>
          <p className="bd-fade voice-mono hidden text-white/35 md:block">Prima di costruire, capiamo cosa c&apos;è</p>
        </div>
      </section>

      {/* ——— IL PUNTO CIECO ——— */}
      <section className="bg-[#f8f9fa] py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <Kicker color={PURPLE}>Il punto cieco</Kicker>
          <h2 className="reveal voice-display text-3xl leading-[1.05] text-[#0a0a10] md:text-5xl">
            La maggior parte comunica quello che crede di essere.{' '}
            <span className="text-gradient">Non quello che è.</span>
          </h2>
          <p className="reveal mt-8 max-w-2xl font-jakarta text-lg font-medium leading-relaxed text-black/55">
            Il mercato è saturo di forme inadeguate che tradiscono il valore reale.
            Prima di aggiungere un solo pixel andiamo a cercare le crepe: dove
            l&apos;immagine attuale sta già sabotando la sostanza. È il lavoro meno
            visibile e il più decisivo — perché su questa base si regge tutto il resto.
          </p>
        </div>
      </section>

      {/* ——— A CHI SERVE ——— */}
      <section className="bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Kicker color={BLUE}>A chi serve</Kicker>
          <h2 className="reveal voice-display mb-14 max-w-3xl text-3xl leading-[1.05] md:mb-20 md:text-5xl">
            È per te, se ti riconosci <span className="text-gradient">anche solo in uno.</span>
          </h2>
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
            {SIGNALS.map((s, i) => (
              <div key={i} className="reveal flex items-start gap-5 border-t border-white/12 pt-6">
                <span className="voice-mono pt-1 text-white/30">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-jakarta text-lg font-medium leading-snug text-white/80">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— IL PERCORSO ——— */}
      <section className="bg-[#f8f9fa] py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Kicker color={PURPLE}>Il percorso</Kicker>
          <h2 className="reveal voice-display mb-16 max-w-3xl text-3xl leading-[1.05] text-[#0a0a10] md:mb-24 md:text-5xl">
            Quattro passi per arrivare al fondo.
          </h2>
          <div className="border-t border-[#0a0a10]/12">
            {STEPS.map((s) => (
              <div key={s.n} className="reveal grid grid-cols-[auto_1fr] gap-6 border-b border-[#0a0a10]/12 py-8 md:grid-cols-[6rem_1fr_1fr] md:gap-10 md:py-10">
                <span className="voice-display text-2xl md:text-4xl" style={{ color: ACCENT }}>{s.n}</span>
                <h3 className="voice-display text-xl leading-tight text-[#0a0a10] md:text-3xl">{s.t}</h3>
                <p className="col-span-2 font-jakarta font-medium leading-relaxed text-black/55 md:col-span-1 md:pt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— DELIVERABLE ——— */}
      <section className="bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-center">
            <div>
              <Kicker color={BLUE}>Cosa ti resta in mano</Kicker>
              <h2 className="reveal voice-display text-3xl leading-[1.05] md:text-4xl">
                Non slide. <span className="text-gradient">Una bussola.</span>
              </h2>
              <p className="reveal mt-6 max-w-md font-jakarta font-medium leading-relaxed text-white/55">
                Documenti che usi davvero, ogni giorno, per decidere come il brand
                parla e appare. Il contrario di un report che finisce in un cassetto.
              </p>
            </div>
            <ul className="reveal flex flex-col">
              {DELIVERABLES.map((d, i) => (
                <li key={d} className="flex items-center gap-5 border-b border-white/12 py-5 first:border-t">
                  <span className="voice-mono text-white/35">{String(i + 1).padStart(2, '0')}</span>
                  <span className="voice-display text-xl md:text-2xl">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— COSA CAMBIA DOPO ——— */}
      <section className="bg-[#f8f9fa] py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Kicker color={PURPLE}>Il risultato</Kicker>
          <h2 className="reveal voice-display mb-14 max-w-3xl text-3xl leading-[1.05] text-[#0a0a10] md:mb-20 md:text-5xl">
            Smetti di indovinare. <span className="text-gradient">Inizi a decidere.</span>
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {OUTCOMES.map((o) => (
              <div key={o.t} className="reveal">
                <div className="mb-4 h-px w-12" style={{ background: `linear-gradient(90deg, ${BLUE}, ${PURPLE})` }} />
                <h3 className="voice-display text-xl text-[#0a0a10] md:text-2xl">{o.t}</h3>
                <p className="mt-3 font-jakarta font-medium leading-relaxed text-black/55">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— PERCHÉ GLEEYE ——— */}
      <section className="bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Kicker color={BLUE}>Perché noi</Kicker>
          <h2 className="reveal voice-display mb-6 max-w-3xl text-3xl leading-[1.05] md:text-5xl">
            Non un fornitore. <span className="text-gradient">Uno scudo.</span>
          </h2>
          <p className="reveal mb-16 max-w-2xl font-jakarta text-lg font-medium leading-relaxed text-white/60 md:mb-20">
            Ci carichiamo la complessità e ti restituiamo solo chiarezza e risultato.
            Difendiamo la dignità del lavoro fatto bene: il valore reale della tua
            azienda non deve essere tradito da una forma inadeguata.
          </p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            {WHY.map((w) => (
              <div key={w.t} className="reveal">
                <h3 className="voice-display text-2xl" style={{ color: ACCENT }}>{w.t}</h3>
                <p className="mt-4 font-jakarta font-medium leading-relaxed text-white/55">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="bg-[#f8f9fa] py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <Kicker color={PURPLE}>Domande legittime</Kicker>
          <div className="mt-4 border-t border-[#0a0a10]/12">
            {FAQ.map((f) => (
              <div key={f.q} className="reveal grid grid-cols-1 gap-3 border-b border-[#0a0a10]/12 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
                <h3 className="voice-display text-xl leading-tight text-[#0a0a10] md:text-2xl">{f.q}</h3>
                <p className="font-jakarta font-medium leading-relaxed text-black/55">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— COSA VIENE DOPO ——— */}
      <section className="bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Kicker color={BLUE}>Il primo passo di un sistema</Kicker>
          <h2 className="reveal voice-display mb-14 max-w-3xl text-3xl leading-[1.05] md:mb-20 md:text-5xl">
            La scoperta <span className="text-gradient">apre la strada.</span>
          </h2>
          <div className="border-t border-white/12">
            {NEXT.map((n, i) => (
              <Link key={n.href} href={n.href} className="reveal group flex items-center justify-between gap-6 border-b border-white/12 py-7 transition-colors">
                <span className="flex items-baseline gap-5">
                  <span className="voice-mono text-white/30">{String(i + 2).padStart(2, '0')}</span>
                  <span className="voice-display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{n.t}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" style={{ color: ACCENT }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="relative overflow-hidden bg-[#0a0a10] py-28 text-center text-[#f8f9fa] md:py-36">
        <div className="absolute left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/25 blur-[150px]" />
        <div className="relative mx-auto max-w-3xl px-5 md:px-10">
          <h2 className="reveal voice-display text-4xl leading-[1.02] md:text-6xl">
            Prima di costruire, <span className="text-gradient">capiamo cosa c&apos;è.</span>
          </h2>
          <div className="reveal mt-10">
            <Link href="/contatti" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-9 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]">
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">Parliamo del tuo progetto</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

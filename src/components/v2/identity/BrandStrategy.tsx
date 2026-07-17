'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- icone disegnate, una per servizio (draw-on all'arrivo) ---------- */
const dash = { strokeDasharray: 100, strokeDashoffset: 100 } as const;

function IcoAudit({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="30" cy="30" r="17" stroke={a} strokeWidth="2.5" pathLength="100" className="bs-ico" style={dash} />
      <path d="M42 42 L54 54" stroke={a} strokeWidth="2.5" strokeLinecap="round" pathLength="100" className="bs-ico" style={dash} />
      <path d="M22 30 C25 24, 35 24, 38 30" stroke={a} strokeWidth="2" strokeLinecap="round" pathLength="100" className="bs-ico" style={dash} />
    </svg>
  );
}
function IcoPosition({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="32" cy="32" r="22" stroke={a} strokeWidth="2" opacity="0.5" pathLength="100" className="bs-ico" style={dash} />
      <path d="M32 14 L38 32 L32 50 L26 32 Z" stroke={a} strokeWidth="2.5" strokeLinejoin="round" pathLength="100" className="bs-ico" style={dash} />
      <circle cx="32" cy="32" r="2.5" fill={a} />
    </svg>
  );
}
function IcoArch({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="32" cy="14" r="5" stroke={a} strokeWidth="2.5" pathLength="100" className="bs-ico" style={dash} />
      <circle cx="16" cy="46" r="5" stroke={a} strokeWidth="2.5" pathLength="100" className="bs-ico" style={dash} />
      <circle cx="48" cy="46" r="5" stroke={a} strokeWidth="2.5" pathLength="100" className="bs-ico" style={dash} />
      <path d="M29 18 L19 42 M35 18 L45 42 M21 46 L43 46" stroke={a} strokeWidth="2" pathLength="100" className="bs-ico" style={dash} />
    </svg>
  );
}
function IcoMsg({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="18" cy="32" r="3" fill={a} />
      <path d="M28 20 C36 24, 36 40, 28 44" stroke={a} strokeWidth="2.5" strokeLinecap="round" pathLength="100" className="bs-ico" style={dash} />
      <path d="M38 14 C50 20, 50 44, 38 50" stroke={a} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" pathLength="100" className="bs-ico" style={dash} />
    </svg>
  );
}

const SERVIZI = [
  {
    titolo: 'Brand Audit',
    desc: "Analisi approfondita della situazione attuale: identità percepita, messaggi inviati, gap tra come ti vedi e come ti vedono. Il punto di partenza per qualsiasi lavoro strategico.",
    tags: ['Analisi', 'Percezione', 'Gap analysis'],
    accent: '#8257e6',
    Ico: IcoAudit,
  },
  {
    titolo: 'Positioning Strategy',
    desc: "Definizione del posizionamento competitivo: dove si colloca il brand nel mercato, su quali differenziatori puntare, quale territorio occupare nella mente del cliente.",
    tags: ['Positioning', 'Differenziazione', 'Mercato'],
    accent: '#4e92d8',
    Ico: IcoPosition,
  },
  {
    titolo: 'Brand Architecture',
    desc: "Struttura delle relazioni tra brand madre e sub-brand, linee di prodotto, mercati diversi. Chiarezza interna, coerenza esterna.",
    tags: ['Portfolio brand', 'Sub-brand', 'Architettura'],
    accent: '#4757c4',
    Ico: IcoArch,
  },
  {
    titolo: 'Messaging Framework',
    desc: "Costruzione del sistema di messaggi: dalla value proposition alle key message per ogni target, dal pitch istituzionale ai messaggi di campagna.",
    tags: ['Messaggi', 'Copy strategy', 'Value prop'],
    accent: '#8fc1ee',
    Ico: IcoMsg,
  },
];

const FASI = [
  { n: '01', titolo: 'Discovery', desc: "Interviste con il management, analisi del mercato, benchmark competitor. Capiamo il brand dall'interno e dall'esterno." },
  { n: '02', titolo: 'Workshop strategico', desc: 'Sessioni di lavoro con il team del cliente. Il posizionamento si costruisce insieme, non si consegna dall\'esterno.' },
  { n: '03', titolo: 'Definizione del framework', desc: 'Positioning statement, valori, mission, value proposition, tono di voce. Il documento strategico completo.' },
  { n: '04', titolo: 'Handover', desc: 'Presentazione del documento finale, sessione di allineamento con il team, indicazioni operative per l\'implementazione.' },
];

const PER_CHI = [
  "Chi ha un brand \"cresciuto\" nel tempo senza mai essere stato progettato — e si trova con un'identità vaga, messaggi incoerenti e difficoltà a spiegare cosa li differenzia.",
  "Chi sta lanciando un nuovo brand e vuole partire con una base strategica solida prima di investire in comunicazione e marketing.",
  "Chi ha già fatto comunicazione ma senza risultati soddisfacenti — e sospetta che il problema sia a monte, nella mancanza di una strategia chiara.",
];

const PERCHE = [
  { t: 'Strategia che si implementa', d: "Non consegniamo slide. Costruiamo documenti operativi che il team può usare ogni giorno: per briefare agenzie, scrivere testi, decidere se una campagna è in linea col brand." },
  { t: 'Co-creazione, non imposizione', d: "Il posizionamento migliore è quello che il team aziendale riconosce come proprio. Costruiamo la strategia con il cliente, non per il cliente." },
  { t: 'Expertise settoriale ampia', d: "Abbiamo lavorato su brand in settori molto diversi. Questo ci permette di portare prospettive esterne senza perdere la comprensione del tuo mercato." },
];

const FAQS = [
  { q: 'Quanto dura un progetto di brand strategy?', a: 'Da 4 a 10 settimane, in base alla complessità e al numero di sessioni di workshop incluse. Un\'azienda con più linee di prodotto o sub-brand richiede più tempo.' },
  { q: 'È necessario partire dalla strategy prima di fare identità visiva?', a: "Sì, fortemente. L'identità visiva dovrebbe riflettere la strategia — non il contrario. Partire dal logo prima di avere un posizionamento chiaro porta spesso a dover rifare tutto." },
  { q: 'Lavorate anche con aziende già avviate o solo con startup?', a: "Soprattutto con aziende già avviate. Il rebranding e il repositioning sono spesso più complessi (e più urgenti) di partire da zero." },
  { q: 'Il documento finale è solo per uso interno?', a: 'No. È progettato per essere utilizzato da tutti i fornitori che lavoreranno con il brand: agenzie, designer, copywriter, sviluppatori.' },
  { q: "Collaborate con altri fornitori per l'implementazione?", a: 'Sì. Possiamo gestire noi l\'intera implementazione (identità visiva, comunicazione, digital) o fornire la strategia a partner selezionati dal cliente.' },
];

export default function BrandStrategy() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('.bs-hero-line', { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });

      /* approccio: statement parola per parola */
      gsap.fromTo('.bs-appr-word', { opacity: 0.1 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.bs-appr', start: 'top 72%', end: 'center 45%', scrub: 0.5 },
      });
      gsap.from('.bs-appr-col', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.bs-appr-cols', start: 'top 82%', once: true },
      });

      /* servizi: icone che si disegnano */
      gsap.utils.toArray<HTMLElement>('.bs-servizio', root).forEach((row) => {
        gsap.to(row.querySelectorAll('.bs-ico'), {
          strokeDashoffset: 0, duration: 1.3, stagger: 0.1, ease: 'power2.inOut',
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
        gsap.from(row, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
      });

      /* come lavoriamo: card orizzontali pinnate (pattern podcast) */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;
        const dist = () => track.scrollWidth - window.innerWidth + 120;
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin, start: 'top top', end: () => `+=${dist()}`,
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
      });
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.bs-fase', {
          y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 82%', once: true },
        });
      });

      /* per chi / perché: reveal */
      gsap.utils.toArray<HTMLElement>('.bs-reveal', root).forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (i: number) => {
    const el = faqRefs.current[i];
    if (!el) return;
    if (faqOpen === i) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
      setFaqOpen(null);
    } else {
      if (faqOpen !== null && faqRefs.current[faqOpen]) {
        gsap.to(faqRefs.current[faqOpen], { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
      }
      gsap.set(el, { height: 'auto', opacity: 1 });
      const h = el.offsetHeight;
      gsap.from(el, { height: 0, opacity: 0, duration: 0.5, ease: 'power3.out' });
      gsap.set(el, { height: h });
      setFaqOpen(i);
    }
  };

  const statement = 'Prima di comunicare, bisogna sapere cosa si vuole essere.';

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* ---------- hero: sobrio, copy originale ---------- */}
      <div className="relative flex min-h-[85svh] flex-col justify-end px-5 pb-20 md:px-10 md:pb-28">
        <div className="pointer-events-none absolute right-[-12%] top-[5%] h-[55vh] w-[55vh] rounded-full bg-[#614aa2]/18 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[45vh] w-[45vh] rounded-full bg-[#4e92d8]/12 blur-[130px]" />
        {/* arco decorativo gigante, ritagliato fuori campo */}
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -right-[30%] -top-[35%] h-[110vh] w-[110vh] opacity-[0.35]" aria-hidden>
          <circle cx="50" cy="50" r="47" fill="none" stroke="url(#bs-arc-g)" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="url(#bs-arc-g)" strokeWidth="0.12" strokeDasharray="0.4 1.6" />
          <defs><linearGradient id="bs-arc-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8257e6" /><stop offset="100%" stopColor="#4e92d8" /></linearGradient></defs>
        </svg>
        {/* vignetta: profondità ai bordi */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.5) 100%)' }} />
        <h1>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="bs-hero-line voice-display block text-[10.5vw] leading-[0.92] md:text-[6.5vw]">Brand come</span>
          </span>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="bs-hero-line voice-display text-gradient-flow block text-[10.5vw] leading-[0.92] md:text-[6.5vw]">scelta consapevole.</span>
          </span>
        </h1>
        <p className="bs-hero-line mt-8 max-w-md font-jakarta text-base font-medium leading-relaxed text-white/50 md:text-lg">
          Un brand senza strategia è un nome su un biglietto da visita.
        </p>
      </div>

      {/* ---------- il nostro approccio ---------- */}
      <div className="bs-appr relative mx-3 rounded-[2.5rem] border-t border-white/[0.08] bg-gradient-to-b from-[#0e1020] to-[#0a0a10] px-5 py-24 md:mx-6 md:px-10 md:py-36" style={{ boxShadow: '0 -30px 80px -40px rgba(97,74,162,0.25), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
        <span className="voice-mono pointer-events-none absolute left-6 top-10 hidden text-white/25 md:block" style={{ writingMode: 'vertical-rl' }}>Il nostro approccio</span>
        <h2 className="voice-display max-w-4xl text-3xl leading-[1.05] md:ml-[14%] md:text-6xl">
          {statement.split(' ').map((w, i) => (
            <span key={i} className="bs-appr-word inline-block" style={{ marginRight: '0.26em' }}>{w}</span>
          ))}
        </h2>
        <div className="bs-appr-cols mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12">
          <p className="bs-appr-col font-jakarta text-sm font-medium leading-relaxed text-white/55 md:col-span-4 md:col-start-2 md:text-base">
            La brand strategy non è un esercizio teorico. È il documento che risponde alle domande più difficili: chi siamo davvero, a chi parliamo, perché qualcuno dovrebbe sceglierci invece di un competitor con prezzi simili. Senza risposta a queste domande, qualsiasi comunicazione è un tiro al buio.
          </p>
          <p className="bs-appr-col font-jakarta text-sm font-medium leading-relaxed text-white/55 md:col-span-4 md:col-start-8 md:mt-20 md:text-base">
            Costruiamo il posizionamento strategico del tuo brand attraverso un processo strutturato: analisi del mercato, workshop con il management, definizione dei valori e della proposta di valore. Il risultato è un documento operativo — non una presentazione da mettere in un cassetto.
          </p>
        </div>
      </div>

      {/* ---------- i servizi: righe che si aprono, icone disegnate ---------- */}
      <div className="relative px-5 py-24 md:px-10 md:py-32">
        <h2 className="bs-reveal voice-display mb-14 text-3xl md:mb-20 md:text-5xl">Cosa facciamo</h2>
        <div className="border-t border-white/10">
          {SERVIZI.map((s) => (
            <div key={s.titolo} className="bs-servizio group relative overflow-hidden border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.03] md:py-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `radial-gradient(60% 120% at 8% 50%, ${s.accent}14 0%, transparent 60%)` }}
              />
              <div className="relative grid grid-cols-[3.5rem_1fr] items-start gap-5 md:grid-cols-[5rem_1fr_auto] md:gap-10">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl p-2.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem] md:p-3.5"
                  style={{
                    background: `linear-gradient(150deg, ${s.accent}22, transparent 65%), #10121f`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 30px -12px ${s.accent}55`,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <s.Ico a={s.accent} />
                </div>
                <div>
                  <h3 className="voice-display text-2xl md:text-4xl">{s.titolo}</h3>
                  <p className="mt-3 max-w-2xl font-jakarta text-sm font-medium leading-relaxed text-white/50 md:text-base md:opacity-0 md:transition-all md:duration-500 md:group-hover:opacity-100">
                    {s.desc}
                  </p>
                </div>
                <div className="col-start-2 flex flex-wrap gap-2 md:col-start-3 md:flex-col md:items-end">
                  {s.tags.map((t) => (
                    <span key={t} className="voice-mono rounded-full border border-white/15 px-3 py-1.5 text-white/45">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- come lavoriamo: card orizzontali pinnate ---------- */}
      <div ref={pinRef} className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="px-5 md:px-10">
          <h2 className="bs-reveal voice-display mb-4 text-3xl md:text-5xl">Come lavoriamo</h2>
          <p className="bs-reveal mb-14 max-w-xs font-jakarta text-sm font-medium text-white/45 lg:mb-16">
            Un processo chiaro, senza sorprese. Dal brief alla consegna.
          </p>
        </div>
        <div ref={trackRef} className="flex flex-col gap-6 px-5 will-change-transform lg:flex-row lg:gap-8 lg:px-10">
          {FASI.map((f) => (
            <article
              key={f.n}
              className="bs-fase relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0e1122] to-[#161a30] p-8 lg:min-h-[24rem] lg:w-[30rem] lg:p-10"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 30px 60px -25px rgba(0,0,0,0.8), 0 20px 50px -30px rgba(78,146,216,0.35)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#4e92d8]/20 blur-[70px]" />
              <span className="voice-display pointer-events-none absolute -bottom-8 -right-3 select-none text-[9rem] leading-none opacity-[0.07]" aria-hidden>{f.n}</span>
              <span className="voice-mono inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-white/55">
                Fase {f.n}
              </span>
              <div className="mt-10">
                <h3 className="voice-display text-2xl md:text-3xl">{f.titolo}</h3>
                <p className="mt-4 max-w-sm font-jakarta text-sm font-medium leading-relaxed text-white/50">{f.desc}</p>
              </div>
            </article>
          ))}
          <div className="hidden shrink-0 lg:block lg:w-[8vw]" />
        </div>
      </div>

      {/* ---------- per chi è ---------- */}
      <div className="relative px-5 py-24 md:px-10 md:py-32">
        <h2 className="bs-reveal voice-display mb-14 text-3xl md:mb-20 md:text-5xl">Per chi è questo servizio</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {PER_CHI.map((t, i) => (
            <div key={i} className="bs-reveal relative border-t border-white/10 pt-8">
              <span className="absolute -top-px left-0 h-px w-16 bg-gradient-to-r from-[#8257e6] to-[#4e92d8]" />
              <p className="font-jakarta text-base font-medium leading-relaxed text-white/65 md:text-lg">{t}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- perché gleeye ---------- */}
      <div className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <h2 className="bs-reveal voice-display text-3xl md:text-5xl">Perché Gleeye</h2>
          <p className="bs-reveal self-end font-jakarta text-base font-medium leading-relaxed text-white/45 md:text-lg">
            Ci sono agenzie che consegnano documenti. E ci sono agenzie che costruiscono posizionamenti. La differenza si vede in ogni scelta di comunicazione.
          </p>
        </div>
        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {PERCHE.map((r) => (
            <div key={r.t} className="bs-reveal group grid grid-cols-1 gap-4 py-9 md:grid-cols-[1fr_2fr] md:gap-16">
              <h3 className="voice-display text-xl leading-snug md:text-2xl">{r.t}</h3>
              <p className="font-jakarta text-sm font-medium leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-white/70 md:text-base">{r.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- faq ---------- */}
      <div className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <div className="bs-reveal lg:sticky lg:top-32 lg:self-start">
            <h2 className="voice-display text-5xl md:text-7xl">FAQ</h2>
            <p className="mt-6 max-w-xs font-jakarta text-sm font-medium leading-relaxed text-white/45">
              Le domande che ci fanno più spesso, prima di iniziare un progetto di brand strategy.
            </p>
          </div>
          <div className="border-t border-white/10">
            {FAQS.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} className="bs-reveal border-b border-white/10">
                  <button onClick={() => toggleFaq(i)} className="group flex w-full items-center gap-6 py-7 text-left" aria-expanded={open}>
                    <span className="flex-1 voice-display text-base leading-snug md:text-xl">{f.q}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-400 ${open ? 'rotate-45' : 'border border-white/20 group-hover:border-white/50'}`}
                      style={open ? { background: 'linear-gradient(120deg, #8257e6, #4e92d8)' } : undefined}
                    >
                      <Plus size={15} className="text-white" />
                    </span>
                  </button>
                  <div ref={(el) => { faqRefs.current[i] = el; }} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                    <p className="max-w-2xl pb-7 font-jakarta text-sm font-medium leading-relaxed text-white/50 md:text-base">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- cta ---------- */}
      <div id="contatti" className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-5 pb-32 text-center">
        {/* anello gradiente dietro la chiusura */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40" style={{ background: 'radial-gradient(closest-side, transparent 62%, rgba(130,87,230,0.35) 68%, rgba(78,146,216,0.25) 74%, transparent 82%)' }} />
        <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 rounded-full bg-[#4e92d8]/10 blur-[120px]" />
        <h2 className="bs-reveal voice-display text-3xl leading-tight md:text-6xl">
          La strategia viene <span className="text-gradient-flow">prima di tutto</span>.
        </h2>
        <p className="bs-reveal mt-6 font-jakarta text-base font-medium text-white/45 md:text-lg">Parliamo di dove vuoi portare il tuo brand.</p>
        <div className="bs-reveal mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="/contatti"
            className="inline-flex items-center gap-3 rounded-full px-10 py-5 font-satoshi text-xs font-black uppercase tracking-[0.2em] text-white"
            style={{ background: 'linear-gradient(120deg, #8257e6, #4e92d8)' }}
          >
            Scrivici <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="/identity" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-5 font-satoshi text-xs font-black uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:border-white/50 hover:text-white">
            Torna a Identity
          </a>
        </div>
      </div>
    </section>
  );
}

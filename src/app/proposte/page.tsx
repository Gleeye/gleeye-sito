'use client';

/**
 * PAGINA INTERNA DI PROPOSTE — non linkata dal sito.
 * Ogni direzione è mostrata come SISTEMA: hero + aree + servizi + CTA.
 */

import IrisCanvas from '@/components/v2/IrisCanvas';

const AREE = [
  { n: '01', nome: 'Identity', desc: 'Chi sei e come vuoi essere percepito: DNA, nome, volto.' },
  { n: '02', nome: 'Digital', desc: 'Il posto dove il tuo brand vive: siti, social, search, adv.' },
  { n: '03', nome: 'Factory', desc: 'Video, foto, parole: la produzione con standard costante.' },
];

const SERVIZI = [
  { n: '01', nome: 'Brand Discovery', tag: 'analisi del DNA' },
  { n: '02', nome: 'Web Design & Dev', tag: 'architettura piuma' },
  { n: '03', nome: 'Video Production', tag: 'high-end & social' },
];

function DirLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`voice-mono ${dark ? 'text-white/50' : 'text-black/40'}`}>{children}</p>
  );
}

function BlockTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`voice-mono absolute left-4 top-4 z-10 rounded-full px-3 py-1 ${
        dark ? 'bg-white/10 text-white/70' : 'bg-[#0a0a10]/85 text-white/90'
      }`}
    >
      {children}
    </span>
  );
}

export default function Proposte() {
  return (
    <main className="bg-[#F8F9FA]">
      {/* ============ INTRO ============ */}
      <section className="mx-auto max-w-5xl px-6 pb-6 pt-20 md:pt-28">
        <p className="voice-mono mb-4 text-[#614aa2]">[ Interno — proposte di direzione v2.1 ]</p>
        <h1 className="voice-display text-4xl text-[#0a0a10] md:text-6xl">
          Tre sistemi<span className="text-[#4e92d8]">,</span> non tre copertine<span className="text-[#614aa2]">.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-jakarta font-medium leading-relaxed text-black/55">
          Ogni direzione qui sotto è un mini-sito: <strong>hero → aree → servizi → CTA</strong>.
          Stessi contenuti, tre caratteri diversi. In tutte: via la quadrettatura, via il corsivo.
          In fondo, la board del copy (indipendente dall&apos;estetica).
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIREZIONE A — PURO
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="voice-display text-3xl text-[#0a0a10] md:text-4xl">A — Puro</h2>
            <DirLabel>editoriale svizzero-pop · whitespace e pesi</DirLabel>
          </div>

          <div className="overflow-hidden rounded-[2rem]" style={{ boxShadow: '0 40px 100px -50px rgba(10,10,16,0.35), inset 0 0 0 1px rgba(10,10,16,0.08)' }}>
            {/* A · HERO */}
            <div className="relative bg-[#F8F9FA] px-6 py-20 md:px-14 md:py-24">
              <BlockTag>Hero</BlockTag>
              <p className="voice-mono mb-6 text-[#4e92d8]">Agenzia di comunicazione — Genova</p>
              <p className="voice-display text-[#0a0a10]" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 6rem)', lineHeight: 0.95 }}>
                Fatti guardare{' '}
                <span className="relative inline-block">
                  bene
                  <span className="absolute inset-x-0 bottom-1 -z-10 h-[0.35em] bg-[#dce9f7]" />
                </span>
                <span className="text-[#4e92d8]">.</span>
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <span className="rounded-full bg-[#0a0a10] px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-white">Parliamone</span>
                <p className="max-w-sm font-jakarta text-base font-light leading-snug text-black/55">
                  Boutique strategica, factory creativa. <span className="font-extrabold text-[#0a0a10]">Il contrasto lo fanno i pesi.</span>
                </p>
              </div>
            </div>

            {/* A · AREE */}
            <div className="relative border-t border-black/10 bg-white px-6 py-14 md:px-14">
              <BlockTag>Sezione aree</BlockTag>
              <div className="grid grid-cols-1 gap-10 pt-6 md:grid-cols-3">
                {AREE.map((a) => (
                  <div key={a.n} className="border-t-2 border-[#0a0a10] pt-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="voice-display text-3xl text-[#0a0a10]">{a.nome}</h3>
                      <span className="font-jakarta text-sm font-light text-black/35">{a.n}</span>
                    </div>
                    <p className="mt-3 font-jakarta text-sm font-light leading-relaxed text-black/55">{a.desc}</p>
                    <p className="voice-mono mt-4 text-[#4e92d8]">Esplora →</p>
                  </div>
                ))}
              </div>
            </div>

            {/* A · SERVIZI */}
            <div className="relative border-t border-black/10 bg-[#F8F9FA] px-6 py-14 md:px-14">
              <BlockTag>Lista servizi</BlockTag>
              <div className="pt-6">
                {SERVIZI.map((s) => (
                  <div key={s.n} className="group flex items-baseline gap-6 border-b border-black/10 py-5">
                    <span className="font-jakarta text-sm font-light text-black/35">{s.n}</span>
                    <span className="voice-display flex-1 text-2xl text-[#0a0a10] md:text-4xl">{s.nome}</span>
                    <span className="hidden font-jakarta text-sm font-light text-black/45 md:block">{s.tag}</span>
                    <span className="text-[#4e92d8]">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* A · CTA */}
            <div className="relative bg-[#0a0a10] px-6 py-16 text-center md:px-14">
              <BlockTag dark>CTA / pre-footer</BlockTag>
              <p className="voice-display text-3xl text-white md:text-5xl">
                Hai un progetto<span className="text-[#6db5ff]">?</span>
              </p>
              <p className="mt-3 font-jakarta font-light text-white/50">Una risposta vera, senza fuffa.</p>
              <span className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-[#0a0a10]">Scrivici</span>
            </div>
          </div>

          <p className="mt-5 font-jakarta text-sm font-medium text-black/50">
            <strong className="text-[#0a0a10]">In sintesi:</strong> zero texture, righe nette, contrasto Black/Light, evidenziatore pastello.
            Il più sobrio e &laquo;design house&raquo;. Rischio: meno spettacolare.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIREZIONE B — POP ORGANICO
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: 'linear-gradient(160deg, #eef3fa 0%, #f3eff9 55%, #eaf1f9 100%)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="voice-display text-3xl text-[#0a0a10] md:text-4xl">B — Pop organico</h2>
            <DirLabel>creativo audace · forme, colore, movimento</DirLabel>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-[#fdfdfe]" style={{ boxShadow: '0 40px 100px -50px rgba(97,74,162,0.5)' }}>
            {/* B · HERO */}
            <div className="relative overflow-hidden px-6 py-20 md:px-14 md:py-24">
              <BlockTag>Hero</BlockTag>
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96" style={{ background: 'radial-gradient(closest-side, #9b7bff59, transparent)', borderRadius: '58% 42% 55% 45% / 55% 48% 52% 45%' }} />
              <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80" style={{ background: 'radial-gradient(closest-side, #6db5ff52, transparent)', borderRadius: '45% 55% 48% 52% / 52% 45% 55% 48%' }} />
              <svg width="48" height="48" viewBox="0 0 24 24" className="absolute right-12 top-12 animate-spin-slow text-[#614aa2]" aria-hidden="true">
                <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" fill="currentColor" />
              </svg>
              <p className="voice-mono mb-6 text-[#614aa2]">Agenzia di comunicazione — Genova</p>
              <p className="voice-display relative text-[#0a0a10]" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 6rem)', lineHeight: 0.98 }}>
                L&apos;occhio vuole la sua{' '}
                <span className="relative inline-block -rotate-2 rounded-2xl bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-4 pb-1 text-white">parte</span>
                <span className="text-[#4e92d8]">.</span> Tutta<span className="text-[#614aa2]">.</span>
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-white">Parliamone ✳</span>
                <span className="voice-mono -rotate-2 rounded-full border border-[#614aa2]/30 bg-white px-4 py-2 text-[#614aa2]">dal 2019, a Genova</span>
              </div>
            </div>

            {/* B · AREE */}
            <div className="relative px-6 py-14 md:px-14" style={{ background: 'linear-gradient(120deg, #f6f4fb, #eef5fc)' }}>
              <BlockTag>Sezione aree</BlockTag>
              <div className="grid grid-cols-1 gap-5 pt-6 md:grid-cols-3">
                {AREE.map((a, i) => (
                  <div
                    key={a.n}
                    className={`relative overflow-hidden rounded-[1.8rem] bg-white p-7 ${i === 1 ? 'md:-rotate-1' : i === 2 ? 'md:rotate-1' : ''}`}
                    style={{ boxShadow: '0 24px 60px -35px rgba(97,74,162,0.45)' }}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36" style={{ background: `radial-gradient(closest-side, ${i === 1 ? '#6db5ff44' : '#9b7bff40'}, transparent)`, borderRadius: '58% 42% 55% 45% / 55% 48% 52% 45%' }} />
                    <span className="voice-mono inline-block rounded-full px-3 py-1" style={{ background: i === 1 ? '#dce9f7' : '#e5dff2', color: i === 1 ? '#3c78b4' : '#614aa2' }}>
                      area {a.n}
                    </span>
                    <h3 className="voice-display mt-4 text-3xl text-[#0a0a10]">{a.nome}</h3>
                    <p className="mt-3 font-jakarta text-sm font-medium leading-relaxed text-black/55">{a.desc}</p>
                    <p className="mt-5 font-satoshi text-sm font-black uppercase text-[#614aa2]">Esplora ↗</p>
                  </div>
                ))}
              </div>
            </div>

            {/* B · SERVIZI */}
            <div className="relative bg-white px-6 py-14 md:px-14">
              <BlockTag>Lista servizi</BlockTag>
              <div className="pt-6">
                {SERVIZI.map((s, i) => (
                  <div key={s.n} className="group flex items-center gap-5 border-b border-dashed border-[#614aa2]/25 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-satoshi text-sm font-black text-white" style={{ background: i === 1 ? '#4e92d8' : '#614aa2' }}>
                      {s.n}
                    </span>
                    <span className="voice-display flex-1 text-2xl text-[#0a0a10] md:text-4xl">{s.nome}</span>
                    <span className="voice-mono hidden rounded-full bg-[#f1eef9] px-3 py-1.5 text-[#614aa2] md:block">{s.tag}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-[#4e92d8]" aria-hidden="true">
                      <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" fill="currentColor" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* B · CTA */}
            <div className="relative overflow-hidden px-6 py-16 text-center md:px-14" style={{ background: 'linear-gradient(100deg, #4e92d8, #614aa2)' }}>
              <BlockTag dark>CTA / pre-footer</BlockTag>
              <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
              <p className="voice-display text-3xl text-white md:text-5xl">Facciamoci un pensiero✳</p>
              <p className="mt-3 font-jakarta font-medium text-white/70">Un caffè a Brignole, o una call. Come preferisci.</p>
              <span className="mt-6 inline-block -rotate-1 rounded-full bg-white px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-[#614aa2]">Scrivici</span>
            </div>
          </div>

          <p className="mt-5 font-jakarta text-sm font-medium text-black/50">
            <strong className="text-[#0a0a10]">In sintesi:</strong> blob sfumati, card leggermente ruotate, pill e badge, stelle al posto dei separatori.
            Il più &laquo;agenzia creativa&raquo;. Rischio: va dosato per restare premium.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIREZIONE C — LUCE LIQUIDA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a10] py-16 text-[#f8f9fa] md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="voice-display text-3xl md:text-4xl">C — Luce liquida</h2>
            <DirLabel dark>cinematico immersivo · la profondità la fa la luce</DirLabel>
          </div>

          <div className="overflow-hidden rounded-[2rem]" style={{ boxShadow: 'inset 0 0 0 1px rgba(248,249,250,0.1)' }}>
            {/* C · HERO */}
            <div className="relative overflow-hidden bg-[#0a0a10] px-6 py-20 md:px-14 md:py-24">
              <BlockTag dark>Hero</BlockTag>
              <div className="absolute inset-0 opacity-90">
                <IrisCanvas color1="#6db5ff" color2="#9b7bff" zoom={1.35} className="h-full w-full" />
              </div>
              <div className="relative">
                <p className="voice-mono mb-6 text-[#6db5ff]">Agenzia di comunicazione — Genova</p>
                <p className="voice-display" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 6rem)', lineHeight: 0.95 }}>
                  Costruiamo <span className="text-gradient">sguardi</span><span className="text-[#6db5ff]">.</span>
                </p>
                <span className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-[#0a0a10]">Parliamone</span>
              </div>
            </div>

            {/* C · AREE */}
            <div className="relative border-t border-white/10 bg-[#0d0d15] px-6 py-14 md:px-14">
              <BlockTag dark>Sezione aree</BlockTag>
              <div className="grid grid-cols-1 gap-5 pt-6 md:grid-cols-3">
                {AREE.map((a, i) => (
                  <div
                    key={a.n}
                    className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7"
                  >
                    <div
                      className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-[60px]"
                      style={{ background: i === 1 ? '#4e92d866' : '#614aa266' }}
                    />
                    <span className="voice-mono" style={{ color: i === 1 ? '#6db5ff' : '#9b7bff' }}>area {a.n}</span>
                    <h3 className="voice-display mt-3 text-3xl">{a.nome}</h3>
                    <p className="mt-3 font-jakarta text-sm font-medium leading-relaxed text-white/55">{a.desc}</p>
                    <p className="mt-5 font-satoshi text-sm font-black uppercase text-white/80">Esplora →</p>
                  </div>
                ))}
              </div>
            </div>

            {/* C · SERVIZI */}
            <div className="relative border-t border-white/10 bg-[#0a0a10] px-6 py-14 md:px-14">
              <BlockTag dark>Lista servizi</BlockTag>
              <div className="pt-6">
                {SERVIZI.map((s) => (
                  <div key={s.n} className="group flex items-baseline gap-6 border-b border-white/10 py-5">
                    <span className="text-gradient font-satoshi text-xl font-black">{s.n}</span>
                    <span className="voice-display flex-1 text-2xl md:text-4xl">{s.nome}</span>
                    <span className="voice-mono hidden text-white/40 md:block">{s.tag}</span>
                    <span className="text-[#6db5ff]">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C · CTA */}
            <div className="relative overflow-hidden border-t border-white/10 px-6 py-16 text-center md:px-14">
              <BlockTag dark>CTA / pre-footer</BlockTag>
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 120% at 50% 120%, rgba(97,74,162,0.45), transparent 70%)' }} />
              <p className="voice-display relative text-3xl md:text-5xl">
                Il tuo brand merita di essere <span className="text-gradient">guardato</span>.
              </p>
              <span className="relative mt-6 inline-block rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-wide text-white">Scrivici</span>
            </div>
          </div>

          <p className="mt-5 font-jakarta text-sm font-medium text-white/50">
            <strong className="text-white">In sintesi:</strong> dark dominante, glow e luci liquide, gradienti sulle parole chiave, card che emergono dal buio.
            Il più cinematografico. Rischio: pesante se non alternato con sezioni chiare.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COPY BOARD
      ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <DirLabel>La board del copy — tre registri (indipendente dall&apos;estetica)</DirLabel>
        <h2 className="voice-display mb-12 mt-3 text-3xl text-[#0a0a10] md:text-5xl">
          Come parla Gleeye<span className="text-[#4e92d8]">?</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="flex flex-col gap-5 rounded-[1.5rem] border border-black/10 bg-white p-7">
            <p className="voice-mono text-[#4e92d8]">Registro 1 — Chirurgico</p>
            <p className="font-jakarta text-sm font-medium text-black/50">
              Frasi corte. Imperativi. Da art director che non deve dimostrare niente.
            </p>
            <div className="space-y-4 border-t border-black/10 pt-5">
              <div>
                <p className="voice-mono mb-1 text-black/35">Hero</p>
                <p className="voice-display text-2xl text-[#0a0a10]">Fatti guardare. Bene.</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Manifesto</p>
                <p className="font-satoshi text-lg font-bold leading-snug text-[#0a0a10]">
                  Il mercato è pieno di rumore. Noi togliamo, puliamo, mettiamo a fuoco. Quello che resta, si ricorda.
                </p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">CTA</p>
                <p className="font-satoshi font-black uppercase text-[#0a0a10]">Mettiamoci gli occhi →</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Aree (Factory)</p>
                <p className="font-jakarta text-sm font-medium text-black/60">
                  &laquo;Video, foto, parole. Fatti come si deve, consegnati quando serve.&raquo;
                </p>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-5 rounded-[1.5rem] border-2 border-[#614aa2]/25 bg-white p-7" style={{ boxShadow: '0 20px 50px -30px rgba(97,74,162,0.4)' }}>
            <p className="voice-mono text-[#614aa2]">Registro 2 — Idiomatico italiano</p>
            <p className="font-jakarta text-sm font-medium text-black/50">
              Gioca coi modi di dire sull&apos;occhio: è letteralmente il nome dell&apos;agenzia. Il più memorabile.
            </p>
            <div className="space-y-4 border-t border-black/10 pt-5">
              <div>
                <p className="voice-mono mb-1 text-black/35">Hero</p>
                <p className="voice-display text-2xl text-[#0a0a10]">L&apos;occhio vuole la sua parte. Tutta.</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Manifesto</p>
                <p className="font-satoshi text-lg font-bold leading-snug text-[#0a0a10]">
                  La bellezza non è un vezzo: è il modo più veloce per farsi credere. Chi ti guarda decide in un colpo d&apos;occhio — noi lavoriamo su quel colpo.
                </p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">CTA</p>
                <p className="font-satoshi font-black uppercase text-[#0a0a10]">Vediamoci — letteralmente →</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Aree (Identity)</p>
                <p className="font-jakarta text-sm font-medium text-black/60">
                  &laquo;Prima di farti notare, decidiamo per cosa. Chi sei, a colpo d&apos;occhio.&raquo;
                </p>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-5 rounded-[1.5rem] border border-black/10 bg-white p-7">
            <p className="voice-mono text-[#4e92d8]">Registro 3 — Visionario</p>
            <p className="font-jakarta text-sm font-medium text-black/50">
              Il registro attuale, alzato di tono: percezioni, sguardi, architettura. Poetico e autorevole.
            </p>
            <div className="space-y-4 border-t border-black/10 pt-5">
              <div>
                <p className="voice-mono mb-1 text-black/35">Hero</p>
                <p className="voice-display text-2xl text-[#0a0a10]">Costruiamo sguardi.</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Manifesto</p>
                <p className="font-satoshi text-lg font-bold leading-snug text-[#0a0a10]">
                  Ogni brand viene guardato. Pochi vengono visti. Progettiamo il modo in cui il tuo lavoro entra negli occhi — e nella memoria — di chi conta.
                </p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">CTA</p>
                <p className="font-satoshi font-black uppercase text-[#0a0a10]">Cambia punto di vista →</p>
              </div>
              <div>
                <p className="voice-mono mb-1 text-black/35">Aree (Digital)</p>
                <p className="font-jakarta text-sm font-medium text-black/60">
                  &laquo;Non un sito: il posto dove il tuo brand vive, respira e converte.&raquo;
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-16 rounded-[1.5rem] bg-[#0a0a10] p-8 text-center">
          <p className="voice-display text-2xl text-white md:text-3xl">
            Dimmi la combo<span className="text-[#6db5ff]">:</span> estetica A / B / C + copy 1 / 2 / 3
          </p>
          <p className="mt-3 font-jakarta text-sm font-medium text-white/50">
            (o mescola: &laquo;B ma più sobrio&raquo;, &laquo;C con le card di B&raquo;, &laquo;copy 2 ma CTA seri&raquo;… tutto lecito)
          </p>
        </div>
      </section>
    </main>
  );
}

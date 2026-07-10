'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const inputCls =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 font-jakarta text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#6db5ff] focus:bg-white/[0.07]';

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.ct-left > *', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
      gsap.from('.ct-card', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nuovo progetto — ${form.name || 'richiesta dal sito'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:info@gleeye.eu?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={rootRef}
      id="contatti"
      className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40"
    >
      <div className="grain absolute inset-0" />
      <div className="absolute -left-32 top-0 h-[55vh] w-[55vh] rounded-full bg-[#4e92d8]/20 blur-[150px]" />
      <div className="absolute -right-32 bottom-0 h-[55vh] w-[55vh] rounded-full bg-[#614aa2]/25 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:grid-cols-[1.2fr_1fr] md:gap-20 md:px-10">
        {/* left */}
        <div className="ct-left">
          <p className="voice-mono mb-6 text-[#6db5ff]">[ 06 — Contatti ]</p>
          <h2 className="voice-display text-5xl leading-[0.95] md:text-7xl">
            Il tuo brand
            <br />
            merita di essere
            <br />
            <span className="voice-serif normal-case text-gradient">guardato.</span>
          </h2>
          <p className="mt-8 max-w-md font-jakarta font-medium leading-relaxed text-white/55">
            Raccontaci dove sei e dove vuoi arrivare. Rispondiamo con un&apos;analisi
            onesta — senza fuffa, senza promesse eccessive.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="voice-mono mb-2 text-white/35">Scrivi</p>
              <a
                href="mailto:info@gleeye.eu"
                className="group inline-flex items-center gap-2 font-satoshi text-2xl font-black text-white transition-colors hover:text-[#6db5ff] md:text-3xl"
              >
                info@gleeye.eu
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
            <div>
              <p className="voice-mono mb-2 text-white/35">Chiama</p>
              <a href="tel:+390100954533" className="font-satoshi text-xl font-bold text-white/85 transition-colors hover:text-[#6db5ff]">
                +39 010 09 54 533
              </a>
            </div>
            <div>
              <p className="voice-mono mb-2 text-white/35">Vieni a trovarci</p>
              <p className="font-jakarta text-white/70">Piazza Brignole 2/3 — 16122 Genova</p>
            </div>
          </div>
        </div>

        {/* form card */}
        <form
          onSubmit={submit}
          className="ct-card relative flex flex-col gap-4 self-start rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md md:p-9"
        >
          <span className="voice-mono absolute -top-3 left-8 bg-[#0a0a10] px-3 text-[#9b7bff]">
            Brief rapido
          </span>
          <label className="block">
            <span className="voice-mono mb-2 block text-white/40">Nome</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Come ti chiami?"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="voice-mono mb-2 block text-white/40">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="dove@risponderti.it"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="voice-mono mb-2 block text-white/40">Progetto</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Raccontaci in due righe cosa ti serve…"
              className={`${inputCls} resize-none`}
            />
          </label>
          <button
            type="submit"
            data-cursor="INVIA"
            className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-8 py-4 font-satoshi text-sm font-black uppercase tracking-wide text-white"
          >
            <span className="absolute inset-0 translate-y-full bg-[#f8f9fa] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-[#0a0a10]">
              Parliamo del tuo progetto
            </span>
          </button>
          <p className="voice-mono mt-1 text-center text-[9px] text-white/30">
            Nessuna newsletter. Solo una risposta vera.
          </p>
        </form>
      </div>
    </section>
  );
}

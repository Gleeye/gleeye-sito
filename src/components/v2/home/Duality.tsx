'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Il modello ibrido come TENDINA INTERATTIVA: muovi il divisore e passi
 * dal mondo boutique al mondo factory. Su mobile: due pannelli impilati.
 */

const BOUTIQUE = {
  label: "L'anima boutique",
  title: 'La cura di una boutique',
  desc: 'Non esecutori: partner. Supervisione costante, consulenza di direzione, coerenza garantita nel tempo.',
  points: ['Presidio intellettuale', 'Ufficio comunicazione esternalizzato', 'Coerenza di lungo periodo'],
};

const FACTORY = {
  label: "L'anima factory",
  title: 'La potenza di una factory',
  desc: "L'esperienza trasformata in protocollo: tempi certi, standard costante, anche su volumi elevati.",
  points: ['Protocollo replicabile', 'Tempi certi', 'Scala senza perdita di standard'],
};

export default function Duality() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const toReveal = gsap.utils.toArray<HTMLElement>('.duo-reveal', root);
      gsap.set(toReveal, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: root,
        start: 'top 70%',
        once: true,
        onEnter: () =>
          gsap.to(toReveal, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out', overwrite: 'auto' }),
      });
    }, root);

    /* la tendina */
    const stage = stageRef.current;
    const clip = clipRef.current;
    const handle = handleRef.current;
    if (!stage || !clip || !handle) return () => ctx.revert();

    const pos = { p: 50 };
    const apply = () => {
      clip.style.clipPath = `inset(0 0 0 ${pos.p}%)`;
      handle.style.left = `${pos.p}%`;
    };
    apply();

    const tweenTo = gsap.quickTo(pos, 'p', {
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: apply,
    });

    const fromEvent = (clientX: number) => {
      const r = stage.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      tweenTo(gsap.utils.clamp(10, 90, pct));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') fromEvent(e.clientX);
    };
    let dragging = false;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      fromEvent(e.clientX);
    };
    const onDrag = (e: PointerEvent) => {
      if (dragging) fromEvent(e.clientX);
    };
    const onUp = () => {
      dragging = false;
    };

    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', onUp);

    /* respiro quando nessuno la tocca */
    const idle = gsap.to(pos, {
      p: 58,
      duration: 3.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      onUpdate: apply,
      paused: false,
    });
    const stopIdle = () => idle.pause();
    stage.addEventListener('pointerenter', stopIdle, { once: true });

    return () => {
      ctx.revert();
      idle.kill();
      gsap.killTweensOf(pos);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointerenter', stopIdle);
      window.removeEventListener('pointermove', onDrag);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-28 md:py-36">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 md:mb-16">
          <h2 className="duo-reveal voice-display text-5xl text-[#0a0a10] md:text-7xl">
            Boutique <span className="text-gradient">×</span> Factory
          </h2>
          <div className="duo-reveal mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="max-w-xl font-jakarta font-medium leading-relaxed text-black/55">
              La cura del dettaglio di una boutique, la potenza di fuoco di una factory.
              Due anime, nessun compromesso.
            </p>
            <p className="voice-mono hidden items-center gap-2 text-[#4e92d8] md:flex">
              <MoveHorizontal className="h-4 w-4" /> muovi la lente
            </p>
          </div>
        </div>

        {/* ——— desktop: tendina ——— */}
        <div
          ref={stageRef}
          className="duo-reveal relative hidden h-[540px] cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] md:block"
          style={{ boxShadow: '0 40px 100px -50px rgba(10,10,16,0.4)' }}
        >
          {/* mondo BOUTIQUE (sotto) */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f4f1fb 0%, #eaf2fb 60%, #f6f4fc 100%)' }}>
            <div className="pointer-events-none absolute -left-20 -top-24 h-96 w-96" style={{ background: 'radial-gradient(closest-side, #9b7bff33, transparent)', borderRadius: '58% 42% 55% 45% / 55% 48% 52% 45%' }} />
            <span className="voice-display pointer-events-none absolute -right-6 -top-16 select-none text-[17rem] text-[#614aa2]/[0.06]" aria-hidden="true">B</span>
            <div className="flex h-full max-w-[46%] flex-col justify-between p-10 lg:p-14">
              <p className="voice-mono text-[#614aa2]">{BOUTIQUE.label}</p>
              <div>
                <h3 className="voice-display text-4xl text-[#0a0a10] lg:text-5xl">{BOUTIQUE.title}</h3>
                <p className="mt-5 font-jakarta font-medium leading-relaxed text-black/55">{BOUTIQUE.desc}</p>
                <ul className="mt-7 space-y-2.5">
                  {BOUTIQUE.points.map((li) => (
                    <li key={li} className="flex items-center gap-3 font-jakarta text-sm font-semibold text-[#0a0a10]/75">
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#614aa2]" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="voice-mono text-black/30">Qualità presidiata, sempre</p>
            </div>
          </div>

          {/* mondo FACTORY (sopra, clippato) */}
          <div ref={clipRef} className="absolute inset-0 bg-[#0a0a10] text-[#f8f9fa]" style={{ clipPath: 'inset(0 0 0 50%)' }}>
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#4e92d8]/25 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[#614aa2]/30 blur-[110px]" />
            <span className="voice-display pointer-events-none absolute -left-6 -top-16 select-none text-[17rem] text-white/[0.05]" aria-hidden="true">F</span>
            <div className="ml-auto flex h-full max-w-[46%] flex-col justify-between p-10 text-right lg:p-14">
              <p className="voice-mono text-[#6db5ff]">{FACTORY.label}</p>
              <div>
                <h3 className="voice-display text-4xl lg:text-5xl">{FACTORY.title}</h3>
                <p className="ml-auto mt-5 max-w-md font-jakarta font-medium leading-relaxed text-white/60">{FACTORY.desc}</p>
                <ul className="mt-7 space-y-2.5">
                  {FACTORY.points.map((li) => (
                    <li key={li} className="flex items-center justify-end gap-3 font-jakarta text-sm font-semibold text-white/75">
                      {li}
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#6db5ff]" />
                    </li>
                  ))}
                </ul>
              </div>
              <p className="voice-mono text-white/30">Output prevedibile, sempre</p>
            </div>
          </div>

          {/* maniglia */}
          <div
            ref={handleRef}
            className="pointer-events-none absolute inset-y-0 z-10"
            style={{ left: '50%' }}
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 -left-px w-0.5 bg-gradient-to-b from-[#6db5ff] via-white to-[#9b7bff]" />
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl">
              <MoveHorizontal className="h-5 w-5 text-[#0a0a10]" />
            </div>
          </div>
        </div>

        {/* ——— mobile: impilati ——— */}
        <div className="flex flex-col gap-5 md:hidden">
          <div className="duo-reveal relative overflow-hidden rounded-[1.8rem] p-7" style={{ background: 'linear-gradient(135deg, #f4f1fb, #eaf2fb)' }}>
            <p className="voice-mono mb-4 text-[#614aa2]">{BOUTIQUE.label}</p>
            <h3 className="voice-display text-3xl text-[#0a0a10]">{BOUTIQUE.title}</h3>
            <p className="mt-4 font-jakarta text-sm font-medium leading-relaxed text-black/55">{BOUTIQUE.desc}</p>
          </div>
          <div className="duo-reveal relative overflow-hidden rounded-[1.8rem] bg-[#0a0a10] p-7 text-[#f8f9fa]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4e92d8]/30 blur-[80px]" />
            <p className="voice-mono mb-4 text-[#6db5ff]">{FACTORY.label}</p>
            <h3 className="voice-display text-3xl">{FACTORY.title}</h3>
            <p className="mt-4 font-jakarta text-sm font-medium leading-relaxed text-white/60">{FACTORY.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

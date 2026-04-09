'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Lines of the big manifesto statement — each reveals independently
const STATEMENT_LINES = [
    'La maggior parte delle aziende',
    'costruisce la comunicazione',
    'prima di capire chi è.',
];
const PUNCHLINE = 'Gleeye rovescia questa logica.';

export default function ManifestoSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const ringRef    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ── Statement lines: emerge from below their overflow-hidden wrapper ── */
            gsap.from('.manifesto-line-inner', {
                y: '105%',
                duration: 1.3,
                stagger: 0.18,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.manifesto-statement',
                    start: 'top 78%',
                    once: true,
                },
            });

            /* ── Punchline: clip-path reveal left-to-right ── */
            gsap.from('.manifesto-punchline', {
                clipPath: 'inset(0 100% 0 0)',
                duration: 1.6,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: '.manifesto-punchline',
                    start: 'top 82%',
                    once: true,
                },
            });

            /* ── Label + body copy fade in ── */
            gsap.from('.manifesto-body', {
                opacity: 0, y: 28,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.manifesto-body',
                    start: 'top 82%',
                    once: true,
                },
            });

            /* ── Slow-rotating outer ring ── */
            if (ringRef.current) {
                gsap.to(ringRef.current, {
                    rotation: 360,
                    duration: 40,
                    ease: 'none',
                    repeat: -1,
                });
            }

            /* ── Stats counter on enter ── */
            gsap.from('.stat-number', {
                textContent: 0,
                duration: 1.8,
                ease: 'power2.out',
                snap: { textContent: 1 },
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.manifesto-stats',
                    start: 'top 85%',
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black overflow-hidden py-28 md:py-40 px-6"
        >
            {/* Background geometry — slow-rotating diamond ring */}
            <div
                ref={ringRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <div
                    className="w-[min(90vw,700px)] aspect-square border rounded-[40px] rotate-12 opacity-[0.06]"
                    style={{ borderColor: '#4e92d8', borderWidth: '1px' }}
                />
                <div
                    className="absolute w-[min(65vw,520px)] aspect-square border rounded-[30px] -rotate-6 opacity-[0.04]"
                    style={{ borderColor: '#614aa2', borderWidth: '1px' }}
                />
            </div>

            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-[0.08]"
                style={{ backgroundColor: '#4e92d8' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Section label */}
                <div className="manifesto-body flex items-center gap-3 mb-16">
                    <div className="w-6 h-px bg-[#4e92d8]/40" />
                    <span className="text-[10px] font-black tracking-[0.32em] uppercase text-[#4e92d8]/70 font-satoshi">
                        Il nostro approccio
                    </span>
                </div>

                {/* Big statement — line-by-line reveal */}
                <div className="manifesto-statement mb-8">
                    {STATEMENT_LINES.map((line, i) => (
                        <div key={i} className="overflow-hidden leading-none">
                            <span
                                className={[
                                    'manifesto-line-inner inline-block font-black font-satoshi tracking-tight',
                                    'text-[7.5vw] md:text-[5.5vw] lg:text-[4.5vw]',
                                    'text-white/22',
                                ].join(' ')}
                            >
                                {line}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Punchline — clip-path reveal */}
                <div className="overflow-hidden mb-20">
                    <p
                        className={[
                            'manifesto-punchline font-black font-satoshi tracking-tight',
                            'text-[7.5vw] md:text-[5.5vw] lg:text-[4.5vw]',
                            'bg-clip-text text-transparent',
                        ].join(' ')}
                        style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8 0%, #614aa2 100%)' }}
                    >
                        {PUNCHLINE}
                    </p>
                </div>

                {/* Body copy + stats */}
                <div className="manifesto-body grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                    <p className="text-base md:text-lg font-medium font-jakarta text-white/35 leading-relaxed max-w-lg">
                        Ogni percorso Identity inizia da una sola domanda:{' '}
                        <span className="text-white/60">chi sei davvero?</span>{' '}
                        Non cosa vendi, non come lo vendi — chi sei. La risposta a quella domanda
                        vale più di qualsiasi campagna pubblicitaria.
                    </p>

                    {/* Stats row */}
                    <div className="manifesto-stats flex gap-12 md:gap-16">
                        {[
                            { value: 12, unit: '+', label: 'anni di brand building' },
                            { value: 80, unit: '+', label: 'identità lanciate' },
                            { value: 3,  unit: '',  label: 'aree di intervento' },
                        ].map(({ value, unit, label }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="font-black font-satoshi text-3xl md:text-4xl text-white leading-none">
                                    <span className="stat-number">{value}</span>{unit}
                                </span>
                                <span className="text-[11px] text-white/28 font-medium font-jakarta uppercase tracking-[0.12em]">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

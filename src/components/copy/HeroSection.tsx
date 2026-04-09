'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
    const heroRef    = useRef<HTMLElement>(null);
    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const word1Ref   = useRef<HTMLSpanElement>(null);
    const word2Ref   = useRef<HTMLSpanElement>(null);
    const word3Ref   = useRef<HTMLSpanElement>(null);
    const copyRef    = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    /* ── canvas waveform ────────────────────────────────────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let rafId: number;
        const waves = [
            { amplitude: 110, frequency: 0.0022, phase: 0,   speed: 0.006,  color: '#4e92d8', opacity: 0.38 },
            { amplitude:  70, frequency: 0.0038, phase: 1.2, speed: 0.010,  color: '#4e92d8', opacity: 0.16 },
            { amplitude: 140, frequency: 0.0016, phase: 2.5, speed: 0.004,  color: '#4e92d8', opacity: 0.12 },
            { amplitude: 100, frequency: 0.0030, phase: 3.8, speed: 0.008,  color: '#614aa2', opacity: 0.32 },
            { amplitude:  85, frequency: 0.0048, phase: 4.5, speed: 0.012,  color: '#614aa2', opacity: 0.20 },
            { amplitude: 120, frequency: 0.0024, phase: 5.3, speed: 0.007,  color: '#614aa2', opacity: 0.12 },
        ];

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let scrollY = 0;
        let smoothScroll = 0;
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('scroll', onScroll);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            smoothScroll += (scrollY - smoothScroll) * 0.08;
            const distortion = Math.min(smoothScroll * 0.025, 40);
            const midY = canvas.height * 0.58;

            waves.forEach(w => {
                ctx.beginPath();
                ctx.moveTo(0, midY);
                for (let x = 0; x <= canvas.width; x += 12) {
                    const envelope = Math.sin((x / canvas.width) * Math.PI);
                    const y = Math.sin(x * w.frequency + w.phase) * (w.amplitude + distortion * Math.sin(x * 0.009));
                    ctx.lineTo(x, midY + y * envelope);
                }
                ctx.strokeStyle = w.color;
                ctx.globalAlpha = w.opacity;
                ctx.lineWidth   = 1.1;
                ctx.stroke();
                w.phase += w.speed;
            });
            rafId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    /* ── GSAP entrance ──────────────────────────────────────────────────── */
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.copy-eyebrow', {
                opacity: 0, y: 16, duration: 0.9, ease: 'power3.out',
            })
            .from([word1Ref.current, word2Ref.current, word3Ref.current], {
                y: '110%', duration: 1.4, stagger: 0.14, ease: 'power4.out',
            }, '-=0.6')
            .from(copyRef.current, {
                opacity: 0, y: 20, duration: 1.0, ease: 'power3.out',
            }, '-=0.8')
            .from(buttonsRef.current, {
                opacity: 0, y: 20, duration: 0.9, ease: 'power3.out',
            }, '-=0.9');
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-[100dvh] w-full overflow-hidden bg-[#07070f] flex flex-col justify-between py-12 md:py-20"
        >
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none mix-blend-screen"
                style={{ opacity: 0.55 }}
            />

            {/* Top bar */}
            <div className="copy-eyebrow relative z-10 flex items-center justify-between px-[8%]">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#576ebd]" />
                    <span className="text-[10px] font-black tracking-[0.28em] uppercase text-white/40 font-satoshi">
                        Factory — Strategic Copywriting
                    </span>
                </div>
                <span className="text-[10px] font-mono text-white/20 tracking-widest">03 / 05</span>
            </div>

            {/* Central headline block */}
            <div className="relative z-10 flex flex-col items-start px-[8%]">
                <p className="copy-eyebrow text-sm md:text-base font-bold text-white/35 uppercase tracking-[0.22em] font-satoshi mb-6 md:mb-8">
                    Le parole che ti servono.
                </p>

                <h1 className="flex flex-col leading-none">
                    <div className="overflow-hidden">
                        <span
                            ref={word1Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi text-white"
                            style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)', lineHeight: 1.0 }}
                        >
                            CHIARO.
                        </span>
                    </div>
                    <div className="overflow-hidden ml-[6%]">
                        <span
                            ref={word2Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi text-white/88"
                            style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)', lineHeight: 1.0 }}
                        >
                            INCISIVO.
                        </span>
                    </div>
                    <div className="overflow-hidden ml-[12%]">
                        <span
                            ref={word3Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi bg-clip-text text-transparent"
                            style={{
                                fontSize: 'clamp(4.5rem, 13vw, 11rem)',
                                lineHeight: 1.0,
                                backgroundImage: 'linear-gradient(130deg, #4e92d8 0%, #614aa2 100%)',
                            }}
                        >
                            TUO.
                        </span>
                    </div>
                </h1>
            </div>

            {/* Bottom row */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-[8%]">
                <div ref={buttonsRef}>
                    <a
                        href="#contact-copy"
                        className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden flex items-center gap-3 min-w-[220px] transition-all duration-700"
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8, #614aa2)' }}
                        />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.22em] group-hover:text-white transition-colors duration-500 font-satoshi">
                            Inizia il tuo progetto
                        </span>
                        <svg
                            className="relative z-10 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500 group-hover:[stroke:white]"
                            viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                            <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                    </a>
                </div>

                <div ref={copyRef} className="max-w-sm flex items-stretch gap-5">
                    <div className="w-px bg-white/15 shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white/30 leading-relaxed font-satoshi">
                        Testi asciutti e chirurgici che abbattono il rumore di fondo.
                        Scriviamo per catturare l&apos;attenzione in un mercato distratto —
                        e farla diventare un&apos;azione.
                    </p>
                </div>
            </div>
        </section>
    );
}

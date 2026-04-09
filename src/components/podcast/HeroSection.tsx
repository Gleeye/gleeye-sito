'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let targetScrollY = window.scrollY;
        let currentScrollY = window.scrollY;
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 6 Waves for 'Wow' effect: 3 Blue, 3 Purple
        const waves = [
            // Blue Set
            { amplitude: 120, frequency: 0.002, phase: 0, speed: 0.006, color: '#4e92d8', opacity: 0.4 },
            { amplitude: 80, frequency: 0.004, phase: 1, speed: 0.01, color: '#4e92d8', opacity: 0.2 },
            { amplitude: 150, frequency: 0.0015, phase: 2, speed: 0.004, color: '#4e92d8', opacity: 0.15 },
            // Purple Set
            { amplitude: 110, frequency: 0.003, phase: 3, speed: 0.008, color: '#614aa2', opacity: 0.35 },
            { amplitude: 90, frequency: 0.005, phase: 4, speed: 0.012, color: '#614aa2', opacity: 0.25 },
            { amplitude: 130, frequency: 0.0025, phase: 5, speed: 0.007, color: '#614aa2', opacity: 0.15 }
        ];

        const drawWaveform = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const midY = canvas.height * 0.55;

            currentScrollY += (targetScrollY - currentScrollY) * 0.1;
            const distortion = Math.min(currentScrollY * 0.03, 50);

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, midY);

                for (let x = 0; x <= canvas.width; x += 15) {
                    let y = Math.sin(x * wave.frequency + wave.phase) * (wave.amplitude + distortion * Math.sin(x * 0.01));
                    const envelope = Math.sin((x / canvas.width) * Math.PI);
                    ctx.lineTo(x, midY + y * envelope);
                }

                ctx.strokeStyle = wave.color;
                ctx.globalAlpha = wave.opacity;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                wave.phase += wave.speed;
            });

            animationFrameId = requestAnimationFrame(drawWaveform);
        };

        drawWaveform();

        const handleScroll = () => {
            targetScrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);

        let ctxGsap = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            tl.from('.hero-intro-text', {
                opacity: 0,
                y: 20,
                duration: 1.2,
                ease: "power3.out"
            })
                .from('.hero-pillar', {
                    y: 80,
                    opacity: 0,
                    skewY: 5,
                    duration: 1.5,
                    stagger: 0.3,
                    ease: "power4.out"
                }, "-=0.8")
                .from(copyRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=0.8")
                .from(buttonsRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1.0");

        }, heroRef);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
            ctxGsap.revert();
        };
    }, []);

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-black px-6 flex flex-col justify-between py-12 md:py-24" ref={heroRef}>
            {/* Liquid Background - 6 Waves Balanced */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none mix-blend-screen overflow-hidden"></canvas>

            {/* Top Spacer */}
            <div className="hidden md:block h-20"></div>

            {/* CENTRAL BLOCK: Intro + Pillars */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-start w-fit">
                    {/* Intro Phrase - Aligned with the 'F' of FORTE */}
                    <div className="hero-intro-text mb-4 ml-1 md:ml-3">
                        <p className="text-sm md:text-xl lg:text-2xl font-bold text-white uppercase tracking-[0.2em] leading-tight font-satoshi">
                            Il tuo podcast comincia qui.
                        </p>
                    </div>

                    {/* Pillars Row */}
                    <h1 className="flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-10 text-[11vw] lg:text-[7.5rem] xl:text-[9.5rem] font-black tracking-[-0.05em] font-satoshi text-white leading-none">
                        <span className="hero-pillar inline-block">FORTE.</span>
                        <span className="hero-pillar inline-block">CHIARO.</span>
                        <span className="hero-pillar inline-block bg-gradient-to-r from-[#4e92d8] to-[#614aa2] bg-clip-text text-transparent">TUO.</span>
                    </h1>
                </div>
            </div>

            {/* BOTTOM ROW: CTA and Copy (Pulled Inward) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10 px-4 md:px-0">
                {/* Buttons Left */}
                <div ref={buttonsRef} className="w-full md:w-auto flex justify-center md:justify-start">
                    <a href="#contact-form" className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden flex items-center justify-center min-w-[220px] transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4e92d8] to-[#614aa2] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <span className="relative z-10 tech-label text-[10px] font-bold group-hover:text-white transition-colors duration-500 uppercase tracking-[0.2em]">Inizia il tuo racconto</span>
                    </a>
                </div>

                {/* Copy Block Bottom Right */}
                <div ref={copyRef} className="max-w-md flex items-stretch gap-6">
                    <div className="w-px bg-white/20 shrink-0" />
                    <div className="py-1">
                        <p className="text-base md:text-lg font-medium text-white/30 leading-relaxed tracking-tight font-satoshi text-left">
                            Scegli un format. Registri da remoto. Al resto pensiamo noi. Il modo più semplice per entrare nel mondo podcast – e restarci.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

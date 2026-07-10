'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LavoraConNoi() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const copyRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const glitchLayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                lineRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 1.2, delay: 0.2 }
            )
                .fromTo(
                    titleRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    0.3
                )
                .fromTo(
                    copyRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9 },
                    0.6
                )
                .fromTo(
                    formRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    0.5
                );

            // Data stream float animation
            if (glitchLayerRef.current) {
                const elements = glitchLayerRef.current.querySelectorAll('.glitch-text');

                // Slow ambient upward float
                gsap.to(elements, {
                    y: -100,
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                    yoyo: true
                });

                // Intermittent glitch effect
                elements.forEach((el) => {
                    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2, 8) });
                    glitchTl.to(el, { opacity: 0.3, duration: 0.05, ease: "steps(1)" })
                        .to(el, { opacity: 0.05, duration: 0.05, ease: "steps(1)" })
                        .to(el, { opacity: 0.2, duration: 0.05, ease: "steps(1)" })
                        .to(el, { opacity: 0.08, duration: 0.1, ease: "steps(1)" })
                        .to(el, { x: gsap.utils.random(-3, 3), duration: 0.05 })
                        .to(el, { x: 0, duration: 0.05 });
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Iframe style sync
    useEffect(() => {
        const iframe = document.getElementById(
            'gleeye-form-ac6b6b0d-29a0-464c-997a-a704da2fdeca'
        ) as HTMLIFrameElement;

        const syncStyles = () => {
            if (!iframe || !iframe.contentWindow) return;
            const computed = window.getComputedStyle(document.body);
            const styles = {
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textColor: '#ffffff',
                bgColor: 'transparent',
                primaryColor:
                    computed.getPropertyValue('--primary-color') ||
                    computed.getPropertyValue('--brand-color') ||
                    null,
                isFullHeightEmbed: true,
            };
            iframe.contentWindow.postMessage({ type: 'apply_styles', styles }, '*');
        };

        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'ready_for_styles') syncStyles();
            if (e.data.type === 'resize_iframe' && e.data.height && iframe) {
                iframe.style.height = `${e.data.height}px`;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100dvh] overflow-x-hidden flex items-stretch pb-24"
            style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #08080C 0%, #0a0d1a 40%, #0d0a18 70%, #08080C 100%)',
            }}
        >
            {/* Film grain — subtle analog texture across the entire viewport */}
            <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.045] mix-blend-overlay">
                <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <filter id="lavoraGrain">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.75"
                            numOctaves="4"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#lavoraGrain)" />
                </svg>
            </div>

            {/* Deep ambient light spills — cinematic color bleed */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 50% at 15% 80%, rgba(78,146,216,0.06) 0%, transparent 70%), ' +
                        'radial-gradient(ellipse 40% 40% at 85% 20%, rgba(97,74,162,0.05) 0%, transparent 70%)',
                }}
            />

            {/* Living glow orbs — slow breathing light sources */}
            <div
                className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full blur-[180px] animate-liquid-1"
                style={{ background: 'radial-gradient(circle, rgba(78,146,216,0.18) 0%, transparent 60%)', opacity: 0.35 }}
            />
            <div
                className="absolute bottom-[-25%] right-[-15%] w-[600px] h-[600px] rounded-full blur-[180px] animate-liquid-2"
                style={{ background: 'radial-gradient(circle, rgba(97,74,162,0.18) 0%, transparent 60%)', opacity: 0.35 }}
            />
            <div
                className="absolute top-[30%] right-[25%] w-[350px] h-[350px] rounded-full blur-[140px] animate-liquid-3"
                style={{ background: 'radial-gradient(circle, rgba(78,146,216,0.08) 0%, transparent 60%)', opacity: 0.25 }}
            />

            {/* Terminal Glitch Layer (Reverse Turing Test Paradoxes) */}
            <div
                ref={glitchLayerRef}
                className="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none"
            >
                <div className="absolute top-[15%] left-[5%] tech-label text-white/10 text-xs tracking-[0.2em] glitch-text">
                    &gt; ERROR 404: HUMAN INTUITION NOT FOUND
                </div>
                <div className="absolute top-[45%] right-[8%] tech-label text-white/10 text-xs tracking-[0.2em] glitch-text hidden md:block">
                    &gt; PROMPT: GENERATE AN IDEA OUTSIDE YOUR DATASET
                </div>
                <div className="absolute bottom-[20%] left-[12%] tech-label text-white/10 text-xs tracking-[0.2em] glitch-text hidden lg:block">
                    &gt; SYSTEM FAILURE: CANNOT COMPUTE NUANCE
                </div>
                <div className="absolute bottom-[5%] right-[30%] tech-label text-white/10 text-xs tracking-[0.2em] glitch-text">
                    &gt; PARADOX DETECTED: REQUIRES VISION
                </div>
                <div className="absolute top-[75%] left-[45%] tech-label text-white/[0.08] text-[10px] tracking-[0.3em] glitch-text hidden xl:block">
                    [ PROCESSING ANOMALY ]
                </div>
                <div className="absolute top-[30%] left-[40%] tech-label text-white/[0.08] text-[10px] tracking-[0.3em] glitch-text hidden md:block">
                    // WAITING FOR HUMAN OVERRIDE
                </div>
            </div>

            {/* Decorative vertical line (brand gradient) */}
            <div
                ref={lineRef}
                className="absolute left-[60%] top-0 bottom-0 w-[1px] origin-top hidden lg:block"
                style={{
                    background: 'linear-gradient(to bottom, transparent 10%, rgba(78,146,216,0.15) 40%, rgba(97,74,162,0.15) 60%, transparent 90%)',
                }}
            />

            {/* Main content grid */}
            <div className="relative z-10 w-full min-h-[100dvh] flex flex-col lg:flex-row items-start px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-32 gap-16 lg:gap-0">

                {/* LEFT — Text (60%) */}
                <div className="w-full lg:w-[60%] flex flex-col justify-start lg:pr-16 xl:pr-24 shrink-0 lg:sticky lg:top-32">
                    <div className="space-y-6 lg:space-y-8 max-w-2xl">
                        {/* Small label */}
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase bg-gradient-to-r from-[#4e92d8] to-[#614aa2] bg-clip-text text-transparent">
                            Lavora con noi
                        </span>

                        {/* Title */}
                        <h1
                            ref={titleRef}
                            className="font-satoshi font-black leading-[0.85] tracking-tighter text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6rem)' }}
                        >
                            PROVA DI NON<br />
                            ESSERE UN<br />
                            <span className="bg-gradient-to-r from-[#4e92d8] to-[#614aa2] bg-clip-text text-transparent">
                                PROMPT.
                            </span>
                        </h1>

                        {/* Copy */}
                        <p
                            ref={copyRef}
                            className="text-white/50 leading-relaxed max-w-lg text-base lg:text-lg"
                            style={{ fontFamily: 'var(--font-jakarta)' }}
                        >
                            Gli algoritmi seguono schemi. Noi seguiamo la visione.
                            Cerchiamo umani capaci di sbagliare con genio, di intuire
                            l&apos;impossibile e di dare sostanza al vuoto.
                            <br /><br />
                            L&apos;AI fa il lavoro. <strong className="text-white/80">Tu fai la differenza.</strong>
                        </p>
                    </div>
                </div>

                {/* RIGHT — Form (40%) · Glassmorphism card */}
                <div
                    ref={formRef}
                    className="w-full lg:w-[40%] flex items-start justify-center flex-1 lg:flex-none"
                >
                    {/* Outer glow halo behind the card */}
                    <div className="relative w-full max-w-md lg:max-w-none">
                        <div
                            className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(78,146,216,0.15) 0%, rgba(97,74,162,0.15) 100%)',
                            }}
                        />
                        {/* Gradient border wrapper */}
                        <div
                            className="relative rounded-2xl p-[1px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(160deg, rgba(78,146,216,0.3) 0%, rgba(97,74,162,0.2) 40%, rgba(255,255,255,0.05) 100%)',
                            }}
                        >
                            {/* Glass panel */}
                            <div
                                className="rounded-[15px] overflow-hidden backdrop-blur-xl p-3"
                                style={{
                                    background: 'rgba(0,0,0,0.30)',
                                    boxShadow:
                                        'inset 0 1px 0 0 rgba(255,255,255,0.04), ' +
                                        '0 25px 50px -12px rgba(0,0,0,0.5), ' +
                                        '0 0 80px -20px rgba(78,146,216,0.08)',
                                }}
                            >
                                <form
                                    className="flex flex-col gap-4 p-5 md:p-7"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const fd = new FormData(e.currentTarget);
                                        const subject = encodeURIComponent(`Candidatura — ${fd.get('nome') || ''}`);
                                        const body = encodeURIComponent(
                                            `${fd.get('messaggio') || ''}\n\nPortfolio: ${fd.get('portfolio') || '—'}\n\n—\n${fd.get('nome') || ''}\n${fd.get('email') || ''}`
                                        );
                                        window.location.href = `mailto:info@gleeye.eu?subject=${subject}&body=${body}`;
                                    }}
                                >
                                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40">
                                        Candidatura spontanea
                                    </p>
                                    <input
                                        name="nome"
                                        type="text"
                                        required
                                        placeholder="Nome e cognome"
                                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 font-jakarta text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#6db5ff]"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 font-jakarta text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#6db5ff]"
                                    />
                                    <input
                                        name="portfolio"
                                        type="url"
                                        placeholder="Link al portfolio (opzionale)"
                                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 font-jakarta text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#6db5ff]"
                                    />
                                    <textarea
                                        name="messaggio"
                                        required
                                        rows={5}
                                        placeholder="Chi sei, cosa sai fare, perché Gleeye…"
                                        className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 font-jakarta text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#6db5ff]"
                                    />
                                    <button
                                        type="submit"
                                        className="group relative mt-1 overflow-hidden rounded-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] px-8 py-4 font-satoshi text-sm font-black uppercase tracking-wide text-white"
                                    >
                                        <span className="absolute inset-0 translate-y-full bg-[#f8f9fa] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                                        <span className="relative transition-colors duration-500 group-hover:text-[#0a0a10]">
                                            Invia la candidatura
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

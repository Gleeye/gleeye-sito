'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─── brand colours ─────────────────────────────────────────────────────── */
const BLUE   = [78, 146, 216] as const;
const PURPLE = [97,  74, 162] as const;
const rgba = (rgb: readonly [number, number, number], a: number) =>
    `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

export default function IdentityHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef(0);

    /* word / element refs */
    const badgeRef = useRef<HTMLDivElement>(null);
    const word1Ref = useRef<HTMLSpanElement>(null);
    const word2Ref = useRef<HTMLSpanElement>(null);
    const word3Ref = useRef<HTMLSpanElement>(null);
    const copyRef  = useRef<HTMLDivElement>(null);
    const ctaRef   = useRef<HTMLDivElement>(null);

    /* ── Canvas RAF ────────────────────────────────────────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let rafId: number;
        let t = 0;

        const resize = () => {
            canvas.width  = canvas.offsetWidth  * devicePixelRatio;
            canvas.height = canvas.offsetHeight * devicePixelRatio;
        };
        resize();
        window.addEventListener('resize', resize);

        /* three ambient blobs — shift position with scroll progress */
        const blobs: {
            bx: number; by: number; r: number;
            rgb: readonly [number, number, number];
            driftX: number; driftY: number;
        }[] = [
            { bx: 0.76, by: 0.20, r: 0.40, rgb: BLUE,   driftX:  0.0008, driftY:  0.0006 },
            { bx: 0.18, by: 0.74, r: 0.34, rgb: PURPLE, driftX: -0.0011, driftY: -0.0009 },
            { bx: 0.52, by: 0.52, r: 0.22, rgb: BLUE,   driftX:  0.0013, driftY:  0.0015 },
        ];

        const draw = () => {
            const p = progressRef.current;
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            t += 1;

            /* blobs */
            blobs.forEach((b, i) => {
                const ox = Math.sin(t * b.driftX * 600 + i * 1.4) * 0.055;
                const oy = Math.cos(t * b.driftY * 500 + i * 2.1) * 0.045;
                /* scroll shifts blue right→left, purple left→right */
                const scrollX = i === 0 ? -0.14 * p : i === 1 ? 0.10 * p : 0.05 * p;
                const scrollY = i === 0 ? -0.06 * p : i === 1 ? -0.12 * p : -0.04 * p;
                const px = (b.bx + ox + scrollX) * W;
                const py = (b.by + oy + scrollY) * H;
                const radius = b.r * Math.min(W, H);
                const g = ctx.createRadialGradient(px, py, 0, px, py, radius);
                g.addColorStop(0,   rgba(b.rgb, 0.30 + p * 0.14));
                g.addColorStop(0.5, rgba(b.rgb, 0.11 + p * 0.05));
                g.addColorStop(1,   rgba(b.rgb, 0));
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            /* brand-mark — draws itself from scroll progress 0.18 → 0.88 */
            const markProg = Math.max(0, Math.min(1, (p - 0.18) / 0.70));
            if (markProg > 0) {
                const cx = W * 0.71;
                const cy = H * 0.50;
                const base = Math.min(W, H) * 0.155;
                ctx.save();

                /* outer glow */
                ctx.globalAlpha = markProg * 0.08;
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.8);
                glow.addColorStop(0, rgba(BLUE, 1));
                glow.addColorStop(1, rgba(PURPLE, 0));
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(cx, cy, base * 1.8, 0, Math.PI * 2);
                ctx.fill();

                /* three concentric arcs — each delayed in progress */
                const arcScales  = [1.0, 0.60, 0.28];
                const arcDelays  = [0,   0.22, 0.44];
                const arcWidths  = [1.5,  1.2,  1.0];

                arcScales.forEach((scale, i) => {
                    const ap = Math.max(0, Math.min(1, (markProg - arcDelays[i]) / 0.50));
                    if (ap <= 0) return;
                    const grad = ctx.createLinearGradient(cx - base, cy, cx + base, cy);
                    grad.addColorStop(0, rgba(BLUE,   0.90));
                    grad.addColorStop(1, rgba(PURPLE, 0.90));
                    ctx.globalAlpha = markProg * 0.38;
                    ctx.beginPath();
                    ctx.arc(cx, cy, base * scale, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ap);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth   = arcWidths[i];
                    ctx.stroke();
                });

                /* crosshairs — extend outward */
                const crossLen = base * 1.55 * Math.min(1, markProg * 1.8);
                ctx.globalAlpha = markProg * 0.25;
                ctx.strokeStyle = rgba(BLUE, 0.7);
                ctx.lineWidth   = 0.8;
                ctx.beginPath();
                ctx.moveTo(cx - crossLen, cy); ctx.lineTo(cx + crossLen, cy);
                ctx.moveTo(cx, cy - crossLen); ctx.lineTo(cx, cy + crossLen);
                ctx.stroke();

                /* tick marks at cardinal points */
                if (markProg > 0.45) {
                    const ta = Math.min(1, (markProg - 0.45) / 0.30);
                    ctx.globalAlpha = ta * 0.45;
                    const tickLen  = base * 0.20;
                    const tickOuter = base * 1.08;
                    [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(angle => {
                        const ox2 = Math.cos(angle);
                        const oy2 = Math.sin(angle);
                        ctx.beginPath();
                        ctx.moveTo(cx + ox2 * tickOuter,              cy + oy2 * tickOuter);
                        ctx.lineTo(cx + ox2 * (tickOuter - tickLen),  cy + oy2 * (tickOuter - tickLen));
                        ctx.strokeStyle = rgba(PURPLE, 1);
                        ctx.lineWidth   = 1.5;
                        ctx.stroke();
                    });
                }

                /* centre dot */
                if (markProg > 0.60) {
                    const da = Math.min(1, (markProg - 0.60) / 0.20);
                    ctx.globalAlpha = da * 0.55;
                    const dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.07);
                    dg.addColorStop(0, rgba(BLUE,   1));
                    dg.addColorStop(1, rgba(PURPLE, 0));
                    ctx.fillStyle = dg;
                    ctx.beginPath();
                    ctx.arc(cx, cy, base * 0.07, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }

            rafId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    /* ── GSAP ScrollTrigger ────────────────────────────────────────────── */
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            /* initial hidden state for scroll-driven elements */
            gsap.set(word2Ref.current, { opacity: 0, y: 50 });
            gsap.set(word3Ref.current, { opacity: 0, y: 50 });
            gsap.set(copyRef.current,  { opacity: 0, y: 28 });
            gsap.set(ctaRef.current,   { opacity: 0, y: 28 });

            /* page-load entrance for badge + word1 */
            gsap.from(badgeRef.current, {
                x: -24, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.12,
            });
            gsap.from(word1Ref.current, {
                y: '115%', duration: 1.4, ease: 'power4.out', delay: 0.20,
            });

            /* scroll-driven progress tracker */
            ScrollTrigger.create({
                trigger: section,
                start:   'top top',
                end:     'bottom bottom',
                onUpdate(self) {
                    const p = self.progress;
                    progressRef.current = p;

                    const lerp = (start: number, end: number, val: number) =>
                        Math.max(0, Math.min(1, (val - start) / (end - start)));

                    /* WORD 2 — progress 0.10 → 0.33 */
                    const w2 = lerp(0.10, 0.33, p);
                    if (word2Ref.current) {
                        word2Ref.current.style.opacity   = String(w2);
                        word2Ref.current.style.transform = `translateY(${(1 - w2) * 50}px)`;
                    }

                    /* WORD 3 — progress 0.28 → 0.52 */
                    const w3 = lerp(0.28, 0.52, p);
                    if (word3Ref.current) {
                        word3Ref.current.style.opacity   = String(w3);
                        word3Ref.current.style.transform = `translateY(${(1 - w3) * 50}px)`;
                    }

                    /* COPY — progress 0.50 → 0.68 */
                    const cp = lerp(0.50, 0.68, p);
                    if (copyRef.current) {
                        copyRef.current.style.opacity   = String(cp);
                        copyRef.current.style.transform = `translateY(${(1 - cp) * 28}px)`;
                    }

                    /* CTA — progress 0.62 → 0.80 */
                    const ct = lerp(0.62, 0.80, p);
                    if (ctaRef.current) {
                        ctaRef.current.style.opacity   = String(ct);
                        ctaRef.current.style.transform = `translateY(${(1 - ct) * 28}px)`;
                    }
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: '220vh' }}
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07070f] flex flex-col justify-between py-12 md:py-20">

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                />

                {/* Top bar */}
                <div ref={badgeRef} className="relative z-10 flex items-center justify-between w-full px-[8%]">
                    <div className="flex items-center gap-3">
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#576ebd' }}
                        />
                        <span className="text-[10px] font-black tracking-[0.28em] uppercase text-white/40 font-satoshi">
                            Boutique Area — Brand Identity
                        </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/20 tracking-widest">01 / 03</span>
                </div>

                {/* Headline — staggered, scroll-driven */}
                <div className="relative z-10 flex flex-col leading-none px-[8%]">

                    <p className="text-sm md:text-base font-bold text-white/35 uppercase tracking-[0.22em] font-satoshi mb-6 md:mb-10">
                        Il tuo brand prende forma qui.
                    </p>

                    {/* SCOPRI — immediate, mask reveal on load */}
                    <div className="overflow-hidden">
                        <span
                            ref={word1Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi text-white"
                            style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', lineHeight: 1.0 }}
                        >
                            SCOPRI.
                        </span>
                    </div>

                    {/* DEFINISCI — scroll-triggered fade+slide */}
                    <div className="ml-[5%] md:ml-[7%]">
                        <span
                            ref={word2Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi text-white/90"
                            style={{
                                fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
                                lineHeight: 1.0,
                                willChange: 'transform, opacity',
                            }}
                        >
                            DEFINISCI.
                        </span>
                    </div>

                    {/* POSSIEDI — gradient, most offset */}
                    <div className="ml-[10%] md:ml-[14%]">
                        <span
                            ref={word3Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi bg-clip-text text-transparent"
                            style={{
                                fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
                                lineHeight: 1.0,
                                backgroundImage: 'linear-gradient(130deg, #4e92d8 0%, #614aa2 100%)',
                                willChange: 'transform, opacity',
                            }}
                        >
                            POSSIEDI.
                        </span>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-[8%]">

                    {/* CTA */}
                    <div ref={ctaRef} style={{ willChange: 'transform, opacity' }}>
                        <a
                            href="#identity-services"
                            className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden flex items-center gap-3 min-w-[220px] transition-all duration-700"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8, #614aa2)' }}
                            />
                            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.22em] group-hover:text-white transition-colors duration-500 font-satoshi">
                                Scopri i servizi
                            </span>
                            <svg
                                className="relative z-10 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500 group-hover:[stroke:white]"
                                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
                            >
                                <path d="M2 6h8M6 2l4 4-4 4" />
                            </svg>
                        </a>
                    </div>

                    {/* Descriptor */}
                    <div
                        ref={copyRef}
                        className="max-w-sm flex items-stretch gap-5"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <div className="w-px bg-white/15 shrink-0" />
                        <p className="text-sm md:text-base font-medium text-white/30 leading-relaxed font-satoshi">
                            Dal DNA al brand book: ogni step costruisce il prossimo.
                            Il risultato è un brand che sa chi è — e lo dimostra
                            a ogni touchpoint, senza eccezioni.
                        </p>
                    </div>
                </div>

                {/* Scroll nudge */}
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="text-[9px] font-mono tracking-[0.32em] uppercase text-white/18">scroll</span>
                    <div className="w-px h-7 bg-gradient-to-b from-white/18 to-transparent" />
                </div>
            </div>
        </section>
    );
}

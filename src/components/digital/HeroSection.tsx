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
const mix = (t: number): readonly [number, number, number] => [
    Math.round(BLUE[0] + (PURPLE[0] - BLUE[0]) * t),
    Math.round(BLUE[1] + (PURPLE[1] - BLUE[1]) * t),
    Math.round(BLUE[2] + (PURPLE[2] - BLUE[2]) * t),
];

/* deterministic pseudo-random (seeded) for stable node positions */
function seededRng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

export default function DigitalHeroSection() {
    const sectionRef  = useRef<HTMLElement>(null);
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef(0);

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

        /* ── constellation nodes (seeded, stable across frames) ── */
        const rng = seededRng(42);
        const NODE_COUNT = 28;
        const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
            /* cluster nodes on right-centre 40–95% of width, 15–85% height */
            nx: 0.40 + rng() * 0.55,
            ny: 0.12 + rng() * 0.76,
            t: rng(),                  /* mix value 0→1 for colour */
            pulseOffset: rng() * Math.PI * 2,
            size: 1.8 + rng() * 2.8,
        }));

        /* pre-compute closest-neighbour pairs (distance threshold) */
        const THRESHOLD = 0.24; /* normalised distance */
        const edges: { a: number; b: number; dist: number }[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                const dx = nodes[i].nx - nodes[j].nx;
                const dy = nodes[i].ny - nodes[j].ny;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < THRESHOLD) edges.push({ a: i, b: j, dist: d });
            }
        }
        /* sort edges by distance so short ones appear first */
        edges.sort((x, y) => x.dist - y.dist);

        /* ── two ambient blobs ── */
        const blobs = [
            { bx: 0.80, by: 0.18, r: 0.38, rgb: BLUE   },
            { bx: 0.15, by: 0.78, r: 0.30, rgb: PURPLE  },
        ];

        const draw = () => {
            const p = progressRef.current;
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            t += 1;

            /* blobs */
            blobs.forEach((b, i) => {
                const ox = Math.sin(t * 0.0007 + i * 1.8) * 0.05;
                const oy = Math.cos(t * 0.0009 + i * 2.4) * 0.04;
                const px = (b.bx + ox - (i === 0 ? 0.10 : -0.08) * p) * W;
                const py = (b.by + oy - 0.06 * p) * H;
                const r  = b.r * Math.min(W, H);
                const g  = ctx.createRadialGradient(px, py, 0, px, py, r);
                g.addColorStop(0,   rgba(b.rgb, 0.26 + p * 0.12));
                g.addColorStop(0.5, rgba(b.rgb, 0.09 + p * 0.04));
                g.addColorStop(1,   rgba(b.rgb, 0));
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(px, py, r, 0, Math.PI * 2);
                ctx.fill();
            });

            /* edges — reveal progressively with scroll */
            const edgeReveal = Math.max(0, Math.min(1, (p - 0.08) / 0.72));
            const edgesVisible = Math.floor(edges.length * edgeReveal);
            edges.slice(0, edgesVisible).forEach(({ a, b, dist }) => {
                const na = nodes[a]; const nb = nodes[b];
                const ax = na.nx * W; const ay = na.ny * H;
                const bx = nb.nx * W; const by = nb.ny * H;
                const edgeT = (na.t + nb.t) / 2;
                const edgeCol = mix(edgeT);
                const alpha = (1 - dist / THRESHOLD) * 0.18 * edgeReveal;
                const grad = ctx.createLinearGradient(ax, ay, bx, by);
                grad.addColorStop(0, rgba(mix(na.t), alpha));
                grad.addColorStop(1, rgba(mix(nb.t), alpha));
                ctx.beginPath();
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.8;
                ctx.stroke();
                void edgeCol; /* suppress unused-var */
            });

            /* nodes — appear with scroll, pulse */
            const nodeReveal = Math.max(0, Math.min(1, (p - 0.05) / 0.65));
            const nodesVisible = Math.floor(NODE_COUNT * nodeReveal);
            nodes.slice(0, nodesVisible).forEach(n => {
                const px = n.nx * W;
                const py = n.ny * H;
                const pulse = 0.7 + 0.3 * Math.sin(t * 0.018 + n.pulseOffset);
                const col = mix(n.t);
                /* outer glow */
                const gr = ctx.createRadialGradient(px, py, 0, px, py, n.size * 5);
                gr.addColorStop(0, rgba(col, 0.20 * pulse * nodeReveal));
                gr.addColorStop(1, rgba(col, 0));
                ctx.fillStyle = gr;
                ctx.beginPath();
                ctx.arc(px, py, n.size * 5, 0, Math.PI * 2);
                ctx.fill();
                /* core */
                ctx.fillStyle = rgba(col, 0.65 * pulse);
                ctx.beginPath();
                ctx.arc(px, py, n.size, 0, Math.PI * 2);
                ctx.fill();
            });

            /* data packet — travels along a path at high scroll progress */
            if (p > 0.55 && edges.length > 0) {
                const packetP = Math.min(1, (p - 0.55) / 0.35);
                const edgeIdx = Math.floor(packetP * (edges.length - 1));
                const edgeFrac = (packetP * (edges.length - 1)) - edgeIdx;
                const e = edges[Math.min(edgeIdx, edges.length - 1)];
                const na = nodes[e.a]; const nb = nodes[e.b];
                const px = (na.nx + (nb.nx - na.nx) * edgeFrac) * W;
                const py = (na.ny + (nb.ny - na.ny) * edgeFrac) * H;
                const pCol = mix(edgeFrac);
                const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
                pg.addColorStop(0, rgba(pCol, 0.85));
                pg.addColorStop(1, rgba(pCol, 0));
                ctx.fillStyle = pg;
                ctx.beginPath();
                ctx.arc(px, py, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = rgba([255, 255, 255], 0.9);
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
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
            gsap.set(word2Ref.current, { opacity: 0, y: 50 });
            gsap.set(word3Ref.current, { opacity: 0, y: 50 });
            gsap.set(copyRef.current,  { opacity: 0, y: 28 });
            gsap.set(ctaRef.current,   { opacity: 0, y: 28 });

            gsap.from(badgeRef.current, {
                x: -24, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.12,
            });
            gsap.from(word1Ref.current, {
                y: '115%', duration: 1.4, ease: 'power4.out', delay: 0.20,
            });

            ScrollTrigger.create({
                trigger: section,
                start:   'top top',
                end:     'bottom bottom',
                onUpdate(self) {
                    const p = self.progress;
                    progressRef.current = p;

                    const lerp = (s: number, e: number, v: number) =>
                        Math.max(0, Math.min(1, (v - s) / (e - s)));

                    /* WORD 2 — 0.10 → 0.33 */
                    const w2 = lerp(0.10, 0.33, p);
                    if (word2Ref.current) {
                        word2Ref.current.style.opacity   = String(w2);
                        word2Ref.current.style.transform = `translateY(${(1 - w2) * 50}px)`;
                    }

                    /* WORD 3 — 0.28 → 0.52 */
                    const w3 = lerp(0.28, 0.52, p);
                    if (word3Ref.current) {
                        word3Ref.current.style.opacity   = String(w3);
                        word3Ref.current.style.transform = `translateY(${(1 - w3) * 50}px)`;
                    }

                    /* COPY — 0.50 → 0.68 */
                    const cp = lerp(0.50, 0.68, p);
                    if (copyRef.current) {
                        copyRef.current.style.opacity   = String(cp);
                        copyRef.current.style.transform = `translateY(${(1 - cp) * 28}px)`;
                    }

                    /* CTA — 0.62 → 0.80 */
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
                            Boutique Area — Digital
                        </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/20 tracking-widest">02 / 03</span>
                </div>

                {/* Headline */}
                <div className="relative z-10 flex flex-col leading-none px-[8%]">
                    <p className="text-sm md:text-base font-bold text-white/35 uppercase tracking-[0.22em] font-satoshi mb-6 md:mb-10">
                        La tua presenza che converte.
                    </p>

                    {/* CONNETTI — immediate */}
                    <div className="overflow-hidden">
                        <span
                            ref={word1Ref}
                            className="inline-block font-black tracking-[-0.05em] font-satoshi text-white"
                            style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', lineHeight: 1.0 }}
                        >
                            CONNETTI.
                        </span>
                    </div>

                    {/* CRESCI — scroll-triggered */}
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
                            CRESCI.
                        </span>
                    </div>

                    {/* CONVERTI — gradient, most offset */}
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
                            CONVERTI.
                        </span>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 px-[8%]">

                    {/* CTA */}
                    <div ref={ctaRef} style={{ willChange: 'transform, opacity' }}>
                        <a
                            href="#digital-services"
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
                            Sito, social, SEO, advertising: ogni canale lavora in sinergia.
                            Non visibilità generica — presenza misurabile
                            che trasforma l&apos;attenzione in risultato.
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

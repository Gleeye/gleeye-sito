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

        // Digital Grid Animation
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        const particleCount = 40;
        let animationFrameId: number;

        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number; y: number; speed: number; size: number; opacity: number;
            constructor() {
                const canvasInside = canvasRef.current;
                this.x = Math.random() * (canvasInside?.width || 1000);
                this.y = Math.random() * (canvasInside?.height || 1000);
                this.speed = 0.2 + Math.random() * 0.5;
                this.size = 1 + Math.random() * 1.5;
                this.opacity = 0.1 + Math.random() * 0.3;
            }
            update() {
                const canvasInside = canvasRef.current;
                this.y -= this.speed;
                if (this.y < 0) this.y = (canvasInside?.height || 1000);
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        };

        const streams: { x: number, y: number, length: number, speed: number, axis: 'h' | 'v' }[] = [];
        for (let i = 0; i < 15; i++) {
            streams.push({
                x: Math.random() * 2000,
                y: Math.random() * 2000,
                length: 100 + Math.random() * 300,
                speed: 2 + Math.random() * 5,
                axis: Math.random() > 0.5 ? 'h' : 'v'
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const canvasInside = canvasRef.current;
            if (!ctx || !canvasInside) return;

            ctx.clearRect(0, 0, canvasInside.width, canvasInside.height);

            // 0. Mouse Glow (Ambient Light)
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasInside.width, canvasInside.height);

            // 1. Perspective Grid (Horizontal)
            const spacing = 120;
            const scrollOffset = (window.scrollY * 0.15) % spacing;

            for (let y = -spacing; y < canvasInside.height + spacing; y += spacing) {
                const actualY = y + scrollOffset;
                const distFromMouse = Math.abs(actualY - mouseY);
                const mouseFactor = Math.max(0, 1 - distFromMouse / 300);
                const opacity = Math.max(0, (0.05 + mouseFactor * 0.1) * (1 - Math.abs(actualY - canvasInside.height / 2) / (canvasInside.height / 1.1)));

                ctx.strokeStyle = `rgba(78, 146, 216, ${opacity})`;
                ctx.lineWidth = 0.8 + mouseFactor * 0.5;
                ctx.beginPath();
                ctx.moveTo(0, actualY);
                ctx.lineTo(canvasInside.width, actualY);
                ctx.stroke();
            }

            // Draw vertical lines
            for (let x = 0; x < canvasInside.width; x += spacing) {
                const distFromMouse = Math.abs(x - mouseX);
                const mouseFactor = Math.max(0, 1 - distFromMouse / 300);
                const opacity = Math.max(0, (0.04 + mouseFactor * 0.08) * (1 - Math.abs(x - canvasInside.width / 2) / (canvasInside.width / 1.1)));

                ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                ctx.lineWidth = 0.8 + mouseFactor * 0.5;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvasInside.height);
                ctx.stroke();
            }

            // 2. Data Streams (Moving Light Segments)
            streams.forEach(s => {
                ctx.beginPath();
                if (s.axis === 'h') {
                    s.x += s.speed;
                    if (s.x > canvasInside.width + s.length) s.x = -s.length;
                    const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
                    grad.addColorStop(0, 'rgba(59, 130, 246, 0)');
                    grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
                    grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    ctx.strokeStyle = grad;
                    ctx.moveTo(s.x, s.y - (s.y % spacing) + scrollOffset);
                    ctx.lineTo(s.x + s.length, s.y - (s.y % spacing) + scrollOffset);
                } else {
                    s.y += s.speed;
                    if (s.y > canvasInside.height + s.length) s.y = -s.length;
                    const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
                    grad.addColorStop(0, 'rgba(139, 92, 246, 0)');
                    grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
                    grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
                    ctx.strokeStyle = grad;
                    ctx.moveTo(s.x - (s.x % spacing), s.y);
                    ctx.lineTo(s.x - (s.x % spacing), s.y + s.length);
                }
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // 3. Particles (Neural Nodes)
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => { resize(); init(); });
        resize();
        init();
        animate();

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
            cancelAnimationFrame(animationFrameId);
            ctxGsap.revert();
        };
    }, []);

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden bg-[#08080C] px-6 flex flex-col justify-between py-12 md:py-24" ref={heroRef}>
            {/* Digital Grid - More visible now */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none"></canvas>

            {/* Top Spacer */}
            <div className="hidden md:block h-20"></div>

            {/* CENTRAL BLOCK: Intro phrase + Pillars */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-start w-fit max-w-7xl">
                    {/* Intro phrase - Adjusted for 'Hai investito...' */}
                    <div className="hero-intro-text mb-4 ml-1 md:ml-3">
                        <p className="text-sm md:text-xl lg:text-2xl font-bold text-white uppercase tracking-[0.2em] leading-tight font-satoshi">
                            Hai investito nella digitalizzazione?
                        </p>
                    </div>

                    {/* Headline - Reduced size for longer text + Blue-Purple gradient */}
                    {/* Headline - Coloring only 'raccontarlo.' */}
                    <h1 className="flex flex-wrap items-center gap-x-6 lg:gap-x-10 text-[8vw] lg:text-[6rem] xl:text-[8rem] font-black tracking-[-0.05em] font-satoshi text-white leading-none uppercase">
                        <span className="hero-pillar inline-block">Ora è il</span>
                        <span className="hero-pillar inline-block">momento</span>
                        <span className="hero-pillar inline-block">di</span>
                        <span className="hero-pillar inline-block bg-gradient-to-r from-[#4e92d8] to-[#614aa2] bg-clip-text text-transparent">raccontarlo.</span>
                    </h1>
                </div>
            </div>

            {/* BOTTOM ROW: CTA and Copy Block (Mirroring Podcast exactly) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10 px-4 md:px-0">
                {/* Buttons Left */}
                <div ref={buttonsRef} className="w-full md:w-auto flex justify-center md:justify-start">
                    <a href="#contact-form" className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden flex items-center justify-center min-w-[220px] transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <span className="relative z-10 tech-label text-[10px] font-bold group-hover:text-white transition-colors duration-500 uppercase tracking-[0.2em]">Inizia il tuo racconto</span>
                    </a>
                </div>

                {/* Copy Block Bottom Right (Vertical Line on LEFT as per podcast) */}
                <div ref={copyRef} className="max-w-md flex items-stretch gap-6">
                    <div className="w-px bg-white/20 shrink-0" />
                    <div className="py-1">
                        <p className="text-base md:text-lg font-medium text-white/30 leading-relaxed tracking-tight font-satoshi text-left">
                            Valorizza i risultati della tua strategia digitale con un racconto rapido e professionale. Comunica con chiarezza il percorso di innovazione che hai realizzato.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

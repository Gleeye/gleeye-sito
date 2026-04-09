'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Feather, Eye, BookOpen } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        id:          'discovery',
        number:      '01',
        title:       'BRAND DISCOVERY',
        tagline:     'Strategic Audit & DNA Aziendale',
        description: "Iniziamo dove la maggior parte delle agenzie si fermano: a chiederci perché. Un audit profondo del DNA aziendale per identificare dove la comunicazione attuale tradisce il valore reale del brand — e dove si nascondono le opportunità inespresse.",
        items: [
            'Analisi del posizionamento attuale e dei competitor',
            "Individuazione dei punti di sabotaggio d'immagine",
            'Definizione della promessa centrale del brand',
            'Workshop strategici con il management',
        ],
        accent:     '#4e92d8',
        accentDark: '#2c6fb3',
        Icon:        Compass,
    },
    {
        id:          'naming',
        number:      '02',
        title:       'NAMING',
        tagline:     'Verbal Identity System',
        description: "Un nome è la prima promessa che un brand fa al mercato. Lo costruiamo come si costruisce un asset: con metodo, con test e con l'obiettivo che funzioni ancora bene tra dieci anni. La voce del brand è tanto importante quanto il suo volto.",
        items: [
            'Naming aziendale, di prodotto e di linea',
            'Claim, payoff e tagline strategica',
            'Tono di voce e verbal identity guidelines',
            'Manifesto del brand e storytelling istituzionale',
        ],
        accent:     '#614aa2',
        accentDark: '#432e78',
        Icon:        Feather,
    },
    {
        id:          'visual',
        number:      '03',
        title:       'VISUAL IDENTITY',
        tagline:     'Logo, Type & Color System',
        description: "L'ecosistema visivo del brand progettato per generare fiducia istantanea. Non un logo isolato, ma un sistema — logotipo, tipografia, palette cromatica, texture — che parli la stessa lingua precisa su ogni touchpoint.",
        items: [
            'Logo design, declinazioni e varianti di sistema',
            'Palette cromatica strategica e tipografia',
            'Icone, pattern e asset visivi di corredo',
            'Mockup su supporti reali (print, digital, packaging)',
        ],
        accent:     '#4e92d8',
        accentDark: '#2c6fb3',
        Icon:        Eye,
    },
    {
        id:          'guidelines',
        number:      '04',
        title:       'BRAND GUIDELINES',
        tagline:     'Codifica & Rebranding',
        description: "La coerenza non si improvvisa: si progetta. Un brand book completo che trasforma il sistema identitario in un protocollo operativo, garantendo che ogni manifestazione del brand rispetti lo standard Gleeye. Per i brand che hanno perso autorità: rebranding chirurgico.",
        items: [
            "Brand book con regole d'uso e controesempi",
            'Manuale di identità visiva per team e fornitori',
            'Rebranding per brand obsoleti o mal posizionati',
            "Supervisione applicazione su tutti i canali",
        ],
        accent:     '#614aa2',
        accentDark: '#432e78',
        Icon:        BookOpen,
    },
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef     = useRef<HTMLDivElement>(null);

    /* Set initial state before paint */
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.set('.service-card', { opacity: 0, x: 60 });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const track     = trackRef.current;
            if (!container || !track) return;

            const mm = gsap.matchMedia();

            /* ── Desktop: horizontal scroll (pin + scrub) ── */
            mm.add('(min-width: 768px)', () => {
                const getAmount = () => -(track.scrollWidth - window.innerWidth);

                // First make all cards visible immediately on desktop
                gsap.set('.service-card', { opacity: 1, x: 0 });

                // Horizontal pin + scrub
                const anim = gsap.to(track, {
                    x:    getAmount,
                    ease: 'none',
                    scrollTrigger: {
                        trigger:             container,
                        pin:                 true,
                        scrub:               1.4,
                        start:               'top top',
                        end:                 () => `+=${-getAmount()}`,
                        invalidateOnRefresh: true,
                    },
                });

                return () => anim.scrollTrigger?.kill();
            });

            /* ── Mobile: staggered vertical reveal ── */
            mm.add('(max-width: 767px)', () => {
                gsap.to('.service-card', {
                    opacity: 1, x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start:   'top 80%',
                        once:    true,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            id="identity-services"
            ref={containerRef}
            className="relative bg-[#F5F3EE] overflow-hidden"
        >
            {/* Section label strip */}
            <div className="absolute top-8 left-8 md:left-16 z-20 flex items-center gap-3 pointer-events-none">
                <span className="text-[9px] font-black tracking-[0.32em] uppercase text-black/25 font-satoshi">
                    I Servizi Identity — scorri →
                </span>
            </div>

            {/* Horizontal track */}
            <div
                ref={trackRef}
                className="flex flex-col md:flex-row will-change-transform"
            >
                {services.map((svc) => {
                    const { Icon } = svc;
                    return (
                        <div
                            key={svc.id}
                            className={[
                                'service-card',
                                'flex-shrink-0 w-full md:w-[62vw] min-h-screen',
                                'flex flex-col justify-between',
                                'px-8 md:px-16 pt-24 pb-14',
                                'border-r border-black/[0.06]',
                            ].join(' ')}
                        >
                            {/* Top — number + title */}
                            <div>
                                <div className="flex items-start justify-between mb-12">
                                    <div>
                                        <span
                                            className="block text-[11px] font-black tracking-[0.25em] uppercase font-mono mb-3"
                                            style={{ color: svc.accent }}
                                        >
                                            {svc.number} / 04
                                        </span>
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight font-satoshi uppercase text-black leading-none">
                                            {svc.title}
                                        </h2>
                                        <p className="mt-3 text-sm font-medium text-black/40 font-jakarta">
                                            {svc.tagline}
                                        </p>
                                    </div>

                                    {/* Large icon — top right of card */}
                                    <Icon
                                        className="shrink-0 mt-1 opacity-[0.055]"
                                        style={{ width: 80, height: 80, color: svc.accent }}
                                        strokeWidth={0.8}
                                    />
                                </div>

                                {/* Description */}
                                <p className="text-base md:text-xl font-medium leading-relaxed font-jakarta text-black/55 max-w-xl mb-10">
                                    {svc.description}
                                </p>

                                {/* Bullet list */}
                                <ul className="space-y-4">
                                    {svc.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3.5">
                                            <span
                                                className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ backgroundColor: svc.accent }}
                                            />
                                            <span className="text-sm md:text-base text-black/60 font-medium leading-snug font-jakarta">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bottom — accent bar + number watermark */}
                            <div className="relative flex items-end justify-between mt-10">
                                {/* Gradient accent bar */}
                                <div
                                    className="h-[3px] rounded-full flex-1 mr-8"
                                    style={{
                                        backgroundImage: `linear-gradient(90deg, ${svc.accent} 0%, transparent 100%)`,
                                    }}
                                />
                                {/* Big watermark number */}
                                <span
                                    className="text-[7rem] font-black font-satoshi leading-none select-none"
                                    style={{ color: svc.accent, opacity: 0.05 }}
                                >
                                    {svc.number}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

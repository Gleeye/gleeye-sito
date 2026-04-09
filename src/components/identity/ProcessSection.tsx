'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    {
        number:   '01',
        title:    'ASCOLTO',
        subtitle: 'Brand Discovery Workshop',
        body:     'Incontriamo il team. Facciamo le domande scomode. Analizziamo il DNA del brand, il mercato, la concorrenza e le aspettative del target.',
    },
    {
        number:   '02',
        title:    'ANALISI',
        subtitle: 'Audit & Positioning Map',
        body:     'Mappiamo il posizionamento attuale e quello desiderato. Identifichiamo i gap, le opportunità e i punti di forza da amplificare.',
    },
    {
        number:   '03',
        title:    'CREAZIONE',
        subtitle: 'Visual & Verbal System',
        body:     'Progettiamo il sistema identitario completo: nome, voce, logo, palette, tipografia. Ogni elemento risponde a una logica strategica precisa.',
    },
    {
        number:   '04',
        title:    'CONSEGNA',
        subtitle: 'Brand Book & Handover',
        body:     'Consegniamo il brand book completo e supervisiamo le prime applicazioni. Il brand vive. Gleeye rimane a presidio.',
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Section header reveal ── */
            gsap.from('.process-header', {
                opacity: 0, y: 32,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.process-header',
                    start:   'top 82%',
                    once:    true,
                },
            });

            /* ── Connecting line draws left-to-right ── */
            if (lineRef.current) {
                gsap.from(lineRef.current, {
                    scaleX:          0,
                    transformOrigin: 'left center',
                    duration:        1.8,
                    ease:            'power2.out',
                    scrollTrigger: {
                        trigger: '.process-steps',
                        start:   'top 75%',
                        once:    true,
                    },
                });
            }

            /* ── Step cards: staggered reveal from below ── */
            gsap.from('.process-step', {
                opacity: 0, y: 48,
                duration: 1.0,
                stagger:  0.14,
                ease:     'power3.out',
                scrollTrigger: {
                    trigger: '.process-steps',
                    start:   'top 78%',
                    once:    true,
                },
            });

            /* ── Step numbers: scale-in stagger ── */
            gsap.from('.process-number', {
                scale:   0.4,
                opacity: 0,
                duration: 0.7,
                stagger:  0.14,
                ease:     'back.out(2)',
                scrollTrigger: {
                    trigger: '.process-steps',
                    start:   'top 78%',
                    once:    true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-[#F5F3EE] py-28 md:py-40 px-6 border-t border-black/[0.06]"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="process-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-5 h-px bg-black/20" />
                            <span className="text-[10px] font-black tracking-[0.32em] uppercase text-black/35 font-satoshi">
                                Il percorso
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight font-satoshi uppercase text-black leading-none">
                            Come<br />lavoriamo.
                        </h2>
                    </div>
                    <p className="text-base md:text-lg font-medium font-jakarta text-black/45 leading-relaxed max-w-sm">
                        Ogni percorso Identity segue quattro fasi precise.
                        Nessuna scorciatoia. Nessun template preconfezionato.
                    </p>
                </div>

                {/* Connecting line (desktop only) */}
                <div className="hidden md:block relative mb-0">
                    <div
                        ref={lineRef}
                        className="absolute top-[22px] left-[22px] right-[22px] h-px bg-black/10"
                    />
                </div>

                {/* Steps grid */}
                <div className="process-steps grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                    {steps.map((step, i) => (
                        <div key={step.number} className="process-step flex flex-col">
                            {/* Number circle */}
                            <div className="flex items-center gap-4 md:flex-col md:items-start mb-6">
                                <div
                                    className={[
                                        'process-number w-11 h-11 rounded-full border-2 flex items-center justify-center shrink-0',
                                        i === 0 ? 'border-[#4e92d8] bg-[#4e92d8]' : 'border-black/15 bg-transparent',
                                    ].join(' ')}
                                >
                                    <span
                                        className={[
                                            'text-[10px] font-black font-mono tracking-wide',
                                            i === 0 ? 'text-white' : 'text-black/35',
                                        ].join(' ')}
                                    >
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <span className="block text-[10px] font-black tracking-[0.2em] uppercase text-black/30 font-satoshi mb-2">
                                    {step.subtitle}
                                </span>
                                <h3 className="text-xl md:text-2xl font-black tracking-tight font-satoshi uppercase text-black mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-sm md:text-base font-medium font-jakarta text-black/50 leading-relaxed">
                                    {step.body}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div
                                className="mt-6 h-[2px] rounded-full w-8 transition-all duration-500"
                                style={{
                                    backgroundColor: i === 0 ? '#4e92d8' : 'rgba(0,0,0,0.10)',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

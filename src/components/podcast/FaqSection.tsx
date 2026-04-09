'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const faqs = [
    {
        q: 'Devo avere già le idee chiare sul mio podcast?',
        a: 'No. Ti aiutiamo noi a definire il format più adatto, gli argomenti, il tono e la struttura delle puntate. Hai un\'idea vaga? Basta quella.',
    },
    {
        q: 'Chi si occupa di scrivere i testi?',
        a: 'Se hai già i tuoi contenuti, ti aiutiamo a strutturarli. Se non li hai, possiamo scriverli noi o lavorarli insieme. Dipende da quanto vuoi delegare.',
    },
    {
        q: 'Non ho mai registrato un podcast. Ce la faccio?',
        a: 'Sì. Ti guidiamo passo dopo passo: dalla scelta del microfono, alla registrazione vera e propria. Siamo presenti da remoto, durante le sessioni.',
    },
    {
        q: 'Serve uno studio di registrazione?',
        a: 'No. Registri da casa o dall\'ufficio, con gli strumenti che hai o ti consigliamo. Ti aiutiamo a ottenere un audio più che adeguato per un podcast professionale.',
    },
    {
        q: 'Che tipo di podcast posso fare con questo servizio?',
        a: 'Tre format sono compatibili:\n\n– monologo/script (una voce)\n– dialogo (massimo due voci, senza sovrapposizioni)\n– free talk guidato (chiacchierata a tema, tra due persone)\n\nAltri format più complessi non sono inclusi in questo pacchetto.',
    },
    {
        q: 'Perché il formato prevede 8 episodi?',
        a: 'Perché 8 episodi sono ideali per trovare la tua voce, costruire ritmo e presenza, e testare la risposta del pubblico. Non è un limite: se ti trovi bene, puoi continuare. Il servizio è pensato per crescere con te, in modo replicabile, ampliabile ed evolutivo.',
    },
    {
        q: 'Quanto dura ogni puntata?',
        a: 'Tra i 10 e i 30 minuti. Possiamo adattare leggermente la durata, ma la struttura del servizio si basa su questa finestra.',
    },
    {
        q: 'Cosa succede se voglio cambiare qualcosa dopo aver registrato?',
        a: 'Ogni puntata include una revisione. Oltre questa, eventuali modifiche aggiuntive si quotano a parte.',
    },
    {
        q: 'E se non mi piace come viene la mia voce?',
        a: 'Ti aiutiamo a migliorare l\'intonazione e il ritmo. Se vuoi, possiamo anche registrare con un nostro speaker, come servizio extra.',
    },
    {
        q: 'Dove andrà pubblicato il podcast?',
        a: 'Su tutte le principali piattaforme: Spotify, Apple Podcast, Google Podcast, ecc. Ci occupiamo noi di caricarlo e gestirlo.',
    },
];

/* ── Single FAQ Item with measured height for fluid animation ── */
function FaqItem({ faq, index, openIndex, toggle }: {
    faq: { q: string; a: string };
    index: number;
    openIndex: number | null;
    toggle: (i: number) => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const isOpen = openIndex === index;

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className="border-b border-black/[0.06] last:border-b-0">
            <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-6 py-7 text-left group cursor-pointer"
            >
                <h3
                    className="text-base md:text-lg font-bold font-satoshi tracking-tight leading-snug transition-colors duration-300"
                    style={isOpen ? {
                        background: 'linear-gradient(135deg, #4e92d8, #614aa2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    } : {}}
                >
                    <span className={isOpen ? '' : 'text-[#08080C] group-hover:text-[#08080C]/70 transition-colors duration-300'}>
                        {faq.q}
                    </span>
                </h3>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 mt-1.5 transition-all duration-500 ease-out ${isOpen ? 'rotate-180' : ''}`}
                >
                    <defs>
                        <linearGradient id={`chevGrad-${index}`} x1="0" y1="0" x2="24" y2="24">
                            <stop offset="0%" stopColor="#4e92d8" />
                            <stop offset="100%" stopColor="#614aa2" />
                        </linearGradient>
                    </defs>
                    <polyline
                        points="6 9 12 15 18 9"
                        stroke={isOpen ? `url(#chevGrad-${index})` : '#08080C'}
                        className={isOpen ? '' : 'opacity-15 group-hover:opacity-30 transition-opacity duration-300'}
                    />
                </svg>
            </button>

            {/* Measured content wrapper for fluid height animation */}
            <div
                style={{
                    height: isOpen ? height : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                    overflow: 'hidden',
                }}
            >
                <div ref={contentRef} className="pb-7">
                    <p className="text-sm md:text-[15px] text-[#08080C]/50 font-medium leading-relaxed pr-10 whitespace-pre-line">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = useCallback((i: number) => {
        setOpenIndex(prev => prev === i ? null : i);
    }, []);

    const mid = Math.ceil(faqs.length / 2);
    const leftCol = faqs.slice(0, mid);
    const rightCol = faqs.slice(mid);

    return (
        <section className="relative py-20 md:py-32 bg-[#F8F9FA] overflow-hidden">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#4e92d8]/[0.03] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#614aa2]/[0.03] blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-satoshi tracking-tighter leading-[1] text-[#08080C]">
                        Domande frequenti.
                    </h2>
                    <p className="text-base md:text-lg text-[#08080C]/40 font-medium mt-4 max-w-lg">
                        Le risposte a quello che probabilmente ti stai chiedendo.
                    </p>
                </div>

                {/* Two-column FAQ grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
                    <div className="flex flex-col">
                        {leftCol.map((faq, i) => (
                            <FaqItem key={i} faq={faq} index={i} openIndex={openIndex} toggle={toggle} />
                        ))}
                    </div>
                    <div className="flex flex-col">
                        {rightCol.map((faq, i) => (
                            <FaqItem key={i + mid} faq={faq} index={i + mid} openIndex={openIndex} toggle={toggle} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

type ServiceAreaProps = {
    title: string;
    subtitle: string;
    description: string;
    points: string[];
    gradient: string;
    delay: string;
}

function ServiceCard({ title, subtitle, description, points, gradient, delay }: ServiceAreaProps) {
    return (
        <div className={`group relative p-8 md:p-10 rounded-2xl bg-white border border-black/5 hover:border-black/10 transition-colors duration-500 overflow-hidden ${delay}`}>
            {/* Sfondo hover con glassmorphism fluo/pastel */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${gradient} blur-xl`} />

            <div className="relative z-10 space-y-6">
                <div>
                    <h4 className="text-2xl font-bold text-foreground mb-1">{title}</h4>
                    <span className="text-sm font-semibold tracking-wider uppercase text-foreground/50">{subtitle}</span>
                </div>

                <p className="text-base text-foreground/70 leading-relaxed font-medium">
                    {description}
                </p>

                <ul className="space-y-3 pt-4 border-t border-black/5">
                    {points.map((point, i) => (
                        <li key={i} className="flex items-start text-sm text-foreground/80 font-medium">
                            <span className="mr-3 text-accent-blue">•</span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default function ServicesMatrix() {
    const services = [
        {
            title: "GLEEYE Identity",
            subtitle: "Boutique | Strategia e Genesi",
            description: "Rispondiamo alla domanda 'Chi siamo e come vogliamo essere percepiti?'. Definiamo l'Asset Identitario partendo dal DNA aziendale.",
            points: [
                "Brand Discovery & Strategic Audit",
                "Naming & Verbal Identity",
                "Visual Identity System",
                "Brand Guidelines & Rebranding"
            ],
            gradient: "from-accent-blue to-blue-400",
            delay: ""
        },
        {
            title: "GLEEYE Digital",
            subtitle: "Ecosistema | Infrastruttura",
            description: "Costruiamo l'infrastruttura tecnologica e i flussi di marketing dove il brand vive, opera e converte.",
            points: [
                "Web Design & Development (Architettura Piuma)",
                "Digital Ecosystem & Social Strategy",
                "Search Authority (SEO & Positioning)",
                "Performance Marketing (Advertising)"
            ],
            gradient: "from-blue-400 to-indigo-400",
            delay: "md:delay-100"
        },
        {
            title: "GLEEYE Studio",
            subtitle: "Factory | Content Production",
            description: "Il braccio produttivo che trasforma la strategia in oggetti digitali tangibili, dove la qualità d'agenzia incontra l'efficienza industriale.",
            points: [
                "Video Production (Corporate & Social)",
                "Photography & Visual Assets",
                "Strategic Copywriting",
                "Graphic & Motion Design"
            ],
            gradient: "from-indigo-400 to-accent-purple",
            delay: "md:delay-200"
        }
    ];

    return (
        <section className="bg-background py-24 px-6 relative">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                        L'Interfaccia di <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Semplificazione</span>
                    </h2>
                    <p className="text-lg text-foreground/70 font-medium">
                        Assorbiamo la complessità tecnica per restituire chiarezza decisionale e asset d'élite pronti all'uso.
                    </p>
                </div>

                {/* Griglia Bento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

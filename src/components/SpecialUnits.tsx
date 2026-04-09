export default function SpecialUnits() {
    const units = [
        {
            title: "SPICCO",
            subtitle: "Comunicazione Politica",
            description: "Studio verticale per la comunicazione politica digitale. Strategia del consenso, contenuti nativi e gestione dell’identità per trasformare la visione in un risultato misurabile.",
            gradient: "from-accent-blue/10 to-transparent"
        },
        {
            title: "EVENTI",
            subtitle: "Comunicazione & Marketing",
            description: "Copertura integrale per eventi aziendali. Gestiamo ogni fase — prima, durante e dopo — per trasformare l’evento in un asset strategico e in un’esperienza di valore.",
            gradient: "from-accent-purple/10 to-transparent"
        }
    ];

    return (
        <section id="special-units" className="bg-[#0A0A0A] py-32 md:py-64 px-6 relative overflow-hidden">
            {/* Dynamic Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/40 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-purple/40 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-32">
                <div className="max-w-3xl space-y-6">
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-blue">Elite Departments</span>
                    <h2 className="text-6xl md:text-[10rem] font-black text-white font-satoshi tracking-tight leading-none opacity-20 uppercase">
                        Special Units.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {units.map((unit, index) => (
                        <div
                            key={index}
                            className="group relative p-12 md:p-20 bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-1000 hover:bg-white/[0.05] hover:border-white/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${unit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                            <div className="relative z-10 space-y-10">
                                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-4xl font-black font-satoshi text-white tracking-tight">
                                        {unit.title}
                                    </h4>
                                    <span className="text-xs font-bold tracking-widest uppercase text-white/40 block">
                                        {unit.subtitle}
                                    </span>
                                    <p className="text-xl text-white/60 font-medium leading-relaxed group-hover:text-white/90 transition-colors duration-700 pt-4">
                                        {unit.description}
                                    </p>
                                </div>

                                <div className="pt-8 flex items-center space-x-4">
                                    <span className="h-[1px] w-12 bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-1000" />
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-all duration-700">Visita lo studio</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

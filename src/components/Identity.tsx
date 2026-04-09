export default function Identity() {
    const points = [
        {
            title: "CHI SIAMO",
            description: "Un team multidisciplinare progettato per la sintesi. Uniamo visione strategica e capacità esecutiva per offrire un interlocutore unico a chi ha bisogno di trasformare un’idea in un progetto solido."
        },
        {
            title: "COSA FACCIAMO",
            description: "Trasformiamo necessità in asset tangibili. Gestiamo ogni fase della comunicazione: dal branding al posizionamento, dallo sviluppo dell’infrastruttura digitale alla produzione di contenuti originali."
        },
        {
            title: "COME LO FACCIAMO",
            description: "Con un metodo che elimina l’incertezza. Presidiamo ogni passaggio — dalla strategia alla messa a terra — garantendo che ogni investimento si traduca in un valore reale, senza dispersioni."
        },
        {
            title: "PER CHI LAVORIAMO",
            description: "Realtà, organizzazioni e professionisti che cercano solidità. Ci rivolgiamo a chi vuole un partner operativo capace di governare la complessità, non solo di descriverla."
        }
    ];

    return (
        <section className="bg-background py-32 md:py-64 px-6 border-t border-black/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12">
                {/* Intro Side */}
                <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-32 h-fit">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent-blue">Valori & Metodo</span>
                        <h2 className="text-5xl md:text-7xl font-black font-satoshi tracking-tighter leading-none">
                            IDENTITÀ.
                        </h2>
                    </div>
                </div>

                {/* List Side */}
                <div className="lg:col-span-7 lg:col-start-6 space-y-24 md:space-y-32">
                    {points.map((point, index) => (
                        <div key={index} className="group space-y-8 animate-text-reveal">
                            <div className="flex items-center space-x-6">
                                <span className="text-xs font-black font-satoshi text-accent-blue">/ 0{index + 1}</span>
                                <div className="h-[1px] flex-grow bg-black/5 group-hover:bg-accent-blue transition-colors duration-700" />
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl md:text-3xl font-black font-satoshi tracking-tight opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                    {point.title}
                                </h3>
                                <p className="text-xl md:text-2xl font-medium text-foreground/60 leading-[1.4] group-hover:text-foreground transition-all duration-700">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function CaseStudies() {
    const mockProjects = [
        { id: 1, aspect: 'aspect-[3/4]', title: 'Project 01', category: 'Case Study' },
        { id: 2, aspect: 'aspect-square', title: 'Project 02', category: 'Case Study' },
        { id: 3, aspect: 'aspect-[4/5]', title: 'Project 03', category: 'Case Study' },
        { id: 4, aspect: 'aspect-[16/9]', title: 'Project 04', category: 'Case Study' },
        { id: 5, aspect: 'aspect-[3/4]', title: 'Project 05', category: 'Case Study' },
        { id: 6, aspect: 'aspect-square', title: 'Project 06', category: 'Case Study' },
    ];

    return (
        <section className="bg-background py-32 md:py-64 w-full px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-[8xl] font-black font-satoshi tracking-tighter leading-none opacity-5">
                        MUSEO.
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-bold font-satoshi tracking-tight text-foreground -mt-16 sm:-mt-20">
                        CASE STUDIES.
                    </h3>
                </div>
                <p className="max-w-xs text-lg font-medium text-foreground/50 leading-relaxed mb-4">
                    Un estratto di ciò che abbiamo già realizzato, per immaginare ciò che faremo.
                </p>
            </div>

            <div className="max-w-[1400px] mx-auto">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {mockProjects.map((project) => (
                        <div
                            key={project.id}
                            className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-[#F2F2F2] cursor-pointer"
                        >
                            <div className={`w-full ${project.aspect} transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:blur-sm`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-foreground/5 font-black font-satoshi text-6xl rotate-12 group-hover:rotate-0 transition-all duration-1000">
                                        GLEEYE
                                    </span>
                                </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm">
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent-blue block mb-2">
                                    {project.category}
                                </span>
                                <h4 className="text-2xl font-black font-satoshi tracking-tight text-foreground">
                                    {project.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

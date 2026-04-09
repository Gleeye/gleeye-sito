"use client";

import { useConsent } from "@/hooks/useConsent";

export default function CookiePolicy() {
    const { consents, acceptAll, rejectAll, updateConsent } = useConsent();

    return (
        <main className="min-h-screen bg-[#F5F3EE] text-[#111111] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-satoshi font-black tracking-tighter uppercase">
                        Cookie Policy
                    </h1>
                    <p className="text-xl md:text-2xl font-cormorant italic text-black/60">
                        Informativa sull'utilizzo dei cookie
                    </p>
                </header>

                <article className="prose prose-lg prose-neutral max-w-none space-y-8 font-plex text-sm md:text-base leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">1. Cosa sono i Cookie?</h2>
                        <p>
                            I cookie sono stringhe di testo di piccole dimensioni che i siti visitati dall'utente inviano al suo terminale
                            (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
                            Garantiscono un'esperienza di navigazione personalizzata ed efficiente.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">2. Tipologie di Cookie usati su questo Sito</h2>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-satoshi">Cookie Tecnici (Strettamente Necessari)</h3>
                            <p>
                                Servono per consentire la navigazione e gestire in sicurezza alcune funzionalità (es. salvataggio delle preferenze sulla privacy).
                                Questi cookie sono sempre attivi e non richiedono il preventivo consenso dell'utente.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-satoshi">Cookie Analitici</h3>
                            <p>
                                Utilizzati per raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito.
                                Questi dati ci aiutano a migliorare la qualità del servizio offerto. L'installazione di questi cookie richiede il tuo consenso esplicito.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-satoshi">Cookie di Profilazione / Marketing</h3>
                            <p>
                                Volti a creare profili relativi all'utente, per inviare o mostrare messaggi pubblicitari in linea con le preferenze manifestate
                                durante la navigazione sul web. Anche questi cookie vengono installati solo dopo il tuo esplicito consenso.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6 py-8 border-y border-black/10">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight text-emerald-800">3. Gestisci le Tue Preferenze</h2>
                        <p>
                            Dal pannello sottostante puoi verificare lo stato dei tuoi consensi o modificarli in qualsiasi momento.
                            Le modifiche verranno applicate immediatamente.
                        </p>

                        <div className="bg-white/50 p-6 rounded-2xl border border-black/5 space-y-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center py-2 border-b border-black/5">
                                    <span className="font-bold">Cookie Tecnici</span>
                                    <span className="text-xs uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full font-bold">Sempre Attivi</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-black/5">
                                    <span className="font-bold">Cookie Analitici</span>
                                    <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold ${consents?.analytics === "granted" ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}`}>
                                        {consents?.analytics === "granted" ? "Consentito" : "Rifiutato"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-black/5">
                                    <span className="font-bold">Cookie Marketing</span>
                                    <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold ${consents?.marketing === "granted" ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}`}>
                                        {consents?.marketing === "granted" ? "Consentito" : "Rifiutato"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={acceptAll}
                                    className="px-6 py-3 bg-[#111111] text-[#F5F3EE] font-bold text-sm tracking-widest uppercase rounded-full hover:bg-black/80 transition-colors"
                                >
                                    Accetta Tutti
                                </button>
                                <button
                                    onClick={rejectAll}
                                    className="px-6 py-3 bg-white border border-black/10 text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-black/5 transition-colors"
                                >
                                    Rifiuta (Solo Necessari)
                                </button>
                            </div>
                        </div>
                    </section>

                </article>
            </div>
        </main>
    );
}

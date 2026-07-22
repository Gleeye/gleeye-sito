"use client";

import { useConsent } from "@/hooks/useConsent";
import Header from "@/components/v2/Header";
import Footer from "@/components/v2/Footer";

export default function CookiePolicy() {
    const { consents, acceptAll, rejectAll, updateConsent } = useConsent();

    return (
        <>
        <Header />
        <main className="min-h-screen bg-[#F8F9FA] text-[#111111] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-satoshi font-black tracking-tighter uppercase">
                        Cookie Policy
                    </h1>
                    <p className="text-xl md:text-2xl font-newsreader italic text-black/60">
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
                            <p>
                                Su questo sito la misurazione è affidata a <strong>Google Analytics 4</strong> (Google Ireland Ltd.), che viene caricato{" "}
                                <strong>soltanto dopo il tuo consenso</strong>: prima di allora nessuno script di Google viene eseguito e nessun dato viene inviato.
                                Cookie impostati: <code>_ga</code>, <code>_ga_*</code>. Maggiori informazioni:{" "}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy di Google</a>.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-satoshi">Cookie di Profilazione / Marketing</h3>
                            <p>
                                Volti a creare profili relativi all'utente, per inviare o mostrare messaggi pubblicitari in linea con le preferenze manifestate
                                durante la navigazione sul web. Anche questi cookie vengono installati solo dopo il tuo esplicito consenso.
                            </p>
                            <p>
                                Al momento questo sito <strong>non installa cookie di profilazione di terze parti</strong>: la categoria è predisposta per eventuali
                                utilizzi futuri, che avverrebbero comunque solo previo tuo consenso.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-satoshi">Strumenti tecnici utilizzati da questo sito</h3>
                            <p>
                                Per il funzionamento del sito utilizziamo alcune memorizzazioni locali sul tuo browser (non trasmesse a terzi):{" "}
                                <code>gleeye_cookie_consent</code> e <code>gleeye_consent_id</code> (salvano le tue scelte sulla privacy) e{" "}
                                <code>gleeye-intro</code> (evita di rimostrarti l'animazione di apertura nella stessa sessione).
                                Le tue scelte di consenso vengono inoltre registrate in un archivio interno a fini di prova (con indirizzo IP{" "}
                                <strong>anonimizzato</strong>), come richiesto dal principio di accountability del GDPR.
                            </p>
                        </div>
                    </section>

                    <section id="preferenze" className="scroll-mt-28 space-y-6 py-8 border-y border-black/10">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight text-emerald-800">3. Gestisci le Tue Preferenze</h2>
                        <p>
                            Dal pannello sottostante puoi verificare lo stato dei tuoi consensi o modificarli in qualsiasi momento,
                            anche categoria per categoria. Le modifiche verranno applicate immediatamente e la revoca è semplice
                            quanto il consenso, come previsto dal GDPR.
                        </p>

                        <div className="bg-white/50 p-6 rounded-2xl border border-black/5 space-y-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center py-2 border-b border-black/5">
                                    <span className="font-bold">Cookie Tecnici</span>
                                    <span className="text-xs uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full font-bold">Sempre Attivi</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => updateConsent({ necessary: "granted", analytics: consents?.analytics === "granted" ? "denied" : "granted", marketing: consents?.marketing === "granted" ? "granted" : "denied" })}
                                    aria-pressed={consents?.analytics === "granted"}
                                    className="flex justify-between items-center py-2 border-b border-black/5 text-left w-full group"
                                >
                                    <span className="font-bold">Cookie Analitici <span className="font-normal text-black/40 text-sm">(Google Analytics 4)</span></span>
                                    <span className={`shrink-0 w-12 h-6 rounded-full transition-colors relative ${consents?.analytics === "granted" ? "bg-emerald-500" : "bg-black/20"}`}>
                                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${consents?.analytics === "granted" ? "translate-x-6" : "translate-x-0"}`} />
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => updateConsent({ necessary: "granted", analytics: consents?.analytics === "granted" ? "granted" : "denied", marketing: consents?.marketing === "granted" ? "denied" : "granted" })}
                                    aria-pressed={consents?.marketing === "granted"}
                                    className="flex justify-between items-center py-2 border-b border-black/5 text-left w-full group"
                                >
                                    <span className="font-bold">Cookie Marketing <span className="font-normal text-black/40 text-sm">(nessuno attivo al momento)</span></span>
                                    <span className={`shrink-0 w-12 h-6 rounded-full transition-colors relative ${consents?.marketing === "granted" ? "bg-emerald-500" : "bg-black/20"}`}>
                                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${consents?.marketing === "granted" ? "translate-x-6" : "translate-x-0"}`} />
                                    </span>
                                </button>
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
        <Footer />
        </>
    );
}

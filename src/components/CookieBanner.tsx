"use client";

import { useState } from "react";
import { useConsent, CookieConsents } from "@/hooks/useConsent";
import { X, Check, Settings2, ShieldCheck, Info } from "lucide-react";

export default function CookieBanner() {
    const { consents, acceptAll, rejectAll, updateConsent, hasConsented, hasLoaded } = useConsent();
    const [showDetails, setShowDetails] = useState(false);

    // Local state for the details panel
    const [localConsents, setLocalConsents] = useState<CookieConsents>({
        necessary: "granted",
        analytics: consents?.analytics === "granted" ? "granted" : "denied",
        marketing: consents?.marketing === "granted" ? "granted" : "denied",
    });

    // Sync local state when the details panel is opened or consents change
    useState(() => {
        if (consents) {
            setLocalConsents({
                necessary: "granted",
                analytics: consents.analytics === "granted" ? "granted" : "denied",
                marketing: consents.marketing === "granted" ? "granted" : "denied",
            });
        }
    });

    // If we haven't loaded from localStorage yet, or if they have already made a choice, don't show the main banner.
    if (!hasLoaded || hasConsented) return null;

    const handleSavePreferences = () => {
        updateConsent(localConsents);
        setShowDetails(false);
    };

    const toggleCategory = (category: keyof CookieConsents) => {
        if (category === "necessary") return; // Cannot toggle necessary
        setLocalConsents((prev) => ({
            ...prev,
            [category]: prev[category] === "granted" ? "denied" : "granted",
        }));
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-[1000] p-4 md:p-6 pointer-events-none">
            <div className="max-w-4xl mx-auto rounded-3xl bg-[#111111] text-[#F5F3EE] p-6 md:p-8 shadow-2xl border border-white/10 pointer-events-auto transform transition-all duration-500 translate-y-0">

                {!showDetails ? (
                    // Main Banner View
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-xl font-bold font-satoshi">La tua privacy</h3>
                            </div>
                            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                                I cookie ci permettono di offrirti la migliore esperienza possibile.
                                Utilizziamo cookie tecnici essenziali (sempre attivi) e, con il tuo consenso,
                                cookie analitici e di profilazione per misurare le performance e personalizzare
                                la tua esperienza.
                            </p>
                            <div className="flex gap-4 text-xs font-bold tracking-widest uppercase mt-4">
                                <a href="/privacy-policy" className="text-white/40 hover:text-white transition-colors underline underline-offset-4">Privacy Policy</a>
                                <a href="/cookie-policy" className="text-white/40 hover:text-white transition-colors underline underline-offset-4">Cookie Policy</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                            <button
                                onClick={acceptAll}
                                className="px-8 py-3 bg-[#F5F3EE] text-[#111111] font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 w-full whitespace-nowrap"
                            >
                                Accetta Tutti
                            </button>
                            {/* Su mobile i due secondari stanno impilati a tutta larghezza:
                                affiancati a 375px andavano a capo e finivano sotto il widget
                                chat (angolo in basso a destra, z-index massimo). Side-by-side
                                solo da md in su. */}
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <button
                                    onClick={rejectAll}
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors duration-300 whitespace-nowrap"
                                >
                                    Solo Necessari
                                </button>
                                <button
                                    onClick={() => setShowDetails(true)}
                                    className="flex-1 px-4 py-3 bg-transparent text-white/60 font-bold text-xs tracking-widest uppercase rounded-full hover:text-white transition-colors duration-300 whitespace-nowrap"
                                >
                                    Personalizza
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Details / Customization View
                    <div className="space-y-8">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                                <Settings2 className="w-5 h-5" />
                                <h3 className="text-lg font-bold font-satoshi">Personalizza Preferenze</h3>
                            </div>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white/60" />
                            </button>
                        </div>

                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Necessary (Read-only) */}
                            <div className="flex items-start justify-between gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="space-y-1 pr-6">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold">Cookie Tecnici</h4>
                                        <span className="text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Sempre attivi</span>
                                    </div>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        Essenziali per il funzionamento del sito. Non possono essere disattivati nei nostri sistemi.
                                    </p>
                                </div>
                            </div>

                            {/* Analytics */}
                            <button
                                onClick={() => toggleCategory("analytics")}
                                className={`w-full text-left flex items-start justify-between gap-6 p-4 rounded-2xl border transition-all duration-300 ${localConsents.analytics === "granted"
                                        ? "bg-white/10 border-white/30"
                                        : "bg-transparent border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <div className="space-y-1 pr-6">
                                    <h4 className="font-bold flex items-center gap-2">
                                        Cookie Analitici
                                    </h4>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        Ci permettono di contare le visite e le fonti di traffico, per misurare e migliorare le prestazioni del nostro sito.
                                    </p>
                                </div>
                                <div className={`shrink-0 w-12 h-6 rounded-full transition-colors relative ${localConsents.analytics === "granted" ? "bg-emerald-500" : "bg-white/20"}`}>
                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${localConsents.analytics === "granted" ? "translate-x-6" : "translate-x-0"}`} />
                                </div>
                            </button>

                            {/* Marketing */}
                            <button
                                onClick={() => toggleCategory("marketing")}
                                className={`w-full text-left flex items-start justify-between gap-6 p-4 rounded-2xl border transition-all duration-300 ${localConsents.marketing === "granted"
                                        ? "bg-white/10 border-white/30"
                                        : "bg-transparent border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <div className="space-y-1 pr-6">
                                    <h4 className="font-bold flex items-center gap-2">
                                        Cookie di Profilazione
                                    </h4>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        Possono essere impostati tramite il nostro sito dai nostri partner pubblicitari per costruire un profilo dei tuoi interessi.
                                    </p>
                                </div>
                                <div className={`shrink-0 w-12 h-6 rounded-full transition-colors relative ${localConsents.marketing === "granted" ? "bg-emerald-500" : "bg-white/20"}`}>
                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${localConsents.marketing === "granted" ? "translate-x-6" : "translate-x-0"}`} />
                                </div>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-white/10">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="px-8 py-3 bg-[#F5F3EE] text-[#111111] font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300"
                            >
                                Salva Preferenze
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

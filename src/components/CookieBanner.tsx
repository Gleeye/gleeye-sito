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
        /* Card COMPATTA ancorata in basso a sinistra: i CTA delle hero vivono
           in basso al centro e i bottoni del footer in basso — un banner a
           tutta larghezza li copriva e si mangiava i click su ogni pagina.
           Su mobile resta full-width ma bassa il più possibile. */
        <div className="fixed bottom-0 left-0 z-[1000] w-full p-3 pointer-events-none md:p-6 md:max-w-[26rem]">
            {/* mb su mobile: non finire sotto il FAB della chat (basso-destra) */}
            <div className="rounded-2xl bg-[#111111] text-[#F5F3EE] p-5 shadow-2xl border border-white/10 pointer-events-auto mb-[4.75rem] md:mb-0 md:p-6">

                {!showDetails ? (
                    // Main Banner View — compatta
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-base font-bold font-satoshi">La tua privacy</h3>
                        </div>
                        <p className="text-[13px] leading-relaxed text-white/70">
                            Cookie tecnici sempre attivi; analitici e di profilazione solo col tuo consenso.{' '}
                            <a href="/privacy-policy" className="text-white/45 underline underline-offset-2 hover:text-white transition-colors">Privacy</a>
                            {' · '}
                            <a href="/cookie-policy" className="text-white/45 underline underline-offset-2 hover:text-white transition-colors">Cookie policy</a>
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                            <button
                                onClick={acceptAll}
                                className="flex-1 px-4 py-2.5 bg-[#F5F3EE] text-[#111111] font-bold text-[11px] tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 whitespace-nowrap"
                            >
                                Accetta tutti
                            </button>
                            <button
                                onClick={rejectAll}
                                className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 text-white font-bold text-[11px] tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors duration-300 whitespace-nowrap"
                            >
                                Necessari
                            </button>
                            <button
                                onClick={() => setShowDetails(true)}
                                aria-label="Personalizza preferenze cookie"
                                className="shrink-0 rounded-full border border-white/10 p-2.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-300"
                            >
                                <Settings2 className="w-4 h-4" />
                            </button>
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

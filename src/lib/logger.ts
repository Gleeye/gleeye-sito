export interface ConsentLogEntry {
    consent_id: string;
    timestamp: string;
    ip_address: string;
    user_agent: string;
    preferences: {
        necessary: string;
        analytics: string;
        marketing: string;
    };
    event: "initial_consent" | "update_consent";
}

/*
 * Registro consensi — PERSISTENTE su Supabase (progetto ERP, tabella
 * public.site_consent_logs, policy anon INSERT-only; lettura solo da ERP).
 *
 * Prima scriveva su file locale (data/consent_logs.json): su Vercel il
 * filesystem è effimero/read-only, quindi in produzione NON veniva salvato
 * nulla — e il catch silenzioso faceva sembrare tutto ok. Ora l'insert va a
 * DB e un fallimento viene loggato con [consent] per emergere nei log Vercel.
 */
const ERP_URL = process.env.NEXT_PUBLIC_ERP_SUPABASE_URL;
const ERP_KEY = process.env.NEXT_PUBLIC_ERP_SUPABASE_ANON_KEY;

/* Aggiorna quando cambia il testo della cookie policy: ogni riga del registro
   dichiara a quale versione dell'informativa si riferisce il consenso. */
const POLICY_VERSION = "2026-07-22";

export async function logConsent(entry: ConsentLogEntry) {
    if (!ERP_URL || !ERP_KEY) {
        console.error("[consent] variabili ERP mancanti: log non salvato");
        return;
    }
    try {
        const res = await fetch(`${ERP_URL}/rest/v1/site_consent_logs`, {
            method: "POST",
            headers: {
                apikey: ERP_KEY,
                Authorization: `Bearer ${ERP_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                consent_id: entry.consent_id,
                event: entry.event,
                necessary: entry.preferences.necessary,
                analytics: entry.preferences.analytics,
                marketing: entry.preferences.marketing,
                policy_version: POLICY_VERSION,
                ip_address: entry.ip_address,
                user_agent: entry.user_agent,
                created_at: entry.timestamp,
            }),
        });
        if (!res.ok) {
            console.error("[consent] insert fallito:", res.status, await res.text());
        }
    } catch (error) {
        console.error("[consent] errore di rete nel salvataggio:", error);
    }
}

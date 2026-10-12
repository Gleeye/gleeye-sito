"use client";

import { useState, useEffect } from "react";
import {
  readStoredConsent,
  writeStoredConsent,
  POLICY_VERSION,
  type CookieConsents,
} from "@/lib/consent";

export type { ConsentStatus, CookieConsents } from "@/lib/consent";

const CONSENT_ID_KEY = "gleeye_consent_id";

function generateConsentId() {
  return 'cid_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

export function useConsent() {
  const [consents, setConsents] = useState<CookieConsents | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      // Scelta scaduta (6 mesi) o data su un'informativa vecchia = mai data:
      // il banner si ripresenta. Vedi lib/consent.ts.
      const stored = readStoredConsent();
      if (stored) {
        setConsents(stored);
      } else {
        // Initial state before interaction
        setConsents({
          necessary: "granted", // Technically true even before consent via GDPR
          analytics: "pending",
          marketing: "pending",
        });
      }
    } catch (e) {
      console.error("Error loading consent:", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  const sendConsentLog = async (newConsents: CookieConsents, isUpdate: boolean) => {
    try {
      let consentId: string | null = null;
      try {
        consentId = localStorage.getItem(CONSENT_ID_KEY);
        if (!consentId) {
          consentId = generateConsentId();
          localStorage.setItem(CONSENT_ID_KEY, consentId);
        }
      } catch {
        consentId = generateConsentId();
      }

      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent_id: consentId,
          // la versione dell'informativa resta nel registro, come prova di
          // cosa la persona aveva davanti quando ha scelto
          preferences: { ...newConsents, policy_version: POLICY_VERSION },
          event: isUpdate ? 'update_consent' : 'initial_consent'
        }),
      });
    } catch (e) {
      console.error("Failed to log consent to server:", e);
    }
  };

  const updateConsent = (newConsents: CookieConsents) => {
    const isUpdate = hasConsented; // if they already had a valid state
    setConsents(newConsents);
    // In alcuni browser Android/in-app (o coi cookie di terze parti bloccati)
    // localStorage LANCIA: senza try/catch l'eccezione uccideva l'handler e il
    // banner non si chiudeva più, qualunque pulsante si premesse.
    try {
      writeStoredConsent(newConsents);
    } catch {
      /* la scelta vale comunque per questa sessione */
    }

    // Notifica gli altri componenti nella stessa tab (es. AnalyticsGate):
    // l'evento 'storage' nativo scatta solo nelle ALTRE tab.
    window.dispatchEvent(new CustomEvent('gleeye-consent', { detail: newConsents }));

    // Background log
    sendConsentLog(newConsents, isUpdate || false);
  };

  const acceptAll = () => {
    updateConsent({
      necessary: "granted",
      analytics: "granted",
      marketing: "granted",
    });
  };

  const rejectAll = () => {
    updateConsent({
      necessary: "granted",
      analytics: "denied",
      marketing: "denied",
    });
  };

  // Helper to know if the user has explicitly made a choice
  const hasConsented =
    consents &&
    consents.analytics !== "pending" &&
    consents.marketing !== "pending";

  return {
    consents,
    updateConsent,
    acceptAll,
    rejectAll,
    hasConsented,
    hasLoaded,
  };
}

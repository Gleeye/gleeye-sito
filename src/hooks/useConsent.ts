"use client";

import { useState, useEffect } from "react";

export type ConsentStatus = "granted" | "denied" | "pending";

export interface CookieConsents {
  necessary: ConsentStatus; // Always granted
  analytics: ConsentStatus;
  marketing: ConsentStatus;
}

const CONSENT_KEY = "gleeye_cookie_consent";
const CONSENT_ID_KEY = "gleeye_consent_id";

function generateConsentId() {
  return 'cid_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

export function useConsent() {
  const [consents, setConsents] = useState<CookieConsents | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        setConsents(JSON.parse(stored) as CookieConsents);
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
      let consentId = localStorage.getItem(CONSENT_ID_KEY);
      if (!consentId) {
        consentId = generateConsentId();
        localStorage.setItem(CONSENT_ID_KEY, consentId);
      }

      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent_id: consentId,
          preferences: newConsents,
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
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsents));

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

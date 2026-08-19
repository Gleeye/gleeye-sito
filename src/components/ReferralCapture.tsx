"use client";

/**
 * ReferralCapture — l'orecchio del sito per i link degli ambassador.
 *
 * Sta nel layout, non disegna niente e non chiede niente a nessuno: a ogni
 * pagina guarda se nell'indirizzo c'è un `?ref=` e, se c'è, lo conserva
 * (vedi lib/referral per durata e consenso). Poi resta in ascolto del banner
 * cookie: quando l'utente decide, l'attribuzione lunga nasce o sparisce.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureReferral, syncReferralConsent } from "@/lib/referral";

export default function ReferralCapture() {
  const pathname = usePathname();

  // La query si legge da window, non da useSearchParams: quest'ultimo obbliga
  // a un <Suspense> e toglie la resa statica a tutte le pagine sotto il layout.
  // Qui serve solo un'occhiata dopo il mount, e a quel punto l'indirizzo del
  // browser è già quello nuovo anche dopo una navigazione client.
  useEffect(() => {
    captureReferral(window.location.search, window.location.pathname);
  }, [pathname]);

  useEffect(() => {
    const onConsent = () => syncReferralConsent();
    window.addEventListener("gleeye-consent", onConsent);
    return () => window.removeEventListener("gleeye-consent", onConsent);
  }, []);

  return null;
}

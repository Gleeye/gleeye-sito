'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { CookieConsents } from '@/hooks/useConsent';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = 'gleeye_cookie_consent';

/**
 * Monta Google Analytics SOLO se l'utente ha acconsentito agli analytics nel
 * cookie banner. Prima del consenso non parte nessuno script né richiesta.
 * Ascolta l'evento 'gleeye-consent' (emesso da useConsent) così il tag parte
 * subito quando l'utente accetta, senza bisogno di ricaricare la pagina.
 *
 * Nota: se l'utente revoca il consenso, gtag già caricato smette al reload
 * successivo (lo script non si può scaricare a caldo); la revoca è comunque
 * registrata subito nel log di /api/consent.
 */
export default function AnalyticsGate() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        setGranted((JSON.parse(stored) as CookieConsents).analytics === 'granted');
      }
    } catch {
      /* consenso illeggibile = niente tracciamento */
    }

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsents>).detail;
      setGranted(detail?.analytics === 'granted');
    };
    window.addEventListener('gleeye-consent', onConsent);
    return () => window.removeEventListener('gleeye-consent', onConsent);
  }, []);

  if (!GA_ID || !granted) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}

'use client';

import { Target, Compass, PenTool, Gauge } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function AdvProcessSection() {
  return (
    <ProcessSection
      steps={[
        {
          num: '01',
          title: 'Audit e obiettivi',
          desc: 'Analizziamo la situazione attuale (o partiamo da zero), definiamo gli obiettivi di business e i KPI che li misurano.',
          Icon: Target,
        },
        {
          num: '02',
          title: 'Strategia media',
          desc: 'Scegliamo i canali, definiamo il funnel, allochiamo il budget. La struttura della campagna è già metà del lavoro.',
          Icon: Compass,
        },
        {
          num: '03',
          title: 'Produzione creatività',
          desc: 'Copy, grafiche, video: tutto prodotto internamente, ottimizzato per ogni formato e piattaforma.',
          Icon: PenTool,
        },
        {
          num: '04',
          title: 'Ottimizzazione continua',
          desc: 'Monitoraggio giornaliero, A/B test, riallocazione del budget verso ciò che funziona. Senza aspettare il report mensile.',
          Icon: Gauge,
        },
      ]}
    />
  );
}

'use client';

import { Search, Compass, Settings, LineChart } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function SeoProcessSection() {
  return (
    <ProcessSection
      steps={[
        {
          num: '01',
          title: 'Audit iniziale',
          desc: 'Scansione tecnica del sito, analisi delle keyword attuali, benchmark competitor. Sappiamo da dove partiamo.',
          Icon: Search,
        },
        {
          num: '02',
          title: 'Strategia',
          desc: 'Definizione delle keyword target, priorità d\'intervento, piano contenuti. Un documento condiviso, non un file dimenticato nel cloud.',
          Icon: Compass,
        },
        {
          num: '03',
          title: 'Esecuzione',
          desc: 'Ottimizzazione tecnica, produzione contenuti, outreach per link building. Tutto tracciato e aggiornato.',
          Icon: Settings,
        },
        {
          num: '04',
          title: 'Monitoraggio',
          desc: 'Report mensile su ranking, traffico organico e conversioni. La SEO è un investimento: monitoriamo che renda.',
          Icon: LineChart,
        },
      ]}
    />
  );
}

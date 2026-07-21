'use client';

import { Search, PenTool, Send, BarChart3 } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function SocialProcessSection() {
  return (
    <ProcessSection
      steps={[
        {
          num: '01',
          title: 'Audit e strategia',
          desc: 'Analizziamo la situazione attuale, i competitor, il pubblico. Costruiamo il piano editoriale mensile con obiettivi misurabili.',
          Icon: Search,
        },
        {
          num: '02',
          title: 'Produzione contenuti',
          desc: 'Grafiche, copy, video: tutto prodotto internamente. Nessun outsourcing opaco.',
          Icon: PenTool,
        },
        {
          num: '03',
          title: 'Pubblicazione',
          desc: 'Scheduling ottimizzato per orari e algoritmi. Consistency garantita, anche nei periodi di bassa stagione.',
          Icon: Send,
        },
        {
          num: '04',
          title: 'Analisi e ottimizzazione',
          desc: 'Report mensile con metriche reali. Non vanity metric: reach utile, engagement qualitativo, conversioni tracciate.',
          Icon: BarChart3,
        },
      ]}
    />
  );
}

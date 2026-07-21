'use client';

import { Search, Lightbulb, PenTool, Send } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function GraficaProcessSection() {
  return (
    <ProcessSection
      steps={[
        {
          num: '01',
          title: 'Brief e analisi',
          desc: 'Raccogliamo obiettivi, competitor, target e contesto. Il brief non è un vincolo — è il fondamento di ogni scelta progettuale.',
          Icon: Search,
        },
        {
          num: '02',
          title: 'Concept visivo',
          desc: 'Proponiamo 2-3 direzioni grafiche. Il cliente sceglie la strada, noi la percorriamo fino in fondo.',
          Icon: Lightbulb,
        },
        {
          num: '03',
          title: 'Produzione',
          desc: 'Sviluppiamo tutti i materiali previsti, con revisioni incluse. Ogni elemento segue il sistema definito in fase di concept.',
          Icon: PenTool,
        },
        {
          num: '04',
          title: 'Consegna e supporto',
          desc: "File pronti per stampa e digitale, corredati da guida d'uso. Restiamo disponibili per estensioni future del sistema.",
          Icon: Send,
        },
      ]}
    />
  );
}

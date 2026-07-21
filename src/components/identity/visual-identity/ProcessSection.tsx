'use client';

import { Eye, Lightbulb, Shapes, Send } from 'lucide-react';
import SharedProcess from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SharedProcess
      steps={[
        {
          num: '01',
          title: 'Brief visivo',
          desc: "Raccogliamo i valori del brand, i competitor, i riferimenti. Costruiamo un mood board condiviso che allinea aspettative e direzione.",
          Icon: Eye,
        },
        {
          num: '02',
          title: 'Concept',
          desc: 'Presentiamo 2-3 direzioni visive distinte. Il cliente sceglie la strada, noi la percorriamo fino in fondo.',
          Icon: Lightbulb,
        },
        {
          num: '03',
          title: 'Sviluppo sistema',
          desc: "Dal concept approvato costruiamo il sistema completo: logo, varianti, palette, tipografia, applicazioni.",
          Icon: Shapes,
        },
        {
          num: '04',
          title: 'Consegna',
          desc: 'File sorgente in tutti i formati (AI, EPS, SVG, PNG, PDF), brand book completo, guida pratica all\'uso.',
          Icon: Send,
        },
      ]}
    />
  );
}

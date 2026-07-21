'use client';

import { Compass, Lightbulb, Filter, CheckCircle } from 'lucide-react';
import SharedProcess from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SharedProcess
      steps={[
        {
          num: '01',
          title: 'Strategia verbale',
          desc: "Definiamo i parametri del naming: cosa deve comunicare il nome, in quale mercato, a quale pubblico, con quali vincoli.",
          Icon: Compass,
        },
        {
          num: '02',
          title: 'Generazione',
          desc: 'Produciamo centinaia di opzioni attraverso tecniche creative sistematiche: brainstorming, morfologia, analisi etimologica, neologismi.',
          Icon: Lightbulb,
        },
        {
          num: '03',
          title: 'Screening',
          desc: "Filtriamo per fattori legali (trademark), linguistici (suono, pronuncia, assonanze negative) e strategici (aderenza al posizionamento).",
          Icon: Filter,
        },
        {
          num: '04',
          title: 'Shortlist e presentazione',
          desc: 'Presentiamo 5-10 opzioni motivate, con indicazione di disponibilità del dominio e analisi comparativa.',
          Icon: CheckCircle,
        },
      ]}
    />
  );
}

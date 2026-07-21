'use client';

import { Layers, LayoutTemplate, PenLine, Users } from 'lucide-react';
import SharedProcess from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SharedProcess
      steps={[
        {
          num: '01',
          title: 'Inventory',
          desc: "Raccogliamo tutti i materiali esistenti: logo, colori, font, comunicazioni passate. Capiamo cosa esiste già e cosa va costruito.",
          Icon: Layers,
        },
        {
          num: '02',
          title: 'Struttura del manuale',
          desc: 'Definiamo i capitoli necessari in base alla complessità del brand e ai fornitori che lo utilizzeranno.',
          Icon: LayoutTemplate,
        },
        {
          num: '03',
          title: 'Produzione',
          desc: "Scriviamo le regole, produciamo gli esempi, creiamo le tavole di applicazione. Tutto testato su casi reali, non ipotetici.",
          Icon: PenLine,
        },
        {
          num: '04',
          title: 'Consegna e formazione',
          desc: "Consegniamo in PDF interattivo e formato editabile. Sessione di presentazione con il team per garantire che le regole vengano comprese e adottate.",
          Icon: Users,
        },
      ]}
    />
  );
}

'use client';

import { Search, Compass, PenLine, Send } from 'lucide-react';
import SubpageProcessSection from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SubpageProcessSection
      steps={[
        {
          num: '01',
          title: 'Ascolto e analisi',
          desc: 'Prima di scrivere una parola, capiamo chi sei, cosa vendi, a chi parli e come parla la concorrenza. Il brief non è un modulo da compilare — è una conversazione.',
          Icon: Search,
        },
        {
          num: '02',
          title: 'Strategia verbale',
          desc: 'Definiamo tono di voce, registro linguistico e architettura dei messaggi. Ogni canale ha le sue regole; ogni pubblico, il suo linguaggio.',
          Icon: Compass,
        },
        {
          num: '03',
          title: 'Produzione copy',
          desc: "Scriviamo. Revisioniamo. Riscriviamo se serve. Il testo finale è quello che supera il test più semplice: si legge d'un fiato.",
          Icon: PenLine,
        },
        {
          num: '04',
          title: 'Consegna e supporto',
          desc: "Consegniamo i testi in formato pronto all'uso. Restiamo disponibili per revisioni e per adattare il materiale a nuovi formati o esigenze future.",
          Icon: Send,
        },
      ]}
    />
  );
}

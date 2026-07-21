'use client';

import { Search, Users, Compass, Handshake } from 'lucide-react';
import SharedProcess from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SharedProcess
      steps={[
        {
          num: '01',
          title: 'Discovery',
          desc: "Interviste con il management, analisi del mercato, benchmark competitor. Capiamo il brand dall'interno e dall'esterno.",
          Icon: Search,
        },
        {
          num: '02',
          title: 'Workshop strategico',
          desc: 'Sessioni di lavoro con il team del cliente. Il posizionamento si costruisce insieme, non si consegna dall\'esterno.',
          Icon: Users,
        },
        {
          num: '03',
          title: 'Definizione del framework',
          desc: "Positioning statement, valori, mission, value proposition, tono di voce. Il documento strategico completo.",
          Icon: Compass,
        },
        {
          num: '04',
          title: 'Handover',
          desc: 'Presentazione del documento finale, sessione di allineamento con il team, indicazioni operative per l\'implementazione.',
          Icon: Handshake,
        },
      ]}
    />
  );
}

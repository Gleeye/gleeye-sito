'use client';

import { Search, Target, Layers, MessageSquare } from 'lucide-react';
import SharedServices from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SharedServices
      services={[
        {
          title: 'BRAND AUDIT',
          desc: "Analisi approfondita della situazione attuale: identità percepita, messaggi inviati, gap tra come ti vedi e come ti vedono. Il punto di partenza per qualsiasi lavoro strategico.",
          tags: ['Analisi', 'Percezione', 'Gap analysis'],
          Icon: Search,
        },
        {
          title: 'POSITIONING STRATEGY',
          desc: "Definizione del posizionamento competitivo: dove si colloca il brand nel mercato, su quali differenziatori puntare, quale territorio occupare nella mente del cliente.",
          tags: ['Positioning', 'Differenziazione', 'Mercato'],
          Icon: Target,
        },
        {
          title: 'BRAND ARCHITECTURE',
          desc: "Struttura delle relazioni tra brand madre e sub-brand, linee di prodotto, mercati diversi. Chiarezza interna, coerenza esterna.",
          tags: ['Portfolio brand', 'Sub-brand', 'Architettura'],
          Icon: Layers,
        },
        {
          title: 'MESSAGING FRAMEWORK',
          desc: "Costruzione del sistema di messaggi: dalla value proposition alle key message per ogni target, dal pitch istituzionale ai messaggi di campagna.",
          tags: ['Messaggi', 'Copy strategy', 'Value prop'],
          Icon: MessageSquare,
        },
      ]}
    />
  );
}

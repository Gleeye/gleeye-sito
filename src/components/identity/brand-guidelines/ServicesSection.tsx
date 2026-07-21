'use client';

import { BookOpen, Palette, MessageSquare, Search } from 'lucide-react';
import SharedServices from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SharedServices
      services={[
        {
          title: 'BRAND MANUAL COMPLETO',
          desc: "Documentazione totale del sistema di brand: identità visiva, tono di voce, fotografia, motion, applicazioni digitali e print. Il manuale che copre ogni scenario.",
          tags: ['Manuale completo', 'Tutti i touchpoint', 'Digital + Print'],
          Icon: BookOpen,
        },
        {
          title: 'VISUAL GUIDELINES',
          desc: "Regole specifiche per l'identità visiva: logo, colori, tipografia, spaziatura, do & don't. Ottimizzato per chi lavora con il visual del brand.",
          tags: ['Logo usage', 'Palette', 'Tipografia'],
          Icon: Palette,
        },
        {
          title: 'VERBAL GUIDELINES',
          desc: "Tono di voce, registro linguistico, vocabolario del brand, esempi di applicazione per canale. Il manuale per chi scrive per il brand.",
          tags: ['Tone of voice', 'Copywriting rules', 'Brand voice'],
          Icon: MessageSquare,
        },
        {
          title: 'BRAND AUDIT & AGGIORNAMENTO',
          desc: "Analisi delle comunicazioni esistenti rispetto alle linee guida. Identificazione delle incoerenze, aggiornamento del manuale per riflettere l'evoluzione del brand.",
          tags: ['Audit', 'Aggiornamento', 'Coerenza'],
          Icon: Search,
        },
      ]}
    />
  );
}

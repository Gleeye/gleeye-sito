'use client';

import { PenTool, Palette, LayoutTemplate, BookOpen } from 'lucide-react';
import SharedServices from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SharedServices
      services={[
        {
          title: 'LOGO DESIGN',
          desc: "Logomark, logotype e varianti di utilizzo. Progettato per funzionare a qualsiasi scala, in qualsiasi contesto, in positivo e negativo.",
          tags: ['Logomark', 'Logotype', 'Varianti'],
          Icon: PenTool,
        },
        {
          title: 'BRAND IDENTITY SYSTEM',
          desc: "Palette colori, tipografia, griglie, spaziatura, iconografia. Il sistema visivo completo che rende il brand riconoscibile e coerente su ogni applicazione.",
          tags: ['Palette', 'Tipografia', 'Sistema'],
          Icon: Palette,
        },
        {
          title: 'BRAND APPLICATIONS',
          desc: "Applicazione del sistema visivo ai principali touchpoint: biglietti da visita, carta intestata, template presentazioni, template social, firma email.",
          tags: ['Stationery', 'Presentazioni', 'Applicazioni'],
          Icon: LayoutTemplate,
        },
        {
          title: 'BRAND BOOK',
          desc: "Documentazione del sistema visivo: regole d'uso, do & don't, specifiche tecniche. Il manuale che qualsiasi designer o agenzia può seguire per rimanere coerenti.",
          tags: ['Brand guidelines', 'Manuale', 'Regole'],
          Icon: BookOpen,
        },
      ]}
    />
  );
}

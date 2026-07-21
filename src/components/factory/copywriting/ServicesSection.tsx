'use client';

import { Compass, FileText, Search, Type } from 'lucide-react';
import SubpageServicesSection from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SubpageServicesSection
      services={[
        {
          title: 'COPY STRATEGY',
          desc: "Costruiamo l'architettura editoriale della tua comunicazione. Tono di voce, struttura dei messaggi, gerarchia dei canali. Prima si progetta, poi si scrive.",
          tags: ['Tone of voice', 'Piano editoriale', 'Verbal identity'],
          Icon: Compass,
        },
        {
          title: 'COPY CONTENT',
          desc: 'Testi per siti, landing page, newsletter, social, campagne ADV. Ogni formato ha la sua grammatica. Ogni parola deve guadagnarsi il posto che occupa.',
          tags: ['Web copy', 'Social content', 'Email marketing'],
          Icon: FileText,
        },
        {
          title: 'BLOGGING & SEO COPY',
          desc: 'Articoli che intercettano domanda organica, costruiscono autorità di settore e tengono il lettore. Scritti per le persone, ottimizzati per i motori di ricerca.',
          tags: ['SEO content', 'Blog aziendale', 'Long-form'],
          Icon: Search,
        },
        {
          title: 'NAMING, CLAIM & PAYOFF',
          desc: 'Il nome è il primo racconto che un brand fa di sé. Lo costruiamo con metodo e creatività, perché resti nel tempo e sia vero prima ancora di essere bello.',
          tags: ['Naming', 'Tagline', 'Brand language'],
          Icon: Type,
        },
      ]}
    />
  );
}

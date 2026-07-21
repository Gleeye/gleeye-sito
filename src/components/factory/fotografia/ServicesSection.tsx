'use client';

import { Users, Aperture, Camera, Calendar } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function FotografiaServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'REPORTAGE AZIENDALE',
          desc: 'Ritratti del team, ambienti di lavoro, momenti del processo produttivo. Le immagini che raccontano chi sei prima ancora che tu lo dica.',
          tags: ['Team portrait', 'Corporate lifestyle', 'Workplace'],
          Icon: Users,
        },
        {
          title: 'PRODUCT PHOTOGRAPHY',
          desc: "Shot di prodotto su sfondo neutro o in contesto d'uso. Immagini che vendono prima del copy, su e-commerce, catalogo, social e campagne ADV.",
          tags: ['Still life', 'E-commerce', 'Packshot'],
          Icon: Aperture,
        },
        {
          title: 'EDITORIAL & BRAND',
          desc: "Shooting editoriali costruiti attorno all'identità del brand. Luce, composizione, casting e location: ogni scelta è una decisione narrativa, non estetica.",
          tags: ['Brand photography', 'Mood board', 'Art direction'],
          Icon: Camera,
        },
        {
          title: 'EVENT PHOTOGRAPHY',
          desc: 'Copertura di eventi aziendali, fiere, lanci di prodotto e conferenze. Documentazione professionale che diventa contenuto editoriale e archivio di valore.',
          tags: ['Fiere', 'Lanci prodotto', 'Corporate events'],
          Icon: Calendar,
        },
      ]}
    />
  );
}

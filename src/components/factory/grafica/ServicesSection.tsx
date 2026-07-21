'use client';

import { Palette, BookOpen, LayoutTemplate, MapPin } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function GraficaServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'BRAND DESIGN SYSTEM',
          desc: 'Logotipo, palette, tipografia, griglie e regole di applicazione. Un sistema che scala su tutti i touchpoint senza perdere coerenza.',
          tags: ['Logo design', 'Brand guidelines', 'Visual system'],
          Icon: Palette,
        },
        {
          title: 'PRINT & EDITORIAL',
          desc: 'Brochure, cataloghi, presentazioni, packaging. Comunicazione cartacea e digitale progettata per durare nel tempo.',
          tags: ['Brochure', 'Catalogo', 'Layout editorial'],
          Icon: BookOpen,
        },
        {
          title: 'DIGITAL GRAPHICS',
          desc: 'Banner, template social, grafiche per campagne ADV, asset UI. Visual ottimizzati per ogni formato digitale.',
          tags: ['Social templates', 'Banner ADV', 'Digital asset'],
          Icon: LayoutTemplate,
        },
        {
          title: 'WAYFINDING & SIGNAGE',
          desc: 'Sistemi segnaletici, totem, allestimenti fieristici. Il brand che abita lo spazio fisico con la stessa precisione del digitale.',
          tags: ['Totem', 'Fiere', 'Allestimenti'],
          Icon: MapPin,
        },
      ]}
    />
  );
}

'use client';

import { Clapperboard, Megaphone, Lightbulb, Share2 } from 'lucide-react';
import SubpageServicesSection from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SubpageServicesSection
      services={[
        {
          title: 'VIDEO ISTITUZIONALE',
          desc: 'Il racconto ufficiale della tua azienda. Chi siete, cosa fate, perché vale la pena scegliervi. Girato con cura, montato per durare nel tempo.',
          tags: ['Company story', 'Brand film', 'Istituzionale'],
          Icon: Clapperboard,
        },
        {
          title: 'VIDEO PRODOTTO & ADV',
          desc: 'Spot e video prodotto per campagne digitali e offline. Format ottimizzati per ogni piattaforma: dal 16:9 classico ai vertical per social.',
          tags: ['Spot ADV', 'Product video', 'Reels'],
          Icon: Megaphone,
        },
        {
          title: 'VIDEO EXPLAINER',
          desc: 'Animazione o live action per spiegare un servizio complesso in modo semplice e visivamente efficace. Massimo 90 secondi, zero noia.',
          tags: ['Explainer', 'Motion graphic', 'Tutorial'],
          Icon: Lightbulb,
        },
        {
          title: 'SOCIAL VIDEO CONTENT',
          desc: 'Video pensati nativamente per i social: formati verticali, ritmo veloce, copy integrato. Dal singolo contenuto alla produzione in batch.',
          tags: ['Short form', 'Instagram', 'LinkedIn'],
          Icon: Share2,
        },
      ]}
    />
  );
}

'use client';

import { Type, ShoppingBag, MessageSquare, Layers } from 'lucide-react';
import SharedServices from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SharedServices
      services={[
        {
          title: 'BRAND NAMING',
          desc: "Naming per aziende, startup e rebranding. Dal posizionamento al nome: un processo strutturato che produce nomi strategicamente fondati, non solo belli da sentire.",
          tags: ['Azienda', 'Rebranding', 'Startup'],
          Icon: Type,
        },
        {
          title: 'PRODUCT NAMING',
          desc: "Nomi per prodotti, linee, servizi e collezioni. Con attenzione alla coerenza con il brand madre e alla chiarezza descrittiva per il consumatore.",
          tags: ['Prodotto', 'Linea', 'Servizio'],
          Icon: ShoppingBag,
        },
        {
          title: 'CLAIM E PAYOFF',
          desc: "Il racconto verbale del brand in poche parole. Costruiamo claim e payoff che resistono nel tempo e funzionano su tutti i formati.",
          tags: ['Tagline', 'Payoff', 'Brand claim'],
          Icon: MessageSquare,
        },
        {
          title: 'NAMING SYSTEM',
          desc: "Sistemi di naming per portfolio di prodotti, sub-brand o servizi multipli. Coerenza, scalabilità, gerarchia visiva e verbale.",
          tags: ['Portfolio', 'Sub-brand', 'Sistema'],
          Icon: Layers,
        },
      ]}
    />
  );
}

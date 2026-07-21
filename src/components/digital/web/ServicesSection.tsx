'use client';

import { LayoutTemplate, Code2, ShoppingBag, Target } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function WebServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'Web Design',
          desc: 'UX research, wireframing, UI design. Interfacce costruite attorno al comportamento degli utenti, non attorno alle preferenze del cliente.',
          tags: ['UI/UX', 'Wireframe', 'Prototipo'],
          Icon: LayoutTemplate,
        },
        {
          title: 'Sviluppo Web',
          desc: 'Implementazione su stack moderni (Next.js, WordPress, Shopify). Codice pulito, performance ottimizzate, SEO ready by default.',
          tags: ['Next.js', 'WordPress', 'Headless'],
          Icon: Code2,
        },
        {
          title: 'E-commerce',
          desc: "Negozi online su WooCommerce o Shopify. Esperienza d'acquisto fluida, gestione catalogo intuitiva, integrazione con ERP e strumenti di marketing.",
          tags: ['WooCommerce', 'Shopify', 'Conversioni'],
          Icon: ShoppingBag,
        },
        {
          title: 'Landing Page & CRO',
          desc: 'Pagine progettate per convertire: per campagne ADV, lanci prodotto, lead generation. A/B test inclusi.',
          tags: ['Conversion rate', 'A/B test', 'Lead gen'],
          Icon: Target,
        },
      ]}
    />
  );
}

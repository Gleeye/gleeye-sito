'use client';

import { Search, Share2, Users, PenTool } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function AdvServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'GOOGLE ADS',
          desc: 'Search, Display, Shopping, Performance Max. Campagne strutturate per catturare la domanda esistente e ampliarla.',
          tags: ['Search', 'Shopping', 'Performance Max'],
          Icon: Search,
        },
        {
          title: 'META ADS',
          desc: 'Facebook e Instagram Ads per awareness, traffico e lead generation. Creatività native, targeting preciso, ottimizzazione delle conversioni.',
          tags: ['Facebook', 'Instagram', 'Lead gen'],
          Icon: Share2,
        },
        {
          title: 'LINKEDIN ADS',
          desc: 'Per chi si rivolge a un pubblico B2B professionale. Sponsored content, InMail, lead form.',
          tags: ['B2B', 'Lead gen', 'Sponsored'],
          Icon: Users,
        },
        {
          title: 'CREATIVE & COPY ADV',
          desc: 'Produzione dei materiali creativi per le campagne: copy, grafiche, video. La creatività è la leva che separa le campagne che funzionano da quelle che bruciano budget.',
          tags: ['Creatività', 'A/B test', 'Video ADV'],
          Icon: PenTool,
        },
      ]}
    />
  );
}

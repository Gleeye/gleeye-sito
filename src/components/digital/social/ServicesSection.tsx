'use client';

import { Compass, Palette, MessageSquare, Megaphone } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function SocialServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'SOCIAL STRATEGY',
          desc: 'Piano editoriale, definizione dei canali prioritari, tono di voce, calendario contenuti. Prima di produrre, si progetta.',
          tags: ['Piano editoriale', 'Tone of voice', 'Channel strategy'],
          Icon: Compass,
        },
        {
          title: 'CONTENT PRODUCTION',
          desc: 'Grafiche, caroselli, reels, stories, video nativi. Contenuti progettati per ogni piattaforma — non riadattati da altro.',
          tags: ['Grafica', 'Video social', 'Copywriting'],
          Icon: Palette,
        },
        {
          title: 'COMMUNITY MANAGEMENT',
          desc: 'Gestione dei commenti, DM, menzioni. Risposta rapida, tono coerente, escalation gestita.',
          tags: ['Community', 'Moderazione', 'Customer care'],
          Icon: MessageSquare,
        },
        {
          title: 'SOCIAL ADV',
          desc: 'Campagne Meta, LinkedIn e TikTok Ads. Setup, targeting, creatività, ottimizzazione. I budget non si bruciano — si investono.',
          tags: ['Meta Ads', 'LinkedIn Ads', 'Retargeting'],
          Icon: Megaphone,
        },
      ]}
    />
  );
}

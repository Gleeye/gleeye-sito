'use client';

import { Search, Target, FileText, Handshake } from 'lucide-react';
import ServicesSection from '@/components/subpage/ServicesSection';

export default function SeoServicesSection() {
  return (
    <ServicesSection
      services={[
        {
          title: 'SEO AUDIT',
          desc: 'Analisi tecnica completa del sito: velocità, crawlability, errori, struttura. Il punto di partenza per qualsiasi intervento SEO serio.',
          tags: ['Tecnico', 'Core Web Vitals', 'Audit'],
          Icon: Search,
        },
        {
          title: 'KEYWORD STRATEGY',
          desc: 'Ricerca delle parole chiave con reale potenziale commerciale. Non traffico generico: visitatori con intenzione d\'acquisto.',
          tags: ['Keyword research', 'Search intent', 'SERP'],
          Icon: Target,
        },
        {
          title: 'SEO CONTENT',
          desc: 'Produzione di contenuti ottimizzati: pagine servizio, blog, pillar page, FAQ. Scritti per le persone, visibili ai motori.',
          tags: ['Content SEO', 'Blog', 'Long-form'],
          Icon: FileText,
        },
        {
          title: 'LINK BUILDING',
          desc: 'Costruzione di backlink da fonti autorevoli e pertinenti. Niente farm di link: solo relazioni editoriali reali.',
          tags: ['Backlink', 'Domain authority', 'PR digitali'],
          Icon: Handshake,
        },
      ]}
    />
  );
}

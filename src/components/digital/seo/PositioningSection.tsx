'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function SeoPositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'SEO · Genova',
        statement: {
          plain: 'Su Google vince chi merita di vincere.',
          accent: 'O chi sa come farlo.',
        },
        body: [
          'Il 90% dei clic va ai risultati sulla prima pagina. Essere in seconda posizione non è quasi vincere — è quasi perdere. La SEO non è un trucco: è il lavoro sistematico che porta un sito dove i clienti lo cercano, prima che vadano dai competitor.',
          'Lavoriamo su tre assi: tecnico (sito veloce, indexabile, senza errori), contenuto (testi che rispondono alle domande giuste) e autorità (link di qualità che aumentano la credibilità del dominio). Tre leve, una strategia.',
        ],
      }}
    />
  );
}

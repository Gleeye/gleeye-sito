'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Naming · Genova',
        statement: {
          plain: 'Un nome sbagliato costa più di quanto sembri.',
          accent: 'Uno giusto vale più di qualsiasi campagna.',
        },
        body: [
          'Il nome è la prima cosa che un cliente sente, legge, ricorda. È il punto di contatto più frequente con il brand — prima del logo, prima dei contenuti, prima di qualsiasi campagna. Eppure viene scelto spesso in fretta, per intuizione, senza un processo.',
          'Costruiamo naming con un metodo: strategia prima, creatività dopo. Partiamo dal posizionamento del brand, dalle caratteristiche del mercato e dai vincoli legali e linguistici. Generiamo centinaia di opzioni, filtriamo con criteri precisi, consegniamo una shortlist testata e motivata.',
        ],
      }}
    />
  );
}

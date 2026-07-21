'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function AdvPositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Advertising · Genova',
        statement: {
          plain: 'Il budget pubblicitario non si brucia.',
          accent: 'Si investe — con un piano.',
        },
        body: [
          'In un ecosistema digitale saturo, pagare per essere visti non è sufficiente. Il vero vantaggio competitivo sta nella capacità di costruire campagne che parlano alla persona giusta, con il messaggio giusto, nel momento giusto — e poi ottimizzare senza sosta.',
          'Gestiamo campagne su Google, Meta e LinkedIn con un approccio data-driven e creativo insieme. Struttura tecnica solida, creatività che si distingue, test continui. Ogni euro investito va dove rende di più.',
        ],
      }}
    />
  );
}

'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Visual Identity · Genova',
        statement: {
          plain: 'Il tuo brand viene visto prima di essere letto.',
          accent: 'Quella prima impressione decide tutto.',
        },
        body: [
          "L'identità visiva è il sistema di segnali che permette al tuo brand di essere riconosciuto immediatamente — su un biglietto da visita, su Instagram, su un camion o su un banner ADV. Non è estetica: è comunicazione strategica nella sua forma più immediata.",
          'Costruiamo sistemi visivi completi: logo e varianti, palette colori, tipografia, griglie, iconografia, pattern, regole di applicazione. Non consegniamo un logo — consegniamo un sistema che funziona su tutti i touchpoint, oggi e tra dieci anni.',
        ],
      }}
    />
  );
}

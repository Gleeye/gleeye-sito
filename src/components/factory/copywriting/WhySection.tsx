'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono agenzie che scrivono. E ci sono agenzie che costruiscono linguaggio. La differenza si vede nel tempo."
      reasons={[
        {
          label: 'Strategia prima di tutto',
          body: "Non scriviamo senza capire. Ogni progetto parte da un'analisi del brand, del mercato e del pubblico. Il copy è l'ultimo step — non il primo.",
        },
        {
          label: 'Coerenza su tutti i canali',
          body: 'Dalla homepage al post Instagram, dalla newsletter alla brochure: il tono rimane riconoscibile. Gestiamo la verbal identity come un sistema, non come testi separati.',
        },
        {
          label: 'Zero ghostwriting generico',
          body: 'Niente testi interscambiabili che potrebbero appartenere a chiunque. Il copy che scriviamo suona come te — solo più chiaro, più diretto, più efficace.',
        },
      ]}
    />
  );
}

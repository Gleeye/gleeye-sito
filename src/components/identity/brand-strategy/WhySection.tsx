'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono agenzie che consegnano documenti. E ci sono agenzie che costruiscono posizionamenti. La differenza si vede in ogni scelta di comunicazione."
      reasons={[
        {
          label: 'Strategia che si implementa',
          body: "Non consegniamo slide. Costruiamo documenti operativi che il team può usare ogni giorno: per briefare agenzie, scrivere testi, decidere se una campagna è in linea col brand.",
        },
        {
          label: 'Co-creazione, non imposizione',
          body: "Il posizionamento migliore è quello che il team aziendale riconosce come proprio. Costruiamo la strategia con il cliente, non per il cliente.",
        },
        {
          label: 'Expertise settoriale ampia',
          body: "Abbiamo lavorato su brand in settori molto diversi. Questo ci permette di portare prospettive esterne senza perdere la comprensione del tuo mercato.",
        },
      ]}
    />
  );
}

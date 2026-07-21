'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function FotografiaWhySection() {
  return (
    <SubWhy
      intro="Ci sono fotografi che scattano. E ci sono fotografi che costruiscono identità visiva. Non è la stessa cosa."
      reasons={[
        {
          label: 'Luce come linguaggio',
          body: 'Non usiamo la fotografia per documentare. La usiamo per costruire una percezione. Ogni scatto è progettato prima di essere scattato: luce, angolo, contesto sono scelte narrative, non casuali.',
        },
        {
          label: 'Coerenza visiva totale',
          body: 'Il nostro lavoro segue le linee guida del tuo brand. Non produciamo foto isolate — costruiamo un sistema di immagini riconoscibile su tutti i canali, consistente nel tempo.',
        },
        {
          label: 'Post-produzione inclusa',
          body: "Niente consegna di raw grezzi. Ogni scatto viene editato, ottimizzato per colore e formato, consegnato pronto all'uso. Senza lavoro aggiuntivo da parte tua.",
        },
      ]}
    />
  );
}

'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono operatori video. E ci sono agenzie che usano il video per costruire comunicazione. La differenza si vede nel risultato."
      reasons={[
        {
          label: 'Produzione e strategia insieme',
          body: 'Non siamo operatori video. Siamo comunicatori che usano il video. Ogni progetto nasce da una strategia editoriale, non da un ordine di ripresa.',
        },
        {
          label: 'Crew compatta, nessun overhead',
          body: 'Lavoriamo con crew piccole e molto competenti. Meno logistica, più focus sul risultato. Senza i costi di una casa di produzione strutturata.',
        },
        {
          label: 'Consegna multi-formato',
          body: "Un'unica sessione di ripresa, più formati in output: 16:9 per il sito, vertical per Instagram, cut breve per ADV. Massima efficienza.",
        },
      ]}
    />
  );
}

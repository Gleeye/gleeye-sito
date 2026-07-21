'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono nomi che funzionano per un mese. E ci sono nomi che diventano brand. La differenza è il metodo."
      reasons={[
        {
          label: 'Metodo, non ispirazione',
          body: "Non aspettiamo l'idea del genio. Il naming è un processo sistematico: più opzioni generate, più criteri applicati, migliore è la shortlist finale.",
        },
        {
          label: 'Verifica legale inclusa',
          body: 'Controlliamo la disponibilità del trademark in Italia e nei mercati rilevanti prima di presentare qualsiasi opzione. Senza sorprese dopo la scelta.',
        },
        {
          label: 'Contesto internazionale',
          body: 'Verifichiamo ogni nome in più lingue per evitare assonanze problematiche in mercati stranieri. Un nome che funziona in Italia deve funzionare anche altrove.',
        },
      ]}
    />
  );
}

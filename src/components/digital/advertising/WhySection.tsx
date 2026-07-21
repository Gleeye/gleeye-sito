'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function AdvWhySection() {
  return (
    <SubWhy
      intro="Ci sono agenzie che gestiscono campagne. E ci sono agenzie che ottimizzano il ritorno sull'investimento. La differenza si vede nel conto economico."
      reasons={[
        {
          label: 'Media e creatività insieme',
          body: 'Non siamo solo media buyer. Produciamo anche i materiali creativi, il copy, i video. Nessun gap tra chi pianifica e chi esegue la creatività.',
        },
        {
          label: 'Ottimizzazione data-driven',
          body: 'Prendiamo decisioni sui dati, non sulle intuizioni. Test continui, aggiustamenti rapidi, budget sempre orientato verso ciò che funziona.',
        },
        {
          label: 'Trasparenza totale',
          body: 'Report chiari, accesso agli account, zero markup occulti sul budget media. Sai esattamente dove va ogni euro.',
        },
      ]}
    />
  );
}

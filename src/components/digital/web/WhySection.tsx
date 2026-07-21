'use client';

import WhySection from '@/components/subpage/WhySection';

export default function WebWhySection() {
  return (
    <WhySection
      intro="Ci sono agenzie che fanno siti. E ci sono agenzie che costruiscono strumenti di business. La differenza si vede nel risultato."
      reasons={[
        {
          label: 'Design e sviluppo nello stesso team',
          body: 'Nessun gap tra chi progetta e chi realizza. Il risultato finale corrisponde al prototipo approvato.',
        },
        {
          label: 'Performance come requisito, non come optional',
          body: 'Velocità, SEO tecnica, accessibilità non sono extra: sono inclusi nel processo di sviluppo by default.',
        },
        {
          label: 'Autonomia garantita',
          body: "Consegniamo siti che puoi gestire. Formiamo il tuo team sull'uso del CMS. Non vuoi dipendere da noi per ogni modifica.",
        },
      ]}
    />
  );
}

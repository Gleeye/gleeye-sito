'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono manuali che finiscono in un cassetto. E ci sono guidelines che diventano lo strumento più usato dall'azienda. La differenza è come vengono scritti."
      reasons={[
        {
          label: 'Guidelines operative, non decorative',
          body: 'Non produciamo brand book esteticamente belli ma inutilizzabili. Ogni regola è accompagnata da esempi pratici e scenari di applicazione reale.',
        },
        {
          label: 'Accessibili a tutti',
          body: 'Scriviamo per chi usa il brand: grafici, copywriter, marketing manager, agenzie esterne. Non per altri designer.',
        },
        {
          label: 'Aggiornabili nel tempo',
          body: 'Il brand cresce e cambia. Costruiamo documenti strutturati per essere aggiornati — non monoliti che invecchiano male.',
        },
      ]}
    />
  );
}

'use client';

import SubForWho from '@/components/subpage/ForWhoSection';

export default function ForWhoSection() {
  return (
    <SubForWho
      items={[
        'Chi sa che un video professionale farebbe la differenza, ma finora ha rimandato pensando che fosse troppo costoso o complicato da gestire.',
        'Chi produce video internamente con risultati mediocri — qualità delle riprese, montaggio improvvisato, assenza di sound design — e vuole fare il salto.',
        'Chi ha bisogno di contenuti video continuativi per i social, ma non ha le risorse per una produzione in-house strutturata.',
      ]}
    />
  );
}

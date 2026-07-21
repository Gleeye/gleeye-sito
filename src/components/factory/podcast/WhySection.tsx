'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Registrare è facile. Fare un podcast che qualcuno ascolti fino in fondo, no. La differenza è tutta nella regia."
      reasons={[
        {
          label: 'Un prodotto editoriale, non un microfono',
          body: 'Non ti diamo uno studio e in bocca al lupo. Costruiamo un format, una struttura e un tono che tengono l’ascoltatore fino all’ultimo secondo.',
        },
        {
          label: 'Qualità broadcast, anche da remoto',
          body: 'Ospiti in tutta Italia, audio come se fossero nella stessa stanza. La registrazione remota la gestiamo noi, senza cali di qualità.',
        },
        {
          label: 'Dall’idea allo Spotify',
          body: 'Un unico interlocutore per concept, registrazione, montaggio, sound design e distribuzione. Tu ci metti la voce, noi tutto il resto.',
        },
      ]}
    />
  );
}

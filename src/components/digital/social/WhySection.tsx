'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function SocialWhySection() {
  return (
    <SubWhy
      intro="Ci sono agenzie che postano. E ci sono agenzie che costruiscono brand sui social. La differenza si vede nel tempo."
      reasons={[
        {
          label: 'Contenuto e strategia nello stesso posto',
          body: "Non deleghiamo solo l'esecuzione. Progettiamo la strategia e la eseguiamo. Nessun gap di traduzione tra chi pensa e chi produce.",
        },
        {
          label: 'Identità visiva coerente',
          body: 'I contenuti che produciamo rispettano le linee guida del tuo brand. Social, sito, materiali offline: tutto parla la stessa lingua.',
        },
        {
          label: 'Aggiornamento continuo',
          body: 'Gli algoritmi cambiano. Le piattaforme cambiano. Il nostro approccio si aggiorna — senza che tu debba stare a monitorare ogni novità.',
        },
      ]}
    />
  );
}

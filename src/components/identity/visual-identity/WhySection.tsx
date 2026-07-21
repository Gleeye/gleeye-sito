'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function WhySection() {
  return (
    <SubWhy
      intro="Ci sono designer che fanno loghi. E ci sono studi che costruiscono sistemi visivi. La differenza si vede ogni volta che il brand viene applicato."
      reasons={[
        {
          label: 'Sistema, non singoli elementi',
          body: 'Non consegniamo un logo. Consegniamo un sistema operativo visivo: regole, varianti, applicazioni. Qualcosa che scala nel tempo senza perdere coerenza.',
        },
        {
          label: 'Strategia visiva integrata',
          body: 'Ogni scelta visiva è motivata da una ragione strategica, non estetica. Il colore comunica qualcosa. La tipografia comunica qualcosa. Tutto è progettato con intenzione.',
        },
        {
          label: 'File pronti per tutto',
          body: 'Consegniamo in ogni formato necessario: web, print, stampa industriale, ricamo, serigrafia. Nessuna richiesta futura che non possiamo soddisfare.',
        },
      ]}
    />
  );
}

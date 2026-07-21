'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function GraficaWhySection() {
  return (
    <SubWhy
      intro="Ci sono studi che fanno loghi. E ci sono agenzie che costruiscono sistemi visivi. La differenza si vede su ogni formato."
      reasons={[
        {
          label: 'Sistema, non singoli pezzi',
          body: 'Non consegniamo loghi isolati. Ogni progetto parte dalla costruzione di regole che funzionano su tutti i touchpoint, oggi e in futuro.',
        },
        {
          label: 'Grafica e strategia insieme',
          body: 'Il nostro lavoro nasce dalle stesse fondamenta dell\'identità di marca. Non decoriamo i contenuti — li progettiamo.',
        },
        {
          label: 'Coerenza garantita nel tempo',
          body: 'Il sistema che costruiamo è documentato e trasferibile. Chiunque lavori con il tuo brand in futuro avrà le istruzioni giuste.',
        },
      ]}
    />
  );
}

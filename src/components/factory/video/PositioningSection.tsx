'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Video Production · Genova',
        statement: {
          plain: 'Un video non documenta la tua azienda.',
          accent: 'La racconta al posto tuo.',
        },
        body: [
          "Nella catena dell'attenzione digitale, il video è l'unico formato che tiene il pubblico fermo — ammesso che sia fatto bene. Un video professionale non è un'opzione: è il formato che trasforma visitatori in clienti.",
          "Dalla pre-produzione alla post, gestiamo l'intero ciclo. Script, riprese, montaggio, color grading, sound design: niente viene lasciato al caso, perché ogni secondo di schermo ha un costo e deve guadagnarsi il suo posto.",
        ],
      }}
    />
  );
}

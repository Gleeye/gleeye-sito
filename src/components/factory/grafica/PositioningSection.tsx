'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function GraficaPositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Graphic Design · Genova',
        statement: {
          plain: 'Il design non è decorazione.',
          accent: 'È la tua reputazione visiva.',
        },
        body: [
          'La grafica aziendale è il sistema visivo che precede qualsiasi parola. Prima ancora che tu parli, il tuo brand parla già — attraverso i colori, la tipografia, il modo in cui ogni elemento è disposto sulla pagina.',
          "Costruiamo sistemi grafici coerenti, non singoli materiali. Dall'identità visiva alla comunicazione quotidiana: tutto deve sembrare progettato con intenzione — perché lo è.",
        ],
      }}
    />
  );
}

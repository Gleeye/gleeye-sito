'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Brand Guidelines · Genova',
        statement: {
          plain: 'Il brand guidelines non è un documento.',
          accent: 'È il garante della coerenza nel tempo.',
        },
        body: [
          'Ogni azienda che cresce lavora con più fornitori: agenzie, designer freelance, sviluppatori, uffici stampa. Senza un sistema di regole condiviso, ogni collaboratore reinterpreta il brand — spesso in buona fede, spesso con risultati diversi. Il risultato è un brand che nel tempo diventa irriconoscibile.',
          'Costruiamo brand guidelines operative: non un documento da mettere in un cassetto, ma uno strumento di lavoro quotidiano. Regole chiare, esempi pratici, specifiche tecniche. Qualcosa che chiunque possa seguire — anche senza formazione specifica nel brand design.',
        ],
      }}
    />
  );
}

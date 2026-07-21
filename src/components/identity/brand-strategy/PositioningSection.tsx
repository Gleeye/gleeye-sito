'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Brand Strategy · Genova',
        statement: {
          plain: 'Prima di comunicare,',
          accent: 'bisogna sapere cosa si vuole essere.',
        },
        body: [
          'La brand strategy non è un esercizio teorico. È il documento che risponde alle domande più difficili: chi siamo davvero, a chi parliamo, perché qualcuno dovrebbe sceglierci invece di un competitor con prezzi simili. Senza risposta a queste domande, qualsiasi comunicazione è un tiro al buio.',
          'Costruiamo il posizionamento strategico del tuo brand attraverso un processo strutturato: analisi del mercato, workshop con il management, definizione dei valori e della proposta di valore. Il risultato è un documento operativo — non una presentazione da mettere in un cassetto.',
        ],
      }}
    />
  );
}

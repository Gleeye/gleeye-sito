'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function FotografiaPositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Fotografia · Genova',
        statement: {
          plain: 'Le immagini ci circondano.',
          accent: 'Solo quelle giuste ci fermano.',
        },
        body: [
          'Le immagini ci circondano e ci seducono ogni giorno. Raccontano storie, costruiscono fiducia, convincono prima ancora che la parola arrivi. Ma solo quelle costruite con intenzione fanno davvero la differenza tra un brand che si nota e uno che scompare nel rumore.',
          "La fotografia professionale non è un costo — è l'investimento più visibile che un'azienda possa fare. Ogni immagine che metti online parla di te prima ancora che tu possa aprire bocca. Noi costruiamo quelle immagini con cura, metodo e una visione precisa del tuo brand.",
        ],
      }}
    />
  );
}

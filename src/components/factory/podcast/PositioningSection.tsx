'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Podcast & Audio Branding · Genova',
        statement: {
          plain: 'Un podcast non è un microfono acceso.',
          accent: 'È una relazione che si costruisce.',
        },
        body: [
          "L'audio è il formato più intimo che esista: entra nelle orecchie, non compete con nient'altro, resta acceso mentre il pubblico vive la sua giornata. Ma un podcast improvvisato si sente al primo secondo — audio sporco, ritmo piatto, nessuna regia.",
          "Noi trattiamo il podcast come un prodotto editoriale: format, struttura, sound design, distribuzione. Dall'idea alla pubblicazione su ogni piattaforma ci occupiamo di tutto, perché la voce del tuo brand meriti di essere ascoltata fino all'ultimo secondo.",
        ],
      }}
    />
  );
}

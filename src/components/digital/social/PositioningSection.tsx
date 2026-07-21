'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function SocialPositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Social Media · Genova',
        statement: {
          plain: 'I social non sono un canale.',
          accent: 'Sono la tua reputazione in tempo reale.',
        },
        body: [
          'Ogni post che pubblichi — o non pubblichi — dice qualcosa di te. Il silenzio sui social è comunque una posizione. Quella sbagliata. Costruire una presenza social efficace richiede strategia, continuità e la capacità di produrre contenuti che non si limitino a esistere.',
          'Non gestiamo i tuoi social come un adempimento settimanale. Li costruiamo come un sistema di comunicazione coerente — con un’identità visiva riconoscibile, un tono di voce preciso e una strategia di contenuto che sappia dove vuole arrivare.',
        ],
      }}
    />
  );
}

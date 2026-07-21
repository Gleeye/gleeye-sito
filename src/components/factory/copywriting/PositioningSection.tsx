'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function PositioningSection() {
  return (
    <ApproachSection
      data={{
        eyebrowRight: 'Copywriting · Genova',
        statement: {
          plain: 'Le parole non descrivono la tua azienda.',
          accent: 'La costruiscono.',
        },
        body: [
          "Avete presente l'albero che cade in una foresta dove non c'è nessuno? Da una parte ci sono i fatti, dall'altra le storie. Senza i primi, non ci sarebbe molto da raccontare. Ma senza le storie, i fatti rischiano di scomparire nel rumore.",
          "Sviluppiamo strategie di comunicazione e storytelling costruite sull'identità della tua impresa. Un lavoro sartoriale. Perché impostare il vocabolario e il tone of voice di un brand non si improvvisa — e una parola sbagliata costa più di mille parole mai scritte.",
        ],
      }}
    />
  );
}

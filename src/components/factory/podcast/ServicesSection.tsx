'use client';

import { Mic, Headphones, Video, Music } from 'lucide-react';
import SubpageServicesSection from '@/components/subpage/ServicesSection';

export default function ServicesSection() {
  return (
    <SubpageServicesSection
      services={[
        {
          title: 'PODCAST BRANDED',
          desc: 'Un format editoriale che parla al tuo pubblico e costruisce autorità. Definiamo temi, struttura e tono di ogni episodio, poi lo produciamo dall’inizio alla fine.',
          tags: ['Format editoriale', 'Serie', 'Storytelling'],
          Icon: Mic,
        },
        {
          title: 'REGISTRAZIONE DA REMOTO',
          desc: 'In studio o da remoto, con qualità broadcast. I tuoi ospiti possono essere ovunque: gestiamo regia, audio pulito e sincronia, senza compromessi.',
          tags: ['Studio', 'Da remoto', 'Multi-ospite'],
          Icon: Headphones,
        },
        {
          title: 'VIDEO PODCAST',
          desc: 'Il podcast oggi si guarda anche. Riprese multi-camera e clip verticali per i social: un unico set che diventa contenuto per ogni piattaforma.',
          tags: ['Multi-camera', 'Clip social', 'Vertical'],
          Icon: Video,
        },
        {
          title: 'AUDIO BRANDING & POST',
          desc: 'Sigla, sound design, editing, mix e mastering. Poi la pubblicazione su Spotify, Apple Podcasts e ogni piattaforma, con copertine e note pronte.',
          tags: ['Sound design', 'Mix & master', 'Distribuzione'],
          Icon: Music,
        },
      ]}
    />
  );
}

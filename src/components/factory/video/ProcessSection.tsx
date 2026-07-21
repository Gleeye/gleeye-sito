'use client';

import { PenLine, Settings, Video, Scissors } from 'lucide-react';
import SubpageProcessSection from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SubpageProcessSection
      steps={[
        {
          num: '01',
          title: 'Script e concept',
          desc: 'Definiamo il messaggio, la struttura narrativa e il visual style. Niente si riprende senza sapere cosa vogliamo raccontare.',
          Icon: PenLine,
        },
        {
          num: '02',
          title: 'Pre-produzione',
          desc: 'Location scouting, casting, storyboard, lista attrezzatura. Tutto preparato prima del giorno di ripresa.',
          Icon: Settings,
        },
        {
          num: '03',
          title: 'Riprese',
          desc: 'Giorno/i di produzione con crew professionale. Direzione artistica inclusa: non ci limitiamo a premere REC.',
          Icon: Video,
        },
        {
          num: '04',
          title: 'Post-produzione',
          desc: 'Montaggio, color grading, sound design, sottotitoli. Consegna in tutti i formati richiesti, ottimizzati per ogni canale.',
          Icon: Scissors,
        },
      ]}
    />
  );
}

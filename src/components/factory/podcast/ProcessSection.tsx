'use client';

import { PenLine, Mic, SlidersHorizontal, Upload } from 'lucide-react';
import SubpageProcessSection from '@/components/subpage/ProcessSection';

export default function ProcessSection() {
  return (
    <SubpageProcessSection
      steps={[
        {
          num: '01',
          title: 'Concept e format',
          desc: 'Definiamo tema, format, struttura degli episodi e tono di voce. Un podcast senza format è solo una chiacchierata.',
          Icon: PenLine,
        },
        {
          num: '02',
          title: 'Setup e registrazione',
          desc: 'Studio o collegamento da remoto in qualità broadcast. Regia, audio pulito, gestione degli ospiti: tu parli, al resto pensiamo noi.',
          Icon: Mic,
        },
        {
          num: '03',
          title: 'Post-produzione',
          desc: 'Editing, sound design, sigla, mix e mastering. Tagliamo i tempi morti e diamo ritmo: l’audio esce pulito e professionale.',
          Icon: SlidersHorizontal,
        },
        {
          num: '04',
          title: 'Pubblicazione',
          desc: 'Copertina, note, capitoli e upload su tutte le piattaforme. Il tuo podcast online e pronto da ascoltare, ovunque.',
          Icon: Upload,
        },
      ]}
    />
  );
}

'use client';

import { Eye, Camera, Filter, SlidersHorizontal } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function FotografiaProcessSection() {
  return (
    <ProcessSection
      subtitle="Dal brief allo scatto finale, un processo senza sorprese."
      steps={[
        {
          num: '01',
          title: 'Brief visivo',
          desc: 'Capiamo il progetto, il brand, i canali di destinazione. Costruiamo un mood board condiviso e definiamo stile, luce e lista degli scatti da produrre.',
          Icon: Eye,
        },
        {
          num: '02',
          title: 'Produzione',
          desc: 'Shooting in studio o in location. Luce, composizione, direzione artistica. Ogni scatto è progettato prima di essere scattato — niente improvvisazione.',
          Icon: Camera,
        },
        {
          num: '03',
          title: 'Selezione',
          desc: 'Preselezione degli scatti migliori, condivisione con il cliente per feedback. Solo le foto che meritano avanzano alla fase di post-produzione.',
          Icon: Filter,
        },
        {
          num: '04',
          title: 'Post-produzione',
          desc: 'Editing professionale, color grading coerente con il brand, retouching. Consegna in tutti i formati necessari: web, print, social, archivio.',
          Icon: SlidersHorizontal,
        },
      ]}
    />
  );
}

'use client';

import { Compass, PenTool, Code2, Rocket } from 'lucide-react';
import ProcessSection from '@/components/subpage/ProcessSection';

export default function WebProcessSection() {
  return (
    <ProcessSection
      steps={[
        { num: '01', title: 'Discovery e UX', desc: 'Capiamo gli obiettivi, il pubblico, il customer journey. Il design parte da qui, non dall’estetica.', Icon: Compass },
        { num: '02', title: 'Design', desc: 'Wireframe, visual design, prototipo interattivo. Il cliente approva prima che si scriva una riga di codice.', Icon: PenTool },
        { num: '03', title: 'Sviluppo', desc: 'Implementazione pulita e documentata. Performance, accessibilità e SEO tecnica incluse by default.', Icon: Code2 },
        { num: '04', title: 'Launch e supporto', desc: 'Test, deploy, formazione all’uso del CMS. E un anno di supporto tecnico incluso per interventi urgenti.', Icon: Rocket },
      ]}
    />
  );
}

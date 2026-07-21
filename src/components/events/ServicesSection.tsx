'use client';

import { Megaphone, Globe, Camera, Clapperboard, PenTool } from 'lucide-react';
import SharedServices from '@/components/subpage/ServicesSection';

export default function EventsServicesSection() {
  return (
    <SharedServices
      services={[
        {
          title: 'MEDIA RELATION',
          desc: 'Comunicati stampa, conferenze stampa, media kit e relazioni con gli stakeholder. Gestiamo il rapporto con i giornalisti prima, durante e dopo — per garantire la massima copertura mediatica.',
          tags: ['Comunicati stampa', 'Ufficio stampa', 'Media kit'],
          Icon: Megaphone,
        },
        {
          title: 'DIGITAL MARKETING',
          desc: "Sito web dedicato all'evento, gestione social in tempo reale, campagne di sponsorizzazione, newsletter e digital PR. Trasformiamo il tuo evento in un'esperienza online memorabile.",
          tags: ['Social media', 'ADV online', 'Newsletter'],
          Icon: Globe,
        },
        {
          title: 'SERVIZI FOTO',
          desc: "Reportage fotografico completo dell'evento: momenti chiave, ospiti, relatori, backstage. Immagini professionali pronte per la comunicazione post-evento su tutti i canali.",
          tags: ['Reportage', 'Photobooth', 'Editorial'],
          Icon: Camera,
        },
        {
          title: 'SERVIZI VIDEO',
          desc: "Riprese dell'evento con una o più camere, aftermovie, interviste a relatori e ospiti, format Multivox. Tutto il materiale video di cui hai bisogno, prima e dopo.",
          tags: ['Aftermovie', 'Interviste', 'Riprese live'],
          Icon: Clapperboard,
        },
        {
          title: 'SERVIZI GRAFICA',
          desc: "Logo e immagine coordinata dell'evento, materiali online e offline (locandine, brochure, flyer), cartellonistica (roll-up, striscioni, totem). Un'identità visiva coerente dall'invito al giorno dopo.",
          tags: ['Brand evento', 'Print', 'Cartellonistica'],
          Icon: PenTool,
        },
      ]}
    />
  );
}

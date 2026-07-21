'use client';

import ApproachSection from '@/components/subpage/ApproachSection';

export default function WebPositioningSection() {
  return (
    <ApproachSection
      data={{
        video: {
          src: '/upload/web-design.mp4',
          poster: '/upload/web-design-poster.jpg',
        },
        eyebrowRight: 'Web Design & Dev · Genova',
        statement: {
          plain: 'Un sito non è una brochure online.',
          accent: 'È il cuore della tua presenza digitale.',
        },
        body: [
          "Il 75% degli utenti giudica la credibilità di un'azienda dal design del sito web. Prima ancora di leggere una parola. Un sito lento, datato o difficile da navigare costa clienti ogni giorno — silenziosamente, senza che tu lo sappia.",
          'Progettiamo siti con un obiettivo chiaro: funzionare. Non solo esteticamente — performare su Google, convertire visitatori in lead, essere gestibili senza dover chiamare un developer ogni volta. Design e sviluppo nello stesso studio.',
        ],
      }}
    />
  );
}

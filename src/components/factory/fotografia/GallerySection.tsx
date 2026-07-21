'use client';

import SharedGallery from '@/components/subpage/GallerySection';

export default function FotografiaGallerySection() {
  return (
    <SharedGallery
      data={{
        eyebrow: 'Le tipologie · più richieste',
        title: {
          plain: 'Quattro modi',
          accent: 'di guardare.',
        },
        items: [
          {
            img: '/upload/foto-ritratti.webp',
            label: 'Ritratti',
            desc: "L'essenza e la personalità dei soggetti, catturate in modo naturale e autentico.",
          },
          {
            img: '/upload/foto-prodotti.png',
            label: 'Prodotti',
            desc: 'Ogni dettaglio illuminato per presentare al meglio il prodotto e aumentare le vendite.',
          },
          {
            img: '/upload/foto-eventi.webp',
            label: 'Eventi',
            desc: "I momenti chiave e l'atmosfera del tuo evento aziendale, documentati con cura.",
          },
          {
            img: '/upload/foto-location.webp',
            label: 'Location',
            desc: 'La bellezza degli spazi e degli ambienti che valorizzano la tua attività.',
          },
        ],
      }}
    />
  );
}

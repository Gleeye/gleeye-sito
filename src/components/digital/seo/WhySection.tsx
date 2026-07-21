'use client';

import SubWhy from '@/components/subpage/WhySection';

export default function SeoWhySection() {
  return (
    <SubWhy
      intro="Ci sono agenzie che promettono la prima pagina. E ci sono agenzie che costruiscono autorità. La differenza si vede nel tempo."
      reasons={[
        {
          label: 'SEO come investimento, non come costo',
          body: 'I risultati organici non si spengono quando finisce il budget. Un buon posizionamento genera traffico per mesi, anche anni.',
        },
        {
          label: 'Tecnica e contenuto insieme',
          body: "Non separiamo l'ottimizzazione tecnica dalla strategia di contenuto. Funzionano solo se integrate.",
        },
        {
          label: 'Niente promesse impossibili',
          body: 'Non garantiamo "prima posizione in 30 giorni". Garantiamo un metodo trasparente, obiettivi realistici e risultati misurabili.',
        },
      ]}
    />
  );
}

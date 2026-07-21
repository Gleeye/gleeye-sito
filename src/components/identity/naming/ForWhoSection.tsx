'use client';

import SubForWho from '@/components/subpage/ForWhoSection';

export default function ForWhoSection() {
  return (
    <SubForWho
      items={[
        'Chi sta fondando una nuova azienda o lanciando un nuovo prodotto e vuole un nome che funzioni nel lungo periodo — non solo il primo nome che sembra carino.',
        'Chi ha già un nome che non funziona più: troppo generico, difficile da pronunciare, con accezioni negative in altri mercati o semplicemente datato.',
        'Chi gestisce un portfolio di prodotti con naming disorganico e ha bisogno di costruire un sistema coerente.',
      ]}
    />
  );
}

import type { ReactNode } from 'react';
import type { AreaConfig } from './data';

/**
 * Fascia scura continua: un solo sfondo (base + grana + aloni) dietro più
 * sezioni, così fra "Come lavoriamo" e "Il nostro approccio" non c'è nessuna
 * cucitura — lo sfondo è letteralmente lo stesso, non due che si toccano.
 * Le sezioni figlie vanno rese "bare" (trasparenti, senza sfondo proprio).
 */
export default function AreaDarkBand({ area, children }: { area: AreaConfig; children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-40 top-[18%] h-[50vh] w-[50vh] rounded-full opacity-[0.16] blur-[150px]"
        style={{ backgroundColor: area.accent1 }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-[55%] h-[45vh] w-[45vh] rounded-full opacity-[0.12] blur-[150px]"
        style={{ backgroundColor: area.accent2 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

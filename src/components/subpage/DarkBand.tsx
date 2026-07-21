import type { ReactNode } from 'react';

/**
 * Fascia scura condivisa per le sottopagine: UNO sfondo continuo (grana + glow)
 * dietro due sezioni, così non si vede il salto tra loro. Dentro, una sezione
 * vive direttamente sullo sfondo e l'altra in una card galleggiante.
 * Stesso mood delle pagine area (AreaDarkBand).
 */
export default function DarkBand({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-[12%] h-[45vh] w-[45vh] rounded-full bg-[#4e92d8] opacity-[0.12] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[10%] h-[45vh] w-[45vh] rounded-full bg-[#614aa2] opacity-[0.12] blur-[150px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

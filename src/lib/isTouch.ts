/**
 * Rileva i dispositivi touch (mobile/tablet). Su questi il sito rinuncia a
 * smooth-scroll, pin e reveal scroll-driven: contenuto sempre visibile e
 * scroll nativo. Su iOS i trigger misurati dopo una navigazione client-side
 * calcolano posizioni sbagliate e lasciano le sezioni invisibili ("pagina
 * bianca") o lo scroll congelato dentro i pin.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

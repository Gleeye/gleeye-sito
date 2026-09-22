import { seo } from '@/lib/seo';

/* Pagina interna, non linkata dal sito: fuori dall'indice di Google.
   La pagina è 'use client', quindi il <head> lo dichiara qui. */
export const metadata = seo({
  title: 'Proposte',
  description: 'Pagina interna di lavoro. Non destinata alla pubblicazione.',
  path: '/proposte',
  noindex: true,
});

export default function ProposteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

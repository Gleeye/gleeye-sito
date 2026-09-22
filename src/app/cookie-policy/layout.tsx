import { seo } from '@/lib/seo';

/* La pagina è 'use client' (legge il consenso), quindi il <head> lo dichiara
   questo layout: un client component non può esportare `metadata`. */
export const metadata = seo({
  title: 'Cookie Policy',
  description:
    'Cookie policy di Gleeye srl: quali cookie usa gleeye.eu, a cosa servono e come gestire o revocare il consenso in qualsiasi momento.',
  path: '/cookie-policy',
});

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

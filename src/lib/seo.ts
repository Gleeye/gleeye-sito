import type { Metadata } from 'next';

/* ————————————————————————————————————————————————————————————————
   SEO — un solo posto da cui esce il <head> di ogni pagina.

   Perché esiste: prima ogni page.tsx scriveva il suo `metadata` a mano, e
   mancavano sempre le stesse tre cose — il canonical (nessuna pagina ce
   l'aveva tranne il blog), l'openGraph per pagina (tutte ereditavano lo stesso
   titolo dal layout) e un titolo che non ripetesse due volte "Gleeye"
   (il template `%s — Gleeye` girava su titoli che contenevano già il nome:
   "Chi siamo — Gleeye — Gleeye"). Quando il titolo e la descrizione fanno
   brutta figura, Google li riscrive da solo pescando il footer: è quello che
   stava succedendo nei risultati di ricerca.

   L'host canonico è www: l'apex fa 308 su www, quindi tutti gli URL dichiarati
   (canonical, openGraph, sitemap, robots) devono già essere in www.
   ———————————————————————————————————————————————————————————————— */

export const SITE_URL = 'https://www.gleeye.eu';
export const SITE_NAME = 'Gleeye';

type SeoInput = {
  /** Titolo SENZA "— Gleeye": lo aggiunge il template del layout. */
  title: string;
  description: string;
  /** Percorso assoluto dal root, es. '/digital/seo'. Diventa il canonical. */
  path: string;
  /** true = il titolo è già completo e il template non deve toccarlo. */
  absoluteTitle?: boolean;
  /** Pagine che non devono finire su Google (aree riservate, landing private). */
  noindex?: boolean;
  /** Override dell'immagine di anteprima (default: quella generata dal root). */
  image?: string;
  ogType?: 'website' | 'article';
};

export function seo({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
  image,
  ogType = 'website',
}: SeoInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;

  /* Va indicata a mano: una pagina che dichiara il suo `openGraph` sostituisce
     quello del layout, e con esso perde l'immagine generata da
     src/app/opengraph-image.tsx. Senza questa riga solo le pagine senza
     openGraph proprio avevano un'anteprima. */
  const images = [image ?? '/opengraph-image'];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'it_IT',
      type: ogType,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

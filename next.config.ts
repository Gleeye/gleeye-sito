import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Lo slash finale lo gestisce il middleware: un solo 301 diretto invece
     della catena 308 (via slash) + 301 (redirect vero). */
  skipTrailingSlashRedirect: true,

  /**
   * Le immagini del vecchio WordPress (~1.000 file in /wp-content) restano sul
   * vecchio hosting, raggiungibile su old.gleeye.eu. Rewrite, NON redirect:
   * gli URL sotto gleeye.eu restano identici a prima e non si rompe nulla.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/wp-content/:path*',
          destination: 'https://old.gleeye.eu/wp-content/:path*',
        },
      ],
    };
  },

  /**
   * 301 dal vecchio WordPress al nuovo Next — evita i 404 sugli URL indicizzati.
   * NB: il BLOG (/blog/*) NON è qui: gli articoli vengono riportati 1:1 sugli
   * stessi slug nel Next (stesso URL → 200, nessun redirect). Il PORTFOLIO è
   * escluso finché la nuova sezione /portfolio non è online (per non far ombra
   * alle sue rotte). L'ordine conta: le regole specifiche prima del catch-all.
   */
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      // Servizi → i tre pilastri / eventi
      r('/servizi/servizi-seo/:path*', '/digital'),
      r('/servizi/sviluppo-siti-web-e-e-commerce/:path*', '/digital'),
      r('/servizi/servizi-fotografici/:path*', '/factory'),
      r('/servizi/consulenze-strategiche/:path*', '/identity'),
      r('/servizi/comunicazione-e-marketing-per-eventi-aziendali/:path*', '/events'),
      r('/servizi/servizi-di-comunicazione-e-marketing-per-eventi-aziendali/:path*', '/events'),
      // Ogni altro /servizi/* non mappato sopra → home (meglio di un 404)
      r('/servizi/:path*', '/'),
      // Tassonomie del blog (il blog non esiste più come archivio) → home
      r('/category/:path*', '/'),
      r('/tag/:path*', '/'),
      r('/author/:path*', '/'),
    ];
  },
};

export default nextConfig;

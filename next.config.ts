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
};

export default nextConfig;

import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import SmoothScroll from "@/components/v2/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gleeye.eu"),
  title: {
    default: "Gleeye — Agenzia di Comunicazione | Genova",
    template: "%s — Gleeye",
  },
  description:
    "Architetti di percezioni. Boutique strategica e Factory creativa: identità di marca, ecosistemi digitali e produzione di contenuti d'élite. Genova.",
  openGraph: {
    title: "Gleeye — Glee to Eye",
    description:
      "Boutique strategica e Factory creativa. Identità, digital, produzione.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,1,2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${cormorant.variable} ${plexMono.variable} ${jakarta.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieBanner />
      </body>
    </html>
  );
}

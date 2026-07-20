import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/* Satoshi self-hosted: niente dipendenza dal CDN Fontshare a runtime. */
const satoshi = localFont({
  variable: "--font-satoshi-local",
  display: "swap",
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
});
import CookieBanner from "@/components/CookieBanner";
import AnalyticsGate from "@/components/AnalyticsGate";
import SmoothScroll from "@/components/v2/SmoothScroll";

const newsreader = Newsreader({
  variable: "--font-newsreader-next",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
});

// Playfair Display: serif display ad alto contrasto, usato in corsivo per lo
// statement di "Il nostro approccio" nelle pagine area.
const playfair = Playfair_Display({
  variable: "--font-playfair-next",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
  // Le variabili dei font stanno su <html>: i token in @theme sono emessi su
  // :root, e da lì non vedrebbero variabili definite solo sul <body>.
  return (
    <html
      lang="it"
      className={`${satoshi.variable} ${newsreader.variable} ${playfair.variable} ${plexMono.variable} ${jakarta.variable}`}
    >
      <body className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieBanner />
        <AnalyticsGate />
      </body>
    </html>
  );
}

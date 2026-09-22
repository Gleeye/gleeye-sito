import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

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
import PageWidgetOverlay from "@/components/PageWidgetOverlay";
import ReferralCapture from "@/components/ReferralCapture";

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

/* metadataBase = www: l'apex fa 308 su www, quindi ogni URL che dichiariamo
   (canonical, og:url, sitemap) deve già essere l'indirizzo che Google serve.
   Titolo e descrizione qui sotto sono solo il fondo: ogni pagina scrive i suoi
   con `seo()` (src/lib/seo.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gleeye — Agenzia di Comunicazione a Genova",
    template: "%s — Gleeye",
  },
  description:
    "Agenzia di comunicazione a Genova: brand identity, siti web, social, SEO, video e fotografia. Strategia e produzione sotto lo stesso tetto.",
  openGraph: {
    siteName: "Gleeye",
    locale: "it_IT",
    type: "website",
  },
};

/* Dati strutturati: senza questi, per la ricerca "gleeye" Google si costruisce
   lo snippet raschiando il footer (indirizzo, mail, telefono) invece di usare
   la descrizione. Qui glieli diamo in chiaro, una volta sola per tutto il sito. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Gleeye",
      legalName: "Gleeye srl",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo.png`,
      image: `${SITE_URL}/brand/logo%20square.png`,
      description:
        "Agenzia di comunicazione a Genova: brand identity, siti web, social, SEO, video e fotografia.",
      email: "info@gleeye.eu",
      telephone: "+390100954533",
      vatID: "IT02944020995",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Piazza Brignole 2/3",
        postalCode: "16122",
        addressLocality: "Genova",
        addressRegion: "GE",
        addressCountry: "IT",
      },
      areaServed: "IT",
      sameAs: [
        "https://www.instagram.com/gleeye",
        "https://www.linkedin.com/company/gleeye/",
        "https://www.facebook.com/gleeye/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Gleeye",
      inLanguage: "it-IT",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieBanner />
        <AnalyticsGate />
        <ReferralCapture />
        <PageWidgetOverlay />
      </body>
    </html>
  );
}

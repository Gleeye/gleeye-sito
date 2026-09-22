# Gleeye — Sito Istituzionale (gleeye.eu)

## Modello di collaborazione

**Davide non è un developer.** Esprime cosa vuole visivamente e in termini di contenuto, Claude gestisce tutto il codice autonomamente.
- Non coinvolgerlo in decisioni tecniche — prendile tu
- Per nuove sezioni o componenti: usa le skill `component-builder`, `gsap-motion`, `site-copy` (documentate in fondo al file)
- **Prima di iniziare**: chiedi se c'è già un'altra sessione Claude aperta su questo repo
- Ogni nuova pagina costruita: aggiorna la sezione "Stato attuale" in questo file

Progetto: sito vetrina di Gleeye (gleeye.eu), agenzia di comunicazione a Genova.
Stack: Next.js (App Router, TypeScript), Tailwind CSS v4, GSAP + ScrollTrigger, Lucide React.
Font: Satoshi (display) + Plus Jakarta Sans (body).
Colori: primary `#4e92d8` (sky blue), secondary `#614aa2` (deep purple), bg chiaro `#F8F9FA` (bianco ghiaccio).

## Stato attuale — SITO V2 (redesign completo, luglio 2026)

Il sito è stato ricostruito da zero con un nuovo design system ("Optical Precision").
Tutti i componenti v2 vivono in `src/components/v2/`. I vecchi componenti in
`src/components/` (Hero, CoreAreas, ecc.) sono legacy: usati solo dalle sottopagine
servizio non ancora rifatte. `Header.tsx` e `Footer.tsx` legacy sono re-export della v2.

### Design system v2
- Palette: ink `#0a0a10` (dark), ice `#F8F9FA` (light), anchor blue `#4e92d8`, purple `#614aa2`, fluo `#6db5ff` / `#9b7bff`
- Voci tipografiche (classi in globals.css): `.voice-display` (Satoshi Black uppercase), `.voice-serif` (Newsreader italic — il corsivo del sito, non più Cormorant), `.voice-mono` (Plex Mono labels tecniche)
- Texture: `.grain` (noise), `.blueprint` / `.blueprint-ink` (griglia fine)
- Smooth scroll Lenis (`v2/SmoothScroll.tsx`), cursore custom (`v2/Cursor.tsx`), magnetic buttons (`v2/Magnetic.tsx`)
- Hero WebGL "iride liquida": `v2/home/HeroIris.tsx` (home) e `v2/IrisCanvas.tsx` (riusabile, tinta per area)

### Pagine v2 completate
- `/` — HeroIris WebGL, Ticker (servizi + loghi clienti), Areas (pin orizzontale), Manifesto (reveal parola-per-parola), Duality (dittico Boutique/Factory interattivo), Method, SpecialUnits (tilt 3D), Contact
- `/identity`, `/digital`, `/factory` — sistema area parametrico (`v2/area/`): AreaHero (iride tinta), AreaChapters (accordion capitoli), AreaEssence (principi), AreaCTA (marquee)
- `/contatti` — pagina contatti dedicata; i CTA aprono il modulo assegnato dall'ERP (vedi «Aggancio all'ERP»), il mailto resta come fallback
- `/lavora-con-noi` — redesign v2 (`v2/LavoraConNoi.tsx`): hero "Abbiamo occhio *per quelli bravi.*" (gioco sul brand; il copy qui è brillante ma MAI mitomane — bocciati i claim epici), sezioni perché lavorare qui + figure/skill; unico CTA candidatura nel footer (apre il form del widget ERP via ancora #parliamone)
- `/cookie-policy`, `/privacy-policy` — chrome v2 + dati reali (Piazza Brignole 2/3, P.IVA corretta)
- 404 custom (`not-found.tsx`), page transitions (`template.tsx`), sitemap.ts, robots.ts
- Sottopagine servizio (identity/digital/factory/*, /podcast, /video-explainer, /events): design v1, chrome v2
- `/factory/podcast` — sottopagina vetrina Podcast & Audio Branding (sistema sottopagine condiviso); la landing `/podcast` resta il servizio "Podcast da Remoto Essential"
- `/copy` — landing verticale Copywriting (design v1, chrome v2)
- `/blog`, `/blog/[slug]` — blog nativo, articoli letti dal Supabase del sito (`lib/blog.ts`), ISR 1h
- `/portfolio`, `/portfolio/[slug]` — case history dal Supabase del sito (`lib/portfolio.ts`). ⚠️ Le pagine
  esistono e si compilano, ma `/portfolio` NON è in `ROUTES` di `src/middleware.ts`: il catch-all la manda
  su old.gleeye.eu, quindi oggi è irraggiungibile. Va aggiunta a ROUTES quando si decide di aprirla.
- `/proposte` — pagina proposte (IrisCanvas), `/admin/*` — area riservata (dashboard, copy, visuals)
- Pagine istituzionali rifatte (lug 2026): `/chi-siamo` (hero "Piacere," a strisciata orizzontale + capitoli ghost), `/mission-e-vision` (concept "La rotta": percorso luminoso che consegna alla CTA footer), `/manifesto` (statement + corsivi gradiente), `/metodo` (concept "La linea": scarabocchio che si raddrizza scrollando e si parcheggia sotto la chiusura). Corsivi: SEMPRE Playfair italic con `w-fit` (mai gradienti inline custom) — su fondo scuro classe `.text-gradient` (fluo), su fondo chiaro `.text-gradient-deep` (blu/viola pieni: il fluo sul bianco risulta slavato)

### Aggancio all'ERP (workspace.gleeye.eu)
Il sito non ha un modulo di contatto proprio: il cervello è l'ERP, il sito è la pelle.
- `PageWidgetOverlay.tsx` chiede all'ERP (RPC `get_page_widgets`) quale modulo/prenotazione
  è assegnato alla rotta corrente, mostra il FAB a ventaglio e **intercetta i CTA di contatto dentro
  `<main>`** (`/contatti`, `#contatti`, `mailto:info@gleeye.eu`) aprendoli in overlay
- `components/form/NativeForm.tsx` ridisegna col design del sito il modulo definito nell'ERP e scrive
  direttamente in `contact_submissions` (`useErpForm.ts`). L'embed in iframe resta solo come fallback
  per i moduli protetti da reCAPTCHA
- L'assegnazione modulo↔pagina si governa dall'ERP (vista `/sito`), non dal codice del sito

### Attribuzione ambassador (`?ref=`)
Chi arriva da un link condiviso da un segnalatore (`/digital/web?ref=vitt-7k2`) porta con sé un codice
che deve tornare all'ERP: su quello si paga una provvigione. Vedi `SPEC-attribuzione-ambassador.md`.
- `lib/referral.ts` + `components/ReferralCapture.tsx` (nel layout): raccolgono il codice e la pagina
  di atterraggio. `sessionStorage` per la visita (nessun consenso: completa un'azione in corso),
  `localStorage` 90 giorni **solo col consenso marketing** del banner. Il primo codice visto vince
- Riconsegna: `useErpForm` scrive le colonne `ambassador_ref` e `landed_from` della submission;
  gli iframe ERP ricevono `?ref=&from=`
- Senza codice non cambia NIENTE: stessa insert di prima, stessi link. È il caso normale
- Niente tracciamento: nessun conteggio clic, nessun evento, nessun invio a terzi

### SEO — il <head> esce da un posto solo
`src/lib/seo.ts` costruisce i metadata di ogni pagina: `seo({ title, description, path })`.
Da lì escono titolo (il template del layout aggiunge `— Gleeye`, quindi il titolo NON deve
contenerlo), description, **canonical**, openGraph e twitter card. Non scrivere più
`export const metadata = { ... }` a mano in un page.tsx.
- **L'host canonico è `https://www.gleeye.eu`**: l'apex fa 308 su www. `metadataBase`,
  sitemap e robots devono dichiarare www, altrimenti si indicizzano URL che redirigono
- Dati strutturati (Organization + LocalBusiness + WebSite) in `layout.tsx`: senza, per la
  ricerca "gleeye" Google si costruisce lo snippet raschiando il footer invece di usare la
  description. È esattamente quello che stava succedendo prima (set 2026)
- Anteprima social generata da `src/app/opengraph-image.tsx` (1200×630, logo su fondo ink).
  `seo()` la dichiara esplicitamente: una pagina che scrive il suo `openGraph` sostituisce
  quello del layout e **perde** l'immagine da file
- Pagine `'use client'` (cookie-policy, proposte) non possono esportare `metadata`: il head
  sta nel loro `layout.tsx`

### Lezioni tecniche apprese (NON ripetere questi errori)
- Turbopack (Next 16) NON emette `@import url()` remoti nel CSS: font via `next/font` o `<link>` nel layout
- MAI `::-webkit-scrollbar` custom sul root: forza scrolling main-thread e desincronizza il paint
- MAI transform su wrapper di elementi `position:fixed` (template.tsx usa solo opacity)
- MAI `loseContext()` nel cleanup WebGL: in dev StrictMode il canvas viene rimontato col contesto perso
- Reveal robusti: `gsap.set` + `ScrollTrigger.create({onEnter})`, NON `gsap.from(..., {scrollTrigger})` (può non scattare)
- Niente CSS `transition-all` su elementi animati da GSAP (conflitto sulle stesse proprietà)
- Anchor cross-page (`/#sezione`) inaffidabili con sezioni pinnate: usare pagine dedicate (es. `/contatti`)
- Ogni pagina nuova va aggiunta a `ROUTES` in `src/middleware.ts`, altrimenti il catch-all la manda
  su old.gleeye.eu (è successo a `/portfolio`). Vale anche per le rotte generate da Next che non
  hanno un punto nel percorso: `/opengraph-image` finiva su old.gleeye.eu e le anteprime social
  restavano vuote. I file con l'estensione (`/sitemap.xml`, `/robots.txt`, `/icon.png`) passano già
- Niente `useSearchParams()` in un componente montato nel layout: obbliga a un `<Suspense>` e toglie
  la resa statica a tutte le pagine. Per leggere la query dopo il mount basta `window.location.search`

### Da fare (eventuale)
- Redesign v2 delle sottopagine servizio e delle landing `/podcast`, `/video-explainer`, `/events`, `/copy`
- `/video` — landing verticale Video Production
- Decidere se aprire `/portfolio` (aggiungendola a `ROUTES` del middleware) o lasciarla chiusa

## Skill da usare (plugin web-builder)

| Cosa serve fare | Skill |
|---|---|
| Nuova sezione o componente | `component-builder` |
| Animazioni GSAP / scroll | `gsap-motion` |
| Copy per sezioni, headline, CTA | `site-copy` |
| Design system, colori, font | `design-system-web` |
| SEO, metadata, sitemap | `seo-web` |
| UI avanzata, palette, stili | `ui-ux-pro-max` |
| Nuovo progetto da zero | `next-scaffolder` |

## Convenzioni di codice

- Ogni componente ha `'use client'` se usa hooks o GSAP
- GSAP: `if (typeof window !== "undefined")` prima di `registerPlugin`
- Posizionamento iniziale GSAP: sempre in `useLayoutEffect`
- Cleanup: `ctx.revert()` + `cancelAnimationFrame` + `removeEventListener`
- Sezioni con sfondo chiaro: `bg-[#F8F9FA]` (bianco ghiaccio) — MAI usare `#F5F3EE` (troppo caldo)
- Sezioni dark (hero): `bg-black`
- Ogni page.tsx deve includere `<Header />` e `<Footer />` — non sono nel layout globale
- Hero delle sottopagine: `pt-32 md:pt-40` per compensare l'header fixed
- Heading: `font-satoshi font-black tracking-tight uppercase`
- Body text: `font-jakarta font-medium leading-relaxed text-black/55`

## Documenti di riferimento nel progetto
- `DESIGN_&_VISUAL_LANGUAGE.md` — palette, tipografia, motion guidelines
- `IDENTITY_MANIFESTO.md` — tono di voce, posizionamento, valori Gleeye
- `SERVICE_MATRIX.md` — tutti i servizi per area (Identity / Digital / Factory)
- `src/components/factory/` — codice di riferimento per i pattern principali

## Come procedere in una nuova sessione

1. Leggi questo file ✓
2. Chiedi all'utente cosa vuole costruire oggi
3. Identifica quale skill usare dalla tabella sopra
4. Leggi il componente di riferimento più vicino (`src/components/factory/HeroSection.tsx` o `ServicesAccordion.tsx`)
5. Costruisci direttamente — senza chiedere dettagli ovvi già definiti qui

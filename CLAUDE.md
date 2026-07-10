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
- Voci tipografiche (classi in globals.css): `.voice-display` (Satoshi Black uppercase), `.voice-serif` (Cormorant italic), `.voice-mono` (Plex Mono labels tecniche)
- Texture: `.grain` (noise), `.blueprint` / `.blueprint-ink` (griglia fine)
- Smooth scroll Lenis (`v2/SmoothScroll.tsx`), cursore custom (`v2/Cursor.tsx`), magnetic buttons (`v2/Magnetic.tsx`)
- Hero WebGL "iride liquida": `v2/home/HeroIris.tsx` (home) e `v2/IrisCanvas.tsx` (riusabile, tinta per area)

### Pagine v2 completate
- `/` — HeroIris WebGL, Ticker (servizi + loghi clienti), Areas (pin orizzontale), Manifesto (reveal parola-per-parola), Duality (dittico Boutique/Factory interattivo), Method, SpecialUnits (tilt 3D), Contact
- `/identity`, `/digital`, `/factory` — sistema area parametrico (`v2/area/`): AreaHero (iride tinta), AreaChapters (accordion capitoli), AreaEssence (principi), AreaCTA (marquee)
- `/contatti` — pagina contatti dedicata (form mailto → info@gleeye.eu)
- `/lavora-con-noi` — form candidature (era iframe rotto verso localhost:8080)
- `/cookie-policy`, `/privacy-policy` — chrome v2 + dati reali (Piazza Brignole 2/3, P.IVA corretta)
- 404 custom (`not-found.tsx`), page transitions (`template.tsx`), sitemap.ts, robots.ts
- Sottopagine servizio (identity/digital/factory/*, /podcast, /video-explainer, /events): design v1, chrome v2

### Lezioni tecniche apprese (NON ripetere questi errori)
- Turbopack (Next 16) NON emette `@import url()` remoti nel CSS: font via `next/font` o `<link>` nel layout
- MAI `::-webkit-scrollbar` custom sul root: forza scrolling main-thread e desincronizza il paint
- MAI transform su wrapper di elementi `position:fixed` (template.tsx usa solo opacity)
- MAI `loseContext()` nel cleanup WebGL: in dev StrictMode il canvas viene rimontato col contesto perso
- Reveal robusti: `gsap.set` + `ScrollTrigger.create({onEnter})`, NON `gsap.from(..., {scrollTrigger})` (può non scattare)
- Niente CSS `transition-all` su elementi animati da GSAP (conflitto sulle stesse proprietà)
- Anchor cross-page (`/#sezione`) inaffidabili con sezioni pinnate: usare pagine dedicate (es. `/contatti`)

### Da fare (eventuale)
- Redesign v2 delle sottopagine servizio e delle landing `/podcast`, `/video-explainer`, `/events`
- `/video` — landing verticale Video Production

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

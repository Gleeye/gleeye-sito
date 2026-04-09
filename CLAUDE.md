# Gleeye — Sito Istituzionale

Progetto: sito vetrina di Gleeye (gleeye.eu), agenzia di comunicazione a Genova.
Stack: Next.js (App Router, TypeScript), Tailwind CSS v4, GSAP + ScrollTrigger, Lucide React.
Font: Satoshi (display) + Plus Jakarta Sans (body).
Colori: primary `#4e92d8` (sky blue), secondary `#614aa2` (deep purple), bg chiaro `#F8F9FA` (bianco ghiaccio).

## Stato attuale

### Pagine completate
- `/` — Homepage con 7 sezioni (Hero, LogoTicker, CoreAreas, Manifesto, Identity, SpecialUnits, Contact)
- `/factory` — Hero dark + ServicesAccordion sticky scroll (5 servizi: Video, Photo, Copy, Podcast, Graphic Design)
- `/podcast` — Landing page completa (Hero, Value, Essence, Process, FAQ, Contact)
- `/video-explainer` — Landing page completa
- `/lavora-con-noi` — Pagina
- `/cookie-policy`, `/privacy-policy` — Pagine legali

### Da costruire
- `/identity` — Area page (Brand Discovery, Naming, Visual Identity, Brand Guidelines)
- `/digital` — Area page (Web, Social, SEO, Advertising)
- `/events` — Da copiare dal sito vecchio
- `/video` — Vertical landing page Video Production (come /podcast ma per video)
- Pagine legali da rivedere

### Pattern da seguire
Le pagine area (`/identity`, `/digital`) usano lo **stesso pattern della pagina `/factory`**:
- `src/app/[slug]/page.tsx` — solo imports + composizione
- `src/components/[slug]/HeroSection.tsx` — hero dark con canvas waves GSAP
- `src/components/[slug]/ServicesAccordion.tsx` — sticky accordion scroll-driven

Vedere `src/components/factory/` come riferimento canonico.

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

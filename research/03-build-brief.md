# 03 — Build Brief · Nuovo Sito Gleeye
> Documento master per il completamento del sito. Basato sull'analisi competitiva del mercato genovese.

---

## Stato Attuale del Build

### Pagine già completate ✓
- `/` — Homepage (7 sezioni: Hero, LogoTicker, CoreAreas, Manifesto, Identity, SpecialUnits, Contact)
- `/factory` — Hero dark + ServicesAccordion sticky scroll
- `/podcast` — Landing page completa
- `/video-explainer` — Landing page completa
- `/lavora-con-noi`
- `/cookie-policy`, `/privacy-policy`

### Pagine da costruire (priorità ordinate)
1. `/identity` — **ALTA PRIORITÀ** (copre il 35% delle query target)
2. `/digital` — **ALTA PRIORITÀ** (copre il 35% delle query target)
3. `/video` — Media priorità
4. `/events` — Bassa priorità (copiare dal vecchio sito)

---

## Direzione di Design

### Palette (confermata dall'analisi competitiva)
- **Primary:** `#4e92d8` (Sky Blue) — nessun competitor usa questa tonalità
- **Secondary:** `#614aa2` (Deep Purple) — combinazione blue+purple è esclusiva nel mercato locale
- **Background:** `#F5F3EE` (warm cream) — eleganza senza freddezza
- **Sezioni dark:** `bg-black` per gli hero
- **Fluo accents:** versioni elettriche del blue/purple SOLO per CTA e animazioni

### Tipografia (confermata)
- **Display:** Satoshi Bold/Black — superiore a tutto il mercato locale
- **Body:** Plus Jakarta Sans Regular/Medium
- **Headings:** `font-satoshi font-black tracking-tight uppercase`
- **Body text:** `font-jakarta font-medium leading-relaxed text-black/55`

### Animazioni (standard)
- Canvas waves GSAP negli hero dark = signature visivo Gleeye
- Sticky scroll accordion = pattern canonico per pagine area
- Sempre `useLayoutEffect` per posizionamento iniziale
- Sempre `ctx.revert()` + cleanup nel return

---

## Architettura del Sito (completa)

```
/ (homepage)
├── /identity         ← Brand Discovery, Naming, Visual Identity, Guidelines
├── /digital          ← Web, Social, SEO, Advertising
├── /factory          ← Video, Photo, Copy, Podcast, Graphic Design ✓
│   ├── /podcast      ← Landing verticale ✓
│   ├── /video-explainer ← Landing verticale ✓
│   └── /video        ← Landing verticale (da costruire)
├── /events           ← Gleeye Events Special Unit
├── /lavora-con-noi   ✓
├── /cookie-policy    ✓
└── /privacy-policy   ✓
```

---

## Content Framework per Pagine Mancanti

### `/identity` — Gleeye Identity
**Headline options (3 opzioni, da scegliere una):**
1. "L'identità non si inventa. Si scopre." *(discovery focused)*
2. "Prima di comunicare, bisogna sapere chi sei." *(problem/solution)*
3. "Il tuo brand ha già un'anima. Noi la rendiamo visibile." *(benefit focused)*

**Value prop:** L'area Identity è la fase in cui si risponde a "Chi siamo e come vogliamo essere percepiti?". Senza questa base, ogni investimento in marketing è un potenziale spreco di budget.

**Servizi (accordion):**
1. Brand Discovery & Strategic Audit — "Analisi del DNA aziendale"
2. Naming & Verbal Identity — "Come il brand suona e interagisce"
3. Visual Identity System — "Logo, Type, Color Palette — ecosistema visivo"
4. Brand Guidelines & Rebranding — "Codifica dei processi visivi"

### `/digital` — Gleeye Digital
**Headline options:**
1. "La tua presenza online non è un sito. È un'infrastruttura." *(reframe)*
2. "Il mercato digitale non perdona chi non c'è." *(urgency)*
3. "Costruiamo il posto dove il tuo brand vive." *(imagery)*

**Value prop:** Questa area costruisce l'"infrastruttura dove il brand vive e si relaziona con il mercato". Strategia → tecnologia → flussi di marketing.

**Servizi (accordion):**
1. Web Design & Development "Architettura Piuma" — velocità estrema + pulizia visiva
2. Digital Ecosystem & Social Strategy — presidio dei punti di contatto
3. Search Authority (SEO) — costruzione dell'autorità digitale
4. Performance Marketing (Advertising) — Meta, Google, LinkedIn

---

## CTA Strategy

### CTA Primaria (per tutte le pagine)
**"Parliamo del tuo progetto"** → porta al form contatti o a un appuntamento
- Non "Contattaci" (troppo generico)
- Non "Richiedi un preventivo" (svalutante, implica commodity)
- "Parliamo del tuo progetto" = partnership, non vendita

### CTA Secondaria
**"Guarda i lavori"** → porta al portfolio/case history

---

## Priorità di Build (ordine consigliato)

1. **`/identity`** — Massima priorità. È l'area boutique, quella che giustifica i prezzi e differenzia da tutti i competitor. Pattern: HeroSection dark + ServicesAccordion (replica esatta del pattern `/factory`)

2. **`/digital`** — Alta priorità. Copre il volume maggiore di ricerche. Stesso pattern.

3. **Case history** — 3-4 case history veri cambiano la percezione più di qualsiasi copy. Anche solo nome cliente + immagine + 3 righe.

4. **`/video`** — Vertical landing simile a `/podcast`.

5. **`/events`** — Copiare struttura dal vecchio sito, adattare allo stile nuovo.

---

## Cosa Evitare (insight da analisi competitiva)

| Da evitare | Perché | Alternativa |
|-----------|--------|-------------|
| "Soluzioni su misura" | Usato da tutti i competitor, non dice niente | "Percorso estratto dal tuo DNA aziendale" |
| Elencazione di servizi in homepage | Blue Lime lo fa, è noioso e generico | Tre aree + accordion nelle pagine dedicate |
| "Ti aiutiamo a raggiungere i tuoi obiettivi" | È l'headline attuale del vecchio sito | Il manifesto "Glee to Eye" |
| Performance metrics fake (98M impression) | Blue Lime lo fa, sembra gonfiato | Case history veri con clienti reali |
| Logo ticker senza context | Se i clienti non sono riconoscibili, non convince | Abbinare logo a settore o progetto |

---

## SEO Keywords Prioritarie (mercato locale)

| Keyword | Intento | Pagina target |
|---------|---------|---------------|
| agenzia comunicazione Genova | Commerciale | Homepage |
| brand identity Genova | Commerciale | /identity |
| web agency Genova | Commerciale | /digital |
| produzione video Genova | Commerciale | /video |
| podcast aziendale | Informativo/Commerciale | /podcast |
| grafica pubblicitaria Genova | Commerciale | /factory |
| social media marketing Genova | Commerciale | /digital |
| naming brand | Informativo | /identity |

---

## Note Finali

Il nuovo sito Gleeye è già il più avanzato tecnicamente nel mercato genovese.
Il gap da colmare non è tecnico ma contenutistico:
- Completare `/identity` e `/digital`
- Aggiungere 3-4 case history veri
- Portare il manifesto "Glee to Eye" in superficie in homepage

Con queste aggiunte, Gleeye avrà il sito più forte di qualsiasi agenzia genovese,
con un posizionamento che non ha competitor diretti.

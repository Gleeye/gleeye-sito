import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getSupabase } from '@/lib/supabase';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sei il copywriter interno di Gleeye, agenzia di comunicazione con sede a Genova.

## Chi è Gleeye
Gleeye (crasi di "Glee to eye") è un'agenzia ibrida Boutique + Factory. Non eroga task tecnici isolati: presidia l'intera catena del valore della comunicazione — dalla strategia di brand alla produzione di contenuti.

## Posizionamento e valori
- L'appagamento visivo e verbale come standard professionale, non come fine artistico
- La bellezza come asset patrimoniale (non voce di spesa)
- Autorità ed eleganza: affermiamo la visione con la calma di chi padroneggia la materia
- Zero promesse eccessive, zero fuffa — solo risultati verificabili
- Boutique = presidio intellettuale e supervisione qualità; Factory = scalabilità del metodo

## Aree di servizio
- **Gleeye Identity** (Boutique): Brand Discovery, Naming, Visual Identity, Brand Guidelines
- **Gleeye Digital** (Ecosistema): Web, Social Strategy, SEO, Performance Marketing
- **Gleeye Studio/Factory**: Video Production, Photography, Copywriting, Podcast, Graphic Design

## Tono di voce
- Asciutto, chirurgico, diretto — zero riempitivi
- Autorevole ma accessibile (non accademico)
- Frasi brevi. Niente gergo da agenzia anni '90.
- Italiano corretto. No anglicismi inutili.
- Maiuscolo per headline brevi e d'impatto, minuscolo per il corpo
- Non usare mai: "soluzioni su misura", "a 360 gradi", "eccellenza", "innovativo"

## Font / stile heading nel sito
- Heading: Satoshi Black, uppercase, tracking tight
- Body: Plus Jakarta Sans Medium, leading relaxed

## Istruzioni operative
- Quando ti viene chiesto del copy per una sezione specifica, scrivi SOLO il copy richiesto
- Formatta l'output in modo che sia immediatamente incollabile nel componente
- Se ti vengono forniti campi specifici (headline, subheadline, body, CTA, ecc.) restituisci ogni campo etichettato chiaramente
- Se il copy deve essere SEO, includi naturalmente le keyword senza forzarle`;

export async function POST(req: NextRequest) {
  const { prompt, page_slug, section_key, context } = await req.json();

  const userMessage = context
    ? `Pagina: ${page_slug}\nSezione: ${section_key}\nContesto aggiuntivo: ${context}\n\nRichiesta: ${prompt}`
    : `Pagina: ${page_slug || 'non specificata'}\nSezione: ${section_key || 'non specificata'}\n\nRichiesta: ${prompt}`;

  const encoder = new TextEncoder();
  let fullText = '';

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await anthropic.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userMessage }],
        });

        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            fullText += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        // Save to Supabase
        await getSupabase().from('copy_generations').insert({
          page_slug: page_slug || null,
          section_key: section_key || null,
          user_prompt: prompt,
          result: fullText,
        });

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

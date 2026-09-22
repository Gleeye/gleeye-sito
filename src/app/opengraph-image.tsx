import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

/* Immagine di anteprima per chat e social: prima il sito non ne aveva nessuna,
   quindi ogni link condiviso arrivava senza figura. Questa vale per tutte le
   pagine che non ne dichiarano una propria (gli articoli del blog e i case
   study usano la loro copertina). */

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Gleeye — Agenzia di Comunicazione a Genova';

export default async function Image() {
  const logo = fs.readFileSync(
    path.join(process.cwd(), 'public/brand/logo bianco.png')
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          background:
            'radial-gradient(circle at 50% 45%, #1b1b3a 0%, #0a0a10 65%)',
        }}
      >
        <img src={logoSrc} width={420} alt="Gleeye" />
        <div
          style={{
            display: 'flex',
            color: 'rgba(255,255,255,0.72)',
            fontSize: 34,
            letterSpacing: 1,
            textAlign: 'center',
          }}
        >
          Agenzia di comunicazione · Genova
        </div>
      </div>
    ),
    size
  );
}

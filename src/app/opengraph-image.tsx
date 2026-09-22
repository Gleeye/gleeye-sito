import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

/* Immagine di anteprima per chat e social: prima il sito non ne aveva nessuna,
   quindi ogni link condiviso arrivava senza figura. Questa vale per tutte le
   pagine che non ne dichiarano una propria (gli articoli del blog e i case
   study usano la loro copertina).

   Fondo chiaro perché il logo a colori è un gradiente blu→viola: sul fondo ink
   del sito resterebbe scuro su scuro. Bianco ghiaccio #F8F9FA, come tutte le
   sezioni chiare (mai #F5F3EE). */

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Gleeye — Agenzia di Comunicazione a Genova';

export default async function Image() {
  const logo = fs.readFileSync(path.join(process.cwd(), 'public/brand/logo.png'));
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
          /* Il file del logo ha molto bianco interno sopra e sotto: senza questo
             il blocco cade basso nell'inquadratura. */
          paddingBottom: 110,
          background:
            'radial-gradient(circle at 50% 42%, #ffffff 0%, #F8F9FA 55%, #eceef2 100%)',
        }}
      >
        <img src={logoSrc} width={760} alt="Gleeye" />
        <div
          style={{
            display: 'flex',
            marginTop: -40,
            color: 'rgba(10,10,16,0.5)',
            fontSize: 32,
            letterSpacing: 1,
          }}
        >
          Agenzia di comunicazione · Genova
        </div>
      </div>
    ),
    size
  );
}

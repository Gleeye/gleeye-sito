'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Video Vimeo "a richiesta": finché il visitatore non preme play mostriamo
 * un'anteprima servita dal sito, senza nessuna richiesta a Vimeo (né a Google,
 * che il player chiama per il cast). Il riquadro del player si carica solo al
 * clic, con dnt=1 (Vimeo non traccia la sessione). Controllo privacy 12/10/2026.
 *
 * L'anteprima va salvata in /public: un'immagine presa da vumbnail o da
 * i.vimeocdn.com sarebbe già una richiesta a terzi prima del consenso.
 */
type Props = {
  /** id numerico del video */
  id: string;
  /** hash dei video non in elenco (il parametro h= del link di Vimeo) */
  hash?: string;
  /** anteprima locale, es. "/video-explainer/seac-anteprima.jpg" */
  poster: string;
  title: string;
};

export default function VimeoFacade({ id, hash, poster, title }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    const params = new URLSearchParams({ dnt: '1', autoplay: '1', badge: '0', autopause: '0' });
    if (hash) params.set('h', hash);
    return (
      <iframe
        src={`https://player.vimeo.com/video/${id}?${params}`}
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Guarda il video: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0a0a10] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" />
        </span>
      </span>
      <span className="voice-mono absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/75">
        Il video si apre con Vimeo
      </span>
    </button>
  );
}

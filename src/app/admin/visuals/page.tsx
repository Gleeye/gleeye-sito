'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { SITE_PAGES } from '@/lib/site-pages';

const VISUAL_TYPES = [
  { id: 'hero-bg', label: 'Hero Background / Sfondo', tool: 'Veo 3 / Midjourney' },
  { id: 'section-visual', label: 'Visual di sezione', tool: 'Midjourney / DALL-E' },
  { id: 'video-loop', label: 'Video loop ambientale', tool: 'Veo 3' },
  { id: 'product-shot', label: 'Shot prodotto / servizio', tool: 'Midjourney' },
  { id: 'team-photo', label: 'Foto team / persone', tool: 'Midjourney' },
  { id: 'abstract-bg', label: 'Background astratto', tool: 'Midjourney / DALL-E' },
];

const STYLE_PRESETS = [
  'Minimal, dark, cinematic — luce soffusa, sfondo nero, accenti viola e blu elettrico',
  'Editorial, high-end — bianco ghiaccio, ombre morbide, composizione pulita',
  'Corporate, premium — ufficio moderno, luce naturale, persone in azione',
  'Abstract, motion — forme geometriche animate, palette viola/blu Gleeye',
  'Macro, dettaglio — texture, materiali, oggetti in primo piano ad alta risoluzione',
];

const GLEEYE_STYLE = `Stile fotografico/visivo di Gleeye:
- Palette: viola profondo #614aa2, blu cielo #4e92d8, nero #08080C, bianco ghiaccio #F8F9FA
- Estetica: "High-End Precision" — minimalismo delle agenzie di design internazionali con dinamismo contemporaneo
- Luce: soffusa, controllata, mai flash diretto
- Composizione: molto spazio negativo, soggetto isolato
- Mood: autorevole, elegante, moderno — mai patinato o artificiale
- Ispirazione: Apple, Linear, Stripe — non agenzia anni 2000`;

export default function VisualsPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [visualType, setVisualType] = useState(VISUAL_TYPES[0].id);
  const [description, setDescription] = useState('');
  const [stylePreset, setStylePreset] = useState('');
  const [customStyle, setCustomStyle] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const selectedPageData = SITE_PAGES.find(p => p.slug === selectedPage);
  const selectedVisualType = VISUAL_TYPES.find(v => v.id === visualType);

  const buildPrompt = () => {
    const style = customStyle || stylePreset;
    const lines = [
      `STRUMENTO CONSIGLIATO: ${selectedVisualType?.tool}`,
      '',
      '--- PROMPT ---',
      '',
    ];

    if (visualType === 'hero-bg' || visualType === 'video-loop') {
      lines.push(
        `Crea un ${visualType === 'video-loop' ? 'video loop di 4-6 secondi' : 'visual'} per la sezione hero della pagina "${selectedPageData?.title || selectedPage}" di Gleeye.`,
        '',
        description ? `Concept: ${description}` : '',
        '',
        style ? `Stile: ${style}` : '',
        '',
        GLEEYE_STYLE,
        '',
        'Formato: 16:9, risoluzione 4K',
        visualType === 'video-loop' ? 'Loop perfetto, movimento lento e fluido, niente tagli bruschi.' : '',
      );
    } else {
      lines.push(
        `Visual per la sezione "${selectedSection || 'generale'}" della pagina "${selectedPageData?.title || selectedPage}" di Gleeye.`,
        '',
        description ? `Descrizione: ${description}` : '',
        '',
        style ? `Stile richiesto: ${style}` : '',
        '',
        GLEEYE_STYLE,
        '',
        'Formato: 16:9 o 1:1 secondo necessità. Alta risoluzione.',
      );
    }

    return lines.filter(l => l !== undefined && l !== null).join('\n').trim();
  };

  const handleGenerate = () => {
    setGeneratedPrompt(buildPrompt());
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-4xl">

      <div className="mb-8">
        <h1 className="font-satoshi font-black uppercase tracking-tight text-2xl text-white mb-1">Visual Generator</h1>
        <p className="font-jakarta text-sm text-white/30">Genera prompt ottimizzati per Veo 3, Midjourney e DALL-E</p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Config */}
        <div className="space-y-5">

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Pagina</label>
              <div className="relative">
                <select value={selectedPage} onChange={e => setSelectedPage(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white font-jakarta text-xs appearance-none focus:outline-none focus:border-white/25 pr-7">
                  <option value="" className="bg-[#12121A]">— Seleziona —</option>
                  {SITE_PAGES.map(p => <option key={p.slug} value={p.slug} className="bg-[#12121A]">{p.title}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Sezione</label>
              <div className="relative">
                <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white font-jakarta text-xs appearance-none focus:outline-none focus:border-white/25 pr-7">
                  <option value="" className="bg-[#12121A]">— Sezione —</option>
                  {(selectedPageData?.sections || []).map(s => <option key={s} value={s} className="bg-[#12121A]">{s}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2">Tipo di visual</label>
            <div className="space-y-1.5">
              {VISUAL_TYPES.map(v => (
                <button key={v.id} onClick={() => setVisualType(v.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                    visualType === v.id ? 'border-white/25 bg-white/[0.08] text-white' : 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/60'
                  }`}>
                  <span className="font-jakarta text-xs">{v.label}</span>
                  <span className="font-satoshi text-[9px] uppercase tracking-[0.1em] text-white/25">{v.tool}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Descrivi il visual</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Es: una mano che scrive su carta bianca, luce laterale soffusa, dettaglio macro..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white font-jakarta text-sm placeholder-white/15 focus:outline-none focus:border-white/25 resize-none" />
          </div>

          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2">Preset stile</label>
            <div className="space-y-1.5">
              {STYLE_PRESETS.map(s => (
                <button key={s} onClick={() => { setStylePreset(s); setCustomStyle(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all font-jakarta ${
                    stylePreset === s ? 'border-white/20 bg-white/[0.07] text-white/80' : 'border-white/[0.05] text-white/30 hover:text-white/50'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Stile custom (opzionale)</label>
            <textarea value={customStyle} onChange={e => { setCustomStyle(e.target.value); setStylePreset(''); }}
              placeholder="Descrivi uno stile specifico..."
              rows={2}
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-3 text-white/60 font-jakarta text-xs placeholder-white/15 focus:outline-none focus:border-white/20 resize-none" />
          </div>

          <button onClick={handleGenerate}
            className="w-full py-4 rounded-xl font-satoshi font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #614aa2, #4e92d8)' }}>
            Genera prompt
          </button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {generatedPrompt ? (
            <>
              <div className="flex items-center justify-between">
                <label className="font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25">Prompt generato</label>
                <button onClick={() => handleCopy(generatedPrompt, 'main')}
                  className="flex items-center gap-1.5 font-satoshi text-[9px] uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors">
                  {copied === 'main' ? <><Check size={11} className="text-green-400" /> Copiato</> : <><Copy size={11} /> Copia</>}
                </button>
              </div>
              <pre className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 text-white/60 font-jakarta text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-[500px]">
                {generatedPrompt}
              </pre>

              <div className="border-t border-white/[0.07] pt-4">
                <p className="font-satoshi text-[9px] uppercase tracking-[0.15em] text-white/20 mb-3">Link rapidi</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Veo 3', url: 'https://labs.google/fx/tools/video-fx' },
                    { label: 'Midjourney', url: 'https://www.midjourney.com' },
                    { label: 'DALL-E (ChatGPT)', url: 'https://chat.openai.com' },
                    { label: 'Sora', url: 'https://sora.com' },
                  ].map(tool => (
                    <a key={tool.label} href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] font-satoshi text-[9px] uppercase tracking-[0.12em] text-white/35 hover:text-white/60 hover:bg-white/[0.07] transition-all">
                      {tool.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #614aa220, #4e92d820)' }}>
                <span className="text-2xl">🎬</span>
              </div>
              <p className="font-jakarta text-sm text-white/25 max-w-xs leading-relaxed">
                Configura il tipo di visual e premi "Genera prompt" per ottenere un prompt ottimizzato per Veo 3 o Midjourney.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface AreaService {
  n: string;
  title: string;
  tag: string;
  desc: string;
  deliverables: string[];
  href?: string;
}

export interface AreaConfig {
  slug: string;
  index: string;
  name: string;
  soul: string;
  claim: { plain: string; serif: string };
  intro: string;
  bgImage?: string;
  accent1: string;
  accent2: string;
  services: AreaService[];
  principles: { title: string; desc: string }[];
  ctaLine: string;
}

export const AREAS: Record<'identity' | 'digital' | 'factory', AreaConfig> = {
  identity: {
    slug: 'identity',
    index: '01',
    name: 'Identity',
    soul: 'Boutique — strategia e genesi',
    claim: { plain: "L'identità non si inventa.", serif: 'Si scopre.' },
    intro:
      "È la fase in cui si risponde alla domanda: chi siamo e come vogliamo essere percepiti? Senza questa base, ogni investimento in marketing è un potenziale spreco di budget. Qui il tuo brand trova DNA, nome e volto.",
    accent1: '#9b7bff',
    accent2: '#614aa2',
    services: [
      {
        n: '01',
        title: 'Brand Discovery & Strategic Audit',
        tag: "l'analisi del DNA",
        desc:
          "Analizziamo il DNA aziendale e individuiamo i punti di sabotaggio d'immagine: dove la comunicazione attuale tradisce il valore reale del prodotto. Prima di costruire, capiamo cosa c'è.",
        deliverables: ['Audit di percezione', 'Analisi competitiva', 'Mappa di posizionamento', 'Report strategico'],
        href: '/identity/brand-strategy',
      },
      {
        n: '02',
        title: 'Naming & Verbal Identity',
        tag: 'come il brand suona',
        desc:
          'Creazione del nome e del tono di voce: definiamo come il brand parla e interagisce con il pubblico, con il rigore e la chiarezza del paradigma Glee to eye.',
        deliverables: ['Naming', 'Tono di voce', 'Architettura verbale', 'Tagline & messaggi chiave'],
        href: '/identity/naming',
      },
      {
        n: '03',
        title: 'Visual Identity System',
        tag: 'il volto del brand',
        desc:
          "Progettiamo l'ecosistema visivo — logo, tipografia, palette — dove ogni elemento è studiato per generare fiducia istantanea attraverso ordine e armonia formale.",
        deliverables: ['Logo design', 'Sistema tipografico', 'Palette colori', 'Ecosistema visivo'],
        href: '/identity/visual-identity',
      },
      {
        n: '04',
        title: 'Brand Guidelines & Rebranding',
        tag: 'la coerenza nel tempo',
        desc:
          'Codifichiamo i processi visivi per garantire coerenza nel tempo, o interveniamo su brand obsoleti che hanno perso autorità sul mercato.',
        deliverables: ['Brand book', 'Guidelines digitali', 'Roadmap di rebranding', 'Governance del brand'],
        href: '/identity/brand-guidelines',
      },
    ],
    principles: [
      { title: 'Prima chi sei, poi cosa dici', desc: 'La strategia precede sempre lo strumento: un messaggio senza identità è rumore.' },
      { title: "La fiducia nasce dall'ordine", desc: "L'armonia formale non è estetica fine a sé stessa: riduce l'attrito e genera credibilità." },
      { title: 'Asset, non spesa', desc: "Un'identità ben costruita resiste all'obsolescenza e diventa patrimonio aziendale." },
    ],
    ctaLine: 'Scopriamo chi sei davvero.',
  },

  digital: {
    slug: 'digital',
    index: '02',
    name: 'Digital',
    soul: 'Infrastruttura — presenza e conversione',
    claim: { plain: 'La tua presenza online non è un sito.', serif: "È un'infrastruttura." },
    intro:
      "Quest'area costruisce il posto dove il brand vive e si relaziona con il mercato. La strategia si traduce in tecnologia e flussi di marketing: siti velocissimi, ecosistemi social presidiati, autorità sui motori di ricerca, advertising monitorato senza fuffa.",
    accent1: '#6db5ff',
    accent2: '#4e92d8',
    services: [
      {
        n: '01',
        title: 'Web Design & Development',
        tag: 'architettura piuma',
        desc:
          'Siti vetrina ed e-commerce focalizzati su velocità estrema e pulizia visiva. La performance tecnica è parte integrante dell\'estetica Gleeye.',
        deliverables: ['Siti vetrina', 'E-commerce', 'Landing page', 'Performance optimization'],
        href: '/digital/web',
      },
      {
        n: '02',
        title: 'Digital Ecosystem & Social Strategy',
        tag: 'presidio dei punti di contatto',
        desc:
          'Non "gestiamo pagine": presidiamo i punti di contatto tra brand e target — social media, newsletter, community — con una visione strategica d\'insieme.',
        deliverables: ['Social media management', 'Content strategy', 'Newsletter', 'Community building'],
        href: '/digital/social',
      },
      {
        n: '03',
        title: 'Search Authority',
        tag: 'SEO & positioning',
        desc:
          "Costruiamo l'autorità digitale sui motori di ricerca. Il brand non deve essere solo bello: deve essere rintracciabile da chi cerca soluzioni concrete.",
        deliverables: ['SEO tecnico', 'Content SEO', 'Local search', 'Authority building'],
        href: '/digital/seo',
      },
      {
        n: '04',
        title: 'Performance Marketing',
        tag: 'advertising senza fuffa',
        desc:
          'Gestione dei budget pubblicitari su Meta, Google e LinkedIn: spingiamo la qualità della comunicazione verso il target corretto, con report chiari e misurabili.',
        deliverables: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'Reporting trasparente'],
        href: '/digital/advertising',
      },
    ],
    principles: [
      { title: 'La velocità è estetica', desc: "Un sito lento tradisce il brand: l'architettura piuma rende la performance parte del design." },
      { title: 'Presidio, non presenza', desc: 'Esserci non basta: ogni canale va governato con una strategia e un perché.' },
      { title: 'Report senza fuffa', desc: 'Numeri chiari, risultati misurabili. Se non si può misurare, non lo promettiamo.' },
    ],
    ctaLine: 'Costruiamo la tua infrastruttura.',
  },

  factory: {
    slug: 'factory',
    index: '03',
    name: 'Factory',
    soul: 'Produzione — artigianato scalabile',
    claim: { plain: "L'eccellenza come", serif: 'output prevedibile.' },
    intro:
      "Il braccio produttivo che trasforma la strategia in oggetti digitali tangibili. È il luogo dell'artigianato scalabile, dove la qualità d'agenzia incontra l'efficienza di un processo industriale: tempi certi, standard costante, anche su volumi elevati.",
    accent1: '#6db5ff',
    accent2: '#614aa2',
    services: [
      {
        n: '01',
        title: 'Video Production',
        tag: 'high-end & social content',
        desc:
          'Video corporate, storytelling e formati veloci per social. Ogni frame risponde alla promessa del piacere per gli occhi.',
        deliverables: ['Video corporate', 'Spot & storytelling', 'Reel & TikTok', 'Video explainer'],
        href: '/factory/video',
      },
      {
        n: '02',
        title: 'Photography & Visual Assets',
        tag: 'la realtà, post-prodotta bene',
        desc:
          "Servizi fotografici per prodotti, persone e strutture, post-prodotti secondo standard d'eccellenza per garantire pulizia e impatto.",
        deliverables: ['Still life', 'Corporate & ritratti', 'Food & hospitality', 'Post-produzione'],
        href: '/factory/fotografia',
      },
      {
        n: '03',
        title: 'Strategic Copywriting',
        tag: 'parole chirurgiche',
        desc:
          'Testi asciutti e funzionali: scriviamo per abbattere il rumore di fondo e catturare l\'attenzione in un mercato distratto.',
        deliverables: ['Copy per siti', 'Naming & payoff', 'Contenuti editoriali', 'Script video'],
        href: '/factory/copywriting',
      },
      {
        n: '04',
        title: 'Podcast & Audio Branding',
        tag: "l'autorità della voce",
        desc:
          'Contenuti audio per presidiare i momenti di ascolto del target: autorità costruita sulla voce e sulla narrazione profonda.',
        deliverables: ['Podcast branded', 'Produzione audio', 'Distribuzione', 'Audio identity'],
        href: '/podcast',
      },
      {
        n: '05',
        title: 'Graphic & Motion Design',
        tag: "l'identità in movimento",
        desc:
          "Asset grafici statici e animati che mantengono l'identità del brand viva e dinamica su ogni piattaforma.",
        deliverables: ['Graphic design', 'Motion graphics', 'Social kit', 'Materiali stampa'],
        href: '/factory/grafica',
      },
    ],
    principles: [
      { title: 'Protocollo, non ispirazione', desc: "L'esperienza è diventata processo replicabile: il risultato non dipende dal caso." },
      { title: 'Tempi certi', desc: 'Una factory vera consegna quando promesso. La puntualità è parte della qualità.' },
      { title: 'Standard costante', desc: "Dal primo all'ennesimo asset, lo stesso livello. Anche su volumi elevati." },
    ],
    ctaLine: 'Mettiamo in produzione la tua immagine.',
  },
};

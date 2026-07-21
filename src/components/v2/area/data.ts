export interface AreaService {
  n: string;
  /** chiave icona: risolta in AreaChapters (i dati passano da una Server
      Component, non possono trasportare il componente React). */
  icon: string;
  title: string;
  tag: string;
  desc: string;
  deliverables: string[];
  href?: string;
}

/** Uno step del metodo ("Come lavoriamo"). icon = chiave risolta in AreaMethod. */
export interface MethodStep {
  icon: string;
  title: string;
  desc: string;
}

/** Un beneficio ("Cosa ottieni"). */
export interface Outcome {
  title: string;
  desc: string;
}

export interface AreaConfig {
  slug: string;
  index: string;
  name: string;
  soul: string;
  claim: { plain: string[]; serif: string };
  intro: string;
  bgImage?: string;
  accent1: string;
  accent2: string;
  /** "Il nostro approccio": lo statement si illumina parola per parola allo scroll. */
  approach: { statement: string; body: [string, string] };
  services: AreaService[];
  method: MethodStep[];
  outcomes: Outcome[];
  ctaLine: string;
}

export const AREAS: Record<'identity' | 'digital' | 'factory', AreaConfig> = {
  identity: {
    slug: 'identity',
    index: '01',
    name: 'Identity',
    soul: 'Boutique — strategia e genesi',
    claim: { plain: ["L'identità", 'non si inventa.'], serif: 'Si scopre.' },
    intro:
      "È la fase in cui si risponde alla domanda: chi siamo e come vogliamo essere percepiti? Senza questa base, ogni investimento in marketing è un potenziale spreco di budget. Qui il tuo brand trova DNA, nome e volto.",
    accent1: '#4e92d8',
    accent2: '#614aa2',
    approach: {
      statement: "L'identità non è come ti vedi tu. È come ti riconoscono gli altri, ogni volta, prima ancora del nome.",
      body: [
        'Costruire un’identità significa decidere, prima di tutto, chi sei e per cosa vuoi essere scelto. È il lavoro che viene prima di ogni campagna: senza una base chiara, ogni messaggio riparte da zero e ogni euro di marketing rischia di disperdersi.',
        'Lo facciamo con un processo, non con l’ispirazione: analisi, strategia, e la costruzione di nome, voce e sistema visivo. Il risultato è un’identità coerente che regge nel tempo — non un restyling da rifare fra due anni.',
      ],
    },
    services: [
      {
        n: '01',
        icon: 'fingerprint',
        title: 'Brand Discovery & Strategic Audit',
        tag: "l'analisi del DNA",
        desc:
          "Analizziamo il DNA aziendale e individuiamo i punti di sabotaggio d'immagine: dove la comunicazione attuale tradisce il valore reale del prodotto. Prima di costruire, capiamo cosa c'è.",
        deliverables: ['Audit di percezione', 'Analisi competitiva', 'Mappa di posizionamento', 'Report strategico'],
        href: '/identity/brand-strategy',
      },
      {
        n: '02',
        icon: 'type',
        title: 'Naming & Verbal Identity',
        tag: 'come il brand suona',
        desc:
          'Creazione del nome e del tono di voce: definiamo come il brand parla e interagisce con il pubblico, con il rigore e la chiarezza del paradigma Glee to eye.',
        deliverables: ['Naming', 'Tono di voce', 'Architettura verbale', 'Tagline & messaggi chiave'],
        href: '/identity/naming',
      },
      {
        n: '03',
        icon: 'shapes',
        title: 'Visual Identity System',
        tag: 'il volto del brand',
        desc:
          "Progettiamo l'ecosistema visivo — logo, tipografia, palette — dove ogni elemento è studiato per generare fiducia istantanea attraverso ordine e armonia formale.",
        deliverables: ['Logo design', 'Sistema tipografico', 'Palette colori', 'Ecosistema visivo'],
        href: '/identity/visual-identity',
      },
      {
        n: '04',
        icon: 'book',
        title: 'Brand Guidelines & Rebranding',
        tag: 'la coerenza nel tempo',
        desc:
          'Codifichiamo i processi visivi per garantire coerenza nel tempo, o interveniamo su brand obsoleti che hanno perso autorità sul mercato.',
        deliverables: ['Brand book', 'Guidelines digitali', 'Roadmap di rebranding', 'Governance del brand'],
        href: '/identity/brand-guidelines',
      },
    ],
    method: [
      { icon: 'ear', title: 'Ascoltiamo', desc: 'Audit del DNA e della percezione attuale.' },
      { icon: 'compass', title: 'Posizioniamo', desc: 'Dove sei e dove vuoi arrivare.' },
      { icon: 'pen', title: 'Costruiamo', desc: 'Nome, voce, sistema visivo.' },
      { icon: 'book', title: 'Codifichiamo', desc: 'Le guidelines per restare coerente nel tempo.' },
    ],
    outcomes: [
      { title: 'Ti riconoscono subito', desc: "Un'identità coerente ti rende identificabile prima ancora che si legga il nome." },
      { title: 'Budget che non si disperde', desc: 'Con una base solida, ogni euro di marketing lavora invece di tamponare.' },
      { title: 'Un asset, non una spesa', desc: "Un'identità costruita bene resiste al tempo e diventa patrimonio dell'azienda." },
    ],
    ctaLine: 'Scopriamo chi sei davvero.',
  },

  digital: {
    slug: 'digital',
    index: '02',
    name: 'Digital',
    soul: 'Infrastruttura — presenza e conversione',
    claim: { plain: ['La tua presenza online', 'non è un sito.'], serif: "È un'infrastruttura." },
    intro:
      "Quest'area costruisce il posto dove il brand vive e si relaziona con il mercato. La strategia si traduce in tecnologia e flussi di marketing: siti velocissimi, ecosistemi social presidiati, autorità sui motori di ricerca, advertising monitorato senza fuffa.",
    accent1: '#4e92d8',
    accent2: '#614aa2',
    approach: {
      statement: 'Esserci online non basta più. Conta essere trovati da chi cerca, e non far scappare chi arriva.',
      body: [
        'Il digitale non è un sito e qualche post. È l’infrastruttura dove il brand vive: dove ti cercano, dove ti valutano, dove decidono se fidarsi. Se quell’infrastruttura è lenta, confusa o assente, tutto il lavoro sull’identità si perde nell’ultimo passo.',
        'Costruiamo presenza e conversione insieme: siti veloci, canali presidiati, autorità sui motori, campagne misurabili. Ogni scelta poggia sui numeri, non sulle sensazioni — così sai sempre dove va il budget e cosa produce.',
      ],
    },
    services: [
      {
        n: '01',
        icon: 'layout',
        title: 'Web Design & Development',
        tag: 'architettura piuma',
        desc:
          'Siti vetrina ed e-commerce focalizzati su velocità estrema e pulizia visiva. La performance tecnica è parte integrante dell\'estetica Gleeye.',
        deliverables: ['Siti vetrina', 'E-commerce', 'Landing page', 'Performance optimization'],
        href: '/digital/web',
      },
      {
        n: '02',
        icon: 'share',
        title: 'Digital Ecosystem & Social Strategy',
        tag: 'presidio dei punti di contatto',
        desc:
          'Non "gestiamo pagine": presidiamo i punti di contatto tra brand e target — social media, newsletter, community — con una visione strategica d\'insieme.',
        deliverables: ['Social media management', 'Content strategy', 'Newsletter', 'Community building'],
        href: '/digital/social',
      },
      {
        n: '03',
        icon: 'search',
        title: 'Search Authority',
        tag: 'SEO & positioning',
        desc:
          "Costruiamo l'autorità digitale sui motori di ricerca. Il brand non deve essere solo bello: deve essere rintracciabile da chi cerca soluzioni concrete.",
        deliverables: ['SEO tecnico', 'Content SEO', 'Local search', 'Authority building'],
        href: '/digital/seo',
      },
      {
        n: '04',
        icon: 'target',
        title: 'Performance Marketing',
        tag: 'advertising senza fuffa',
        desc:
          'Gestione dei budget pubblicitari su Meta, Google e LinkedIn: spingiamo la qualità della comunicazione verso il target corretto, con report chiari e misurabili.',
        deliverables: ['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'Reporting trasparente'],
        href: '/digital/advertising',
      },
    ],
    method: [
      { icon: 'chart', title: 'Analizziamo', desc: 'Dati, canali, concorrenza: da dove parti.' },
      { icon: 'ruler', title: 'Progettiamo', desc: 'La strategia e l\'infrastruttura tecnica.' },
      { icon: 'code', title: 'Costruiamo', desc: 'Sito, ecosistema, campagne.' },
      { icon: 'activity', title: 'Misuriamo', desc: 'Ottimizzazione continua sui numeri veri.' },
    ],
    outcomes: [
      { title: 'Ti trovano quando cercano', desc: 'Autorità sui motori e canali presidiati: sei dove il cliente ti cerca.' },
      { title: 'Un sito che non fa scappare', desc: 'Velocità e chiarezza: chi arriva resta, invece di chiudere la scheda.' },
      { title: 'Numeri, non promesse', desc: 'Report chiari e misurabili: sai dove va ogni euro investito.' },
    ],
    ctaLine: 'Costruiamo la tua infrastruttura.',
  },

  factory: {
    slug: 'factory',
    index: '03',
    name: 'Factory',
    soul: 'Produzione — artigianato scalabile',
    claim: { plain: ["L'eccellenza come"], serif: 'output prevedibile.' },
    intro:
      "Il braccio produttivo che trasforma la strategia in oggetti digitali tangibili. È il luogo dell'artigianato scalabile, dove la qualità d'agenzia incontra l'efficienza di un processo industriale: tempi certi, standard costante, anche su volumi elevati.",
    accent1: '#4e92d8',
    accent2: '#614aa2',
    approach: {
      statement: 'La qualità che colpisce una volta è fortuna. La qualità che si ripete, ogni volta, è un processo.',
      body: [
        'La produzione di contenuti è il punto dove la strategia diventa tangibile: video, foto, grafica, audio. È anche il punto dove la maggior parte delle agenzie oscilla — un progetto ottimo, il successivo mediocre, i tempi che saltano.',
        'Noi trattiamo la creatività come una factory: protocolli, tempi certi, standard costante anche sui volumi. Qualità da boutique con l’affidabilità di un processo industriale — consegne quando servono, allo stesso livello, sempre.',
      ],
    },
    services: [
      {
        n: '01',
        icon: 'clapperboard',
        title: 'Video Production',
        tag: 'high-end & social content',
        desc:
          'Video corporate, storytelling e formati veloci per social. Ogni frame risponde alla promessa del piacere per gli occhi.',
        deliverables: ['Video corporate', 'Spot & storytelling', 'Reel & TikTok', 'Video explainer'],
        href: '/factory/video',
      },
      {
        n: '02',
        icon: 'camera',
        title: 'Photography & Visual Assets',
        tag: 'la realtà, post-prodotta bene',
        desc:
          "Servizi fotografici per prodotti, persone e strutture, post-prodotti secondo standard d'eccellenza per garantire pulizia e impatto.",
        deliverables: ['Still life', 'Corporate & ritratti', 'Food & hospitality', 'Post-produzione'],
        href: '/factory/fotografia',
      },
      {
        n: '03',
        icon: 'pen',
        title: 'Strategic Copywriting',
        tag: 'parole chirurgiche',
        desc:
          'Testi asciutti e funzionali: scriviamo per abbattere il rumore di fondo e catturare l\'attenzione in un mercato distratto.',
        deliverables: ['Copy per siti', 'Naming & payoff', 'Contenuti editoriali', 'Script video'],
        href: '/factory/copywriting',
      },
      {
        n: '04',
        icon: 'mic',
        title: 'Podcast & Audio Branding',
        tag: "l'autorità della voce",
        desc:
          'Contenuti audio per presidiare i momenti di ascolto del target: autorità costruita sulla voce e sulla narrazione profonda.',
        deliverables: ['Podcast branded', 'Produzione audio', 'Distribuzione', 'Audio identity'],
        href: '/podcast',
      },
      {
        n: '05',
        icon: 'palette',
        title: 'Graphic & Motion Design',
        tag: "l'identità in movimento",
        desc:
          "Asset grafici statici e animati che mantengono l'identità del brand viva e dinamica su ogni piattaforma.",
        deliverables: ['Graphic design', 'Motion graphics', 'Social kit', 'Materiali stampa'],
        href: '/factory/grafica',
      },
    ],
    method: [
      { icon: 'clipboard', title: 'Briefing', desc: 'Obiettivo, tono, formati.' },
      { icon: 'lightbulb', title: 'Pre-produzione', desc: 'Concept e pianificazione.' },
      { icon: 'clapperboard', title: 'Produzione', desc: 'Riprese, scatti, realizzazione.' },
      { icon: 'package', title: 'Consegna', desc: 'Post-produzione e asset pronti all\'uso.' },
    ],
    outcomes: [
      { title: 'Consegne quando serve', desc: 'Tempi certi e processo replicabile: niente attese, niente sorprese.' },
      { title: 'Qualità che non oscilla', desc: "Dal primo all'ultimo asset, lo stesso livello. Anche sui volumi." },
      { title: 'Contenuti pronti all\'uso', desc: 'Foto, video, grafica finiti e coerenti, pronti per ogni canale.' },
    ],
    ctaLine: 'Mettiamo in produzione la tua immagine.',
  },
};

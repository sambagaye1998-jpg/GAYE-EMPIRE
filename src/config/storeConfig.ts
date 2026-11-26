export interface ProductMediaItem {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
  /** CSS object-position & scale to highlight real details from the provided photo */
  focalClass: string;
}

export interface ProductPackOption {
  id: string;
  label: string;
  quantity: number;
  price: number;
  note?: string;
}

export interface CustomerTestimonial {
  id: string;
  customerName: string;
  city: string;
  quote: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const STORE_CONFIG = {
  storeName: 'JBL',
  country: 'Sénégal',
  currency: 'FCFA',
  countryDialCode: '221',
  whatsappNumberLocal: '776949618',
  whatsappDisplay: '+221 77 694 96 18',

  product: {
    name: 'JBL TUNE M65',
    shortTagline: 'Le son JBL Pure Bass et la réduction active du bruit, prêts à vous suivre partout.',
    heroHeadline: 'Écoutez votre musique sans bruit parasite.',
    description:
      "Le casque sans fil JBL TUNE M65 combine le son JBL Pure Bass, la réduction active du bruit (Active Noise Cancelling), l'appairage rapide Fast Pair, les appels mains libres et jusqu'à 20 heures d'autonomie avec port de charge USB-C.",
    currentPrice: 10000,
    oldPrice: 10000,
    /** Set true when oldPrice > currentPrice or to always show strikethrough comparison */
    showStrikethroughOldPrice: true,
    /** Confirmed payment & delivery policy without inventing unverified promises */
    paymentTerms: 'Paiement à la livraison, selon les modalités confirmées avec la boutique.',
    deliveryTerms:
      'Les modalités, délais et zones de livraison au Sénégal sont confirmés directement avec vous sur WhatsApp après validation de votre commande.',
    warrantyTerms:
      'Les conditions de vérification à la réception et de garantie sont précisées par le conseiller lors de la confirmation sur WhatsApp.',
  },

  promoBanner: {
    headline: 'Offre directe Sénégal — Commandez sans inscription en moins d’une minute',
    subtext: 'Confirmation immédiate sur WhatsApp · Paiement à la livraison selon modalités confirmées',
  },

  /**
   * Real product images provided by the store.
   * Add extra real angle URLs here as they become available.
   */
  productImages: [
    {
      id: 'main-box',
      src: '/assets/aistudio/a_regenere_la_photo_co__2__ec697e99.webp',
      alt: 'Casque sans fil JBL TUNE M65 noir dans son coffret officiel JBL',
      label: 'Vue principale',
      caption: 'Photo réelle du coffret et du casque noir',
      focalClass: 'object-center scale-100',
    },
    {
      id: 'earcup-detail',
      src: '/assets/aistudio/a_regenere_la_photo_co__2__ec697e99.webp',
      alt: 'Détail des oreillettes confortables et du port USB-C du casque JBL TUNE M65',
      label: 'Oreillettes & USB-C',
      caption: 'Coussinets enveloppants, logo JBL et port USB-C visible',
      focalClass: 'object-[54%_55%] scale-[1.45]',
    },
    {
      id: 'features-detail',
      src: '/assets/aistudio/a_regenere_la_photo_co__2__ec697e99.webp',
      alt: 'Fonctions Active Noise Cancelling, Fast Pair et autonomie 20h affichées sur la boîte',
      label: 'Spécifications boîte',
      caption: 'Active Noise Cancelling, Fast Pair et autonomie 20h annoncée',
      focalClass: 'object-[30%_82%] scale-[1.4]',
    },
  ] satisfies ProductMediaItem[],

  /**
   * Essential benefits strictly matching visible product characteristics
   */
  essentialBenefits: [
    {
      id: 'anc',
      title: 'Réduction active du bruit (ANC)',
      shortText: 'Profitez de votre musique sans bruit parasite grâce au mode Active Noise Cancelling.',
    },
    {
      id: 'bass',
      title: 'Son JBL Pure Bass & Deep Bass',
      shortText: 'Des basses profondes et précises adaptées à tous vos styles musicaux.',
    },
    {
      id: 'battery',
      title: 'Autonomie 20h & charge USB-C',
      shortText: 'Jusqu’à 20 heures d’écoute avec recharge moderne via port USB-C.',
    },
    {
      id: 'calls',
      title: 'Fast Pair & appels mains libres',
      shortText: 'Connexion rapide à votre téléphone et gestion simple de vos appels.',
    },
  ],

  /**
   * 3 simple steps explaining how the product works
   */
  howItWorks: [
    {
      step: '01',
      title: 'Connectez en un geste',
      description:
        'Allumez votre casque et appairez-le rapidement à votre smartphone via Bluetooth et Fast Pair.',
    },
    {
      step: '02',
      title: 'Isolez-vous du bruit',
      description:
        'Activez la réduction de bruit (ANC) pour écouter votre musique avec le son JBL Pure Bass.',
    },
    {
      step: '03',
      title: 'Appelez et rechargez facilement',
      description:
        'Prenez vos appels en mains libres et rechargez par câble USB-C pour profiter des 20h d’autonomie.',
    },
  ],

  /**
   * Optional packs (keep strictly accurate to confirmed store pricing)
   */
  packs: [
    {
      id: 'single',
      label: '1 Casque JBL TUNE M65',
      quantity: 1,
      price: 10000,
      note: 'Offre unitaire standard',
    },
  ] satisfies ProductPackOption[],

  /**
   * Verified customer reviews, photos or videos supplied by the store.
   * Keep empty until real customer media/reviews are provided — never fabricate testimonials.
   */
  testimonials: [] as CustomerTestimonial[],

  /**
   * Editable store story & commitments
   */
  story: {
    heading: 'À propos de la boutique JBL',
    paragraphs: [
      'Notre boutique vous propose un accès direct au casque JBL TUNE M65 au Sénégal, avec une procédure de commande simple pensée pour vous faire gagner du temps.',
      'Pas de formulaire interminable ni de création de compte obligatoire : vous renseignez uniquement votre nom, votre adresse de livraison et votre numéro de téléphone, puis vous confirmez directement sur WhatsApp avec notre équipe.',
    ],
    commitments: [
      'Produit présenté avec photo réelle et caractéristiques vérifiées',
      'Traitement humain et direct de chaque commande sur WhatsApp',
      'Paiement à la livraison selon les modalités confirmées ensemble',
    ],
  },

  /**
   * Honest, transparent FAQ without invented claims
   */
  faqs: [
    {
      id: 'how-to-order',
      question: 'Comment passer commande sur le site ?',
      answer:
        'Remplissez simplement les trois champs du formulaire (nom et prénom, adresse de livraison, numéro de téléphone), cliquez sur « CONFIRMER MA COMMANDE », vérifiez le récapitulatif puis envoyez le message prérempli sur WhatsApp.',
    },
    {
      id: 'payment',
      question: 'Comment se fait le paiement ?',
      answer:
        'Le paiement s’effectue à la livraison, selon les modalités confirmées avec vous sur WhatsApp lors de la validation de votre commande.',
    },
    {
      id: 'delivery',
      question: 'Comment se déroule la livraison au Sénégal ?',
      answer:
        'Dès réception de votre message WhatsApp, nous confirmons avec vous votre adresse précise, le créneau et les modalités exactes de livraison dans votre ville ou quartier.',
    },
    {
      id: 'warranty',
      question: 'Quelles sont les conditions de garantie et de vérification ?',
      answer:
        'Les modalités de vérification à la réception et les conditions de garantie applicables vous sont communiquées clairement par message WhatsApp avant l’expédition.',
    },
    {
      id: 'contact',
      question: 'Comment contacter directement la boutique ?',
      answer:
        'Vous pouvez nous joindre à tout moment sur notre numéro WhatsApp officiel au +221 77 694 96 18 pour toute question avant ou après votre commande.',
    },
  ] satisfies FaqItem[],

  /**
   * Analytics & Future Integrations Configuration
   * Replace with real IDs or VITE_* environment variables when ready.
   */
  integrations: {
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
};

export function formatFcfa(amount: number): string {
  // Format with dots like 10.000 matching user's exact specification
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

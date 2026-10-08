// =============================================================================
//  SITE CONFIG — edite este arquivo para personalizar o site do cliente
//
//  Para criar um novo site para outro cliente:
//  1. Altere os dados abaixo (nome, contato, redes, áreas, serviços, etc.)
//  2. Substitua /public/logo.png pelo logo do novo cliente
//  3. Atualize os textos em src/lib/translations.ts
// =============================================================================

export const siteConfig = {
  // ---------------------------------------------------------------------------
  // IDENTIDADE DO NEGÓCIO
  // ---------------------------------------------------------------------------
  business: {
    name: "Lidia\u2019s Cleaner Service",
    logo: "/logo.png",
    logoAlt: "Lidia\u2019s Cleaner Service",
    tagline: "A Cleaner Home, A Better Life.",
  },

  // ---------------------------------------------------------------------------
  // CONTATO — telefone, email, endereço
  // ---------------------------------------------------------------------------
  contact: {
    phone: "(617) 279-7572",
    phoneRaw: "6172797572",       // só números, para o href="tel:..."
    whatsapp: "16172797572",      // com código do país, para wa.me/...
    email: "lidia.ramiro@hotmail.com",
    address: "Greater Boston, Massachusetts",
    hours: "Mon–Sat: 8:00 AM – 6:00 PM",
    hours2: "By appointment",
  },

  // ---------------------------------------------------------------------------
  // REDES SOCIAIS
  // ---------------------------------------------------------------------------
  social: {
    instagram: "https://www.instagram.com/lidias_cleaning_service",
    facebook: "https://www.facebook.com/share/14vmFDbtT6k/",
  },

  // ---------------------------------------------------------------------------
  // HERO — imagem principal (sala clara e impecável)
  // ---------------------------------------------------------------------------
  hero: {
    backgroundImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=85",
    imagePosition: "center center",
  },

  // ---------------------------------------------------------------------------
  // SERVIÇOS — imagens (os textos ficam em translations.ts)
  //   Ordem deve coincidir com enServices em translations.ts
  //   price: "" → a cliente optou por NÃO exibir preços no site
  // ---------------------------------------------------------------------------
  services: [
    { image: "/images/services/regular-cleaning.webp",      imagePosition: "30% center",   price: "" }, // Regular Cleaning — aspirando a sala
    { image: "/images/services/deep-cleaning-kitchen.webp", imagePosition: "center",       price: "" }, // Deep Cleaning — limpando a bancada
    { image: "/images/services/move-in-move-out.webp",      imagePosition: "25% center",   price: "" }, // Move In / Move Out — profissional chegando com o kit
    { image: "/images/services/post-construction.webp",     imagePosition: "center",       price: "" }, // Post Construction — varrendo entulho de obra
    { image: "/images/services/commercial-restroom.webp",   imagePosition: "center",       price: "" }, // Commercial / Office — banheiro higienizado
    { image: "/images/services/airbnb-bedroom.webp",        imagePosition: "center",       price: "" }, // Airbnb & Vacation Rental — arrumando a cama
    { image: "/images/services/bathroom-detailing.webp",    imagePosition: "65% center",   price: "" }, // Windows & Detailing — espelho/vidro
    { image: "/images/services/organization-living-room.webp", imagePosition: "center",    price: "" }, // Organization — estante e sala organizadas
  ],

  // ---------------------------------------------------------------------------
  // ÁREAS ATENDIDAS — Greater Boston, Massachusetts
  //   price: "" → sem preço no site
  // ---------------------------------------------------------------------------
  serviceAreas: [
    { name: "Wakefield",     state: "Massachusetts", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80", price: "", neighborhoods: ["Lake Quannapowitt", "Greenwood", "Montrose", "Downtown Wakefield"] },
    { name: "Stoneham",      state: "Massachusetts", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1000&q=80", price: "", neighborhoods: ["Stoneham Square", "Spot Pond", "Farm Hill"] },
    { name: "Melrose",       state: "Massachusetts", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1000&q=80", price: "", neighborhoods: ["Melrose Highlands", "Wyoming Hill", "Downtown Melrose", "East Side"] },
    { name: "Woburn",        state: "Massachusetts", image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1000&q=80", price: "", neighborhoods: ["Woburn Center", "North Woburn", "Montvale", "Walnut Hill"] },
    { name: "Burlington",    state: "Massachusetts", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80", price: "", neighborhoods: ["Burlington Center", "Town Common", "Mill Pond"] },
    { name: "Reading",       state: "Massachusetts", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80", price: "", neighborhoods: ["Downtown Reading", "Birch Meadow", "Summit Village"] },
    { name: "North Reading", state: "Massachusetts", image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1000&q=80", price: "", neighborhoods: ["North Reading Center", "Martins Pond", "Ipswich River area"] },
    { name: "Andover",       state: "Massachusetts", image: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1000&q=80", price: "", neighborhoods: ["Andover Center", "Shawsheen Village", "Ballardvale", "West Andover"] },
    { name: "Wilmington",    state: "Massachusetts", image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1000&q=80", price: "", neighborhoods: ["Wilmington Center", "North Wilmington", "Silver Lake"] },
    { name: "Saugus",        state: "Massachusetts", image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1000&q=80", price: "", neighborhoods: ["Saugus Center", "Cliftondale", "East Saugus", "Lynnhurst"] },
    { name: "Lynn",          state: "Massachusetts", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000&q=80", price: "", neighborhoods: ["Lynn Shore", "Diamond District", "Wyoma Square", "Lynnfield St"] },
    { name: "Swampscott",    state: "Massachusetts", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80", price: "", neighborhoods: ["Phillips Beach", "Olmsted District", "Vinnin Square"] },
    { name: "Malden",        state: "Massachusetts", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80", price: "", neighborhoods: ["Maplewood", "Linden", "Edgeworth", "Downtown Malden"] },
    { name: "Medford",       state: "Massachusetts", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80", price: "", neighborhoods: ["Medford Square", "West Medford", "Wellington", "Medford Hillside"] },
    { name: "Somerville",    state: "Massachusetts", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1000&q=80", price: "", neighborhoods: ["Davis Square", "Union Square", "Assembly Row", "Spring Hill"] },
    { name: "Cambridge",     state: "Massachusetts", image: "https://images.unsplash.com/photo-1596436023012-5c285ece5671?w=1000&q=80", price: "", neighborhoods: ["Harvard Square", "Porter Square", "Kendall Square", "Central Square"] },
    { name: "Boston",        state: "Massachusetts", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80", price: "", neighborhoods: ["Back Bay", "Beacon Hill", "South End", "Charlestown", "Seaport"] },
    { name: "Lexington",     state: "Massachusetts", image: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1000&q=80", price: "", neighborhoods: ["Lexington Center", "East Lexington", "Follen Hill"] },
    { name: "Belmont",       state: "Massachusetts", image: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?w=1000&q=80", price: "", neighborhoods: ["Belmont Center", "Belmont Hill", "Payson Park", "Waverley Square"] },
    { name: "Winchester",    state: "Massachusetts", image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1000&q=80", price: "", neighborhoods: ["Winchester Center", "Wedgemere", "Wildwood"] },
  ],

  // ---------------------------------------------------------------------------
  // DEPOIMENTOS — avaliações reais enviadas pela cliente
  // ---------------------------------------------------------------------------
  reviews: [
    { name: "Sharon G.",  location: "Monthly client · Greater Boston", rating: 5, date: "August 2026",  text: "Lidia has been cleaning my house once a month for a few years. She does a wonderful job cleaning and efficient with time. She reaches out to schedule monthly and arrives on time. Great communication! Also wonderful with my dog who is home during the cleanings. She is respectful and trustworthy.", avatar: "SG" },
    { name: "Nina D.",    location: "Home cleaning · Greater Boston",   rating: 5, date: "August 2026",  text: "Lidia has great attention to detail and is a great communicator. What is refreshing is that she is open and seeks constructive feedback to ensure that the customer is happy with the services and is getting everything they need. I highly recommend her for your home cleaning needs.", avatar: "ND" },
    { name: "Isabele H.", location: "Home cleaning · Greater Boston",   rating: 5, date: "July 2026",    text: "She is amazing!", avatar: "IH" },
    { name: "Viele P.",   location: "Home cleaning · Greater Boston",   rating: 5, date: "October 2025", text: "I highly recommend her work, it's detailed and meticulous.", avatar: "VP" },
  ],

  // ---------------------------------------------------------------------------
  // EQUIPE — fundadora (textos em translations.ts → owners.founder)
  // ---------------------------------------------------------------------------
  team: [
    { id: "lidia", initials: "L", gradient: "from-gold to-gold-dark" },
  ],

  // ---------------------------------------------------------------------------
  // ESTATÍSTICAS
  // ---------------------------------------------------------------------------
  stats: {
    years:        "3",
    clients:      "100+",
    satisfaction: "5.0",
  },

  // ---------------------------------------------------------------------------
  // GALERIA — fotos reais dos trabalhos da cliente (seção some se vazia)
  // ---------------------------------------------------------------------------
  gallery: [] as { image: string; caption: string }[],

  // ---------------------------------------------------------------------------
  // SEO — título, descrição e Open Graph
  // ---------------------------------------------------------------------------
  seo: {
    title:         "Lidia\u2019s Cleaner Service | Professional Cleaning in Massachusetts",
    description:   "Trusted, detail-oriented house cleaning in Greater Boston, MA. Weekly & bi-weekly recurring cleaning, deep cleaning, move in/out, Airbnb, post-construction and office cleaning. 5.0-star rated. Call (617) 279-7572.",
    keywords:      "house cleaning Wakefield MA, cleaning service Greater Boston, weekly cleaning Melrose, bi-weekly house cleaning Woburn, deep cleaning Stoneham, move out cleaning Boston, Airbnb cleaning Cambridge, maid service Massachusetts",
    ogTitle:       "Lidia\u2019s Cleaner Service | A Cleaner Home, A Better Life.",
    ogDescription: "Reliable, meticulous home cleaning across Greater Boston, MA. Request your free quote: (617) 279-7572.",
  },

  // ---------------------------------------------------------------------------
  // CRÉDITO DA AGÊNCIA — exibido no rodapé
  // ---------------------------------------------------------------------------
  agency: {
    name: "Digi Agency Marketing",
    url:  "https://digiagencymarketing.com",
  },
} as const;

export type ServiceArea = (typeof siteConfig.serviceAreas)[number];
export type Review      = (typeof siteConfig.reviews)[number];

// Tipo mutável usado pelo contexto e pelo painel admin
export type SiteConfig = {
  business:     { name: string; logo: string; logoAlt: string; tagline: string };
  contact:      { phone: string; phoneRaw: string; whatsapp: string; email: string; address: string; hours: string; hours2: string };
  social:       { instagram: string; facebook: string };
  hero:         { backgroundImage: string; imagePosition?: string };
  services:     { image: string; price: string; imagePosition?: string }[];
  serviceAreas: { name: string; state: string; image: string; price: string; neighborhoods: string[] }[];
  reviews:      { name: string; location: string; rating: number; date: string; text: string; avatar: string }[];
  team:         { id: string; initials: string; gradient: string; photo?: string }[];
  stats:        { years: string; clients: string; satisfaction: string };
  gallery?:     { image: string; caption: string }[];
  seo:          { title: string; description: string; keywords: string; ogTitle: string; ogDescription: string };
  agency:       { name: string; url: string };
};

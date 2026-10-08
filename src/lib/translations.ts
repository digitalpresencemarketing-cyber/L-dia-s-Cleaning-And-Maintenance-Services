// O briefing pede o site apenas em inglês.
export type Language = "en";

// Apenas texto — imagens, áreas e depoimentos vivem em site.config.ts
// A ordem de enServices deve coincidir com siteConfig.services

const enServices = [
  { title: "Regular Cleaning",          description: "Weekly, bi-weekly or monthly visits that keep your home consistently fresh, tidy and welcoming.",                     features: ["Kitchen & bathrooms cleaned and sanitized", "Dusting of surfaces, furniture & fixtures", "Vacuuming and mopping of all floors"] },
  { title: "Deep Cleaning",             description: "A top-to-bottom reset for the areas everyday cleaning doesn't reach — ideal as a first visit.",                       features: ["Everything in a regular cleaning", "Baseboards, doors, frames & switches", "Detailed kitchen & bathroom scrub"] },
  { title: "Move In / Move Out",        description: "Hand over the keys — or move in — with a spotless, ready-to-live-in home.",                                          features: ["Inside cabinets, drawers & closets", "Appliances cleaned inside and out", "Every room left move-in ready"] },
  { title: "Post Construction",         description: "Careful removal of the dust and residue left behind after a renovation or new build.",                               features: ["Fine dust removal on every surface", "Fixtures, windows & sills detailed", "Floors cleaned and polished"] },
  { title: "Commercial / Office",       description: "Professional cleaning for offices, small businesses and condominium common areas.",                                   features: ["Workstations & common areas", "Restrooms & kitchenettes sanitized", "Flexible scheduling around your hours"] },
  { title: "Airbnb & Vacation Rental",  description: "Fast, reliable turnovers so every guest walks into a five-star stay.",                                                 features: ["Linen change & bed making", "Kitchen & bath restocked and refreshed", "Photo-ready presentation"] },
  { title: "Windows & Detailing",       description: "The finishing touches that make a home truly shine — inside and out.",                                                features: ["Interior windows, glass & mirrors", "Tracks, sills & blinds", "Detail work on fixtures & trim"] },
  { title: "Organization",              description: "Calm, organized spaces designed around the way you live.",                                                            features: ["Closets, pantries & cabinets", "Decluttering & smart storage", "Rooms you love coming home to"] },
] as const;

export const translations = {
  en: {
    nav: { services: "Services", plans: "Cleaning Plans", serviceAreas: "Service Areas", about: "About", testimonials: "Reviews", contact: "Contact", getQuote: "Request a Quote", call: "Call Now", freeQuote: "Free Quote" },
    hero: {
      badge: "5.0 Rated · Greater Boston, MA",
      headline1: "A Cleaner Home,",
      headline2: "A Better Life.",
      subheadline: "Reliable, meticulous home cleaning with a personal touch. Weekly and bi-weekly care for homeowners who value quality — and a professional they can truly trust.",
      cta1: "Request a Free Quote",
      cta2: "Call",
      trust1: "Detail-Oriented",
      trust2: "Trustworthy & Respectful",
      trust3: "Pet-Friendly",
      trust4: "Always On Time",
      stat1Label: "Homes Cared For",
      stat2Label: "Years of Care",
      stat3Label: "Client Rating",
      floatingQuote: "She is respectful and trustworthy.",
      floatingAuthor: "Sharon G. · monthly client",
      floatingTag: "Weekly · Bi-Weekly · Monthly",
    },
    strip: ["Weekly & Bi-Weekly Plans", "Meticulous Attention to Detail", "Trustworthy & Respectful", "Pet-Friendly Care", "Greater Boston, MA"],
    services: { badge: "Our Services", title: "Cleaning, tailored to", titleAccent: "your home", subtitle: "From recurring care to one-time deep cleans, every visit is personalized to your space, your routine and your standards.", getQuote: "Request a quote", startingAt: "Starting at", items: enServices },
    plans: {
      badge: "Recurring Care",
      title: "Your home, beautifully",
      titleAccent: "maintained",
      subtitle: "Choose a rhythm that fits your life. Recurring clients enjoy a consistent schedule, a cleaner who knows their home and a space that always feels guest-ready.",
      popular: "Most Popular",
      cta: "Request this plan",
      note: "Every plan begins with a personalized quote — no surprises, just care tailored to your home.",
      items: [
        { name: "Weekly",    tagline: "Always guest-ready",       description: "For busy households, families and pet owners who want a consistently spotless home.", features: ["Same day & time every week", "Kitchen, baths & floors refreshed", "Priority scheduling"] },
        { name: "Bi-Weekly", tagline: "The perfect balance",      description: "Our most requested plan — a beautifully kept home with time and value in balance.",     features: ["A visit every two weeks", "Rotating detail tasks each visit", "Your preferences remembered"] },
        { name: "Monthly",   tagline: "A thorough monthly reset", description: "A complete refresh each month — Lidia reaches out to schedule, so you never have to.",  features: ["Proactive monthly scheduling", "Full-home detailed cleaning", "Ideal between deep cleans"] },
      ],
    },
    serviceAreas: { badge: "Where We Serve", title: "Caring for homes across", titleAccent: "Greater Boston", subtitle: "We proudly serve the following communities and their surrounding areas in Massachusetts.", checkAvailability: "Check Availability", startingAt: "Starting at", travelTime: "Availability", travelTimeValue: "Mon – Sat", scheduleLabel: "Hours", scheduleValue: "8 AM – 6 PM", serviceGuarantee: "Same Care, Every Town", guaranteeText: "Every home receives the same meticulous, personalized care — punctual arrival and attention to every detail, wherever you are.", neighborhoodsLabel: "Neighborhoods we visit", selectArea: "Select your town", surrounding: "…and surrounding areas" },
    whyUs: { badge: "Why Clients Stay", title: "The Lidia’s", titleAccent: "difference", subtitle: "Every home receives personalized care — the qualities our clients mention again and again.", items: [
      { icon: "sparkle", title: "Meticulous Attention to Detail", description: "Detailed, meticulous work in every room — the small things are never overlooked." },
      { icon: "message", title: "Clear, Proactive Communication", description: "We reach out to schedule, confirm every visit and keep you informed from start to finish." },
      { icon: "shield",  title: "Trustworthy & Respectful",      description: "Your home, your belongings and your privacy are treated with complete respect." },
      { icon: "clock",   title: "Punctual & Efficient",          description: "We arrive on time and make the most of every minute of your cleaning." },
      { icon: "paw",     title: "Pet-Friendly Care",             description: "Gentle and comfortable around your pets — even when they're home during the visit." },
      { icon: "heart",   title: "Your Feedback Matters",         description: "We actively ask for your feedback so every cleaning fits exactly what you need." },
    ]},
    howItWorks: { badge: "Simple Process", title: "Getting started is", titleAccent: "effortless", subtitle: "Three simple steps to a home you love coming back to.", steps: [
      { number: "01", title: "Request Your Quote",    description: "Tell us about your home and the service you need — by form, phone or message." },
      { number: "02", title: "A Personalized Plan",   description: "We tailor the cleaning and schedule to your space, routine and priorities." },
      { number: "03", title: "Enjoy a Spotless Home", description: "Relax and come home to a fresh, beautifully cared-for space — every single visit." },
    ]},
    testimonials: { badge: "Client Reviews", title: "Kind words from", titleAccent: "our clients", subtitle: "Real reviews from the homeowners we're proud to serve.", ratingLabel: "Average rating", verified: "Verified client", basedOn: "based on client reviews" },
    gallery: { badge: "Our Work", title: "Details that", titleAccent: "speak for themselves", subtitle: "A look at recent homes we've had the pleasure of caring for." },
    owners: {
      badge: "Meet the Founder",
      title: "Personal care,",
      titleAccent: "in every home",
      founder: {
        name: "Lidia Ramiro de Souza",
        role: "Founder",
        bio: "Lidia founded Lidia’s Cleaner Service on a simple belief: a cleaner home makes for a better life. She personally cares for every home with meticulous attention to detail, clear communication and genuine respect for your space, your schedule and even your pets.",
        bio2: "Her goal is always the same — to provide the best cleaning possible while making sure every client feels heard and completely satisfied.",
        promise: "Reliable, detailed cleaning — done with care and attention to every detail.",
        signature: "Lidia",
      },
      yearsLabel: "Years of Care",
      clientsLabel: "Homes Cared For",
      guaranteeLabel: "Star Rating",
    },
    contact: { badge: "Get In Touch", title: "Request your", titleAccent: "free quote", subtitle: "Tell us a little about your home and we'll reply with a personalized quote — usually within 24 hours.", infoTitle: "Contact Information", callUs: "Call us now", form: { name: "Full Name", namePlaceholder: "Jane Smith", email: "Email Address", emailPlaceholder: "jane@example.com", phone: "Phone Number", phonePlaceholder: "(617) 000-0000", service: "Service Type", serviceDefault: "Select a service…", frequency: "Preferred Frequency", frequencyDefault: "Select frequency…", frequencies: ["Weekly", "Bi-Weekly", "Monthly", "One-time"], town: "Town / City", townPlaceholder: "e.g. Wakefield", message: "Tell Us About Your Home", messagePlaceholder: "Bedrooms, bathrooms, pets, special requests…", submit: "Send Request", submitting: "Sending…", success: "Thank you! We'll be in touch within 24 hours.", error: "Something went wrong. Please call or email us directly." }, info: { hoursTitle: "Business Hours", hours: "Mon – Sat: 8:00 AM – 6:00 PM", hours2: "By appointment" } },
    footer: { description: "Reliable, detailed home cleaning across Greater Boston, Massachusetts — done with care and attention to every detail.", quickLinks: "Explore", ourServices: "Services", followUs: "Follow Us", contact: "Contact", rights: "All rights reserved.", insured: "Proudly serving Greater Boston, MA" },
  },
};

export type Translations = typeof translations.en;

export const SITE = {
  name: "RapidRims",
  legalName: "RapidRims LLC",
  tagline: "Curb rash fixed in your driveway.",
  phone: "612-219-5065",
  phoneTel: "+16122195065",
  phonePretty: "(612) 219-5065",
  email: "rapidrimsllc@gmail.com",
  instagram: "rapidrimsllc",
  instagramUrl: "https://www.instagram.com/rapidrimsllc/",
  website: "https://www.rapidrimslv.com",
  canonicalOrigin: "https://www.rapidrimslv.com",
  smsBody: "Hi Jack — I'd like a quote on curb rash. Photos attached.",
  city: "Las Vegas",
  region: "NV",
  country: "US",
  title: "Curb Rash Repair Las Vegas | RapidRims",
  description:
    "Mobile on-car curb rash repair in Las Vegas, Henderson & Summerlin. Wheel stays on, or booth-quality refinishing. From $100 a rim. Call or text (612) 219-5065.",
} as const;

export function telHref() {
  return `tel:${SITE.phoneTel}`;
}

export function smsHref() {
  return `sms:${SITE.phoneTel}?body=${encodeURIComponent(SITE.smsBody)}`;
}

export function mailHref() {
  return `mailto:${SITE.email}`;
}

export function canonicalUrl(path: string) {
  if (path === "/") return SITE.canonicalOrigin;
  return `${SITE.canonicalOrigin}${path}`;
}

export function pageHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description" as const, content: description },
      { name: "robots" as const, content: "index, follow" },
    ],
    links: [{ rel: "canonical" as const, href: canonicalUrl(path) }],
  };
}

export const AREAS = [
  "Las Vegas",
  "Henderson",
  "North Las Vegas",
  "Summerlin",
  "Spring Valley",
  "Enterprise",
] as const;

export const PRICING = [
  {
    name: "Light rash",
    detail: "1–2 spots on the lip",
    price: "$100",
    priceValue: "100",
    unit: "per rim",
    featured: false,
  },
  {
    name: "Heavier on-car",
    detail: "More of the lip, needs filler",
    price: "$125–$150",
    priceValue: "125",
    unit: "per rim",
    featured: false,
  },
  {
    name: "Two or more",
    detail: "Same vehicle, same visit",
    price: "$90–$100",
    priceValue: "90",
    unit: "each",
    featured: true,
  },
] as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/curb-rash-repair", label: "Curb rash" },
  { to: "/mobile-rim-repair-las-vegas", label: "Mobile" },
  { to: "/service-area", label: "Service area" },
  { to: "/pricing", label: "Pricing" },
] as const;

export const FAQ = [
  {
    q: "How much does curb rash repair cost in Las Vegas?",
    a: "Typical on-car prices: $100 a rim for light rash, $125–$150 if it needs filler, $90–$100 each when we do two or more on the same visit. Quote is from photos. Military and veteran: 10% off with ID.",
  },
  {
    q: "Do you come to Henderson and Summerlin?",
    a: "Yes. Mobile curb rash repair in Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and Enterprise. Evenings and weekends. If you’re close to the southwest valley, ask.",
  },
  {
    q: "Do you take the wheel off the car?",
    a: "Most curb rash is fixed on the car, in the driveway — about 20 minutes a rim. Want factory-perfect? We also do booth-quality refinishing: the wheel comes off and comes back like new. Text a photo and we’ll recommend the right option.",
  },
  {
    q: "How long does mobile rim repair take?",
    a: "On-car work is about 20 minutes a rim. A typical set of four is about an hour, in your driveway, work lot, or apartment.",
  },
  {
    q: "Can you fix Tesla curb rash?",
    a: "Yes. Painted Tesla wheels are a regular job. Text photos for a quote. Real job photos are on the Tesla wheel repair page.",
  },
  {
    q: "How do I get a quote?",
    a: "Text close-up photos of the damaged lip to (612) 219-5065. Same number for calls. No account, no online checkout.",
  },
  {
    q: "Do you take cash or card?",
    a: "Cash preferred. Card can be arranged if you need it.",
  },
  {
    q: "Do you offer a military discount?",
    a: "Yes. 10% off with ID, on top of the listed prices.",
  },
] as const;

export type FaqItem = { q: string; a: string };

export const CURB_RASH_FAQS: FaqItem[] = [
  {
    q: "What is curb rash?",
    a: "Cosmetic scuffs and gouges on the wheel lip from hitting a curb. That is what on-car repair is for.",
  },
  {
    q: "Does the wheel come off?",
    a: "For this work, no. The wheel stays on the car. We sand, fill if needed, and color-match in the driveway.",
  },
  {
    q: "Can you fix a bent wheel or a crack?",
    a: "Send a photo. Structural damage or a crack may need a shop or a replacement — that is not an on-car cosmetic job.",
  },
  {
    q: "How do I get a quote?",
    a: "Text photos of the lip — close and from a step back. The real number is from the photos.",
  },
];

export const MOBILE_FAQS: FaqItem[] = [
  {
    q: "Do you come to me?",
    a: "Yes. One tech, mobile only. Driveway, work lot, or apartment in the Las Vegas Valley.",
  },
  {
    q: "How long does a rim take?",
    a: "Often about 20 minutes a rim. A typical set of four is about an hour.",
  },
  {
    q: "What cities do you cover?",
    a: "Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and Enterprise. If you are close, ask.",
  },
  {
    q: "How do I book?",
    a: "Text photos for a quote. Same number for call or text. Evenings and weekends.",
  },
];

export const PRICING_FAQS: FaqItem[] = [
  {
    q: "How much is curb rash repair?",
    a: "Light (1–2 lip spots) is $100 per rim. Heavier on-car with filler is $125–$150 per rim. Two or more on the same visit are $90–$100 each.",
  },
  {
    q: "Is there a veteran discount?",
    a: "Yes. 10% off with ID. That sits on top of the prices above — we don’t advertise $80 rims.",
  },
  {
    q: "Is the website price the final price?",
    a: "Those are the typical on-car prices. The real number is from photos. Some jobs are beyond on-car — we will say so.",
  },
  {
    q: "What payment do you take?",
    a: "Cash is preferred. Card or other can be arranged if you need it. No online checkout.",
  },
];

export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const businessId = `${SITE.website}#business`;
const websiteId = `${SITE.website}#website`;
const serviceId = `${SITE.website}#curb-rash-repair`;

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "AutomotiveRepair"],
      "@id": businessId,
      name: SITE.legalName,
      alternateName: SITE.name,
      description: SITE.description,
      url: SITE.website,
      telephone: SITE.phoneTel,
      email: SITE.email,
      image: `${SITE.website}/work/tesla-after.jpg`,
      logo: `${SITE.website}/logo.jpg`,
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card",
      openingHours: "Mo-Su 08:00-21:00",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: AREAS.map((name) => ({ "@type": "City", name })),
      sameAs: [SITE.instagramUrl],
      knowsAbout: [
        "curb rash repair",
        "mobile rim repair",
        "on-car wheel repair",
        "Tesla curb rash",
      ],
      slogan: SITE.tagline,
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "On-car curb rash repair",
            description:
              "Cosmetic wheel lip repair. The wheel stays on the car. Quote from photos.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile rim repair",
            description:
              "One-tech mobile cosmetic lip repair in the Las Vegas Valley. We come to you.",
          },
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "On-car curb rash repair",
        itemListElement: PRICING.map((p) => ({
          "@type": "Offer",
          name: p.name,
          description: p.detail,
          price: p.priceValue,
          priceCurrency: "USD",
        })),
      },
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: "Mobile curb rash repair",
      serviceType: "On-car curb rash and rim scuff repair",
      provider: { "@id": businessId },
      areaServed: AREAS.map((name) => ({ "@type": "City", name })),
      url: SITE.website,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE.legalName,
      url: SITE.website,
      description: SITE.description,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.website}#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

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

export const AREA_DETAILS = [
  {
    slug: "las-vegas",
    name: "Las Vegas",
    body: "Driveways, apartment lots, and work lots in Las Vegas. On-car curb rash and rim scuffs. Text a photo.",
  },
  {
    slug: "henderson",
    name: "Henderson",
    body: "Henderson, including Green Valley and the west side toward the valley. Same on-car repair, same prices. We come to you.",
  },
  {
    slug: "north-las-vegas",
    name: "North Las Vegas",
    body: "North Las Vegas. Evenings and weekends. If you are near the north end of the valley, text and ask.",
  },
  {
    slug: "summerlin",
    name: "Summerlin",
    body: "Summerlin driveways, including gated communities. A shop drop-off is the hassle. The wheel stays on the car.",
  },
  {
    slug: "spring-valley",
    name: "Spring Valley",
    body: "Spring Valley and the southwest side. Apartment lots included. One tech, mobile only.",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    body: "Enterprise and the southern valley. If you are close and not named on this page, ask.",
  },
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
    detail: "More of the lip — grind, sand, polish or paint",
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
  { to: "/work", label: "Work" },
] as const;

export const FAQ = [
  {
    q: "How much does curb rash repair cost in Las Vegas?",
    a: "Typical on-car prices: $100 a rim for light rash, $125–$150 for heavier grind, sand, polish or paint, $90–$100 each when we do two or more on the same visit. Quote is from photos. Military and veteran: 10% off with ID.",
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
    a: "Text two photos per wheel — close on the rash, and one of the whole wheel — to (612) 219-5065. Say which city you’re in. Same number for calls. No account, no online checkout.",
  },
  {
    q: "What photos should I text?",
    a: "Close on the damaged lip, then the whole wheel from a step back. Add the city: Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, or Enterprise. The number comes from those photos.",
  },
  {
    q: "Is curb rash worth repairing?",
    a: "On a wheel you are keeping, usually yes. Light lip rash is $100 a rim, on the car, about 20 minutes. Replacing the wheel means a shop visit and more money. If the photo shows a bend or a crack, we will say this is not an on-car job.",
  },
  {
    q: "Can you repair alloy wheels with the tire still on?",
    a: "Yes. That is the usual job. The wheel stays on the car. We grind, sand, polish or paint the lip in the driveway, a work lot, or an apartment lot.",
  },
  {
    q: "Do you work at apartments and gated communities?",
    a: "Yes. Apartment lots and gated driveways in the Las Vegas Valley. Text the photos and where to meet.",
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
    a: "For this work, no. The wheel stays on the car. We grind, sand, polish or paint in the driveway.",
  },
  {
    q: "Can you fix a bent wheel or a crack?",
    a: "Send a photo. Structural damage or a crack may need a shop or a replacement — that is not an on-car cosmetic job.",
  },
  {
    q: "How do I get a quote?",
    a: "Text photos of the lip — close and from a step back — and the city you’re in. The real number is from the photos.",
  },
  {
    q: "Is it worth fixing before I sell the car?",
    a: "If the rash is on the lip and the wheel is straight, on-car repair is the cheap way to make it look right. Text the photos. If it is bent or cracked, we will not pretend an on-car job fixes that.",
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
  {
    q: "Do you work in apartment lots?",
    a: "Yes. Driveway, work lot, or apartment. Tell me where to park and meet you.",
  },
];

export const PRICING_FAQS: FaqItem[] = [
  {
    q: "How much is curb rash repair?",
    a: "Light (1–2 lip spots) is $100 per rim. Heavier on-car (grind, sand, polish or paint) is $125–$150 per rim. Two or more on the same visit are $90–$100 each.",
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

export const SERVICE_AREA_FAQS: FaqItem[] = [
  {
    q: "Do you charge extra to drive to Henderson or Summerlin?",
    a: "The prices on the pricing page are the typical on-car prices, per rim. The real number is from photos. Text the city with the photos.",
  },
  {
    q: "How soon can you get here?",
    a: "Text the photos. I’ll tell you when I can be there. Evenings and weekends are normal.",
  },
  {
    q: "Is there a different number for each city?",
    a: "No. One tech, one number: (612) 219-5065. Las Vegas, Henderson, North Las Vegas, Summerlin, Spring Valley, and Enterprise.",
  },
];

export function breadcrumbJsonLd(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.website,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: canonicalUrl(path),
      },
    ],
  };
}

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

const areaServed = AREAS.map((name) => ({
  "@type": "Place",
  name: `${name}, Nevada`,
}));

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
      areaServed,
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 36.1716,
          longitude: -115.1391,
        },
        geoRadius: 40000,
      },
      sameAs: [SITE.instagramUrl],
      knowsAbout: [
        "curb rash repair",
        "mobile rim repair",
        "on-car wheel repair",
        "alloy wheel scuff repair",
        "Tesla curb rash",
      ],
      slogan: SITE.tagline,
      makesOffer: [
        {
          "@type": "Offer",
          url: `${SITE.website}/curb-rash-repair`,
          itemOffered: {
            "@type": "Service",
            name: "On-car curb rash repair",
            description:
              "Cosmetic wheel lip repair. The wheel stays on the car. Quote from photos.",
          },
        },
        {
          "@type": "Offer",
          url: `${SITE.website}/mobile-rim-repair-las-vegas`,
          itemOffered: {
            "@type": "Service",
            name: "Mobile rim repair",
            description:
              "One-tech mobile cosmetic lip repair in the Las Vegas Valley. We come to you.",
          },
        },
        {
          "@type": "Offer",
          url: `${SITE.website}/tesla-wheel-repair`,
          itemOffered: {
            "@type": "Service",
            name: "Tesla curb rash repair",
            description:
              "On-car cosmetic lip repair for Tesla wheels in Las Vegas. Quote from photos.",
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
      "@id": `${SITE.website}/curb-rash-repair#service`,
      name: "On-car curb rash repair",
      serviceType: "Curb rash and rim scuff repair",
      provider: { "@id": businessId },
      areaServed,
      url: `${SITE.website}/curb-rash-repair`,
    },
    {
      "@type": "Service",
      "@id": `${SITE.website}/mobile-rim-repair-las-vegas#service`,
      name: "Mobile rim repair",
      serviceType: "Mobile on-car wheel lip repair",
      provider: { "@id": businessId },
      areaServed,
      url: `${SITE.website}/mobile-rim-repair-las-vegas`,
    },
    {
      "@type": "Service",
      "@id": `${SITE.website}/tesla-wheel-repair#service`,
      name: "Tesla curb rash repair",
      serviceType: "On-car Tesla wheel lip repair",
      provider: { "@id": businessId },
      areaServed,
      url: `${SITE.website}/tesla-wheel-repair`,
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
  ],
};

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
  smsBody:
    "Hi Jack — I'd like a quote on curb rash. Photos attached.",
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

export const AREAS = [
  "Las Vegas",
  "Henderson",
  "Summerlin",
  "Spring Valley",
  "Enterprise",
] as const;

export const PRICING = [
  {
    name: "Light rash",
    detail: "1–2 spots on the lip",
    price: "$100",
    unit: "per rim",
    featured: false,
  },
  {
    name: "Heavier on-car",
    detail: "More of the lip, needs filler",
    price: "$125–$150",
    unit: "per rim",
    featured: false,
  },
  {
    name: "Two or more",
    detail: "Same vehicle, same visit",
    price: "$90–$100",
    unit: "each",
    featured: true,
  },
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveRepair",
  name: SITE.legalName,
  description:
    "Mobile on-car curb rash and wheel scuff repair in Las Vegas. We come to you. The wheel stays on the car.",
  telephone: SITE.phoneTel,
  email: SITE.email,
  url: SITE.website,
  areaServed: AREAS.map((name) => ({ "@type": "City", name })),
  priceRange: "$$",
  openingHours: "Mo-Su 08:00-21:00",
  sameAs: [SITE.instagramUrl],
};

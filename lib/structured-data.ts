import { MENU, REVIEWS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Full machine-readable menu (schema.org/Menu) — lets Google and AI engines read
// every dish, price and dietary flag straight from the markup, without executing
// the tab JavaScript. Built from lib/data.ts so it can never drift from the page.
const eur = (p: string) => p.replace("€", "").replace(",", ".").trim();
const DIET: Record<string, string[]> = {
  L: ["https://schema.org/LowLactoseDiet"],
  G: ["https://schema.org/GlutenFreeDiet"],
  LG: ["https://schema.org/LowLactoseDiet", "https://schema.org/GlutenFreeDiet"],
};
const hasMenu = {
  "@type": "Menu",
  name: "Roba Deli menu",
  hasMenuSection: MENU.map((section) => ({
    "@type": "MenuSection",
    name: section.name,
    hasMenuItem: section.items.map((it) => ({
      "@type": "MenuItem",
      name: it.name,
      description: it.desc,
      suitableForDiet: it.diet ? DIET[it.diet] : undefined,
      offers: it.price12
        ? [
            { "@type": "Offer", name: "Small", price: eur(it.price), priceCurrency: "EUR" },
            { "@type": "Offer", name: "Large", price: eur(it.price12), priceCurrency: "EUR" },
          ]
        : { "@type": "Offer", price: eur(it.price), priceCurrency: "EUR" },
    })),
  })),
};

// schema.org Restaurant — powers Google rich results (map card, ⭐ rating, price,
// hours, full menu). Kept in sync with lib/data.ts. `geo` is intentionally
// omitted until exact coordinates are confirmed — better absent than wrong.
// Hours crossing midnight (Fri/Sat) are split at 23:59 / 00:00 per Google's
// local-business guidance so "Open now" evaluates correctly.
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "Roba Deli",
  description:
    "Helsinki's New York-style sandwich deli on Iso Roobertinkatu, handcrafted sandwiches, wraps & smoothies, from lunch to late night.",
  url: SITE_URL,
  telephone: "+358503797490",
  priceRange: "€10–15",
  servesCuisine: ["Sandwiches", "New York deli", "Wraps", "Smoothies"],
  image: [`${SITE_URL}/og.png`, `${SITE_URL}/images/logo.png`],
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Iso Roobertinkatu 1",
    postalCode: "00120",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Iso+Roobertinkatu+1,+00120+Helsinki",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:30",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "11:00",
      closes: "23:59",
    },
    {
      // Friday night into Saturday morning
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "00:00",
      closes: "04:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:30",
      closes: "23:59",
    },
    {
      // Saturday night into Sunday morning
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "04:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:30",
      closes: "23:00",
    },
  ],
  hasMenu,
  acceptsReservations: false,
  sameAs: [
    "https://www.instagram.com/roba.deli/",
    "https://www.facebook.com/Robadeli26/",
    "https://www.tiktok.com/@robadeli",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "24",
    bestRating: "5",
  },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.who },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody: r.text,
  })),
};

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Both languages, each naming the other, so a crawler that lands on one
  // learns the second exists rather than treating /fi as a duplicate.
  const languages = { en: SITE_URL, fi: `${SITE_URL}/fi` };
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/fi`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
    // Legal pages. A consumer has to be able to find the terms and the privacy
    // policy before ordering, so they are crawlable and paired across languages
    // rather than hidden behind a footer link only.
    ...(
      [
        ["/privacy", "/fi/tietosuoja"],
        ["/cookies", "/fi/evasteet"],
        ["/terms", "/fi/ehdot"],
        ["/refunds", "/fi/palautukset"],
      ] as const
    ).flatMap(([en, fi]) => {
      const pair = { en: `${SITE_URL}${en}`, fi: `${SITE_URL}${fi}` };
      return [
        {
          url: `${SITE_URL}${en}`,
          changeFrequency: "yearly" as const,
          priority: 0.3,
          alternates: { languages: pair },
        },
        {
          url: `${SITE_URL}${fi}`,
          changeFrequency: "yearly" as const,
          priority: 0.3,
          alternates: { languages: pair },
        },
      ];
    }),
  ];
}

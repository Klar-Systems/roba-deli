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
  ];
}

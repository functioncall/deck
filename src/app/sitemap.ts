import type { MetadataRoute } from "next";

/**
 * `/sitemap.xml` — the indexable public surfaces only. `/thank-you` (post-signup)
 * and `/styleguide` (living component catalog) are intentionally excluded — see
 * `robots.ts` and the styleguide's `noindex` metadata.
 */
const SITE_URL = "https://beontheloop.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-05-30");
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/deck`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
}

import type { MetadataRoute } from "next";

/**
 * `/robots.txt` — allow indexing of public marketing/legal routes; keep the
 * living styleguide and the post-signup thank-you page out of search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/thank-you"],
    },
    sitemap: "https://beontheloop.com/sitemap.xml",
  };
}

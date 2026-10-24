import type { MetadataRoute } from "next";

// A design draft for client review: ask crawlers to skip every page.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}

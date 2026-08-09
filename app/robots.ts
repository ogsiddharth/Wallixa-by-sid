import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio-x9k21/",
    },

    sitemap: "https://wallixa.com/sitemap.xml",
  };
}
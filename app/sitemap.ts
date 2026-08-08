import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wallixa.com",
      priority: 1,
    },

    {
      url: "https://wallixa.com/categories",
      priority: 0.9,
    },

    {
      url: "https://wallixa.com/trending",
      priority: 0.9,
    },

    {
      url: "https://wallixa.com/latest",
      priority: 0.9,
    },

    {
      url: "https://wallixa.com/premium",
      priority: 0.8,
    },
  ];
}
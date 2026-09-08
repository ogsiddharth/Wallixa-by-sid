import type { MetadataRoute } from "next";
import { getAllWallpapersForSitemap } from "@/lib/firestore";

const baseUrl = "https://wallixa.netlify.app";

const categories = [
  "cars",
  "anime",
  "marvel",
  "nature",
  "gaming",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const wallpapers = await getAllWallpapersForSitemap();

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
  }));

  const wallpaperPages = wallpapers.map((wallpaper) => ({
    url: `${baseUrl}/wallpaper/${wallpaper.slug}`,
    lastModified:
      wallpaper.createdAt?.toDate?.() ?? undefined,
  }));

  return [
    {
      url: baseUrl,
    },

    {
      url: `${baseUrl}/premium`,
    },

    {
      url: `${baseUrl}/about`,
    },

    {
      url: `${baseUrl}/contact`,
    },

    {
      url: `${baseUrl}/privacy-policy`,
    },

    {
      url: `${baseUrl}/terms`,
    },

    ...categoryPages,
    ...wallpaperPages,
  ];
}
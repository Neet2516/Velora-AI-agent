import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velora.ai";

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-10-06T00:00:00.000Z"),
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];
}

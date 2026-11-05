import type { MetadataRoute } from "next";

function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL;
  if (configured) return configured.replace(/\/$/, "");
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}

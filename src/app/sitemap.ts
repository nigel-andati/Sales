import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/quote`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

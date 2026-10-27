import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/__forms.html"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

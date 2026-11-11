import { cv } from "@/lib/cv";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = cv.identity.portfolioUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/command",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

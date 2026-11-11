import { cv } from "@/lib/cv";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = cv.identity.portfolioUrl.replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/resume/en`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/resume/es`, changeFrequency: "monthly", priority: 0.4 },
  ];
}

import raw from "@/data/cv-master.json";

export const cv = raw;

export type Locale = "en" | "es";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

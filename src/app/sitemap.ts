import type { MetadataRoute } from "next";
import { categories } from "@/lib/pathways";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-14");
  const top: MetadataRoute.Sitemap = [
    { url: absUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absUrl("/get-started/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absUrl("/learn/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absUrl("/funding/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
  const guides: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absUrl(`/pathways/${c.id}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...top, ...guides];
}

import type { MetadataRoute } from "next";
import { categories } from "@/lib/pathways";
import { roles } from "@/lib/roles";
import { absUrl } from "@/lib/site";
import routes from "@/data/entry-routes.json";

/** "15 October 2026" (the data files' check date) → Date */
function checkedDate(): Date {
  const d = new Date(routes.meta.checked + " UTC");
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = checkedDate();
  const top: MetadataRoute.Sitemap = [
    { url: absUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absUrl("/get-started/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absUrl("/learn/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absUrl("/funding/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absUrl("/roles/"), lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
  const guides: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absUrl(`/pathways/${c.id}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const rolePages: MetadataRoute.Sitemap = roles.map((r) => ({
    url: absUrl(`/roles/${r.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...top, ...guides, ...rolePages];
}

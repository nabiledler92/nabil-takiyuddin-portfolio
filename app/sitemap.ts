import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

/**
 * Last time the home page content changed (YYYY-MM-DD), not counting case
 * studies: bump it when you edit profile, experience, skills or badges.
 * Fixed dates matter: if lastmod changed on every deploy, Google would learn
 * to ignore it.
 */
const HOME_UPDATED = "2026-11-16";

export default function sitemap(): MetadataRoute.Sitemap {
  // The home page lists every case study, so it changes when any of them does.
  const homeUpdated = [HOME_UPDATED, ...caseStudies.map((c) => c.updated)].sort().at(-1)!;
  return [
    { url: absoluteUrl("/"), lastModified: homeUpdated, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/projects/${c.slug}`),
      lastModified: c.updated,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

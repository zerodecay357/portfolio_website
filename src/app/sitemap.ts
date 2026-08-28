import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE_URL = "https://shivanshuaryan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.tier === 1 ? 0.8 : 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}

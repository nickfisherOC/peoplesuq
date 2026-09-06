import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { episodes } from "@/content/episodes";
import { issues } from "@/content/issues";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/podcast",
    "/issues",
    "/stories",
    "/stories/share",
    "/merch",
    "/impact",
    "/about",
    "/get-involved",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...episodes.map((e) => `/podcast/${e.slug}`),
    ...issues.map((i) => `/issues/${i.slug}`),
    ...stories.map((s) => `/stories/${s.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

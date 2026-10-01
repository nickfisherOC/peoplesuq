import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { episodes } from "@/content/episodes";
import { issues } from "@/content/issues";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Only indexable, 200-status pages belong in the sitemap. /privacy and /terms
  // are intentionally excluded because robots.txt disallows them.
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
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...episodes.map((e) => `/podcast/${e.slug}`),
    ...issues.map((i) => `/issues/${i.slug}`),
    // Exclude placeholder/demo stories — they are noindex (see
    // stories/[slug]/page.tsx) so they must not appear in the sitemap.
    ...stories.filter((s) => !s.isPlaceholder).map((s) => `/stories/${s.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

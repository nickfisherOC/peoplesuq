import type { Metadata } from "next";
import { site } from "./site";

/**
 * Open Graph fields shared by every page.
 *
 * Next.js shallowly merges metadata: when a page sets its own `openGraph` (which
 * we do, to give each page a self-referencing `og:url`), it REPLACES the
 * parent/layout `openGraph` entirely rather than deep-merging. So the shared
 * image, site name, type, title and description must be supplied from one place
 * and spread into every page's metadata — otherwise sub-pages would lose the
 * Open Graph image. `url` is intentionally omitted here and set per page.
 */
export const sharedOpenGraph = {
  type: "website",
  siteName: site.name,
  title: `${site.name}. ${site.tagline}`,
  description: site.description,
  images: [
    { url: "/images/podcast-logo.jpg", width: 1200, height: 1200, alt: site.name },
  ],
} satisfies Metadata["openGraph"];

/**
 * Per-page SEO metadata: a self-referencing canonical plus a self-referencing
 * `og:url`, both pointing at the page's own path. Pass the page's path
 * (e.g. "/podcast" or "/"); both resolve against `metadataBase` (the www
 * canonical host configured in lib/site), and the shared Open Graph image and
 * metadata are preserved.
 */
export function pageSeo(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path },
  };
}

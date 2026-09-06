import type { Story } from "./types";

/**
 * PLACEHOLDER stories.
 *
 * Editorial scaffolding to demonstrate the Stories feed. These are marked
 * `isPlaceholder: true` and use generic, non-attributed framing — no real
 * names, people, or organizations are invented. Replace with real, consented
 * stories and photography.
 */
export const stories: Story[] = [
  {
    slug: "placeholder-recovery-story",
    title: "The long road back",
    kind: "Recovery",
    date: "2026-01-05",
    teaser:
      "A placeholder for a first-person recovery story — the setbacks, the turning point, and the people who showed up.",
    body: [
      "This is placeholder copy. Real stories will be told in the words of the people who lived them, published only with consent.",
      "Photography carries much of the weight here — a portrait, a place, a detail. The writing stays honest and specific.",
    ],
    image: { src: "/images/person-story-3.png", alt: "Portrait accompanying a recovery story" },
    issues: ["addiction-recovery"],
    format: "read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-community-profile",
    title: "The people behind the kitchen",
    kind: "Community",
    date: "2025-12-22",
    teaser:
      "A placeholder profile of a community initiative feeding neighbours with dignity.",
    image: { src: "/images/homeless-3.webp", alt: "Community outreach — the people behind the kitchen" },
    issues: ["food-insecurity", "community-second-chances"],
    format: "read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-second-chance",
    title: "Starting over, out loud",
    kind: "Second Chances",
    date: "2025-12-10",
    teaser:
      "A placeholder story about reentry and building something new after a hard chapter.",
    image: { src: "", alt: "Placeholder second-chance story" },
    issues: ["community-second-chances"],
    format: "watch",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-mental-health-interview",
    title: "What helped, in their words",
    kind: "Interview",
    date: "2025-11-28",
    teaser:
      "A placeholder interview on living with anxiety and finding support that actually works.",
    image: { src: "", alt: "Placeholder mental-health interview" },
    issues: ["mental-health", "treatment-support"],
    format: "read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-housing-story",
    title: "A room of one's own",
    kind: "Community",
    date: "2025-11-14",
    teaser:
      "A placeholder story following the path from the street to stable housing.",
    image: { src: "/images/homeless-2.jpg", alt: "A path from the street to stable housing" },
    issues: ["poverty-homelessness", "treatment-support"],
    format: "read",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-org-spotlight",
    title: "The organization doing the quiet work",
    kind: "Organization",
    date: "2025-10-30",
    teaser:
      "A placeholder spotlight on an organization making a real difference in the community.",
    image: { src: "", alt: "Placeholder organization spotlight" },
    issues: ["treatment-support", "community-second-chances"],
    format: "watch",
    isPlaceholder: true,
  },
];

export const storiesByNewest = [...stories].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

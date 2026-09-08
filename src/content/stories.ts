import type { Story } from "./types";

/**
 * People Suq stories — video-first.
 *
 * Stories are almost entirely video. Each carries a short 2–3 sentence summary
 * (the `teaser`) shown under the player, and a `youtubeId` once the video is
 * published (empty until then → the player shows a "video coming soon" state).
 * Photography is the poster frame. Replace summaries/videos with real content
 * as it's produced.
 */
export const stories: Story[] = [
  {
    slug: "placeholder-recovery-story",
    title: "The long road back",
    kind: "Recovery",
    date: "2026-01-05",
    teaser:
      "Recovery is rarely a straight line — it's hard days, small wins, and people who refuse to give up on you. One person walks us through what it actually took to come back, and what keeps them going now.",
    image: { src: "/images/person-story-3.png", alt: "Portrait accompanying a recovery story" },
    issues: ["addiction-recovery"],
    format: "watch",
  },
  {
    slug: "placeholder-community-profile",
    title: "The people behind the kitchen",
    kind: "Community",
    date: "2025-12-22",
    teaser:
      "Behind every hot meal is a crew who show up before dawn and stay long after the plates are cleared. We spend time with the volunteers keeping a community kitchen running — and feeding neighbours with dignity.",
    image: { src: "/images/kitchen-1.jpg", alt: "Volunteers behind a community kitchen" },
    issues: ["food-insecurity", "community-second-chances"],
    format: "watch",
  },
  {
    slug: "placeholder-second-chance",
    title: "Starting over, out loud",
    kind: "Second Chances",
    date: "2025-12-10",
    teaser:
      "What does it look like to rebuild your life in the open — no hiding, no shame? One person shares their fresh start after a hard chapter, and why saying it out loud made all the difference.",
    image: { src: "/images/person-story-1.jpg", alt: "Portrait accompanying a second-chance story" },
    issues: ["community-second-chances"],
    format: "watch",
  },
  {
    slug: "placeholder-mental-health-interview",
    title: "What helped, in their words",
    kind: "Interview",
    date: "2025-11-28",
    teaser:
      "No clichés, no textbook answers — just an honest account of living with anxiety and what actually helped. A short, straight-talking conversation about finding support that works.",
    image: { src: "/images/person-story-5.jpg", alt: "Portrait accompanying a mental-health interview" },
    issues: ["mental-health", "treatment-support"],
    format: "watch",
  },
  {
    slug: "placeholder-housing-story",
    title: "A room of one's own",
    kind: "Community",
    date: "2025-11-14",
    teaser:
      "Stable housing changes everything — but the path there is rarely simple. We follow one journey from the street to a place to call home, and the moment a key finally turned in the lock.",
    image: { src: "/images/homeless-2.jpg", alt: "A path from the street to stable housing" },
    issues: ["poverty-homelessness", "treatment-support"],
    format: "watch",
  },
  {
    slug: "placeholder-org-spotlight",
    title: "The organization doing the quiet work",
    kind: "Organization",
    date: "2025-10-30",
    teaser:
      "Some of the most important community work happens without applause. We spotlight an organization quietly changing lives every day — and the people making it happen.",
    image: { src: "/images/community-2.jpg", alt: "An organization doing the quiet work in the community" },
    issues: ["treatment-support", "community-second-chances"],
    format: "watch",
  },
];

export const storiesByNewest = [...stories].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

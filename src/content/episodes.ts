import type { Episode } from "./types";

/**
 * The People Suq podcast — Season One.
 *
 * These are REAL, planned episodes migrated from the SUQ MEDIA podcast hub
 * (titles, categories, and hosts are genuine). They have not been released yet,
 * so each is marked `comingSoon: true` and shown with a "Coming soon" state.
 * No episodes, guests, dates, or durations are invented. Populate `youtubeId`,
 * `links`, `date` and `durationMinutes` as episodes publish.
 */
export const episodes: Episode[] = [
  {
    slug: "building-through-brokenness",
    number: 1,
    title: "Building Through Brokenness",
    category: "Recovery & Resilience",
    summary:
      "An honest, unfiltered conversation about what it really means to rebuild your life from the ground up — from addiction and trauma to healing, identity, and purpose. The episode that starts it all.",
    description:
      "An honest, unfiltered conversation about what it really means to rebuild your life from the ground up — from addiction and trauma to healing, identity, and purpose. This is the episode that starts it all.",
    hosts: [{ name: "Kerry" }, { name: "Krzysztof" }],
    issues: ["addiction-recovery", "mental-health"],
    topics: ["Recovery", "Trauma", "Identity", "Purpose"],
    image: { src: "", alt: "Building Through Brokenness — Episode 1" },
    links: {},
    comingSoon: true,
  },
  {
    slug: "the-culture-of-healing",
    number: 2,
    title: "The Culture of Healing",
    category: "Mental Wellness",
    summary:
      "What healing actually looks like — beyond the buzzwords. Breaking stigma and building emotional resilience, one honest conversation at a time.",
    hosts: [{ name: "Kerry" }],
    issues: ["mental-health"],
    topics: ["Mental health", "Stigma", "Healing"],
    image: { src: "", alt: "The Culture of Healing — Episode 2" },
    links: {},
    comingSoon: true,
  },
  {
    slug: "creating-with-purpose",
    number: 3,
    title: "Creating With Purpose",
    category: "Creativity & Impact",
    summary:
      "How creativity becomes a vehicle for change — using media, work and craft to give back and make a real difference in the community.",
    hosts: [{ name: "Krzysztof" }],
    issues: ["community-second-chances"],
    topics: ["Purpose", "Creativity", "Community"],
    image: { src: "", alt: "Creating With Purpose — Episode 3" },
    links: {},
    comingSoon: true,
  },
  {
    slug: "reclaiming-your-body",
    number: 4,
    title: "Reclaiming Your Body",
    category: "Health & Wellness",
    summary:
      "Recovery isn't only mental. A conversation about health, treatment and taking care of the body while you rebuild the rest of your life.",
    hosts: [{ name: "Kerry" }],
    issues: ["treatment-support", "mental-health"],
    topics: ["Health", "Recovery", "Wellbeing"],
    image: { src: "", alt: "Reclaiming Your Body — Episode 4" },
    links: {},
    comingSoon: true,
  },
  {
    slug: "what-sobriety-taught-me",
    number: 5,
    title: "What Sobriety Taught Me",
    category: "Recovery & Sobriety",
    summary:
      "Honest stories from the path to sobriety — the hard-won lessons, the setbacks, and what actually keeps people well.",
    hosts: [{ name: "Kerry" }, { name: "Krzysztof" }],
    issues: ["addiction-recovery"],
    topics: ["Sobriety", "Recovery", "Second chances"],
    image: { src: "", alt: "What Sobriety Taught Me — Episode 5" },
    links: {},
    comingSoon: true,
  },
  {
    slug: "identity-after-trauma",
    number: 6,
    title: "Identity After Trauma",
    category: "Personal Development",
    summary:
      "Who are you after the hardest chapter of your life? A conversation about rebuilding identity, meaning and self-worth after trauma.",
    hosts: [{ name: "Kerry" }],
    issues: ["mental-health", "community-second-chances"],
    topics: ["Trauma", "Identity", "Growth"],
    image: { src: "", alt: "Identity After Trauma — Episode 6" },
    links: {},
    comingSoon: true,
  },
];

/** Ordered for display. Released episodes (by date, newest first) lead;
 *  unreleased "coming soon" episodes follow in episode-number order. */
export const episodesByNewest = [...episodes].sort((a, b) => {
  if (a.date && b.date) return +new Date(b.date) - +new Date(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  return a.number - b.number;
});

/** The episode to feature (a released latest, else episode one). */
export const latestEpisode =
  episodesByNewest.find((e) => !e.comingSoon) ?? episodesByNewest[0];

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

import type { Issue } from "./types";

/**
 * The core issues People Suq covers. These are real topic areas (not
 * fabricated content), so they carry full editorial copy. Each issue is a
 * hub that will collect episodes, stories, articles and resources over time.
 */
export const issues: Issue[] = [
  {
    slug: "addiction-recovery",
    title: "Addiction & Recovery",
    shortTitle: "Addiction & Recovery",
    summary:
      "Honest conversations about substance use, the road back, and what recovery actually looks like.",
    intro:
      "Addiction touches families in every neighbourhood, yet it's still talked about in whispers. We bring these conversations into the open — the relapse and the comeback, the science and the lived experience, and the people who make recovery possible.",
    image: { src: "/images/addiction-1.jpg", alt: "Addiction & Recovery" },
  },
  {
    slug: "mental-health",
    title: "Mental Health",
    shortTitle: "Mental Health",
    summary:
      "Real talk about anxiety, depression, trauma, and asking for help before it's a crisis.",
    intro:
      "Mental health is health. We talk about what people actually live with, how they cope, where support works and where the system falls short — without clichés and without shame.",
    image: { src: "/images/mental-health-1.jpg", alt: "Mental Health" },
  },
  {
    slug: "poverty-homelessness",
    title: "Poverty & Homelessness",
    shortTitle: "Poverty & Homelessness",
    summary:
      "The reality of housing insecurity and life on the edge — beyond the headlines and stereotypes.",
    intro:
      "Homelessness is rarely one story and never just one choice. We listen to people living it and the organizations working alongside them, and we push past the stereotypes to what's actually happening.",
    image: { src: "/images/homeless-1.avif", alt: "Poverty & Homelessness" },
  },
  {
    slug: "treatment-support",
    title: "Treatment & Support",
    shortTitle: "Treatment & Support",
    summary:
      "Navigating treatment, medication, and the support systems people rely on to keep going.",
    intro:
      "Getting help is complicated — programs, waitlists, medication, insurance, and the people who guide you through it. We map how support really works and share what helps.",
    image: { src: "/images/treatment-1.jpeg", alt: "Treatment & Support" },
  },
  {
    slug: "food-insecurity",
    title: "Food Insecurity",
    shortTitle: "Food Insecurity",
    summary:
      "Who goes without, why it happens, and the community efforts feeding neighbours with dignity.",
    intro:
      "Food insecurity hides in plain sight. We highlight the scale of the problem and the community kitchens, pantries and people making sure no one goes without.",
    image: { src: "/images/food-insecurity-1.jpg", alt: "Food Insecurity" },
  },
  {
    slug: "community-second-chances",
    title: "Community & Second Chances",
    shortTitle: "Community & Second Chances",
    summary:
      "Reentry, redemption, and the people proving that where you've been isn't where you end.",
    intro:
      "Everyone deserves a path forward. We tell stories of second chances — reentry, redemption, and the community support that helps people build something new.",
    image: { src: "/images/community-1.jpg", alt: "Community & Second Chances" },
  },
];

export function getIssue(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}

import type { ImageRef } from "./types";

/**
 * The hosts / co-founders behind People Suq.
 *
 * Real people and real bios, migrated and lightly tightened from the SUQ MEDIA
 * site. Photography is real (migrated into /public/images).
 */
export interface Host {
  slug: string;
  name: string;
  role: string;
  /** Bio as paragraphs. */
  bio: string[];
  image: ImageRef;
}

export const hosts: Host[] = [
  {
    slug: "kerry",
    name: "Kerry",
    role: "Co-Founder & Host",
    bio: [
      "Kerry's journey through addiction, healing, self-discovery and personal transformation is the heart behind People Suq. With 24 years clean and sober, 13 years of postsecondary education and a lifetime of real-world experience, she brings raw honesty and emotional depth to every conversation.",
      "Through storytelling and wellness, she hopes to inspire growth, emotional maturity and hope in others — while challenging the mainstream narratives around healing and recovery.",
    ],
    image: { src: "/images/host-kerry.jpg", alt: "Kerry — Co-Founder & Host of People Suq" },
  },
  {
    slug: "krzysztof",
    name: "Krzysztof",
    role: "Co-Founder & Host",
    bio: [
      "Krzysztof (Kris) leads the audio, video and digital side of People Suq, pairing a background in IT, telecommunications and computer science with a creative eye. He now uses media as a platform for transformation, recovery and social impact.",
      "Having overcome addiction himself, Kris is driven to create authentic content that breaks stigma, encourages healing and gives a voice to stories that matter. Away from the studio, he finds inspiration in woodworking and aviation.",
    ],
    image: { src: "/images/host-kris.jpg", alt: "Krzysztof — Co-Founder & Host of People Suq" },
  },
];

export function getHost(slug: string): Host | undefined {
  return hosts.find((h) => h.slug === slug);
}

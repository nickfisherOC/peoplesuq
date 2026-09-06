import type { ImageRef } from "./types";

/**
 * Community partners — real organizations migrated from the SUQ MEDIA site's
 * "Proud to partner with" section (names + logos are genuine). Logos live in
 * /public/images/partners. Add or remove partners as relationships change; do
 * not invent partners or partnership claims.
 */
export interface Partner {
  name: string;
  logo: ImageRef;
  /** Optional link to the partner (add when confirmed). */
  href?: string;
}

export const partners: Partner[] = [
  {
    name: "Women in Need Society (WINS)",
    logo: { src: "/images/partners/wins.png", alt: "Women in Need Society (WINS)" },
  },
  {
    name: "Recovery Acres Calgary Society",
    logo: { src: "/images/partners/recovery-acres.png", alt: "Recovery Acres Calgary Society" },
  },
  {
    name: "Community Kitchen",
    logo: { src: "/images/partners/community-kitchen.jpg", alt: "Community Kitchen" },
  },
  {
    name: "Outsiders",
    logo: { src: "/images/partners/outsiders.png", alt: "Outsiders" },
  },
  {
    name: "Design Core",
    logo: { src: "/images/partners/design-core.png", alt: "Design Core" },
  },
  {
    name: "Live Daisy",
    logo: { src: "/images/partners/live-daisy.png", alt: "Live Daisy" },
  },
  {
    name: "Grand & Toy",
    logo: { src: "/images/partners/grand-and-toy.png", alt: "Grand & Toy" },
  },
  {
    name: "Q Construction Management",
    logo: { src: "/images/partners/q-construction.png", alt: "Q Construction Management" },
  },
];

import type { Product } from "./types";

/**
 * People Suq cause-driven merch.
 *
 * REAL People Suq-branded products migrated from the SUQ MEDIA merch section
 * (names + imagery are genuine). SUQ MEDIA-branded items (hoodie, cap) and the
 * custom-apparel service stay with SUQ MEDIA. No prices or store links exist
 * yet, so products show a "Coming soon" state — set `price` and `shopUrl`
 * (e.g. Shopify) once the store is live. No products are invented.
 */
export const products: Product[] = [
  {
    slug: "people-suq-tee",
    name: "People Suq Tee",
    cause:
      "A classic black tee with a bold People Suq slogan. Wear the message and start the conversation.",
    image: {
      src: "/images/merch-people-suq-tee.jpg",
      alt: "People Suq Tee — black t-shirt with bold People Suq slogan",
    },
  },
  {
    slug: "people-suq-crewneck",
    name: "People Suq Crewneck",
    cause:
      "A premium crewneck sweatshirt with a People Suq graphic. Comfortable, understated, and made to be seen.",
    image: {
      src: "/images/merch-people-suq-crewneck.jpg",
      alt: "People Suq Crewneck — crewneck sweatshirt with People Suq graphic",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

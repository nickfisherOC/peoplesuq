/**
 * Content model types.
 *
 * These describe the shape of every content collection (issues, episodes,
 * stories, products). Today the data is authored as typed modules in
 * /src/content. The same shapes can be produced by a headless CMS
 * (Sanity, Contentful, etc.) or Shopify later with no page changes.
 */

/** An image reference. `src` may be a local /public path or a remote URL. */
export interface ImageRef {
  src: string;
  alt: string;
  /** Optional credit line for documentary photography. */
  credit?: string;
}

/** One of the community issues People Suq covers. */
export interface Issue {
  slug: string;
  title: string;
  /** Short label used on compact cards / chips. */
  shortTitle: string;
  /** One-line summary for cards. */
  summary: string;
  /** Longer editorial intro for the issue's own page. */
  intro: string;
  image: ImageRef;
}

export interface Guest {
  name: string;
  role?: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
  /** Short category label from the show (e.g. "Recovery & Resilience"). */
  category?: string;
  /** ISO date string. Omit for unreleased episodes. */
  date?: string;
  summary: string;
  /** Longer description for the episode page. */
  description?: string;
  /** The show's hosts on this episode (People Suq is host-led). */
  hosts?: Guest[];
  /** A featured guest, once guests are booked. */
  guest?: Guest;
  /** Issue slugs this episode relates to. */
  issues: string[];
  /** Free-form topic tags. */
  topics: string[];
  image: ImageRef;
  /** YouTube video id, if a video embed is available. */
  youtubeId?: string;
  links: {
    youtube?: string;
    spotify?: string;
    apple?: string;
  };
  durationMinutes?: number;
  /** Real, planned episode that hasn't been released yet. */
  comingSoon?: boolean;
  /** True while this is scaffolding rather than a real episode. */
  isPlaceholder?: boolean;
}

export interface Story {
  slug: string;
  title: string;
  /** e.g. "Recovery", "Community", "Second Chances". */
  kind: string;
  /** ISO date string. */
  date: string;
  teaser: string;
  /** Full body as an array of paragraphs (keeps authoring simple pre-CMS). */
  body?: string[];
  image: ImageRef;
  /** Issue slugs this story relates to. */
  issues: string[];
  /** "read" for articles, "watch" for video-led stories (the default here). */
  format: "read" | "watch";
  /** YouTube video id for video stories. Empty until the video is published. */
  youtubeId?: string;
  isPlaceholder?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  /** Price string (e.g. "$34"). Omit until a store/price is set. */
  price?: string;
  /** The message or cause behind the piece. */
  cause: string;
  image: ImageRef;
  /** Link to the product's own page (e.g. Shopify online store URL). */
  shopUrl?: string;
  /** Shopify variant id (GID) used to add the item to the cart. */
  variantId?: string;
  /** Whether the item can currently be purchased. */
  available?: boolean;
  soldOut?: boolean;
  /** Shopify product type (e.g. "Hoodie", "T-Shirt", "Hat"). */
  productType?: string;
  /** Shopify tags — an alternative way to categorise for filtering. */
  tags?: string[];
  /** Collections this product belongs to (People Suq ones, for filtering). */
  collections?: { handle: string; title: string }[];
  isPlaceholder?: boolean;
}

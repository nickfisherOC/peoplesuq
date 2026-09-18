/**
 * Central site configuration.
 *
 * Everything that is likely to change as the brand grows — navigation,
 * external partner links, social handles, contact details — lives here so
 * pages and components stay declarative and a future CMS can populate it.
 */

export const site = {
  name: "People Suq",
  shortName: "People Suq",
  domain: "peoplesuq.com",
  url: "https://peoplesuq.com",
  tagline: "Real People. Real Conversations.",
  description:
    "People Suq is a media and community platform bringing attention to the issues affecting our communities — through stories, conversations, media, and action.",
  // One-line positioning used in the footer and about page.
  mission:
    "We use media and storytelling to talk openly about hard issues, amplify real stories, reduce stigma, and highlight the people and organizations doing meaningful work.",
} as const;

/** Primary navigation shown in the header. */
export const mainNav: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Podcast", href: "/podcast" },
  { label: "Issues", href: "/issues" },
  { label: "Stories", href: "/stories" },
  { label: "Merch", href: "/merch" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
];

/**
 * Connected brands. Present but intentionally not dominating the main nav.
 * Update the hrefs when the real destinations are live.
 */
export const connectedBrands = {
  suqMedia: {
    name: "SUQ MEDIA",
    role: "The business",
    href: "https://suqmedia.com/",
    logo: "/images/suqmedia-logo.png",
    blurb:
      "The commercial arm — custom apparel, music and video production, studio rental and media services.",
    // Deep links for when a commercial service is mentioned on People Suq.
    services: {
      customApparel: "https://suqmedia.com/custom-apparel.html",
      music: "https://suqmedia.com/music.html",
      studioRental: "https://suqmedia.com/studio-rental.html",
    },
  },
  foundation: {
    name: "Markin K Kossowski Foundation for Hope",
    shortName: "MKK Foundation",
    role: "Community impact",
    href: "https://markinkkossowskifoundation.org/",
    logo: "/images/foundation-emblem.svg",
    tagline: "Restoring Hope. Rebuilding Lives.",
    blurb:
      "A privately funded NGO devoted to people the world too often overlooks — those carrying the weight of mental illness, addiction, poverty, trauma and homelessness — bringing hope, healing and dignity, and reminding everyone that second chances are real.",
  },
} as const;

/**
 * Social + listening links. Replace the "#" placeholders with real profiles.
 * These drive the footer, the podcast page, and share actions.
 */
export const social = {
  instagram: "#",
  youtube: "#",
  tiktok: "#",
  x: "#",
  facebook: "#",
} as const;

export const listenLinks = {
  youtube: "#",
  spotify: "#",
  apple: "#",
} as const;

// Verified working address migrated from SUQ MEDIA. Swap for a dedicated
// People Suq inbox (e.g. hello@peoplesuq.com) when one is set up.
export const contact = {
  email: "info@suqmedia.com",
  storyEmail: "info@suqmedia.com",
} as const;

/**
 * Physical location (single source of truth for Contact, Footer, and the
 * Organization structured data). Edit here and it updates everywhere.
 */
export const location = {
  street: "5534 1A Street SW",
  city: "Calgary",
  region: "AB",
  postalCode: "T2H 0E7",
  country: "Canada",
} as const;

/** "5534 1A Street SW, Calgary, AB T2H 0E7" */
export const locationString = `${location.street}, ${location.city}, ${location.region} ${location.postalCode}`;

/** Google Maps embed (no API key) + a "get directions" link. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  locationString,
)}&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationString,
)}`;

/**
 * "Tell Us Your Story" pop-up form.
 *
 * The site-wide modal is already built and wired to every "share your story"
 * CTA. Right now it shows our own branded fields. To connect Growtheon, set
 * ONE of these (whichever Growtheon gives you):
 *   - embedUrl:  a Growtheon hosted-form URL → the modal shows it in an iframe
 *                (its own fields/validation/delivery). Simplest.
 *   - endpoint:  a Growtheon form/submit URL → our branded fields POST to it.
 * If both are empty, the modal still works and falls back to the contact email
 * so a visitor is never at a dead end.
 */
export const storyForm = {
  /** Growtheon / LeadRescue Pro hosted-form URL (shown in an iframe). */
  embedUrl: "https://app.leadrescue.pro/embed/form/4de19bee-58cc-4eff-b662-02797dab5b82",
  /** Iframe height in px — tune to fit the real form. */
  embedHeight: 680,
  /** Alternative: a submit endpoint for our own fields (unused when embedUrl set). */
  endpoint: "",
} as const;

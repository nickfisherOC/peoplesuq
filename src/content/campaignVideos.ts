import type { ImageRef } from "./types";

/**
 * Society Under Question campaign videos.
 *
 * This is the single source of truth for the short-form campaign films that
 * sit on the home page and the /society-under-question page. It follows the
 * same typed-module pattern as the other content collections, so a headless
 * CMS can populate the same shape later with no page changes.
 *
 * There are no published campaign videos yet. The array stays empty on purpose
 * until real films exist, and the UI shows an honest editorial state rather
 * than placeholder cards. Add a real entry below and it appears automatically,
 * newest first.
 */

/**
 * How a video should be rendered:
 *  - "youtube"   : a standard 16:9 YouTube embed (videoUrl is the YouTube id).
 *  - "vertical"  : a 9:16 social clip (videoUrl is a direct file URL, e.g. mp4).
 *  - "landscape" : a 16:9 hosted file (videoUrl is a direct file URL).
 */
export type CampaignVideoType = "youtube" | "vertical" | "landscape";

/** Only "published" videos are ever shown to visitors. */
export type CampaignVideoStatus = "draft" | "published";

/** One Society Under Question campaign film. */
export interface CampaignVideo {
  /** Stable internal id. */
  id: string;
  /** URL-safe slug (reserved for a future per-video page). */
  slug: string;
  title: string;
  /** Short supporting description shown under the title. */
  description: string;
  /** The question the piece puts to its audience. */
  question: string;
  /** Pillar or theme, e.g. "Question the Stigma". */
  category: string;
  /** Poster image used before the video plays. */
  thumbnail: ImageRef;
  /** YouTube id for "youtube", or a direct file URL for "vertical"/"landscape". */
  videoUrl: string;
  videoType: CampaignVideoType;
  /** ISO date string used for ordering (newest first). */
  publishedAt: string;
  status: CampaignVideoStatus;
  /** Surfaced on the home page when true. */
  featured?: boolean;
  /** Optional WebVTT captions track for hosted-file videos. */
  captionsUrl?: string;
  /** Accessible description of the video for screen readers. */
  altText?: string;
}

/**
 * All campaign videos, in authoring order. Empty until real films are ready.
 */
export const campaignVideos: CampaignVideo[] = [];

/** Published videos only, newest first. */
export const publishedCampaignVideos: CampaignVideo[] = campaignVideos
  .filter((v) => v.status === "published")
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

/** Featured published videos (for the home page), newest first. */
export const featuredCampaignVideos: CampaignVideo[] =
  publishedCampaignVideos.filter((v) => v.featured);

/** True when there is at least one published video to show. */
export const hasCampaignVideos = publishedCampaignVideos.length > 0;

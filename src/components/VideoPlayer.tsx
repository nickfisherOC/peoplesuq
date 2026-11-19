"use client";

import { useState } from "react";
import MediaFrame from "./MediaFrame";

/**
 * Story video player.
 *
 * With a `youtubeId` it shows a custom cover image (click-to-play facade): the
 * branded poster loads first and the YouTube embed only mounts on click, so the
 * custom cover is actually used (a bare YouTube embed would show its own
 * thumbnail) and nothing third-party loads until the viewer asks for it. Without
 * a `youtubeId` it shows the poster with a "video coming soon" state.
 *
 * `vertical` renders a 9:16 (Shorts) frame in a centered, phone-width column;
 * the default is a 16:9 frame.
 */
export default function VideoPlayer({
  youtubeId,
  posterSrc,
  posterAlt,
  seed,
  title,
  priority = false,
  vertical = false,
}: {
  youtubeId?: string;
  posterSrc?: string;
  posterAlt?: string;
  seed: string;
  title: string;
  priority?: boolean;
  vertical?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  const wrap = vertical ? "mx-auto w-full max-w-sm" : "";
  const posterAspect = vertical ? "tall" : "video";
  const sizes = vertical
    ? "(max-width: 640px) 100vw, 384px"
    : "(max-width: 1024px) 100vw, 66vw";
  const alt = posterAlt ?? title;

  const poster = (
    <MediaFrame
      seed={seed}
      src={posterSrc}
      alt={alt}
      label="Story"
      aspect={posterAspect}
      focus="top"
      rounded={false}
      priority={priority}
      sizes={sizes}
    />
  );

  // Real video: click-to-play facade.
  if (youtubeId) {
    if (playing) {
      return (
        <div className={wrap}>
          <div
            className={`relative ${vertical ? "aspect-[9/16]" : "aspect-video"} overflow-hidden rounded-2xl border border-white/10 bg-black`}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    return (
      <div className={wrap}>
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
        >
          {poster}
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/5">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-200 group-hover:scale-110">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" aria-hidden>
                <path d="M0 1.5L22 12L0 22.5V1.5Z" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    );
  }

  // No video yet: poster + "coming soon".
  return (
    <div className={wrap}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        {poster}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink">
            <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" aria-hidden>
              <path d="M0 1.5L22 12L0 22.5V1.5Z" />
            </svg>
          </span>
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
            Video coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

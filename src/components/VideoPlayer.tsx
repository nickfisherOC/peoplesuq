import MediaFrame from "./MediaFrame";

/**
 * 16:9 video player. Embeds YouTube when `youtubeId` is set; otherwise shows
 * the poster image with a play button and a "video coming soon" note.
 */
export default function VideoPlayer({
  youtubeId,
  posterSrc,
  seed,
  title,
  priority = false,
}: {
  youtubeId?: string;
  posterSrc?: string;
  seed: string;
  title: string;
  priority?: boolean;
}) {
  if (youtubeId) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <MediaFrame
        seed={seed}
        src={posterSrc}
        alt={title}
        label="Story"
        aspect="video"
        focus="top"
        rounded={false}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 66vw"
      />
      {/* Play + coming-soon overlay */}
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
  );
}

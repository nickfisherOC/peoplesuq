import { Badge } from "../ui";
import type { CampaignVideo } from "@/content/campaignVideos";

/**
 * A single Society Under Question campaign video.
 *
 * Playback rules (shared across every video type):
 *  - Nothing autoplays with sound. YouTube embeds load lazily and only start on
 *    a viewer action; hosted files use native controls with preload="none".
 *  - Vertical (9:16) clips render in a portrait frame; landscape/YouTube use 16:9.
 *  - Captions are attached when a WebVTT track is provided.
 */
export default function CampaignVideoCard({ video }: { video: CampaignVideo }) {
  const isVertical = video.videoType === "vertical";
  const frame = isVertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink/40">
      <div className={`relative w-full ${frame} bg-black`}>
        {video.videoType === "youtube" ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.videoUrl}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            preload="none"
            playsInline
            poster={video.thumbnail.src}
            aria-label={video.altText ?? video.title}
          >
            <source src={video.videoUrl} />
            {video.captionsUrl && (
              <track
                kind="captions"
                src={video.captionsUrl}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {video.category && (
          <Badge tone="orange" className="self-start">
            {video.category}
          </Badge>
        )}
        <h3 className="mt-3 text-lg font-bold leading-snug text-white">
          {video.title}
        </h3>
        {video.question && (
          <p className="mt-2 text-sm font-medium italic leading-relaxed text-white/75">
            &ldquo;{video.question}&rdquo;
          </p>
        )}
        {video.description && (
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
}

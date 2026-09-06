import Button from "./Button";
import MediaFrame from "./MediaFrame";
import { Badge, Eyebrow, PlaceholderTag, SoonTag } from "./ui";
import { creditLine } from "./cards/EpisodeCard";
import type { Episode } from "@/content/types";

/**
 * Large feature treatment for the latest / highlighted episode.
 * Shows a YouTube embed when `youtubeId` is set, otherwise a media frame.
 * Adapts CTAs for unreleased ("coming soon") episodes.
 */
export default function FeaturedEpisode({
  episode,
  eyebrow,
}: {
  episode: Episode;
  eyebrow?: string;
}) {
  const credit = creditLine(episode);
  const creditLabel = episode.hosts?.length ? "Hosted by" : "With";
  const topEyebrow =
    eyebrow ?? (episode.comingSoon ? "Season One · Coming soon" : "Latest Episode");

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative">
        {episode.youtubeId ? (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}`}
              title={`Watch: ${episode.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative">
            <MediaFrame
              seed={episode.slug}
              src={episode.image.src}
              alt={episode.image.alt}
              label={`Ep ${episode.number}`}
              aspect="video"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {episode.isPlaceholder ? (
              <PlaceholderTag className="absolute left-4 top-4" />
            ) : episode.comingSoon ? (
              <SoonTag className="absolute left-4 top-4" />
            ) : null}
          </div>
        )}
      </div>

      <div>
        <Eyebrow>{topEyebrow}</Eyebrow>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/50">
          <span>Episode {episode.number}</span>
          {episode.category && (
            <>
              <span aria-hidden>·</span>
              <span>{episode.category}</span>
            </>
          )}
          {episode.durationMinutes && (
            <>
              <span aria-hidden>·</span>
              <span>{episode.durationMinutes} min</span>
            </>
          )}
        </div>
        <h2 className="headline mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
          {episode.title}
        </h2>
        {credit && (
          <p className="mt-3 text-base text-orange-400">
            {creditLabel} {credit}
          </p>
        )}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
          {episode.summary}
        </p>

        {episode.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {episode.topics.map((t) => (
              <Badge key={t} tone="purple">
                {t}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          {episode.comingSoon ? (
            <>
              <Button href={`/podcast/${episode.slug}`} size="lg">
                Episode details
              </Button>
              <Button href="/get-involved" variant="secondary" size="lg">
                Get notified
              </Button>
            </>
          ) : (
            <>
              <Button href={`/podcast/${episode.slug}`} size="lg">
                Watch
              </Button>
              <Button
                href={`/podcast/${episode.slug}#listen`}
                variant="secondary"
                size="lg"
              >
                Listen
              </Button>
            </>
          )}
          <Button href="/podcast" variant="ghost" size="lg">
            All episodes →
          </Button>
        </div>
      </div>
    </div>
  );
}

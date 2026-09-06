import Link from "next/link";
import MediaFrame from "../MediaFrame";
import { Badge, PlaceholderTag, SoonTag } from "../ui";
import type { Episode } from "@/content/types";

/** "Kerry & Krzysztof" from a hosts/guest list. */
export function creditLine(episode: Episode): string | null {
  if (episode.hosts && episode.hosts.length > 0) {
    return episode.hosts.map((h) => h.name).join(" & ");
  }
  if (episode.guest?.name) return episode.guest.name;
  return null;
}

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const credit = creditLine(episode);
  const label = episode.hosts?.length ? "Hosted by" : "With";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-white/25">
      <Link
        href={`/podcast/${episode.slug}`}
        className="relative block"
        aria-label={`Episode ${episode.number}: ${episode.title}`}
      >
        <MediaFrame
          seed={episode.slug}
          src={episode.image.src}
          alt={episode.image.alt}
          label={`Ep ${episode.number}`}
          aspect="video"
          rounded={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {episode.isPlaceholder ? (
          <PlaceholderTag className="absolute left-3 top-3" />
        ) : episode.comingSoon ? (
          <SoonTag className="absolute left-3 top-3" />
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur">
          Ep {episode.number}
          {episode.durationMinutes ? ` · ${episode.durationMinutes} min` : ""}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {episode.category && (
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-orange-400">
            {episode.category}
          </p>
        )}
        <h3 className="text-lg font-bold leading-snug text-white">
          <Link
            href={`/podcast/${episode.slug}`}
            className="after:absolute after:inset-0"
          >
            {episode.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
          {episode.summary}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {credit && (
            <span className="text-xs text-white/45">
              {label} {credit}
            </span>
          )}
          {episode.topics.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1.5">
              {episode.topics.slice(0, 2).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import MediaFrame from "../MediaFrame";
import { Badge, VideoTag } from "../ui";
import type { Story } from "@/content/types";

export default function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-white/25 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <Link
        href={`/stories/${story.slug}`}
        className={`relative block ${featured ? "md:w-1/2" : ""}`}
        aria-label={story.title}
      >
        <MediaFrame
          seed={story.slug}
          src={story.image.src}
          alt={story.image.alt}
          label={story.kind}
          aspect={featured ? "wide" : "portrait"}
          rounded={false}
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        {story.format === "watch" && (
          <VideoTag className="absolute left-3 top-3" />
        )}
      </Link>

      <div
        className={`flex flex-1 flex-col p-5 ${featured ? "md:justify-center md:p-8" : ""}`}
      >
        <div className="mb-3 flex items-center gap-2">
          <Badge tone="orange">{story.kind}</Badge>
          <span className="text-xs uppercase tracking-wider text-white/40">
            {story.format === "watch" ? "Watch" : "Read"}
          </span>
        </div>
        <h3
          className={`font-bold leading-snug text-white ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}
        >
          <Link
            href={`/stories/${story.slug}`}
            className="after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-white/55 ${featured ? "" : "line-clamp-3"}`}
        >
          {story.teaser}
        </p>
        <span className="mt-4 text-sm font-semibold text-orange-400">
          {story.format === "watch" ? "Watch the story" : "Read the story"} →
        </span>
      </div>
    </article>
  );
}

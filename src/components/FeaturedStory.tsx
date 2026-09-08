import Link from "next/link";
import MediaFrame from "./MediaFrame";
import Button from "./Button";
import { Badge, Eyebrow, VideoTag } from "./ui";
import type { Story } from "@/content/types";

/**
 * Large "Featured Story" spotlight for the top of the Stories page — a big
 * 16:9 video thumbnail (play button + VIDEO) beside the title and summary.
 * Faces are kept via focus="top" so portraits aren't cropped at the head.
 */
export default function FeaturedStory({ story }: { story: Story }) {
  return (
    <div>
      <Eyebrow className="mb-5">Featured Story</Eyebrow>
      <article className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Video thumbnail */}
        <Link
          href={`/stories/${story.slug}`}
          aria-label={`Watch: ${story.title}`}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 lg:col-span-7"
        >
          <MediaFrame
            seed={story.slug}
            src={story.image.src}
            alt={story.image.alt}
            label={story.kind}
            aspect="video"
            focus="top"
            rounded={false}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <VideoTag className="absolute left-4 top-4" />
          {/* Play button */}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-200 group-hover:scale-110">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" aria-hidden>
                <path d="M0 1.5L22 12L0 22.5V1.5Z" />
              </svg>
            </span>
          </span>
        </Link>

        {/* Text */}
        <div className="lg:col-span-5">
          <Badge tone="orange">{story.kind}</Badge>
          <h2 className="headline mt-4 text-3xl text-white sm:text-4xl md:text-5xl">
            <Link href={`/stories/${story.slug}`} className="hover:opacity-90">
              {story.title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
            {story.teaser}
          </p>
          <Button href={`/stories/${story.slug}`} size="lg" className="mt-7">
            Watch the story
          </Button>
        </div>
      </article>
    </div>
  );
}

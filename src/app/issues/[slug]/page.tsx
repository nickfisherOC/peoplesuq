import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import EpisodeCard from "@/components/cards/EpisodeCard";
import StoryCard from "@/components/cards/StoryCard";
import { issues, getIssue } from "@/content/issues";
import { episodesByNewest } from "@/content/episodes";
import { storiesByNewest } from "@/content/stories";

export function generateStaticParams() {
  return issues.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return { title: "Issue not found" };
  return { title: issue.title, description: issue.summary };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  const relatedEpisodes = episodesByNewest
    .filter((e) => e.issues.includes(slug))
    .slice(0, 3);
  const relatedStories = storiesByNewest
    .filter((s) => s.issues.includes(slug))
    .slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Issue" title={issue.title} intro={issue.intro}>
        <div className="flex flex-wrap gap-3">
          <Button href="/podcast">Related episodes</Button>
          <Button href="/stories" variant="secondary">
            Related stories
          </Button>
        </div>
      </PageHeader>

      {/* Episodes */}
      <Section tone="charcoal">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="headline text-2xl text-white md:text-3xl">
            Episodes
          </h2>
          <Link
            href="/podcast"
            className="text-sm text-white/60 hover:text-white"
          >
            All episodes →
          </Link>
        </div>
        {relatedEpisodes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEpisodes.map((e) => (
              <EpisodeCard key={e.slug} episode={e} />
            ))}
          </div>
        ) : (
          <p className="text-white/50">
            Episodes on this issue will appear here as they publish.
          </p>
        )}
      </Section>

      {/* Stories */}
      <Section tone="ink">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="headline text-2xl text-white md:text-3xl">Stories</h2>
          <Link
            href="/stories"
            className="text-sm text-white/60 hover:text-white"
          >
            All stories →
          </Link>
        </div>
        {relatedStories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {relatedStories.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        ) : (
          <p className="text-white/50">
            Stories on this issue will appear here as they&apos;re published.
          </p>
        )}
      </Section>

      {/* Resources & organizations — scalable placeholder */}
      <Section tone="charcoal">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="headline text-2xl text-white md:text-3xl">
              Resources
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              Vetted support lines, articles, and tools for this issue will live
              here. This section is built to grow — add real resources as
              they&apos;re confirmed.
            </p>
          </div>
          <div>
            <h2 className="headline text-2xl text-white md:text-3xl">
              Organizations making a difference
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              Local and national organizations doing meaningful work on this
              issue will be highlighted here. (Placeholder — add real
              organizations with their consent.)
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

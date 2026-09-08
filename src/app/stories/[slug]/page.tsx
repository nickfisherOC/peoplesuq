import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import VideoPlayer from "@/components/VideoPlayer";
import Button from "@/components/Button";
import StoryCard from "@/components/cards/StoryCard";
import { Badge, Eyebrow } from "@/components/ui";
import { stories, getStory } from "@/content/stories";
import { getIssue } from "@/content/issues";
import { contact } from "@/lib/site";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story not found" };
  return { title: story.title, description: story.teaser };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const relatedIssues = story.issues
    .map((s) => getIssue(s))
    .filter((i) => i !== undefined);

  const moreStories = stories
    .filter((s) => s.slug !== story.slug)
    .filter((s) => s.issues.some((i) => story.issues.includes(i)))
    .slice(0, 3);

  return (
    <>
      <Section tone="charcoal" className="!pb-8">
        <Link href="/stories" className="text-sm text-white/50 hover:text-white">
          ← All stories
        </Link>
        <div className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="orange">{story.kind}</Badge>
            {relatedIssues.map((i) => (
              <Link key={i.slug} href={`/issues/${i.slug}`}>
                <Badge tone="purple">{i.shortTitle}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            {story.title}
          </h1>
        </div>
      </Section>

      {/* Video-first: player leads, short summary beneath */}
      <Section tone="ink" className="!pt-0">
        <div className="mx-auto max-w-4xl">
          <VideoPlayer
            youtubeId={story.youtubeId}
            posterSrc={story.image.src}
            seed={story.slug}
            title={story.title}
            priority
          />

          <div className="mx-auto mt-8 max-w-2xl">
            <p className="text-xl leading-relaxed text-white/85">
              {story.teaser}
            </p>
            {story.body?.map((p, i) => (
              <p key={i} className="mt-5 text-lg leading-relaxed text-white/70">
                {p}
              </p>
            ))}

            <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal p-6">
              <Eyebrow>Have a story like this?</Eyebrow>
              <p className="mt-2 text-white/70">
                People Suq is built on real voices. Most of our stories are told
                on camera — if you&apos;d be open to sharing yours, we&apos;d
                love to hear from you.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/stories/share">Share your story</Button>
                <Button href={`mailto:${contact.storyEmail}`} variant="secondary">
                  Email us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {moreStories.length > 0 && (
        <Section tone="charcoal">
          <h2 className="headline mb-8 text-2xl text-white md:text-3xl">
            More stories
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {moreStories.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

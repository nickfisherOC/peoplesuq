import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import MediaFrame from "@/components/MediaFrame";
import Button from "@/components/Button";
import StoryCard from "@/components/cards/StoryCard";
import { creditLine } from "@/components/cards/EpisodeCard";
import { Badge, Eyebrow, PlaceholderTag, SoonTag } from "@/components/ui";
import { episodes, getEpisode } from "@/content/episodes";
import { stories } from "@/content/stories";
import { getIssue } from "@/content/issues";
import { listenLinks } from "@/lib/site";

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return { title: "Episode not found" };
  return {
    title: `${episode.title} — Episode ${episode.number}`,
    description: episode.summary,
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const credit = creditLine(episode);
  const creditLabel = episode.hosts?.length ? "Hosted by" : "With";

  const relatedIssues = episode.issues
    .map((s) => getIssue(s))
    .filter((i) => i !== undefined);

  const relatedStories = stories
    .filter((s) => s.issues.some((i) => episode.issues.includes(i)))
    .slice(0, 3);

  const listen = [
    { label: "YouTube", href: episode.links.youtube ?? listenLinks.youtube },
    { label: "Spotify", href: episode.links.spotify ?? listenLinks.spotify },
    {
      label: "Apple Podcasts",
      href: episode.links.apple ?? listenLinks.apple,
    },
  ];

  return (
    <>
      <Section tone="charcoal" className="!pb-0">
        <Link
          href="/podcast"
          className="text-sm text-white/50 hover:text-white"
        >
          ← All episodes
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
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
                  priority
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
            <Eyebrow>
              Episode {episode.number}
              {episode.category ? ` · ${episode.category}` : ""}
            </Eyebrow>
            <h1 className="headline mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
              {episode.title}
            </h1>
            {credit && (
              <p className="mt-3 text-base text-orange-400">
                {creditLabel} {credit}
              </p>
            )}
            <p className="mt-4 text-base leading-relaxed text-white/70">
              {episode.description ?? episode.summary}
            </p>

            <div id="listen" className="mt-7 scroll-mt-24">
              {episode.comingSoon ? (
                <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
                  <p className="font-semibold text-white">
                    This episode is coming soon.
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Season One is on its way. Get notified the moment it drops.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button href="/get-involved">Get notified</Button>
                    <Button href="/podcast" variant="secondary">
                      All episodes
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="eyebrow mb-3 text-white/40">Watch &amp; listen</p>
                  <div className="flex flex-wrap gap-3">
                    {listen.map((l, i) => (
                      <Button
                        key={l.label}
                        href={l.href}
                        variant={i === 0 ? "primary" : "secondary"}
                      >
                        {l.label}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" className="!pt-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Topics + issues */}
          <aside className="space-y-8 lg:col-span-1">
            {episode.topics.length > 0 && (
              <div>
                <h2 className="eyebrow mb-3 text-white/40">Topics discussed</h2>
                <div className="flex flex-wrap gap-2">
                  {episode.topics.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            )}

            {relatedIssues.length > 0 && (
              <div>
                <h2 className="eyebrow mb-3 text-white/40">Related issues</h2>
                <ul className="space-y-2">
                  {relatedIssues.map((issue) => (
                    <li key={issue.slug}>
                      <Link
                        href={`/issues/${issue.slug}`}
                        className="text-white/75 hover:text-orange-400"
                      >
                        {issue.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="eyebrow mb-3 text-white/40">Resources</h2>
              <p className="text-sm leading-relaxed text-white/50">
                Support lines and organizations relevant to this episode will
                be listed here. (Placeholder — add real resources per episode.)
              </p>
            </div>
          </aside>

          {/* Related stories */}
          <div className="lg:col-span-2">
            <h2 className="headline mb-6 text-2xl text-white md:text-3xl">
              Related stories
            </h2>
            {relatedStories.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedStories.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            ) : (
              <p className="text-white/50">
                Related stories will appear here as they&apos;re published.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

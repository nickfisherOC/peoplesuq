import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import FeaturedEpisode from "@/components/FeaturedEpisode";
import PodcastBrowser from "@/components/PodcastBrowser";
import HostCard from "@/components/HostCard";
import Button from "@/components/Button";
import ShareStoryButton from "@/components/story-form/ShareStoryButton";
import { Eyebrow } from "@/components/ui";
import { episodesByNewest, latestEpisode } from "@/content/episodes";
import { issues } from "@/content/issues";
import { hosts } from "@/content/people";
import { listenLinks, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "The People Suq podcast — real conversations about recovery, mental health, healing, and the human experience. Season One coming soon. Watch or listen.",
};

const guestCriteria = [
  "You have lived experience in recovery, mental health, or personal transformation",
  "You're an expert, practitioner, or thought leader in a relevant field",
  "You have a unique perspective on human potential, relationships, or community",
  "You're comfortable being honest, vulnerable, and real on camera",
  "You align with our values of healing, hope and purpose",
];

export default function PodcastPage() {
  const rest = episodesByNewest.filter((e) => e.slug !== latestEpisode.slug);

  return (
    <>
      <PageHeader
        eyebrow="The Podcast"
        title="Conversations that matter"
        intro="Real conversations. Real stories. Real ideas shaping recovery, mental health, personal growth and the human experience. Season One is on its way."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={listenLinks.youtube}>Watch on YouTube</Button>
          <Button href={listenLinks.spotify} variant="secondary">
            Spotify
          </Button>
          <Button href={listenLinks.apple} variant="secondary">
            Apple Podcasts
          </Button>
        </div>
      </PageHeader>

      <Section tone="ink">
        <FeaturedEpisode episode={latestEpisode} eyebrow="Featured · Season One" />
      </Section>

      <Section tone="charcoal">
        <Eyebrow>Season One</Eyebrow>
        <h2 className="headline mt-3 mb-8 text-3xl text-white md:text-4xl">
          The episodes
        </h2>
        <PodcastBrowser episodes={rest} issues={issues} />
      </Section>

      {/* Meet the hosts */}
      <Section tone="ink">
        <Eyebrow>The voices behind the mic</Eyebrow>
        <h2 className="headline mt-3 mb-8 text-3xl text-white md:text-4xl">
          Meet the hosts
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {hosts.map((host) => (
            <HostCard key={host.slug} host={host} />
          ))}
        </div>
      </Section>

      {/* Become a guest */}
      <Section tone="charcoal">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Become a guest</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
              Have a story worth sharing?
            </h2>
            <p className="mt-5 leading-relaxed text-white/65">
              We&apos;re looking for guests with real stories, lived experience,
              and genuine insight. If you&apos;ve been through something, learned
              something, or built something worth talking about — we want to hear
              from you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ShareStoryButton topic="Podcast guest">
                Apply to be a guest
              </ShareStoryButton>
              <Button href={`mailto:${contact.email}`} variant="secondary">
                Email us
              </Button>
            </div>
          </div>
          <ul className="space-y-3 rounded-2xl border border-white/10 bg-ink/40 p-6">
            {guestCriteria.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-white/70">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

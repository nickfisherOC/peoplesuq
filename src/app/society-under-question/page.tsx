import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ShareStoryButton from "@/components/story-form/ShareStoryButton";
import { SectionHeading, Eyebrow } from "@/components/ui";
import CampaignVideoSection from "@/components/campaign/CampaignVideoSection";
import { publishedCampaignVideos } from "@/content/campaignVideos";
import { hosts } from "@/content/people";

export const metadata: Metadata = {
  // Absolute title so the layout's "· People Suq" template is not appended.
  title: {
    absolute: "Society Under Question | What SUQ Means | PeopleSuq",
  },
  ...pageSeo("/society-under-question"),
  description:
    "SUQ means Society Under Question. It is the idea behind People Suq: question the stigma, challenge the narrative, and change the conversation.",
};

const pillars = [
  {
    name: "Question the Stigma",
    body: "Addiction, mental illness, homelessness and trauma get talked about in whispers, if at all. We say the quiet parts out loud and ask why the shame was ever put on the people carrying them.",
  },
  {
    name: "Challenge the Narrative",
    body: "The easy story is rarely the true one. We push back on the headlines and assumptions people repeat without thinking, and we let real experience complicate the picture.",
  },
  {
    name: "Change the Conversation",
    body: "Awareness is not the finish line. Better questions lead to better conversations, and better conversations lead to people being treated with dignity and getting real help.",
  },
];

export default function SocietyUnderQuestionPage() {
  return (
    <>
      <PageHeader
        eyebrow="SUQ = Society Under Question"
        title="Society Under Question"
        intro="SUQ stands for Society Under Question. It is the belief underneath everything People Suq makes: that the hard issues in our communities deserve honest questions, not comfortable silence."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/get-involved">Join the Conversation</Button>
          <Button href="/podcast" variant="secondary">
            Watch the Podcast
          </Button>
        </div>
      </PageHeader>

      {/* Philosophy */}
      <Section tone="charcoal">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>The idea</Eyebrow>
            <p className="headline mt-5 text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
              A society that is willing to question itself is a society that can
              change.
            </p>
          </div>
          <div className="lg:col-span-6 lg:pt-2">
            <p className="text-base leading-relaxed text-white/65 md:text-lg">
              Most of us learn to talk around addiction, recovery, mental health
              and homelessness. We lower our voices, we look away, and the people
              living through those things carry the stigma alone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Society Under Question is our answer to that. It is a standing
              invitation to ask harder questions, to listen to people who have
              lived it, and to let honest conversation do the work that silence
              never could.
            </p>
          </div>
        </div>
      </Section>

      {/* Three pillars */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="What it stands for"
          title="Three things we do with every question"
          intro="Society Under Question is not a slogan. It is how we approach every story, episode and conversation."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-charcoal p-6"
            >
              <span className="text-sm font-bold text-orange-400">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-xl font-bold text-white">
                {pillar.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Campaign video library */}
      <Section tone="charcoal">
        <CampaignVideoSection
          eyebrow="The campaign"
          title="Society Under Question films"
          intro="Short films that put the questions on the record. This library grows as the podcast and the campaign roll out."
          videos={publishedCampaignVideos}
          emptyTitle="The first films are on the way"
          emptyBody="Society Under Question is being filmed alongside the podcast. When the first pieces are ready they will live here, in full. Until then, the best way in is the podcast and your own story."
        />
      </Section>

      {/* People behind the questions */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="The people behind the questions"
          title="Real people asking them"
          intro="Society Under Question is led by two co-founders who have lived the issues People Suq talks about. Their experience is why the questions are honest."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {hosts.map((host) => (
            <div
              key={host.slug}
              className="flex items-center gap-5 rounded-2xl border border-white/10 bg-charcoal p-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={host.image.src}
                  alt={host.image.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{host.name}</h3>
                <p className="text-sm text-orange-400">{host.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {host.bio[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/about" variant="secondary">
            Meet the people behind People Suq
          </Button>
        </div>
      </Section>

      {/* Join the conversation */}
      <Section tone="purple">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900 via-purple-950 to-ink px-6 py-14 text-center md:px-16 md:py-20">
          <Eyebrow className="justify-center">Join the conversation</Eyebrow>
          <h2 className="headline mx-auto mt-4 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
            Ask the question with us
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">
            Watch and share the podcast, tell your own story, or follow along as
            the campaign grows. Society Under Question only works when more
            people are willing to ask.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/get-involved" size="lg">
              Join the Conversation
            </Button>
            <ShareStoryButton variant="secondary" size="lg">
              Tell Us Your Story
            </ShareStoryButton>
          </div>
          <p className="mt-6 text-sm text-white/40">
            Prefer to just listen?{" "}
            <Link
              href="/podcast"
              className="text-white/70 underline underline-offset-4 hover:text-white"
            >
              Start with the podcast
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}

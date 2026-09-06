import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import MediaFrame from "@/components/MediaFrame";
import HostCard from "@/components/HostCard";
import { Eyebrow } from "@/components/ui";
import { hosts } from "@/content/people";
import { connectedBrands } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why People Suq exists, what it stands for, and how it connects to SUQ MEDIA and the Markin K Kossowski Foundation.",
};

const values = [
  {
    title: "Honest over polished",
    body: "We'd rather have a real conversation than a perfect one. The truth is more useful than a highlight reel.",
  },
  {
    title: "People first",
    body: "Every issue we cover is really about people. We lead with their voices and never reduce anyone to a statistic.",
  },
  {
    title: "Attention with a point",
    body: "We're not here for outrage or clicks. Awareness only matters if it moves toward action.",
  },
  {
    title: "Dignity always",
    body: "No shame, no pity, no stereotypes. We tell hard stories with respect for the people living them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About People Suq"
        title="We built a place for the conversations most people avoid"
        intro="People Suq is a media and community platform. The podcast is our engine, but the mission is bigger: bring real issues into the open, amplify real stories, and connect attention to action."
      />

      {/* Why we exist */}
      <Section tone="charcoal">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
              Because silence helps no one
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/70">
              <p>
                Addiction, mental health, homelessness, food insecurity — these
                touch nearly every family, yet they&apos;re still talked about
                in whispers. The silence carries a cost: stigma, isolation, and
                people who don&apos;t reach for help because they think
                they&apos;re alone.
              </p>
              <p>
                People Suq exists to change that. We put real conversations in
                front of people, in a format they&apos;ll actually watch and
                share — because when one person tells the truth out loud, it
                gives someone else permission to do the same.
              </p>
            </div>
          </div>
          <MediaFrame
            seed="about-why"
            alt="People Suq — real conversations in the open"
            label="Our why"
            aspect="wide"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      {/* Why the podcast */}
      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <MediaFrame
            seed="about-podcast"
            src="/images/podcast-1.jpg"
            alt="The People Suq podcast in the studio"
            label="The show"
            aspect="wide"
            className="lg:order-2"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="lg:order-1">
            <Eyebrow>Why a podcast</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
              Conversation is the format
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/70">
              <p>
                We started with the podcast because nothing beats hearing it
                straight from a person who&apos;s lived it. No script, no
                filter, no talking around the hard parts.
              </p>
              <p>
                From there, People Suq grows outward — stories, issue hubs,
                merch that carries the message, and partnerships with people and
                organizations doing the real work.
              </p>
            </div>
            <Button href="/podcast" className="mt-6">
              Watch the podcast
            </Button>
          </div>
        </div>
      </Section>

      {/* The people behind People Suq */}
      <Section tone="charcoal">
        <Eyebrow>The people behind it</Eyebrow>
        <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
          Built from real stories
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
          People Suq is led by two co-founders who&apos;ve lived what we talk
          about. Their honesty is the reason the conversations feel real.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {hosts.map((host) => (
            <HostCard key={host.slug} host={host} />
          ))}
        </div>
      </Section>

      {/* What we stand for */}
      <Section tone="ink">
        <Eyebrow>What we stand for</Eyebrow>
        <h2 className="headline mt-4 mb-10 text-3xl text-white md:text-4xl">
          Our values
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-white/10 bg-ink/40 p-6"
            >
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-white/60">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it connects */}
      <Section tone="purple">
        <div className="max-w-3xl">
          <Eyebrow>How it connects</Eyebrow>
          <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
            One family, three roles
          </h2>
          <p className="mt-6 leading-relaxed text-white/75">
            People Suq is powered by <strong>SUQ MEDIA</strong>, the commercial
            business behind custom apparel, music and video production, and
            studio services. SUQ MEDIA is the business; People Suq is the voice.
          </p>
          <p className="mt-4 leading-relaxed text-white/75">
            And where conversation can turn into real-world help, the{" "}
            <strong>Markin K Kossowski Foundation</strong> carries the community
            impact forward. We highlight and support that work — but People Suq
            stands as its own platform, with its own voice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/impact">See how impact works</Button>
            <Button href={connectedBrands.suqMedia.href} variant="secondary">
              Visit SUQ MEDIA ↗
            </Button>
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">The long view</Eyebrow>
          <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
            Where we&apos;re headed
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            We want People Suq to become the place people come to hear real
            conversations, understand important issues, discover real stories,
            and connect with meaningful community work — a platform that grows
            with every voice that joins it.
          </p>
          <Button href="/get-involved" size="lg" className="mt-8">
            Join the Conversation
          </Button>
        </div>
      </Section>
    </>
  );
}

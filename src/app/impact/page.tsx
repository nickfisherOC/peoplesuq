import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import StoryCard from "@/components/cards/StoryCard";
import FoundationEmblem from "@/components/FoundationEmblem";
import PartnersStrip from "@/components/PartnersStrip";
import { SectionHeading, Eyebrow } from "@/components/ui";
import { storiesByNewest } from "@/content/stories";
import { connectedBrands } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "How People Suq connects awareness with community impact — alongside SUQ MEDIA and the Markin K Kossowski Foundation.",
};

const roles = [
  {
    name: "SUQ MEDIA",
    role: "The business",
    body: connectedBrands.suqMedia.blurb,
    href: connectedBrands.suqMedia.href,
  },
  {
    name: "People Suq",
    role: "The voice",
    body: "Media and storytelling that brings attention to important community issues, amplifies real stories, and reduces stigma.",
    href: "/about",
  },
  {
    name: "Markin K Kossowski Foundation",
    role: "Community impact",
    body: connectedBrands.foundation.blurb,
    href: connectedBrands.foundation.href,
  },
];

export default function ImpactPage() {
  const communityStories = storiesByNewest
    .filter((s) => s.issues.includes("community-second-chances"))
    .slice(0, 3);
  const fallbackStories = storiesByNewest.slice(0, 3);
  const featured =
    communityStories.length > 0 ? communityStories : fallbackStories;

  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="Conversation creates awareness. Awareness creates action."
        intro="People Suq is the voice. But talk only matters if it leads somewhere. Here's how awareness turns into real-world community impact."
      />

      {/* Mission */}
      <Section tone="charcoal">
        <div className="max-w-3xl">
          <Eyebrow>Our mission</Eyebrow>
          <p className="headline mt-5 text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
            To bring hard issues into the open, amplify the people doing the
            work, and help attention become action.
          </p>
          <p className="mt-6 leading-relaxed text-white/65">
            We don&apos;t claim to solve these problems alone. We believe honest
            conversation is where change starts — and we&apos;re built to
            connect that conversation to the organizations and initiatives that
            create impact on the ground.
          </p>
        </div>
      </Section>

      {/* How the three connect */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="How it fits together"
          title="Three roles, one purpose"
          intro="Distinct but connected. Each plays a different part in the same mission."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-charcoal p-6"
            >
              <p className="text-sm font-semibold text-orange-400">{r.role}</p>
              <h3 className="mt-1 text-xl font-bold text-white">{r.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {r.body}
              </p>
              <Button
                href={r.href}
                variant="ghost"
                className="mt-4 self-start !px-0"
              >
                Learn more →
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Foundation spotlight */}
      <Section tone="purple">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>The Foundation</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
              Markin K Kossowski Foundation
            </h2>
            <p className="mt-5 leading-relaxed text-white/75">
              The Foundation represents the community impact side of the mission
              — supporting causes and initiatives that create real-world change.
              People Suq highlights and amplifies this work through media and
              storytelling.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={connectedBrands.foundation.href}>
                About the Foundation ↗
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/50">
              People Suq is a media and community platform, not itself a
              registered charity.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-ink/40 p-8 text-center">
            <FoundationEmblem
              size={96}
              className="mx-auto h-24 w-24"
            />
            <p className="mt-5 text-lg font-bold text-white">
              {connectedBrands.foundation.name}
            </p>
            <p className="mt-1 text-sm text-orange-400">
              {connectedBrands.foundation.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Their mission: to empower individuals and communities through
              compassion-driven programs focused on mental health, addiction
              recovery and sustainable community development.
            </p>
          </div>
        </div>
      </Section>

      {/* Featured initiatives — placeholder, no invented data */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Featured initiatives"
          title="Work worth amplifying"
          intro="Community initiatives and impact stories will be featured here as they're confirmed."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </Section>

      {/* Community partners — real organizations */}
      <Section tone="charcoal">
        <SectionHeading
          eyebrow="Community partners"
          title="Proud to work alongside"
          intro="Organizations creating real change across the community, and doing the work on the ground that these conversations point toward."
        />
        <div className="mt-10">
          <PartnersStrip />
        </div>
      </Section>

      {/* Impact metrics + transparency */}
      <Section tone="ink">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="headline text-2xl text-white md:text-3xl">
              Impact, measured honestly
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              As real initiatives are supported, this space will hold verified
              impact numbers. We won&apos;t publish figures we can&apos;t stand
              behind.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {["Reach", "Stories told", "Initiatives"].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-ink/40 p-4 text-center"
                >
                  <div className="headline text-2xl text-white/30">—</div>
                  <div className="mt-1 text-xs text-white/50">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/35">
              Placeholder metrics — real figures added as they&apos;re verified.
            </p>
          </div>
          <div>
            <h2 className="headline text-2xl text-white md:text-3xl">
              Transparency
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              We believe in being clear about how support flows between SUQ
              MEDIA, People Suq, and the Foundation. As the commercial arm, SUQ
              MEDIA directs{" "}
              <span className="font-semibold text-white">
                40% of every dollar it earns
              </span>{" "}
              to the Markin K Kossowski Foundation for Hope. A fuller
              transparency breakdown will live here as the platform grows.
            </p>
            <Button href="/about" variant="secondary" className="mt-6">
              Read our story
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

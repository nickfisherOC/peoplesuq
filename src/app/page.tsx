import Link from "next/link";
import Hero from "@/components/home/Hero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import FeaturedEpisode from "@/components/FeaturedEpisode";
import { SectionHeading, Eyebrow } from "@/components/ui";
import IssueCard from "@/components/cards/IssueCard";
import StoryCard from "@/components/cards/StoryCard";
import ProductCard from "@/components/cards/ProductCard";
import { issues } from "@/content/issues";
import { latestEpisode } from "@/content/episodes";
import { storiesByNewest } from "@/content/stories";
import { getMerch } from "@/lib/merch";
import FoundationEmblem from "@/components/FoundationEmblem";
import { connectedBrands } from "@/lib/site";

export default async function HomePage() {
  const featuredStories = storiesByNewest.slice(0, 3);
  const { products: featuredProducts } = await getMerch(4);

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. What is People Suq? */}
      <Section tone="charcoal">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>What is People Suq?</Eyebrow>
            <p className="headline mt-5 text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
              People Suq is a media and community platform built to talk openly
              about the things most people talk around.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="text-base leading-relaxed text-white/65 md:text-lg">
              We amplify real stories, reduce stigma, and bring attention to the
              people and organizations doing meaningful work — on addiction and
              recovery, mental health, homelessness, and second chances.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              The podcast is our engine. But People Suq is bigger than any one
              show — it&apos;s where hard conversations happen out loud.
            </p>
            <Button href="/about" variant="ghost" className="mt-6 !px-0">
              More about People Suq →
            </Button>
          </div>
        </div>
      </Section>

      {/* 3. Latest podcast episode */}
      <Section tone="ink">
        <FeaturedEpisode episode={latestEpisode} />
      </Section>

      {/* 4. Issues we talk about */}
      <Section tone="charcoal">
        <SectionHeading
          eyebrow="Issues we talk about"
          title="The conversations that matter"
          intro="Real topics affecting real communities. Each one is a growing hub of episodes, stories, and resources."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <IssueCard key={issue.slug} issue={issue} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/issues" variant="secondary">
            Explore all issues
          </Button>
        </div>
      </Section>

      {/* 5. Real stories */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Real stories"
          title="Stories from real people"
          intro="Profiles, interviews, and firsthand accounts — told like a modern documentary, not a charity brochure."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/stories" variant="secondary">
            Read more stories
          </Button>
        </div>
      </Section>

      {/* 6. Community impact / Foundation */}
      <Section tone="purple">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Community impact</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white sm:text-4xl md:text-5xl">
              Conversation creates awareness.
              <br />
              Awareness creates action.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">
              People Suq uses media and storytelling to bring attention to
              important community issues. SUQ MEDIA helps generate commercial
              support. The Markin K Kossowski Foundation helps turn that
              attention into real-world impact.
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold text-orange-400">
                  SUQ MEDIA
                </dt>
                <dd className="mt-1 text-sm text-white/60">The business</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-orange-400">
                  People Suq
                </dt>
                <dd className="mt-1 text-sm text-white/60">The voice</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-orange-400">
                  MKK Foundation
                </dt>
                <dd className="mt-1 text-sm text-white/60">Community impact</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/impact">See our impact</Button>
              <Button
                href={connectedBrands.foundation.href}
                variant="secondary"
              >
                About the Foundation ↗
              </Button>
            </div>
          </div>

          {/* Foundation */}
          <div className="rounded-2xl border border-white/15 bg-ink/40 p-8">
            <div className="flex items-center gap-4">
              <FoundationEmblem size={64} className="h-16 w-16 shrink-0" />
              <div>
                <p className="text-base font-bold text-white">
                  {connectedBrands.foundation.name}
                </p>
                <p className="text-sm text-orange-400">
                  {connectedBrands.foundation.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              {connectedBrands.foundation.blurb}
            </p>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
              SUQ MEDIA directs{" "}
              <span className="font-semibold text-white">40%</span> of every
              dollar it earns to the Foundation.
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Merch */}
      <Section tone="charcoal">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Merch with meaning"
            title="Wear the message"
            intro="Cause-driven pieces that start conversations. This isn't just apparel — it's identity, awareness, and support for the work."
          />
          <Button href="/merch" variant="secondary" className="mb-1">
            Shop all
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* 8. Get involved / Join the conversation */}
      <Section tone="ink">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900 via-purple-950 to-ink px-6 py-14 text-center md:px-16 md:py-20">
          <Eyebrow className="justify-center">Get involved</Eyebrow>
          <h2 className="headline mx-auto mt-4 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
            Join the conversation
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">
            Watch and share the podcast, tell your story, follow along, support
            community initiatives, or grab something from the shop. However you
            show up — it matters.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/get-involved" size="lg">
              Join the Conversation
            </Button>
            <Button href="/stories/share" variant="secondary" size="lg">
              Share your story
            </Button>
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

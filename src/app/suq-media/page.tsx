import type { Metadata } from "next";
import Image from "next/image";
import { pageSeo } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { SectionHeading, Eyebrow } from "@/components/ui";
import { connectedBrands, location } from "@/lib/site";

const suq = connectedBrands.suqMedia;

export const metadata: Metadata = {
  title: "SUQ MEDIA",
  ...pageSeo("/suq-media"),
  description:
    "SUQ MEDIA is the Calgary studio behind People Suq — custom apparel, music and video production, studio rental and media services. The business that powers the cause.",
};

const services = [
  {
    title: "Custom apparel",
    body: "Branded apparel, embroidery and print for businesses, teams and causes — the same production that makes People Suq's cause-driven merch.",
    href: suq.services.customApparel,
  },
  {
    title: "Music & video production",
    body: "Recording, production and video work — from a single track or spot to a full campaign, shot and finished in-house.",
    href: suq.services.music,
  },
  {
    title: "Studio rental",
    body: "A real production space to record, film and create in — available to book for your own projects.",
    href: suq.services.studioRental,
  },
  {
    title: "Media services",
    body: "Content, creative and media support that helps brands and organizations tell their story and reach their people.",
    href: suq.href,
  },
];

export default function SuqMediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connected with"
        title="SUQ MEDIA — the studio behind People Suq"
        intro="People Suq is the voice and the cause. SUQ MEDIA is the commercial studio that makes it possible — a Calgary media and apparel business whose work powers this platform and whose profits help fund real community impact."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={suq.href}>Visit SUQ MEDIA ↗</Button>
          <Button href="/impact" variant="secondary">
            How it all connects
          </Button>
        </div>
      </PageHeader>

      {/* Who they are + logo */}
      <Section tone="charcoal">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>The business</Eyebrow>
            <h2 className="headline mt-4 text-3xl text-white md:text-4xl">
              The commercial engine behind the cause
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">
              {suq.blurb} Based in Calgary, SUQ MEDIA is the working business
              side of the same mission: it earns, creates and produces — and a
              share of what it makes goes straight back into the community.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              People Suq exists because of it. SUQ MEDIA is why this platform
              can tell real stories, publish a podcast, and put cause-driven
              merch out into the world.
            </p>
            <p className="mt-6 text-sm not-italic text-white/50">
              {location.street}, {location.city}, {location.region}{" "}
              {location.postalCode}
            </p>
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-white/15 bg-white p-10">
            <Image
              src={suq.logo}
              alt="SUQ MEDIA"
              width={520}
              height={360}
              sizes="(max-width: 1024px) 80vw, 420px"
              className="h-auto w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="What SUQ MEDIA does"
          title="Apparel, media, and a studio to make it in"
          intro="The commercial work that funds the mission — and that you can hire for your own brand, team or project."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-white/10 bg-charcoal p-6 transition-colors hover:border-white/25"
            >
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {s.body}
              </p>
              <span className="mt-4 text-sm font-semibold text-orange-400">
                Learn more ↗
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* How the brands connect */}
      <Section tone="purple">
        <SectionHeading
          eyebrow="How we're connected"
          title="One mission, three roles"
          intro="SUQ MEDIA is the business. People Suq is the voice. The Foundation is the impact. They're distinct, but they pull in the same direction."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-ink/40 p-6">
            <p className="text-sm font-semibold text-orange-400">The business</p>
            <h3 className="mt-1 text-xl font-bold text-white">SUQ MEDIA</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              The commercial studio — apparel, media and production — that funds
              and powers everything else.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/40 p-6">
            <p className="text-sm font-semibold text-orange-400">The voice</p>
            <h3 className="mt-1 text-xl font-bold text-white">People Suq</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Media and storytelling that brings attention to hard issues,
              amplifies real stories, and reduces stigma.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink/40 p-6">
            <p className="text-sm font-semibold text-orange-400">
              Community impact
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">
              MKK Foundation
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              SUQ MEDIA directs{" "}
              <span className="font-semibold text-white">40% of its profits</span>{" "}
              to the Markin K Kossowski Foundation for Hope.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={suq.href}>Visit SUQ MEDIA ↗</Button>
          <Button href="/impact" variant="secondary">
            See the impact
          </Button>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { social, listenLinks, connectedBrands, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the conversation. Watch the podcast, share your story, follow People Suq, support community initiatives, or shop merch that carries the message.",
};

const actions = [
  {
    title: "Watch & share the podcast",
    body: "The easiest way in. Watch an episode, then send it to someone who needs it.",
    cta: "Watch the podcast",
    href: "/podcast",
    primary: true,
  },
  {
    title: "Share your story",
    body: "Your experience could be the thing that helps someone else feel less alone.",
    cta: "Share your story",
    href: "/stories/share",
    primary: true,
  },
  {
    title: "Follow People Suq",
    body: "Keep up with new episodes, stories, and conversations as they drop.",
    cta: "Follow on Instagram",
    href: social.instagram,
  },
  {
    title: "Support community initiatives",
    body: "Back the real-world work through the Markin K Kossowski Foundation.",
    cta: "About the Foundation ↗",
    href: connectedBrands.foundation.href,
  },
  {
    title: "Wear the message",
    body: "Cause-driven merch that starts conversations and supports the mission.",
    cta: "Shop merch",
    href: "/merch",
  },
  {
    title: "Learn how it all connects",
    body: "See how People Suq, SUQ MEDIA, and the Foundation work together.",
    cta: "See our impact",
    href: "/impact",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Join the conversation"
        intro="There's no single way to be part of People Suq. Watch, share, speak up, support, or just show up. However you join — it moves the conversation forward."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={listenLinks.youtube} size="lg">
            Watch on YouTube
          </Button>
          <Button href="/stories/share" variant="secondary" size="lg">
            Share your story
          </Button>
        </div>
      </PageHeader>

      <Section tone="charcoal">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((a) => (
            <div
              key={a.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-ink/40 p-6"
            >
              <h2 className="text-xl font-bold text-white">{a.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-white/60">
                {a.body}
              </p>
              <Button
                href={a.href}
                variant={a.primary ? "primary" : "secondary"}
                className="mt-5 self-start"
              >
                {a.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900 via-purple-950 to-ink p-8 text-center md:p-12">
          <h2 className="headline text-3xl text-white md:text-4xl">
            Want to work with us?
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            Guest ideas, partnerships, or an organization doing meaningful work
            — we&apos;d love to hear from you.
          </p>
          <Button
            href={`mailto:${contact.email}`}
            size="lg"
            className="mt-7"
          >
            Get in touch
          </Button>
        </div>
      </Section>
    </>
  );
}

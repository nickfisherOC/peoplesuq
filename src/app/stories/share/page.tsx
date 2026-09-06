import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Share Your Story",
  description:
    "People Suq is built on real voices. Share your story of recovery, community, or a second chance.",
};

const guidance = [
  {
    title: "Tell it your way",
    body: "There's no right format. A paragraph, a voice note, a video — whatever feels honest. We'll help shape it if you want.",
  },
  {
    title: "You stay in control",
    body: "Nothing is published without your consent. You choose how you're named, shown, or kept anonymous.",
  },
  {
    title: "Real, not polished",
    body: "We're not looking for perfect. We're looking for true. The hard parts are often what help someone else.",
  },
];

export default function ShareStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Share your story"
        title="Your story could be the one someone needs to hear"
        intro="People Suq exists because real people were willing to talk openly. If you have a story about recovery, mental health, community, or a second chance, we want to listen."
      >
        <Button href={`mailto:${contact.storyEmail}`} size="lg">
          Email us your story
        </Button>
      </PageHeader>

      <Section tone="charcoal">
        <div className="grid gap-6 md:grid-cols-3">
          {guidance.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-white/10 bg-ink/40 p-6"
            >
              <h2 className="text-lg font-bold text-white">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-charcoal p-8 text-center md:p-12">
          <h2 className="headline text-3xl text-white md:text-4xl">
            Ready when you are
          </h2>
          <p className="mt-4 leading-relaxed text-white/65">
            Send us a note at{" "}
            <a
              href={`mailto:${contact.storyEmail}`}
              className="text-orange-400 underline underline-offset-4"
            >
              {contact.storyEmail}
            </a>{" "}
            with a little about you and what you&apos;d like to share. A person —
            not a bot — will get back to you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${contact.storyEmail}`} size="lg">
              Start the conversation
            </Button>
            <Button href="/stories" variant="secondary" size="lg">
              Read other stories
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/35">
            A guided submission form can be connected here later (form backend
            or CMS integration).
          </p>
        </div>
      </Section>
    </>
  );
}

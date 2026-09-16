import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ShareStoryButton from "@/components/story-form/ShareStoryButton";
import { contact, social, connectedBrands } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with People Suq.",
};

interface Channel {
  title: string;
  body: string;
  cta: string;
  href?: string;
  /** Opens the "Tell Us Your Story" modal instead of navigating. */
  story?: boolean;
}

const channels: Channel[] = [
  {
    title: "General",
    body: "Questions, ideas, or just want to say hello.",
    cta: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    title: "Share a story",
    body: "Tell us about your experience or someone doing meaningful work.",
    cta: "Tell Us Your Story",
    story: true,
  },
  {
    title: "Follow along",
    body: "The fastest way to keep up with new conversations.",
    cta: "Instagram",
    href: social.instagram,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        intro="Guests, partnerships, stories, or press — reach out. A person will get back to you."
      />

      <Section tone="charcoal">
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-ink/40 p-6"
            >
              <h2 className="text-lg font-bold text-white">{c.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-white/60">
                {c.body}
              </p>
              {c.story ? (
                <ShareStoryButton variant="secondary" className="mt-5 self-start">
                  {c.cta}
                </ShareStoryButton>
              ) : (
                <Button
                  href={c.href ?? "#"}
                  variant="secondary"
                  className="mt-5 self-start"
                >
                  {c.cta}
                </Button>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-white/50">
          Looking for the business side?{" "}
          <a
            href={connectedBrands.suqMedia.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 underline underline-offset-4"
          >
            Visit SUQ MEDIA ↗
          </a>
        </p>
      </Section>
    </>
  );
}

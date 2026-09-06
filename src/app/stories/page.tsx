import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import StoryCard from "@/components/cards/StoryCard";
import StoriesFeed from "@/components/StoriesFeed";
import { storiesByNewest } from "@/content/stories";
import { issues } from "@/content/issues";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Real stories from real people — recovery, community, second chances, interviews, and profiles of organizations making a difference.",
};

export default function StoriesPage() {
  const [featured, ...rest] = storiesByNewest;

  return (
    <>
      <PageHeader
        eyebrow="Stories"
        title="Real stories from real people"
        intro="Profiles, interviews, and firsthand accounts — told like a modern documentary. Photography carries the weight; the writing keeps it honest."
      >
        <Button href="/stories/share">Share your story</Button>
      </PageHeader>

      {featured && (
        <Section tone="ink">
          <StoryCard story={featured} featured />
        </Section>
      )}

      <Section tone="charcoal">
        <StoriesFeed stories={rest} issues={issues} />
      </Section>
    </>
  );
}

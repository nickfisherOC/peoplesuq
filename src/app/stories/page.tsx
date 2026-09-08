import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import FeaturedStory from "@/components/FeaturedStory";
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
        intro="Real people, on camera. Recovery, community, second chances, and the organizations making a difference — told in their own words, documentary-style."
      >
        <Button href="/stories/share">Share your story</Button>
      </PageHeader>

      {featured && (
        <Section tone="ink">
          <FeaturedStory story={featured} />
        </Section>
      )}

      <Section tone="charcoal">
        <StoriesFeed stories={rest} issues={issues} />
      </Section>
    </>
  );
}

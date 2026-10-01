import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import IssueCard from "@/components/cards/IssueCard";
import { issues } from "@/content/issues";

export const metadata: Metadata = {
  title: "The Issues We Cover",
  ...pageSeo("/issues"),
  description:
    "Addiction, mental health, homelessness, food insecurity and second chances: the issues People Suq covers through stories, episodes and conversation.",
};

export default function IssuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Issues"
        title="The issues we talk about"
        intro="Each issue is a living hub — a place that gathers episodes, stories, interviews, and resources as the conversation grows."
      />

      <Section tone="charcoal">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <IssueCard key={issue.slug} issue={issue} />
          ))}
        </div>
      </Section>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import StoryCard from "./cards/StoryCard";
import type { Story, Issue } from "@/content/types";

export default function StoriesFeed({
  stories,
  issues,
}: {
  stories: Story[];
  issues: Issue[];
}) {
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeIssue
        ? stories.filter((s) => s.issues.includes(activeIssue))
        : stories,
    [stories, activeIssue],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter stories by issue"
      >
        <button
          type="button"
          onClick={() => setActiveIssue(null)}
          aria-pressed={activeIssue === null}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeIssue === null
              ? "bg-orange-500 text-ink"
              : "border border-white/15 text-white/70 hover:text-white"
          }`}
        >
          All stories
        </button>
        {issues.map((issue) => (
          <button
            key={issue.slug}
            type="button"
            onClick={() =>
              setActiveIssue((cur) => (cur === issue.slug ? null : issue.slug))
            }
            aria-pressed={activeIssue === issue.slug}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeIssue === issue.slug
                ? "bg-orange-500 text-ink"
                : "border border-white/15 text-white/70 hover:text-white"
            }`}
          >
            {issue.shortTitle}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal p-10 text-center text-white/50">
          No stories in this issue yet — check back soon.
        </div>
      )}
    </div>
  );
}

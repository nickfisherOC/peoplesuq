"use client";

import { useMemo, useState } from "react";
import EpisodeCard from "./cards/EpisodeCard";
import type { Episode, Issue } from "@/content/types";

/**
 * Client-side episode browser: free-text search + issue filter.
 * Operates on data passed from the server component so it works the same
 * whether episodes come from local modules today or a CMS later.
 */
export default function PodcastBrowser({
  episodes,
  issues,
}: {
  episodes: Episode[];
  issues: Issue[];
}) {
  const [query, setQuery] = useState("");
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return episodes.filter((ep) => {
      const matchesIssue = !activeIssue || ep.issues.includes(activeIssue);
      const matchesQuery =
        q === "" ||
        ep.title.toLowerCase().includes(q) ||
        ep.summary.toLowerCase().includes(q) ||
        ep.topics.some((t) => t.toLowerCase().includes(q)) ||
        (ep.guest?.name?.toLowerCase().includes(q) ?? false);
      return matchesIssue && matchesQuery;
    });
  }, [episodes, query, activeIssue]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <label className="relative block">
          <span className="sr-only">Search episodes</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes, topics, guests…"
            className="w-full rounded-full border border-white/15 bg-charcoal px-5 py-3 text-white placeholder:text-white/40 focus:border-orange-500/60 focus:outline-none"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by issue"
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
            All
          </button>
          {issues.map((issue) => (
            <button
              key={issue.slug}
              type="button"
              onClick={() =>
                setActiveIssue((cur) =>
                  cur === issue.slug ? null : issue.slug,
                )
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
      </div>

      <p className="mt-6 text-sm text-white/45" aria-live="polite">
        {filtered.length} episode{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal p-10 text-center text-white/50">
          No episodes match that search yet. Try a different term or filter.
        </div>
      )}
    </div>
  );
}

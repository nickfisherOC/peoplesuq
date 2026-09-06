import Link from "next/link";
import MediaFrame from "../MediaFrame";
import type { Issue } from "@/content/types";

/**
 * Issue tile — typography-led (per brief, no generic icons). The topic name
 * carries the card; a branded media frame provides the backdrop.
 */
export default function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link
      href={`/issues/${issue.slug}`}
      className="group relative flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/30"
    >
      <div className="absolute inset-0">
        <MediaFrame
          seed={issue.slug}
          src={issue.image.src}
          alt=""
          label={issue.shortTitle}
          aspect="square"
          rounded={false}
          className="h-full w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        />
      </div>
      <div className="relative">
        <h3 className="headline text-2xl text-white md:text-3xl">
          {issue.title}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
          {issue.summary}
        </p>
        <span className="mt-3 inline-block text-sm font-semibold text-orange-400 opacity-0 transition-opacity group-hover:opacity-100">
          Explore this issue →
        </span>
      </div>
    </Link>
  );
}

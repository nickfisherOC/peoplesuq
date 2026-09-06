import Link from "next/link";

interface LogoProps {
  /** Layout: inline (default) or stacked (PEOPLE over SUQ). */
  stacked?: boolean;
  /** Colour context. */
  tone?: "dark" | "light";
  className?: string;
  /** Render as a link to home (default true). */
  asLink?: boolean;
}

/**
 * People Suq typographic wordmark — bold display type echoing the podcast
 * logo (purple "PEOPLE", orange "SUQ"). Purely typographic so it stays crisp
 * at any size and is fully accessible.
 */
export default function Logo({
  stacked = false,
  tone = "dark",
  className = "",
  asLink = true,
}: LogoProps) {
  const purple = tone === "dark" ? "text-purple-400" : "text-purple-700";
  const orange = "text-orange-500";

  const mark = (
    <span
      className={`headline inline-flex items-baseline uppercase ${
        stacked ? "flex-col !leading-[0.82]" : "gap-[0.22em]"
      } ${className}`}
      aria-hidden
    >
      <span className={purple}>People</span>
      <span className={orange}>Suq</span>
    </span>
  );

  if (!asLink) {
    return (
      <span className="inline-flex items-center">
        {mark}
        <span className="sr-only">People Suq — home</span>
      </span>
    );
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center transition-opacity hover:opacity-90"
    >
      {mark}
      <span className="sr-only">People Suq — home</span>
    </Link>
  );
}

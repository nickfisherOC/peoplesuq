import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  /** Render as a link to home (default true). */
  asLink?: boolean;
  /** Prioritize loading (use in the header). */
  priority?: boolean;
}

/**
 * People Suq brand wordmark (brushed purple "PEOPLE" / orange "SUQ").
 * Transparent PNG, sized by height via `className` (width auto keeps ratio).
 */
export default function Logo({
  className = "h-10 w-auto md:h-12",
  asLink = true,
  priority = false,
}: LogoProps) {
  const mark = (
    <Image
      src="/images/peoplesuq-logo.png"
      alt="People Suq"
      width={996}
      height={645}
      priority={priority}
      sizes="180px"
      className={className}
    />
  );

  if (!asLink) return mark;

  return (
    <Link
      href="/"
      aria-label="People Suq — home"
      className="inline-flex items-center transition-opacity hover:opacity-90"
    >
      {mark}
    </Link>
  );
}

import type { ReactNode } from "react";

/** Small uppercase label above a heading. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow text-orange-500 ${className}`}>{children}</p>
  );
}

/** A pill badge — used for topics, "Placeholder" flags, kinds, etc. */
export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "orange" | "purple" | "outline";
  className?: string;
}) {
  const tones = {
    default: "bg-white/10 text-white/80",
    orange: "bg-orange-500/15 text-orange-300",
    purple: "bg-purple-500/20 text-purple-200",
    outline: "border border-white/20 text-white/70",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Marks sample/placeholder content honestly and consistently. */
export function PlaceholderTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white/70 backdrop-blur ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
      Sample
    </span>
  );
}

/** Marks a real-but-unreleased item (e.g. an upcoming episode). */
export function SoonTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-orange-500/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ink backdrop-blur ${className}`}
    >
      Coming soon
    </span>
  );
}

/** Section eyebrow + title + optional intro, with a consistent rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Tag className="headline text-3xl text-white sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}

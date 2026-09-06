import type { ReactNode } from "react";

type Tone = "ink" | "charcoal" | "graphite" | "purple";

const tones: Record<Tone, string> = {
  ink: "bg-ink",
  charcoal: "bg-charcoal",
  graphite: "bg-graphite",
  purple: "bg-purple-950",
};

/**
 * Consistent full-bleed section with a centered content container and
 * generous, responsive vertical rhythm.
 */
export default function Section({
  children,
  tone = "ink",
  className = "",
  id,
  containerClassName = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} py-16 md:py-24 ${className}`}
    >
      <div className={`container-page ${containerClassName}`}>{children}</div>
    </section>
  );
}

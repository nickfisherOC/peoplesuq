import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

/** Consistent interior-page header band. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-charcoal">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[-30%] h-80 w-80 rounded-full bg-purple-700/20 blur-[110px]"
      />
      <div className="container-page relative py-14 md:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="headline mt-4 max-w-4xl text-4xl text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

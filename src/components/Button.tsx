import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "purple";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none text-center";

const variants: Record<Variant, string> = {
  // Orange = primary emphasis / CTA
  primary:
    "bg-orange-500 text-ink hover:bg-orange-400 focus-visible:outline-orange-500",
  purple:
    "bg-purple-500 text-white hover:bg-purple-400 focus-visible:outline-purple-400",
  secondary:
    "border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
  ghost: "text-white/80 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Force treating as external (opens new tab). Auto-detected for http/mailto. */
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Link-styled button. Uses next/link for internal routes and a plain anchor
 * for external / placeholder (#) / mailto links.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal =
    external ??
    (/^https?:\/\//.test(href) || href.startsWith("mailto:"));

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

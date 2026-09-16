"use client";

import type { ReactNode } from "react";
import { useStoryForm, type StoryTopic } from "./StoryFormProvider";

type Variant = "primary" | "secondary" | "ghost" | "purple";
type Size = "md" | "lg";

// Mirrors Button.tsx so a ShareStoryButton is visually identical to a Button.
const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none text-center cursor-pointer";

const variants: Record<Variant, string> = {
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

/** Opens the site-wide "Tell Us Your Story" modal. Drop-in for <Button>. */
export default function ShareStoryButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  topic,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  topic?: StoryTopic;
}) {
  const { openForm } = useStoryForm();
  return (
    <button
      type="button"
      onClick={() => openForm(topic)}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

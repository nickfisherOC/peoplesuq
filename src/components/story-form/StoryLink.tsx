"use client";

import type { ReactNode } from "react";
import { useStoryForm, type StoryTopic } from "./StoryFormProvider";

/**
 * Inline text-link that opens the "Tell Us Your Story" modal — for use in
 * places where a pill button would look wrong (e.g. the footer). Style it via
 * `className` exactly like the surrounding links.
 */
export default function StoryLink({
  children,
  className = "",
  topic,
}: {
  children: ReactNode;
  className?: string;
  topic?: StoryTopic;
}) {
  const { openForm } = useStoryForm();
  return (
    <button type="button" onClick={() => openForm(topic)} className={className}>
      {children}
    </button>
  );
}

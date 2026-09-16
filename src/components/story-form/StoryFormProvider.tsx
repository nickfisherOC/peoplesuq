"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

/** Optional preset so the same modal can adapt its intro/topic. */
export type StoryTopic =
  | "Recovery"
  | "Mental health"
  | "Community"
  | "Second chances"
  | "Podcast guest"
  | "Other";

interface StoryFormState {
  open: boolean;
  /** A preset topic the trigger passed in (pre-selects the dropdown). */
  presetTopic?: StoryTopic;
  openForm: (topic?: StoryTopic) => void;
  closeForm: () => void;
}

const StoryFormContext = createContext<StoryFormState | null>(null);

export function StoryFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetTopic, setPresetTopic] = useState<StoryTopic | undefined>();

  const openForm = useCallback((topic?: StoryTopic) => {
    setPresetTopic(topic);
    setOpen(true);
  }, []);

  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <StoryFormContext.Provider value={{ open, presetTopic, openForm, closeForm }}>
      {children}
    </StoryFormContext.Provider>
  );
}

export function useStoryForm(): StoryFormState {
  const ctx = useContext(StoryFormContext);
  if (!ctx) throw new Error("useStoryForm must be used within StoryFormProvider");
  return ctx;
}

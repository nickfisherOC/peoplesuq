import type { ReactNode } from "react";
import Button from "../Button";
import { SectionHeading } from "../ui";
import CampaignVideoCard from "./CampaignVideoCard";
import type { CampaignVideo } from "@/content/campaignVideos";

/**
 * Reusable Society Under Question video block.
 *
 * When there are published videos it lays them out in a responsive grid
 * (vertical 9:16 clips sit happily beside 16:9 ones). When there are none it
 * shows an honest editorial state instead of empty or placeholder cards, so the
 * section never pretends content exists before it does.
 */
export default function CampaignVideoSection({
  eyebrow = "Society Under Question",
  title,
  intro,
  videos,
  emptyTitle = "The campaign is in production",
  emptyBody = "The first Society Under Question films are being made alongside the podcast. This is where they will live. Follow along, or share the question you think we should be asking.",
  footer,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  videos: CampaignVideo[];
  emptyTitle?: string;
  emptyBody?: string;
  /** Optional node rendered under the grid (e.g. a "see all" button). */
  footer?: ReactNode;
}) {
  return (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

      {videos.length > 0 ? (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <CampaignVideoCard key={video.id} video={video} />
            ))}
          </div>
          {footer && <div className="mt-8">{footer}</div>}
        </>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center md:px-16 md:py-16">
          <p className="eyebrow text-orange-500">Coming soon</p>
          <h3 className="headline mx-auto mt-4 max-w-2xl text-2xl text-white sm:text-3xl">
            {emptyTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/60">
            {emptyBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/get-involved">Join the Conversation</Button>
            <Button href="/podcast" variant="secondary">
              Watch the Podcast
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

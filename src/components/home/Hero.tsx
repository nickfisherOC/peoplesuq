import Image from "next/image";
import Button from "../Button";

/**
 * Full-bleed documentary hero: one strong image fills the section with a dark
 * gradient wash for legibility; headline and CTAs sit over it, bottom-left.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-end overflow-hidden bg-ink md:min-h-[88vh]">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <Image
          src="/images/podcast-2.jpeg"
          alt="Two people recording the People Suq podcast"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Bottom-up wash keeps the copy crisp */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25"
        />
        {/* Left-side wash anchors the text column */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 w-full py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-orange-500">
            Media · Community · Conversation
          </p>
          <h1 className="headline mt-5 text-5xl text-white sm:text-6xl md:text-7xl">
            Real People.
            <br />
            Real <span className="text-orange-500">Conversations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            People Suq brings attention to the issues affecting our communities
            — through stories, conversations, media, and action.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/get-involved" size="lg">
              Join the Conversation
            </Button>
            <Button href="/podcast" variant="secondary" size="lg">
              Watch the Podcast
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

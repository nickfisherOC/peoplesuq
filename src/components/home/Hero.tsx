import Button from "../Button";
import MediaFrame from "../MediaFrame";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Subtle brand wash — restrained, not a busy gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-purple-700/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-orange-600/15 blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-6">
          <p className="eyebrow text-orange-500">
            Media · Community · Conversation
          </p>
          <h1 className="headline mt-5 text-5xl text-white sm:text-6xl md:text-7xl">
            Real People.
            <br />
            Real <span className="text-orange-500">Conversations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
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

        {/* Editorial media montage */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <MediaFrame
              seed="hero-portrait-a"
              alt="People Suq — real people, real conversations"
              label="Voices"
              aspect="portrait"
              priority
              className="translate-y-4"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
            <MediaFrame
              seed="hero-portrait-b"
              alt="People Suq — community and stories"
              label="Stories"
              aspect="portrait"
              sizes="(max-width: 1024px) 45vw, 25vw"
            />
            <MediaFrame
              seed="hero-wide-c"
              alt="People Suq — conversations that matter"
              label="Conversation"
              aspect="video"
              className="col-span-2"
              sizes="(max-width: 1024px) 92vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

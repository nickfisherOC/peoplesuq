import Section from "@/components/Section";
import Button from "@/components/Button";
import { Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Section tone="ink" className="min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="headline mt-4 text-5xl text-white md:text-6xl">
          This page went quiet
        </h1>
        <p className="mt-5 leading-relaxed text-white/65">
          We couldn&apos;t find what you were looking for. Let&apos;s get you
          back to the conversation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/podcast" variant="secondary">
            Watch the podcast
          </Button>
        </div>
      </div>
    </Section>
  );
}

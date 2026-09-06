import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";
import MerchBrowser from "@/components/MerchBrowser";
import { getMerch } from "@/lib/merch";
import { connectedBrands } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Cause-driven People Suq merch — identity, awareness, and support for the message. Distinct from SUQ MEDIA custom apparel.",
};

export default async function MerchPage() {
  const { products, live } = await getMerch();

  return (
    <>
      <PageHeader
        eyebrow="Merch with meaning"
        title="Wear the message"
        intro="People Suq merch isn't just apparel — it's identity, awareness, and a way to support the conversation. Every piece carries a message worth starting."
      />

      <Section tone="charcoal">
        {products.length > 0 ? (
          <MerchBrowser products={products} />
        ) : (
          <p className="rounded-2xl border border-white/10 bg-charcoal p-10 text-center text-white/50">
            New drops are on the way — check back soon.
          </p>
        )}

        <div className="mt-14 rounded-3xl border border-white/10 bg-ink/40 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="headline text-2xl text-white md:text-3xl">
                Every piece has a purpose
              </h2>
              <p className="mt-4 leading-relaxed text-white/65">
                People Suq merch is separate from SUQ MEDIA&apos;s custom apparel
                business. It exists to carry the message forward and to support
                the community initiatives we highlight. Each product explains the
                cause behind it.
              </p>
              <p className="mt-4 text-sm text-white/50">
                Looking for custom apparel, embroidery, or merch drops for your
                own brand?{" "}
                <a
                  href={connectedBrands.suqMedia.services.customApparel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline underline-offset-4"
                >
                  That&apos;s SUQ MEDIA ↗
                </a>
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-white/40">
                {live
                  ? "Checkout is secure, powered by Shopify."
                  : "The full shop connects to a secure checkout soon."}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 md:justify-end">
                <Button href="/get-involved" variant="ghost">
                  Other ways to help →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

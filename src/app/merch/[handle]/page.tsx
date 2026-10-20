import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageSeo } from "@/lib/seo";
import Section from "@/components/Section";
import ProductBuyBox from "@/components/merch/ProductBuyBox";
import { getMerchProducts, getProductByHandle } from "@/lib/shopify";

// Only real People Suq merch products get a page; unknown handles 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getMerchProducts();
  return (products ?? []).map((p) => ({ handle: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product not found" };
  const description =
    (product.description ||
      `${product.title} from People Suq. Cause-driven apparel that carries the message.`)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155);
  return {
    title: product.title,
    description,
    ...pageSeo(`/merch/${handle}`),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <Section tone="charcoal">
      <nav className="mb-6 text-sm">
        <Link href="/merch" className="text-white/50 hover:text-white">
          ← Back to merch
        </Link>
      </nav>

      <ProductBuyBox product={product} />

      {(product.descriptionHtml || product.description) && (
        <div className="mt-14 max-w-2xl border-t border-white/10 pt-8">
          <h2 className="eyebrow mb-3 text-white/40">Details</h2>
          {product.descriptionHtml ? (
            <div
              className="space-y-3 text-sm leading-relaxed text-white/65 [&_a]:text-orange-400 [&_a]:underline [&_li]:ml-4 [&_li]:list-disc"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="text-sm leading-relaxed text-white/65">
              {product.description}
            </p>
          )}
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/merch"
          className="text-sm font-semibold text-orange-400 underline underline-offset-4"
        >
          See all People Suq merch →
        </Link>
      </div>
    </Section>
  );
}

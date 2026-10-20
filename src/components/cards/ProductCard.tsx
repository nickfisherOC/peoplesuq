import Link from "next/link";
import MediaFrame from "../MediaFrame";
import { PlaceholderTag } from "../ui";
import type { Product } from "@/content/types";

/**
 * Merch card. Real Shopify products link to their on-site product page
 * (/merch/<handle>) where colour/size can be chosen and added to the cart.
 * Local placeholder merch (no Shopify variant) shows a "Coming soon" state.
 */
export default function ProductCard({ product }: { product: Product }) {
  // A real Shopify product (has a variant) gets its own product page.
  const href = product.variantId ? `/merch/${product.slug}` : undefined;

  const media = (
    <div className="relative">
      <MediaFrame
        seed={product.slug}
        src={product.image.src}
        alt={product.image.alt}
        label={product.name}
        aspect="square"
        rounded={false}
        sizes="(max-width: 639px) 40vw, (max-width: 1024px) 50vw, 25vw"
      />
      {product.isPlaceholder && (
        <PlaceholderTag className="absolute left-3 top-3" />
      )}
      {product.soldOut && (
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white/80">
          Sold out
        </span>
      )}
    </div>
  );

  return (
    // Mobile: compact horizontal row (image left, details right) so there is one
    // product per row. sm+ : classic vertical card in the responsive grid.
    <article className="group flex overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-white/25 sm:flex-col">
      {href ? (
        <Link
          href={href}
          aria-label={`View ${product.name}`}
          className="w-32 shrink-0 self-stretch sm:w-full"
        >
          {media}
        </Link>
      ) : (
        <div className="w-32 shrink-0 self-stretch sm:w-full">{media}</div>
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold leading-snug text-white">
          {href ? (
            <Link href={href} className="hover:text-orange-400">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>
        {product.price && (
          <p className="mt-1 font-semibold text-orange-400">{product.price}</p>
        )}
        {product.cause && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55 sm:line-clamp-3">
            {product.cause}
          </p>
        )}

        <div className="mt-4 sm:mt-5">
          {href ? (
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {product.soldOut ? "View options" : "Choose options"}
            </Link>
          ) : (
            <span className="text-sm font-semibold text-white/50">
              {product.soldOut ? "Sold out" : "Coming soon"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

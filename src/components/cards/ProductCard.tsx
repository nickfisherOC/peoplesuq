"use client";

import MediaFrame from "../MediaFrame";
import { PlaceholderTag } from "../ui";
import AddToCartButton from "../cart/AddToCartButton";
import type { Product } from "@/content/types";

/**
 * Merch card. When a product has a Shopify `variantId`, it shows a live
 * "Add to cart" button; otherwise it presents the piece and its message with a
 * "Coming soon" state (no dead buy affordance).
 */
export default function ProductCard({ product }: { product: Product }) {
  const purchasable = Boolean(product.variantId) && !product.soldOut;

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
      {product.shopUrl ? (
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${product.name}`}
          className="w-32 shrink-0 self-stretch sm:w-full"
        >
          {media}
        </a>
      ) : (
        <div className="w-32 shrink-0 self-stretch sm:w-full">{media}</div>
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold leading-snug text-white">
          {product.name}
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
          {purchasable && product.variantId ? (
            <AddToCartButton
              variantId={product.variantId}
              available={product.available ?? true}
            />
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

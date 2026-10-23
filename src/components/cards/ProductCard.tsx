import MediaFrame from "../MediaFrame";
import { PlaceholderTag } from "../ui";
import { merchUrl } from "@/lib/site";
import type { Product } from "@/content/types";

/**
 * Merch card. Links out to the Shopify store (merch.peoplesuq.com) for the
 * specific product so colour/size can be chosen and bought there. Local
 * placeholder merch (no Shopify product) shows a "Coming soon" state.
 */
export default function ProductCard({ product }: { product: Product }) {
  // Real Shopify product -> its store page (fallback to the store home).
  const href = product.shopUrl ?? (product.variantId ? merchUrl : undefined);

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

  const linkProps = {
    href: href ?? "#",
    target: "_blank",
    rel: "noopener noreferrer",
  } as const;

  return (
    // Mobile: compact horizontal row (image left, details right) so there is one
    // product per row. sm+ : classic vertical card in the responsive grid.
    <article className="group flex overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-white/25 sm:flex-col">
      {href ? (
        <a
          {...linkProps}
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
          {href ? (
            <a {...linkProps} className="hover:text-orange-400">
              {product.name}
            </a>
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
            <a
              {...linkProps}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {product.soldOut ? "View in store" : "Shop this"}
            </a>
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

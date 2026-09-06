"use client";

import { useMemo, useState } from "react";
import ProductCard from "./cards/ProductCard";
import type { Product } from "@/content/types";

/** Title-case a tag/type for display. */
function label(s: string) {
  return s
    .split(/[\s_-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * A product's "type" for the Type filter. Uses Shopify's dedicated product
 * "Type" field (set it to e.g. "Hoodie", "T-Shirt", "Hat" per product in
 * Shopify to drive this filter). Kept single-source so the filter stays clean.
 */
function typesOf(p: Product): string[] {
  return p.productType ? [p.productType] : [];
}

/**
 * Client-side merch filtering: by collection, by type (Shopify product type /
 * tags), and by name search. All options are derived from the live products,
 * so they adapt automatically as the Shopify catalogue changes.
 */
export default function MerchBrowser({ products }: { products: Product[] }) {
  const [collection, setCollection] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Build filter options from the data.
  const collections = useMemo(() => {
    const map = new Map<string, string>(); // handle -> title
    for (const p of products)
      for (const c of p.collections ?? []) map.set(c.handle, c.title);
    return [...map.entries()].map(([handle, title]) => ({ handle, title }));
  }, [products]);

  const types = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) for (const t of typesOf(p)) set.add(t);
    return [...set].sort();
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCollection =
        !collection || (p.collections ?? []).some((c) => c.handle === collection);
      const matchesType = !type || typesOf(p).includes(type);
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        (p.cause?.toLowerCase().includes(q) ?? false);
      return matchesCollection && matchesType && matchesQuery;
    });
  }, [products, collection, type, query]);

  const hasFilters = collections.length > 1 || types.length > 1;

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "bg-orange-500 text-ink"
        : "border border-white/15 text-white/70 hover:text-white"
    }`;

  return (
    <div>
      {(hasFilters || products.length > 4) && (
        <div className="mb-8 space-y-5">
          <label className="relative block max-w-md">
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search merch…"
              className="w-full rounded-full border border-white/15 bg-charcoal px-5 py-3 text-white placeholder:text-white/40 focus:border-orange-500/60 focus:outline-none"
            />
          </label>

          {collections.length > 1 && (
            <div>
              <p className="eyebrow mb-2 text-white/40">Collection</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
                <button type="button" onClick={() => setCollection(null)} aria-pressed={collection === null} className={chip(collection === null)}>
                  All
                </button>
                {collections.map((c) => (
                  <button
                    key={c.handle}
                    type="button"
                    onClick={() => setCollection((cur) => (cur === c.handle ? null : c.handle))}
                    aria-pressed={collection === c.handle}
                    className={chip(collection === c.handle)}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {types.length > 1 && (
            <div>
              <p className="eyebrow mb-2 text-white/40">Type</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
                <button type="button" onClick={() => setType(null)} aria-pressed={type === null} className={chip(type === null)}>
                  All
                </button>
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType((cur) => (cur === t ? null : t))}
                    aria-pressed={type === t}
                    className={chip(type === t)}
                  >
                    {label(t)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-white/10 bg-charcoal p-10 text-center text-white/50">
          Nothing matches that filter yet.
        </p>
      )}
    </div>
  );
}

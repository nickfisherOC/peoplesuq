"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import type { ProductDetail, ProductVariantDetail } from "@/lib/shopify";

/** Rough colour-name to swatch map; unknown names fall back to a neutral. */
const SWATCH: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f4f4f5",
  teal: "#17807f",
  green: "#2f9e44",
  grey: "#8a8a8a",
  gray: "#8a8a8a",
  navy: "#20304a",
  red: "#c0392b",
  blue: "#2563eb",
  orange: "#f97316",
  purple: "#7b2ff0",
  pink: "#db2777",
  yellow: "#eab308",
  brown: "#8b5a2b",
  beige: "#e3d9c6",
  cream: "#f3ead3",
  charcoal: "#36393f",
  maroon: "#7b241c",
  sand: "#d8c9a3",
};
const swatchColor = (v: string) => SWATCH[v.trim().toLowerCase()] ?? "#777";
const isColorOption = (name: string) => /colou?r/i.test(name);

function matchVariant(
  variants: ProductVariantDetail[],
  selected: Record<string, string>,
): ProductVariantDetail | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value),
  );
}

export default function ProductBuyBox({ product }: { product: ProductDetail }) {
  const { addItem, busy } = useCart();

  // Initial selection: the first available variant (or the first variant).
  const initial = useMemo(() => {
    const base = product.variants.find((v) => v.available) ?? product.variants[0];
    const sel: Record<string, string> = {};
    base?.selectedOptions.forEach((o) => (sel[o.name] = o.value));
    return sel;
  }, [product.variants]);

  const [selected, setSelected] = useState<Record<string, string>>(initial);
  const [imgOverride, setImgOverride] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const current = matchVariant(product.variants, selected);

  /** Is there an available variant for this option=value given the rest of the
   *  current selection? (used to disable impossible/sold-out combinations) */
  const optionAvailable = (name: string, value: string) => {
    const probe = { ...selected, [name]: value };
    const v = matchVariant(product.variants, probe);
    return Boolean(v?.available);
  };

  const choose = (name: string, value: string) => {
    setSelected((s) => ({ ...s, [name]: value }));
    if (isColorOption(name)) setImgOverride(null); // image follows the colour
    setAdded(false);
  };

  const mainSrc =
    imgOverride ?? current?.image?.src ?? product.images[0]?.src ?? "";
  const price = current?.price ?? product.price;
  const canBuy = Boolean(current?.available) && !busy;

  async function handleAdd() {
    if (!current || !current.available) return;
    await addItem(current.id, 1);
    setAdded(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white">
          {mainSrc ? (
            <Image
              src={mainSrc}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          ) : null}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.images.map((img) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImgOverride(img.src)}
                aria-label="Show image"
                className={`relative h-16 w-16 overflow-hidden rounded-lg border bg-white ${
                  mainSrc === img.src ? "border-orange-500" : "border-white/15"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details + options */}
      <div>
        <h1 className="headline text-3xl text-white md:text-4xl">
          {product.title}
        </h1>
        {price && (
          <p className="mt-3 text-xl font-semibold text-orange-400">{price}</p>
        )}

        <div className="mt-6 space-y-6">
          {product.options.map((opt) => {
            const color = isColorOption(opt.name);
            return (
              <div key={opt.name}>
                <p className="mb-2 text-sm font-semibold text-white/80">
                  {opt.name}
                  {selected[opt.name] ? (
                    <span className="font-normal text-white/50">
                      {": "}
                      {selected[opt.name]}
                    </span>
                  ) : null}
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((value) => {
                    const isSel = selected[opt.name] === value;
                    const avail = optionAvailable(opt.name, value);
                    if (color) {
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => choose(opt.name, value)}
                          title={value + (avail ? "" : " (unavailable)")}
                          aria-label={value}
                          aria-pressed={isSel}
                          className={`relative h-9 w-9 rounded-full border transition ${
                            isSel
                              ? "border-orange-500 ring-2 ring-orange-500/50"
                              : "border-white/25 hover:border-white/50"
                          } ${avail ? "" : "opacity-40"}`}
                          style={{ backgroundColor: swatchColor(value) }}
                        >
                          {!avail && (
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/80">
                              ✕
                            </span>
                          )}
                        </button>
                      );
                    }
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => choose(opt.name, value)}
                        aria-pressed={isSel}
                        className={`min-w-11 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                          isSel
                            ? "border-orange-500 bg-orange-500 text-ink"
                            : "border-white/20 text-white/80 hover:border-white/40"
                        } ${avail ? "" : "text-white/30 line-through"}`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canBuy}
            className="w-full rounded-full bg-orange-500 px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-orange-400 disabled:opacity-50 sm:w-auto sm:px-10"
          >
            {busy
              ? "Adding…"
              : !current
                ? "Unavailable"
                : !current.available
                  ? "Sold out"
                  : added
                    ? "Added ✓ Add another"
                    : "Add to cart"}
          </button>
          <p className="mt-3 text-xs text-white/40">
            Secure checkout powered by Shopify. Shipping and taxes calculated at
            checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

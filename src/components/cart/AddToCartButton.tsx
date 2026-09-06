"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

/**
 * Add-to-cart control for a Shopify variant. Only meaningful when a store is
 * connected; parents render it only for products that have a `variantId`.
 */
export default function AddToCartButton({
  variantId,
  available = true,
  className = "",
}: {
  variantId: string;
  available?: boolean;
  className?: string;
}) {
  const { addItem, busy } = useCart();
  const [adding, setAdding] = useState(false);

  if (!available) {
    return (
      <span className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/50">
        Sold out
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={busy || adding}
      onClick={async () => {
        setAdding(true);
        try {
          await addItem(variantId, 1);
        } finally {
          setAdding(false);
        }
      }}
      className={`inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-orange-400 disabled:opacity-60 ${className}`}
    >
      {adding ? "Adding…" : "Add to cart"}
    </button>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";

/** Slide-in cart panel. Renders only when a store is connected. */
export default function CartDrawer() {
  const {
    configured,
    open,
    setOpen,
    cart,
    busy,
    updateItem,
    removeItem,
    checkout,
  } = useCart();

  // Lock scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!configured) return null;

  const lines = cart?.lines ?? [];

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-charcoal shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold text-white">Your cart</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-white/50">
              <p className="text-white/70">Your cart is empty.</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 text-sm font-semibold text-orange-400"
              >
                Keep shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-ink">
                    {line.image?.src && (
                      <Image
                        src={line.image.src}
                        alt={line.image.alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {line.title}
                    </p>
                    {line.variantTitle && (
                      <p className="text-xs text-white/50">
                        {line.variantTitle}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center rounded-full border border-white/15">
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(line.id, Math.max(0, line.quantity - 1))
                          }
                          disabled={busy}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1 text-white/70 hover:text-white disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm text-white">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={busy}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1 text-white/70 hover:text-white disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        disabled={busy}
                        className="text-xs text-white/45 hover:text-orange-400 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {line.lineTotal && (
                    <span className="text-sm font-medium text-white/80">
                      {line.lineTotal}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-white/10 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-white/60">Subtotal</span>
              <span className="font-semibold text-white">
                {cart?.subtotal ?? "—"}
              </span>
            </div>
            <p className="mb-3 text-xs text-white/40">
              Shipping &amp; taxes calculated at checkout.
            </p>
            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className="w-full rounded-full bg-orange-500 px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-orange-400 disabled:opacity-50"
            >
              {busy ? "Working…" : "Checkout"}
            </button>
            <p className="mt-2 text-center text-xs text-white/35">
              Secure checkout powered by Shopify
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}

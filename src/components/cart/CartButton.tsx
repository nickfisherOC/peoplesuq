"use client";

import { useCart } from "./CartProvider";

/** Header cart trigger with item count. Hidden until a store is connected. */
export default function CartButton({
  className = "",
}: {
  className?: string;
}) {
  const { configured, count, setOpen } = useCart();
  if (!configured) return null;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 ${className}`}
      aria-label={`Open cart${count ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[0.7rem] font-bold text-ink">
          {count}
        </span>
      )}
    </button>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Cart } from "@/lib/shopify";

interface CartState {
  cart: Cart | null;
  /** Whether a Shopify store is connected (controls the whole shop UX). */
  configured: boolean;
  ready: boolean;
  busy: boolean;
  open: boolean;
  count: number;
  setOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [configured, setConfigured] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d: { configured: boolean; cart: Cart | null }) => {
        setConfigured(Boolean(d.configured));
        setCart(d.cart ?? null);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const mutate = useCallback(
    async (body: Record<string, unknown>, openAfter = false) => {
      setBusy(true);
      try {
        const r = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const d: { configured?: boolean; cart?: Cart | null } = await r.json();
        if (typeof d.configured === "boolean") setConfigured(d.configured);
        if (d.cart !== undefined) setCart(d.cart ?? null);
        if (openAfter) setOpen(true);
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const addItem = useCallback(
    (variantId: string, quantity = 1) =>
      mutate({ action: "add", variantId, quantity }, true),
    [mutate],
  );
  const updateItem = useCallback(
    (lineId: string, quantity: number) =>
      mutate({ action: "update", lineId, quantity }),
    [mutate],
  );
  const removeItem = useCallback(
    (lineId: string) => mutate({ action: "remove", lineId }),
    [mutate],
  );

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  }, [cart]);

  const value: CartState = {
    cart,
    configured,
    ready,
    busy,
    open,
    count: cart?.totalQuantity ?? 0,
    setOpen,
    addItem,
    updateItem,
    removeItem,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

import { NextRequest, NextResponse } from "next/server";
import {
  isShopifyConfigured,
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeCartLine,
  type Cart,
} from "@/lib/shopify";

const COOKIE = "psuq_cart";
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 14, // 14 days
};

function ok(cart: Cart | null, setId?: string) {
  const res = NextResponse.json({ configured: true, cart });
  if (setId) res.cookies.set(COOKIE, setId, COOKIE_OPTS);
  return res;
}

/** Current cart. */
export async function GET(req: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ configured: false, cart: null });
  }
  const cartId = req.cookies.get(COOKIE)?.value;
  if (!cartId) return ok(null);
  try {
    return ok(await getCart(cartId));
  } catch {
    return ok(null);
  }
}

/** Mutate cart: { action: "add" | "update" | "remove", ... }. */
export async function POST(req: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { configured: false, error: "Store not configured" },
      { status: 200 },
    );
  }

  let body: {
    action?: string;
    variantId?: string;
    lineId?: string;
    quantity?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const cartId = req.cookies.get(COOKIE)?.value;
  const qty = Math.max(0, body.quantity ?? 1);

  try {
    switch (body.action) {
      case "add": {
        if (!body.variantId)
          return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
        // Reuse existing cart if it's still valid, else start a new one.
        if (cartId) {
          const existing = await getCart(cartId).catch(() => null);
          if (existing) {
            return ok(await addToCart(cartId, body.variantId, qty || 1), cartId);
          }
        }
        const created = await createCart(body.variantId, qty || 1);
        return ok(created, created.id);
      }
      case "update": {
        if (!cartId || !body.lineId)
          return NextResponse.json({ error: "Missing cart or line" }, { status: 400 });
        return ok(await updateCartLine(cartId, body.lineId, qty), cartId);
      }
      case "remove": {
        if (!cartId || !body.lineId)
          return NextResponse.json({ error: "Missing cart or line" }, { status: 400 });
        return ok(await removeCartLine(cartId, body.lineId), cartId);
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[api/cart]", err);
    return NextResponse.json(
      { configured: true, error: "Cart operation failed" },
      { status: 500 },
    );
  }
}

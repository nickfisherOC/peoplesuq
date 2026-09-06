import type { Product } from "@/content/types";

/**
 * Shopify Storefront API client (server-side only).
 *
 * All Shopify access goes through here. Products are fetched for listing pages;
 * cart operations power the on-site cart and hand off to Shopify's hosted,
 * PCI-compliant checkout (we never handle payment data). Everything degrades
 * gracefully: when the store isn't configured, callers fall back to the local
 * placeholder merch and the cart stays disabled.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

function csv(v: string | undefined): string[] {
  return (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * How the People Suq shop decides which products to show — all managed in
 * Shopify, so no code/env changes are needed as the catalog grows:
 *
 *  - INCLUDE_COLLECTIONS (SHOPIFY_COLLECTION_HANDLES): if set, show products
 *    from exactly these collections (merged). Otherwise, show products from
 *    EVERY collection except EXCLUDE_COLLECTIONS — so any new collection you
 *    create in Shopify appears automatically.
 *  - EXCLUDE_COLLECTIONS (SHOPIFY_EXCLUDE_COLLECTIONS): collections to skip in
 *    auto mode (defaults to Shopify's auto-generated "frontpage"/Home page).
 *  - HANDLES (SHOPIFY_PRODUCT_HANDLES): a last-resort safety net so the shop is
 *    never empty before any collections exist.
 */
const INCLUDE_COLLECTIONS = csv(process.env.SHOPIFY_COLLECTION_HANDLES);
const EXCLUDE_COLLECTIONS = new Set(
  csv(process.env.SHOPIFY_EXCLUDE_COLLECTIONS || "frontpage"),
);
const HANDLES = csv(process.env.SHOPIFY_PRODUCT_HANDLES);

/** True when a store domain + Storefront token are present. */
export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

const endpoint = () =>
  `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

type Money = { amount: string; currencyCode: string };

export function formatMoney(m?: Money | null): string | undefined {
  if (!m) return undefined;
  const n = Number(m.amount);
  if (Number.isNaN(n)) return undefined;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: m.currencyCode || "USD",
      minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    }).format(n);
  } catch {
    return `${m.amount} ${m.currencyCode}`;
  }
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  cache: RequestCache = "no-store",
): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured");
  }
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    // Revalidate product data periodically when cached.
    next: cache === "no-store" ? undefined : { revalidate: 300 },
  });
  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (!res.ok || json.errors?.length) {
    throw new Error(
      json.errors?.map((e) => e.message).join("; ") ||
        `Shopify request failed (${res.status})`,
    );
  }
  return json.data as T;
}

/* ------------------------------- Products -------------------------------- */

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  availableForSale
  onlineStoreUrl
  featuredImage { url altText width height }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { nodes { id availableForSale } }
  collections(first: 20) { nodes { handle title } }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  onlineStoreUrl: string | null;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: { minVariantPrice: Money };
  variants: { nodes: { id: string; availableForSale: boolean }[] };
  collections: { nodes: { handle: string; title: string }[] };
}

function toProduct(n: ShopifyProductNode): Product {
  const variant = n.variants.nodes[0];
  return {
    slug: n.handle,
    name: n.title,
    price: formatMoney(n.priceRange.minVariantPrice),
    cause: n.description || "",
    image: {
      src: n.featuredImage?.url ?? "",
      alt: n.featuredImage?.altText ?? n.title,
    },
    shopUrl: n.onlineStoreUrl ?? undefined,
    variantId: variant?.id,
    available: n.availableForSale && (variant?.availableForSale ?? true),
    productType: n.productType || undefined,
    tags: n.tags,
    // Only the People Suq collections (exclude the auto/commercial ones).
    collections: n.collections.nodes.filter(
      (c) => !EXCLUDE_COLLECTIONS.has(c.handle),
    ),
  };
}

async function fetchAllProductNodes(
  first: number,
): Promise<ShopifyProductNode[]> {
  const data = await shopifyFetch<{
    products: { nodes: ShopifyProductNode[] };
  }>(
    `query AllProducts($first: Int!) {
      products(first: $first) { nodes { ${PRODUCT_FIELDS} } }
    }`,
    { first },
    "force-cache",
  );
  return data.products.nodes;
}

/** Does a product belong to a People Suq collection (per include/exclude rules)? */
function inPeopleSuq(node: ShopifyProductNode): boolean {
  const handles = node.collections.nodes.map((c) => c.handle);
  if (handles.length === 0) return false; // uncollected products never show
  if (INCLUDE_COLLECTIONS.length > 0) {
    return handles.some((h) => INCLUDE_COLLECTIONS.includes(h));
  }
  // Auto mode: any collection except the excluded ones counts.
  return handles.some((h) => !EXCLUDE_COLLECTIONS.has(h));
}

/**
 * Fetch People Suq merch — all managed in Shopify. Products are pulled from
 * People Suq collections (merged + de-duplicated); see the config docs above.
 * Any product not in a qualifying collection (e.g. SUQ MEDIA's commercial
 * items) is excluded automatically. Falls back to the curated handle safety
 * net, then the whole catalog, so the shop is never unexpectedly empty.
 *
 * Returns null when Shopify isn't configured so callers fall back to the local
 * placeholder merch.
 */
export async function getMerchProducts(
  first = 50,
): Promise<Product[] | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const all = await fetchAllProductNodes(Math.max(first, 50));

    // 1) Products in People Suq collections (the normal path).
    const inCollections = all.filter(inPeopleSuq);
    if (inCollections.length > 0) return inCollections.map(toProduct);

    // 2) Curated safety net, before any collections exist.
    if (HANDLES.length > 0) {
      const bySlug = new Map(all.map((n) => [n.handle, n]));
      const picked = HANDLES.map((h) => bySlug.get(h)).filter(
        (n): n is ShopifyProductNode => Boolean(n),
      );
      if (picked.length > 0) return picked.map(toProduct);
    }

    // 3) Nothing qualified — return empty rather than leaking commercial items.
    return [];
  } catch (err) {
    console.error("[shopify] getMerchProducts failed:", err);
    return null;
  }
}

/* --------------------------------- Cart ---------------------------------- */

export interface CartLine {
  id: string;
  quantity: number;
  title: string;
  variantTitle?: string;
  price?: string;
  lineTotal?: string;
  image?: { src: string; alt: string };
  productHandle?: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal?: string;
  lines: CartLine[];
}

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          title
          price { amount currencyCode }
          product { title handle featuredImage { url altText } }
        }
      }
    }
  }
`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: Money };
      merchandise: {
        title: string;
        price: Money;
        product: {
          title: string;
          handle: string;
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
}

function normalizeCart(c: RawCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: formatMoney(c.cost.subtotalAmount),
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      title: l.merchandise.product.title,
      variantTitle:
        l.merchandise.title === "Default Title"
          ? undefined
          : l.merchandise.title,
      price: formatMoney(l.merchandise.price),
      lineTotal: formatMoney(l.cost.totalAmount),
      image: l.merchandise.product.featuredImage
        ? {
            src: l.merchandise.product.featuredImage.url,
            alt:
              l.merchandise.product.featuredImage.altText ??
              l.merchandise.product.title,
          }
        : undefined,
      productHandle: l.merchandise.product.handle,
    })),
  };
}

export async function createCart(
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );
  const errs = data.cartCreate.userErrors;
  if (errs?.length) throw new Error(errs.map((e) => e.message).join("; "));
  return normalizeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(
    `query GetCart($id: ID!) { cart(id: $id) { ${CART_FRAGMENT} } }`,
    { id: cartId },
  );
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  const errs = data.cartLinesAdd.userErrors;
  if (errs?.length) throw new Error(errs.map((e) => e.message).join("; "));
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  const errs = data.cartLinesUpdate.userErrors;
  if (errs?.length) throw new Error(errs.map((e) => e.message).join("; "));
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: { message: string }[] };
  }>(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }`,
    { cartId, lineIds: [lineId] },
  );
  const errs = data.cartLinesRemove.userErrors;
  if (errs?.length) throw new Error(errs.map((e) => e.message).join("; "));
  return normalizeCart(data.cartLinesRemove.cart);
}

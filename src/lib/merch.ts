import { products as localProducts } from "@/content/products";
import { getMerchProducts } from "./shopify";
import type { Product } from "@/content/types";

/**
 * Source of truth for merch across the site. Returns live Shopify products
 * when the store is configured; otherwise the local placeholder merch. `live`
 * lets the UI show a real "Add to cart" flow vs. a "Coming soon" state.
 */
export async function getMerch(
  limit?: number,
): Promise<{ products: Product[]; live: boolean }> {
  const shopify = await getMerchProducts();
  if (shopify && shopify.length > 0) {
    return {
      products: limit ? shopify.slice(0, limit) : shopify,
      live: true,
    };
  }
  return {
    products: limit ? localProducts.slice(0, limit) : localProducts,
    live: false,
  };
}

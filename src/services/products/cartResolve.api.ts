import { apiFetch } from "../http.ts";

type CartResolveRequestItem = {
  productId: string;
  qty: number;
};

export type CartResolvedItem = {
  productId: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  availabilityStatus: "in_stock" | "made_to_order" | "unavailable";
  stockQty: number | null;
};

export type CartResolveResponse = {
  items: CartResolvedItem[];
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "";


export const resolveCart = async (
  items: CartResolveRequestItem[],
): Promise<CartResolveResponse> => {
  return apiFetch<CartResolveResponse>(`${API_BASE}/products/cart-resolve`, {
    method: "POST",
    body: JSON.stringify({ items }),
  });
};

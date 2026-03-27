import type {
  ProductsApi,
  ProductsListParams,
  ProductsListResponse,
} from "./products.api";
import type { Product } from "../../types/product";
import { apiFetch } from "../http";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

function qs(params?: ProductsListParams) {
  const sp = new URLSearchParams();
  if (!params) return "";

  if (params.q) sp.set("q", params.q);
  if (params.sort) sp.set("sort", params.sort);
  if (params.page) sp.set("page", String(params.page));
  if (params.pageSize) sp.set("pageSize", String(params.pageSize));

  if (params.categories?.length) {
    sp.set("categories", params.categories.join(","));
  }

  if (typeof params.priceMin === "number") {
    sp.set("priceMin", String(params.priceMin));
  }

  if (typeof params.priceMax === "number") {
    sp.set("priceMax", String(params.priceMax));
  }

  const s = sp.toString();
  return s ? `?${s}` : "";
}

export const productsApiHttp: ProductsApi = {
  list: async (params): Promise<ProductsListResponse> => {
    return apiFetch<ProductsListResponse>(`${API_BASE}/products${qs(params)}`, {
      method: "GET",
    });
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    return apiFetch<Product>(
      `${API_BASE}/products/${encodeURIComponent(slug)}`,
      {
        method: "GET",
      },
    );
  },
};

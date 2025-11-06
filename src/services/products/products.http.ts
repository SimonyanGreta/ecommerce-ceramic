import type {
  ProductsApi,
  ProductsListParams,
  ProductsListResponse,
} from "./products.api";
import type { Product } from "../../types/product";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

function qs(params?: ProductsListParams) {
  const sp = new URLSearchParams();
  if (!params) return "";

  if (params.q) sp.set("q", params.q);
  if (params.sort) sp.set("sort", params.sort);
  if (params.page) sp.set("page", String(params.page));
  if (params.pageSize) sp.set("pageSize", String(params.pageSize));

  const s = sp.toString();
  return s ? `?${s}` : "";
}

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export const productsApiHttp: ProductsApi = {
  list: async (params): Promise<ProductsListResponse> => {
    const res = await fetch(`${API_BASE}/products${qs(params)}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    return parseJson<ProductsListResponse>(res);
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    const res = await fetch(
      `${API_BASE}/products/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );
    return parseJson<Product>(res);
  },
};

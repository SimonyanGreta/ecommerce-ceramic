import type {
  ProductsApi,
  ProductsListParams,
  ProductsListResponse,
} from "./products.api";
import type { Product } from "../../types/product";
import { MOCK_PRODUCTS } from "../../helpers/mocks";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function applyQuery(items: Product[], q?: string) {
  const query = (q ?? "").trim().toLowerCase();
  if (!query) return items;
  return items.filter((p) => {
    const hay = `${p.name} ${p.description ?? ""}`.toLowerCase();
    return hay.includes(query);
  });
}

function applySort(items: Product[], sort?: ProductsListParams["sort"]) {
  const s = sort ?? "featured";
  const arr = [...items];

  switch (s) {
    case "priceAsc":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      arr.sort((a, b) => b.price - a.price);
      break;
    case "nameAsc":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      arr.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "featured":
    default:
      // исходный порядок
      break;
  }

  return arr;
}

function applyPagination(items: Product[], page = 1, pageSize = 24) {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, Math.min(100, pageSize));

  const start = (safePage - 1) * safeSize;
  const end = start + safeSize;

  return {
    items: items.slice(start, end),
    page: safePage,
    pageSize: safeSize,
    total: items.length,
  };
}

export const productsApiMock: ProductsApi = {
  list: async (params): Promise<ProductsListResponse> => {
    await sleep(180); // имитация сети

    const filtered = applyQuery(MOCK_PRODUCTS, params?.q);
    const sorted = applySort(filtered, params?.sort);
    return applyPagination(sorted, params?.page ?? 1, params?.pageSize ?? 24);
  },

  getBySlug: async (slug: string) => {
    await sleep(120);
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ?? null;
  },
};

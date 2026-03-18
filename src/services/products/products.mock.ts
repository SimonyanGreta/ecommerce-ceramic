import type {
  ProductsApi,
  ProductsListParams,
  ProductsListResponse,
} from "./products.api";
import type { Product } from "../../types/product";
import { MOCK_PRODUCTS } from "../../helpers/mocks";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const applyQuery = (items: Product[], q?: string) => {
  const query = (q ?? "").trim().toLowerCase();
  if (!query) return items;

  return items.filter((p) => {
    const hay = `${p.name} ${p.description ?? ""}`.toLowerCase();
    return hay.includes(query);
  });
};

const applyCategories = (
  items: Product[],
  categories?: ProductsListParams["categories"],
) => {
  if (!categories || categories.length === 0) return items;
  return items.filter((p) => categories.includes(p.category));
};

const applyPrice = (items: Product[], priceMin?: number, priceMax?: number) => {
  return items.filter((p) => {
    if (typeof priceMin === "number" && p.price < priceMin) return false;
    if (typeof priceMax === "number" && p.price > priceMax) return false;
    return true;
  });
};

const applySort = (items: Product[], sort?: ProductsListParams["sort"]) => {
  const s = sort ?? "featured";
  const arr = [...items];

  switch (s) {
    case "priceAsc":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      arr.sort((a, b) => b.price - a.price);
      break;
    case "featured":
    default:
      break;
  }

  return arr;
};

const applyPagination = (items: Product[], page = 1, pageSize = 24) => {
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
};

export const productsApiMock: ProductsApi = {
  list: async (params): Promise<ProductsListResponse> => {
    await sleep(180);

    const queried = applyQuery(MOCK_PRODUCTS, params?.q);
    const categorized = applyCategories(queried, params?.categories);
    const priced = applyPrice(categorized, params?.priceMin, params?.priceMax);
    const sorted = applySort(priced, params?.sort);
    const paged = applyPagination(
      sorted,
      params?.page ?? 1,
      params?.pageSize ?? 24,
    );

    return paged;
  },

  getBySlug: async (slug: string) => {
    await sleep(120);
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ?? null;
  },
};

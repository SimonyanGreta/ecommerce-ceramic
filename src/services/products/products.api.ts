import type { Product, ProductCategory } from "../../types/product";

export type ProductsSort =
  | "featured"
  | "priceAsc"
  | "priceDesc"
  | "nameAsc"
  | "nameDesc";

export type ProductsListParams = {
  q?: string;
  sort?: ProductsSort;
  page?: number;
  pageSize?: number;

  categories?: ProductCategory[];
  priceMin?: number;
  priceMax?: number;
};

export type ProductsListResponse = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductsApi = {
  list: (params?: ProductsListParams) => Promise<ProductsListResponse>;
  getBySlug: (slug: string) => Promise<Product | null>;
};

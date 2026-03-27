import type { CategoryOption } from "../../types/product.ts";

export type MetaApi = {
  getCategories: () => Promise<CategoryOption[]>;
};

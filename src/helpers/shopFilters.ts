import type { ProductCategory } from "../types/product";

type Params = {
  categories: ProductCategory[];
  priceMin?: number;
  priceMax?: number;
};

export const getActiveFiltersCount = ({
  categories,
  priceMin,
  priceMax,
}: Params) => {
  let count = 0;

  count += categories.length;

  if (typeof priceMin === "number") count += 1;
  if (typeof priceMax === "number") count += 1;

  return count;
};

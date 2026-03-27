import type { MoneyCurrency } from "../constants/currency";

export type ProductId = string;

export type ProductCategory =
  | "cups-mugs"
  | "plates-platters"
  | "vases"
  | "seasoning-containers"
  | "kettles";

export type CategoryOption = {
  code: ProductCategory;
  label: string;
  sortOrder: number;
  isActive: boolean;
};

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  description?: string;
  price: number;
  currency: MoneyCurrency;
  image: string;

  category: ProductCategory;

  // на будущее
  stock?: number;
  attributes?: Record<string, string | number | boolean>;
};

export type CartItem = {
  productId: ProductId;
  name: string;
  price: number;
  currency: MoneyCurrency;
  image: string;
  qty: number;
};

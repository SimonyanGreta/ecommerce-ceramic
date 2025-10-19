export type Currency = "USD" | "EUR" | "RUB" | "VND";

export type ProductId = string;

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  description?: string;
  price: number; // в базовой валюте
  currency: Currency;
  image: string; // URL
  // для будущего API:
  stock?: number;
  attributes?: Record<string, string | number | boolean>;
};

export type CartItem = {
  productId: ProductId;
  name: string;
  price: number;
  currency: Currency;
  image: string;
  qty: number;
};

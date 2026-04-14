import type { MoneyCurrency } from "../constants/currency.ts";
import type { ProductAvailabilityStatus } from "./product.ts";

export type CartViewItem = {
  productId: string;
  qty: number;

  name: string;
  price: number;
  currency: MoneyCurrency;
  image: string;

  availabilityStatus: ProductAvailabilityStatus;
  stockQty: number | null;
};
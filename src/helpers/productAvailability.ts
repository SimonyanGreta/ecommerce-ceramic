import type { TFunction } from "i18next";
import type { Product, ProductAvailabilityStatus } from "../types/product";

export const getAvailabilityLabel = (
  t: TFunction,
  availabilityStatus: ProductAvailabilityStatus,
  stockQty: number,
) => {
  if (availabilityStatus === "made_to_order") {
    return t("product.availability.madeToOrder");
  }

  if (availabilityStatus === "unavailable") {
    return t("product.availability.unavailable");
  }

  if (stockQty < 5) {
    return t("product.availability.inStockLow", { stockQty });
  }

  return t("product.availability.inStock");
};

export const getAvailabilityTone = (
  availabilityStatus: ProductAvailabilityStatus,
) => {
  if (availabilityStatus === "made_to_order") {
    return "warning" as const;
  }

  if (availabilityStatus === "unavailable") {
    return "muted" as const;
  }

  return "success" as const;
};

export const getAvailabilityBadgeClassName = (
  availabilityStatus: ProductAvailabilityStatus,
) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";

  const tone = getAvailabilityTone(availabilityStatus);

  if (tone === "success") {
    return `${base} border-success-border bg-success-soft text-success-text`;
  }

  if (tone === "warning") {
    return `${base} border-warning-border bg-warning-soft text-warning-text`;
  }

  return `${base} border-muted-border bg-muted-soft text-muted-text`;
};

export const canAddToCart = (product: Product) => {
  if (product.availabilityStatus === "unavailable") {
    return false;
  }

  if (product.availabilityStatus === "made_to_order") {
    return true;
  }

  return product.stockQty > 0;
};

import type { ApiError } from "../http";

export const ORDER_ERROR_CODES = [
  "VALIDATION_ERROR",
  "ORDER_ITEMS_REQUIRED",
  "PRODUCTS_NOT_FOUND",
  "CURRENCY_MISMATCH",
  "OUT_OF_STOCK",
  "UNAVAILABLE",
  "INTERNAL_ERROR",
] as const;

export type OrderErrorCode = (typeof ORDER_ERROR_CODES)[number];

type OutOfStockItem = {
  productId: string;
  slug: string;
  requested: number;
  available: number;
};

type UnavailableItem = {
  productId: string;
  slug: string;
  availabilityStatus: "unavailable";
};

// type ValidationErrorDetails = {
//   messages?: string[];
// };

type OrderErrorDetails = {
  items?: OutOfStockItem[] | UnavailableItem[];
  messages?: string[];
};

export type OrderApiError = {
  code: OrderErrorCode;
  details?: OrderErrorDetails;
};

const isOrderErrorCode = (value: unknown): value is OrderErrorCode => {
  return (
    typeof value === "string" &&
    ORDER_ERROR_CODES.includes(value as OrderErrorCode)
  );
};

export const isOrderApiError = (value: unknown): value is OrderApiError => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const code = (value as { code?: unknown }).code;
  return isOrderErrorCode(code);
};

export const parseOrderApiError = (error: unknown): OrderApiError | null => {
  if (!error || typeof error !== "object") {
    return null;
  }

  const body = (error as ApiError).body;

  if (isOrderApiError(body)) {
    return body;
  }

  return null;
};

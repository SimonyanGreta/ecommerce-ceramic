import type { TFunction } from "i18next";
import type { CheckoutErrors } from "../../../types/checkout";
import type { CheckoutErrorCodes } from "./checkoutValidation.types";

export function toCheckoutErrors(
  t: TFunction,
  codes: CheckoutErrorCodes,
): CheckoutErrors {
  const out: CheckoutErrors = {};

  for (const [field, code] of Object.entries(codes)) {
    if (!code) continue;

    // ключи вида:
    // checkout.errors.fullName.required
    // checkout.errors.email.invalid
    const key = `checkout.errors.${field}.${code}` as const;

    // CheckoutErrors ожидает строки на ключах полей
    (out as any)[field] = t(key);
  }

  return out;
}

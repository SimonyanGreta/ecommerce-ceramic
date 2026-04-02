import type { TFunction } from "i18next";

import type { CheckoutErrors } from "../../types/checkout";
import type { OrderApiError } from "../../services/orders";
import type { CheckoutItemIssuesMap } from "./checkoutIssues";

type CheckoutOrderErrorResult = {
  errors: CheckoutErrors;
  itemIssues: CheckoutItemIssuesMap;
};

export const mapOrderApiErrorToCheckoutState = (
  t: TFunction,
  error: OrderApiError,
): CheckoutOrderErrorResult => {
  switch (error.code) {
    case "VALIDATION_ERROR": {
      const messages = error.details?.messages;

      return {
        errors: {
          form: messages?.length
            ? messages.join(" ")
            : t("checkout.errors.validation"),
        },
        itemIssues: {},
      };
    }

    case "ORDER_ITEMS_REQUIRED":
      return {
        errors: { form: t("checkout.errors.itemsRequired") },
        itemIssues: {},
      };

    case "PRODUCTS_NOT_FOUND":
      return {
        errors: { form: t("checkout.errors.productsNotFound") },
        itemIssues: {},
      };

    case "CURRENCY_MISMATCH":
      return {
        errors: { form: t("checkout.errors.currencyMismatch") },
        itemIssues: {},
      };

    case "OUT_OF_STOCK": {
      const items = error.details?.items ?? [];
      const itemIssues: CheckoutItemIssuesMap = {};

      for (const item of items) {
        if (
          item &&
          typeof item === "object" &&
          "productId" in item &&
          "requested" in item &&
          "available" in item
        ) {
          itemIssues[String(item.productId)] = {
            type: "out_of_stock",
            requested: Number(item.requested),
            available: Number(item.available),
          };
        }
      }

      return {
        errors: {
          form: t("checkout.errors.outOfStock"),
        },
        itemIssues,
      };
    }

    case "UNAVAILABLE": {
      const items = error.details?.items ?? [];
      const itemIssues: CheckoutItemIssuesMap = {};

      for (const item of items) {
        if (item && typeof item === "object" && "productId" in item) {
          itemIssues[String(item.productId)] = {
            type: "unavailable",
          };
        }
      }

      return {
        errors: {
          form: t("checkout.errors.unavailable"),
        },
        itemIssues,
      };
    }

    case "INTERNAL_ERROR":
      return {
        errors: { form: t("checkout.errors.internal") },
        itemIssues: {},
      };

    default:
      return {
        errors: { form: t("checkout.errors.orderFailed") },
        itemIssues: {},
      };
  }
};

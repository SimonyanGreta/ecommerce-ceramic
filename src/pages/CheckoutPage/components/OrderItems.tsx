import { formatMoney } from "../../../helpers/money.ts";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../../../types/product.ts";
import type { CheckoutItemIssuesMap } from "../../../features/checkout/checkoutIssues";
import billet from "../../../assets/images/logoBalvanka.png";

type Props = {
  items: CartItem[];
  issuesByProductId?: CheckoutItemIssuesMap;
};

export function OrderItems({ items, issuesByProductId = {} }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <h2 className="mb-4 font-medium">{t("checkout.orderItemsTitle")}</h2>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">{t("checkout.emptyCart")}</div>
      ) : (
        <div className="space-y-2">
          {items.map((it) => {
            const issue = issuesByProductId[it.productId];

            const issueContainerClassName =
              issue?.type === "out_of_stock"
                ? "border-warning-border bg-warning-soft"
                : issue?.type === "unavailable"
                  ? "border-danger-border bg-danger-soft"
                  : "border-black/5";

            const issueTextClassName =
              issue?.type === "out_of_stock"
                ? "text-warning-text"
                : "text-danger-text";

            return (
              <div
                key={it.productId}
                className={`flex items-center gap-3 rounded-xl border p-3 ${issueContainerClassName}`}
              >
                <img
                  src={it.image !== "img" ? it.image : billet}
                  className="h-12 w-12 rounded-lg object-cover"
                  alt={it.name}
                />

                <div className="flex-1">
                  <div className="text-sm">{it.name}</div>

                  <div className="text-xs opacity-70">
                    {it.qty} ×{" "}
                    {formatMoney(it.price, it.currency, i18n.language)}
                  </div>

                  {issue?.type === "out_of_stock" && (
                    <div
                      className={`mt-2 text-xs font-medium ${issueTextClassName}`}
                    >
                      {t("checkout.errors.itemIssues.outOfStock", {
                        requested: issue.requested,
                        available: issue.available,
                      })}
                    </div>
                  )}

                  {issue?.type === "unavailable" && (
                    <div
                      className={`mt-2 text-xs font-medium ${issueTextClassName}`}
                    >
                      {t("checkout.errors.itemIssues.unavailable")}
                    </div>
                  )}
                </div>

                <div className="text-sm font-medium">
                  {formatMoney(it.qty * it.price, it.currency, i18n.language)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

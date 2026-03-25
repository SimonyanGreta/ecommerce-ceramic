import { formatMoney } from "../../../helpers/money.ts";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../../../types/product.ts";
import billet from "../../../assets/images/logoBalvanka.png";

type Props = {
  items: CartItem[];
};

export function OrderItems({ items }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <div className="rounded-2xl border border-black/10 p-4 bg-white">
      <h2 className="font-medium mb-4">{t("checkout.orderItemsTitle")}</h2>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">{t("checkout.emptyCart")}</div>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div
              key={it.productId}
              className="flex items-center gap-3 rounded-xl border border-black/5 p-3"
            >
              <img
                src={it.image !== "img" ? it.image : billet}
                className="w-12 h-12 object-cover rounded-lg"
                alt={it.name}
              />
              <div className="flex-1">
                <div className="text-sm">{it.name}</div>
                <div className="text-xs opacity-70">
                  {it.qty} × {formatMoney(it.price, it.currency, i18n.language)}
                </div>
              </div>
              <div className="text-sm font-medium">
                {formatMoney(it.qty * it.price, it.currency, i18n.language)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

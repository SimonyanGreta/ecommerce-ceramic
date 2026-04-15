import { memo } from "react";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";

import { QuantitySelector } from "../../ui/components/QuantitySelector";
import { Button } from "../../ui/components/Button";
import { formatMoney } from "../../helpers/money";
import {
  getAvailabilityBadgeClassName,
  getAvailabilityLabel,
} from "../../helpers/productAvailability";

import billet from "../../assets/images/logoBalvanka.png";
import type { CartViewItem } from "../../types/cart";

type Props = {
  item: CartViewItem;
};

export const CartItem = memo(({ item }: Props) => {
  const { setQty, remove } = useCart();
  const { t, i18n } = useTranslation();

  const isUnavailable = item.availabilityStatus === "unavailable";

  const availabilityLabel = getAvailabilityLabel(
    t,
    item.availabilityStatus,
    item.stockQty ?? 0,
  );

  const availabilityClassName = getAvailabilityBadgeClassName(
    item.availabilityStatus,
  );

  const isOverStock =
    item.availabilityStatus === "in_stock" &&
    item.stockQty !== null &&
    item.qty > item.stockQty;

  return (
    <div className="flex gap-3 py-3 border-b border-black/10">
      <img
        src={item.image !== "img" ? item.image : billet}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-xl"
      />

      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>

        <div className="mt-1">
          <span className={availabilityClassName}>{availabilityLabel}</span>
        </div>

        <div className="text-xs opacity-70 mt-1">
          {formatMoney(item.price, item.currency, i18n.language)}
        </div>

        {isOverStock && (
          <div className="text-xs text-red-600 mt-1">
            {t("cart.item.exceedsStock", { stockQty: item.stockQty })}
          </div>
        )}

        <div className="mt-2 flex items-center gap-3">
          <QuantitySelector
            value={item.qty}
            min={1}
            max={isOverStock ? item.stockQty! : 50}
            onChange={(next) => setQty(item.productId, next)}
            disabled={isUnavailable}
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(item.productId)}
            aria-label="remove"
            className="ml-auto"
          >
            {t("common.remove")}
          </Button>
        </div>
      </div>
    </div>
  );
});

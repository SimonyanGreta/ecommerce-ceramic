import { memo } from "react";
import { useCart } from "../../hooks/useCart";
import type { CartItem as TCartItem } from "../../types/product";
import { QuantitySelector } from "../../ui/components/QuantitySelector";
import { Button } from "../../ui/components/Button";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../helpers/money";

type Props = { item: TCartItem };

export const CartItem = memo(({ item }: Props) => {
  const { setQty, remove } = useCart();
  const { t, i18n } = useTranslation();

  return (
    <div className="flex gap-3 py-3 border-b border-black/10">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-xl"
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>

        <div className="text-xs opacity-70">
          {formatMoney(item.price, item.currency, i18n.language)}
        </div>

        <div className="mt-2 flex items-center gap-3">
          <QuantitySelector
            value={item.qty}
            min={1}
            max={99}
            onChange={(next) => setQty(item.productId, next)}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(item.productId)}
            aria-label="remove"
            className="ml-auto"
          >
            {t("common.remove", "Remove")}
          </Button>
        </div>
      </div>
    </div>
  );
});

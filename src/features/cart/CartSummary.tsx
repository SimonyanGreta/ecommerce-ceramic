import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../helpers/money";
import { useCartStore } from "../../stores/cart.store";
import { Button, ButtonLink } from "../../ui/components/Button";

export const CartSummary = () => {
  const { subtotal, count, clear } = useCart();
  const { closeCart } = useCartDrawer();
  const { t, i18n } = useTranslation();

  const currency = useCartStore((s) => s.currency);

  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur pt-3 border-t border-black/10">
      <div className="flex items-center justify-between text-sm">
        <div className="opacity-70">{count}</div>

        <div className="font-semibold">
          {t("cart.summary.subtotal")}:
          {formatMoney(subtotal, currency, i18n.language)}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <ButtonLink
          to="/checkout"
          variant="secondary"
          size="md"
          fullWidth
          onClick={closeCart}
        >
          {t("cart.summary.checkout")}
        </ButtonLink>

        <Button variant="danger" size="md" onClick={clear}>
          {t("cart.summary.clear")}
        </Button>
      </div>
    </div>
  );
};

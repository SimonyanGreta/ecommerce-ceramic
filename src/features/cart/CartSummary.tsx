import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../helpers/money";
import { useCartStore } from "../../stores/cart.store";

export const CartSummary = () => {
  const { subtotal, count, clear } = useCart();
  const { closeCart } = useCartDrawer();
  const { t, i18n } = useTranslation();

  const currency = useCartStore((s) => s.currency);
  const hasItems = count > 0;

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
        <Link
          to="/checkout"
          className={`flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 border border-black/10 transition ${
            hasItems
              ? "hover:bg-primary hover:text-white"
              : "pointer-events-none opacity-50"
          }`}
          onClick={() => hasItems && closeCart()}
        >
          {t("cart.summary.checkout")}
        </Link>

        <button
          className="px-4 py-2 rounded-xl border border-black/10 hover:border-red-500 hover:text-red-600"
          onClick={clear}
          disabled={!hasItems}
        >
          {t("cart.summary.clear")}
        </button>
      </div>
    </div>
  );
};

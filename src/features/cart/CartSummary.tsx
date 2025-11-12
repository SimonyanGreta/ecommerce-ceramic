import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { useCartDrawer } from "../../hooks/useCartDrawer.ts";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../helpers/money.ts";

export const CartSummary = () => {
  const { subtotal, count, items, clear } = useCart();
  const { closeCart } = useCartDrawer();

  const { t, i18n } = useTranslation();
  const currency = items[0]?.currency ?? "USD"; // пока просто так

  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur pt-3 border-t border-black/10">
      <div className="flex items-center justify-between text-sm">
        <div className="opacity-70">{count}</div>
        <div className="font-semibold">
          {t("cart.summary.subtotal")}:{formatMoney(subtotal, currency, i18n.language)}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          to="/checkout"
          className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 border border-black/10 hover:bg-black hover:text-white transition"
          onClick={() => closeCart()}
        >
          {t("cart.summary.checkout")}
        </Link>

        <button
          className="px-4 py-2 rounded-xl border border-black/10 hover:border-red-500 hover:text-red-600"
          onClick={clear}
        >
          {t("cart.summary.clear")}
        </button>
      </div>
    </div>
  );
};

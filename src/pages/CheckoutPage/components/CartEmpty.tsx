import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmptyCart from "../../../assets/icon/cart_empty.tsx";

export function CartEmpty() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <EmptyCart />
        </div>

        <p className="text-lg font-semibold">{t("checkout.emptyCart")}</p>

        <Link
          to="/shop"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 border border-black/10 bg-primary hover:bg-background-dark text-white transition"
        >
          {t("checkout.actions.goShop")}
        </Link>
      </div>
    </div>
  );
}

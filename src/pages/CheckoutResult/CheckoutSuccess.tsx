import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

export const CheckoutSuccess = () => {
  const { t } = useTranslation();
  const [sp] = useSearchParams();
  const orderId = sp.get("orderId");

  return (
    <div className="py-28 container mx-auto px-4">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">{t("checkout.successTitle")}</h1>
        <p className="mt-2 opacity-70 text-sm">{t("checkout.successText")}</p>

        {orderId && (
          <div className="mt-4 text-sm">
            <span className="opacity-70">{t("checkout.orderId")}:</span>
            <span className="font-medium">{orderId}</span>
          </div>
        )}

        <Link
          to="/shop"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 border border-black/10 bg-primary hover:bg-background-dark text-white transition"
        >
          {t("checkout.actions.goShop")}
        </Link>
      </div>
    </div>
  );
};

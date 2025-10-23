import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  const { t } = useTranslation();

  return (
    <div className="py-28 container mx-auto px-4">
      <div className="max-w-xl mx-auto rounded-2xl border border-black/10 p-6 bg-white">
        <h1 className="text-2xl font-semibold">{t("checkout.successTitle")}</h1>
        <p className="mt-2 opacity-70 text-sm">{t("checkout.successText")}</p>

        <Link
          to="/shop"
          className="mt-6 w-full inline-flex items-center justify-center rounded-xl px-4 py-3 border border-black/10 hover:bg-black hover:text-white transition"
        >
          {t("nav.shop")}
        </Link>
      </div>
    </div>
  );
}

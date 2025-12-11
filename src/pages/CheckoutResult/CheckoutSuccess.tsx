import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ButtonLink } from "../../ui/components/Button";

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

        <ButtonLink
          to="/shop"
          variant="primary"
          size="lg"
          fullWidth
          className="mt-6"
        >
          {t("checkout.actions.goShop")}
        </ButtonLink>
      </div>
    </div>
  );
};

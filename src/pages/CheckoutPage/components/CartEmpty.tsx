import { useTranslation } from "react-i18next";
import EmptyCart from "../../../assets/icon/cart_empty.tsx";
import { ButtonLink } from "../../../ui/components/Button";

export function CartEmpty() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <EmptyCart />
        </div>

        <p className="text-lg font-semibold">{t("checkout.emptyCart")}</p>

        <ButtonLink to="/shop" variant="primary" fullWidth className="mt-4">
          {t("checkout.actions.goShop")}
        </ButtonLink>
      </div>
    </div>
  );
}

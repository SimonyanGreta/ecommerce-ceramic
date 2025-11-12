import { useTranslation } from "react-i18next";

export const CartDrawerEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 text-center opacity-70">
      <div className="text-lg">{t("cart.empty.title")}</div>
      <div className="text-sm">{t("cart.empty.subtitle")}</div>
    </div>
  );
};

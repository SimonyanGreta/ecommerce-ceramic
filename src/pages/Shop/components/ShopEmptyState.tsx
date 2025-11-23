import { useTranslation } from "react-i18next";

type Props = {
  onReset: () => void;
};

export const ShopEmptyState = ({ onReset }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <div className="text-lg font-semibold">{t("shop.empty.title")}</div>
      <div className="mt-1 text-sm opacity-70">{t("shop.empty.subtitle")}</div>

      <button
        type="button"
        className="mt-4 rounded-xl px-4 py-2 border border-black/10 hover:bg-accent hover:text-white transition"
        onClick={onReset}
      >
        {t("shop.actions.reset")}
      </button>
    </div>
  );
};

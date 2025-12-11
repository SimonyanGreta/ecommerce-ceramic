import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/components/Button";

type Props = {
  onReset: () => void;
};

export const ShopEmptyState = ({ onReset }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <div className="text-lg font-semibold">{t("shop.empty.title")}</div>
      <div className="mt-1 text-sm opacity-70">{t("shop.empty.subtitle")}</div>

      <Button
        variant="primary"
        size="md"
        onClick={onReset}
        aria-label="reset"
        className="mt-4"
      >
        {t("shop.actions.reset")}
      </Button>
    </div>
  );
};

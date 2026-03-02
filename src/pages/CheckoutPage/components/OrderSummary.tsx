import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/components/Button";
import { formatMoney } from "../../../helpers/money.ts";
import type { MoneyCurrency } from "../../../constants/currency.ts";

type Props = {
  subtotal: number;
  shipping: number;
  total: number;
  currency: MoneyCurrency;
  placing: boolean;
  onPlaceOrder: () => void;
};

export function OrderSummary({
  subtotal,
  shipping,
  total,
  currency,
  placing,
  onPlaceOrder,
}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <div className="rounded-2xl border border-black/10 p-4 bg-white h-fit">
      <h2 className="font-medium mb-4">{t("checkout.summaryTitle")}</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="opacity-70">{t("checkout.totals.subtotal")}</span>
          <span className="font-medium">
            {formatMoney(subtotal, currency, i18n.language)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="opacity-70">{t("checkout.totals.shipping")}</span>
          <span className="font-medium">
            {formatMoney(shipping, currency, i18n.language)}
          </span>
        </div>

        <div className="border-t border-black/10 pt-3 flex justify-between">
          <span className="opacity-70">{t("checkout.totals.total")}</span>
          <span className="text-base font-semibold">
            {formatMoney(total, currency, i18n.language)}
          </span>
        </div>
      </div>
      <Button
        variant="primary"
        type="submit"
        fullWidth
        loading={placing}
        onClick={onPlaceOrder}
        className="mt-4"
      >
        {placing ? t("checkout.placingOrder") : t("checkout.placeOrder")}
      </Button>
    </div>
  );
}

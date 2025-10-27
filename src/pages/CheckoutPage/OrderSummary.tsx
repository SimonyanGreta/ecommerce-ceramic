import { formatMoney, type MoneyCurrency } from "../../helpers/money";
import { useTranslation } from "react-i18next";

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

      <button
        disabled={placing}
        onClick={onPlaceOrder}
        className="w-full mt-4 rounded-xl px-4 py-3 border border-black/10 hover:bg-black hover:text-white transition disabled:opacity-60"
      >
        {placing ? t("checkout.placingOrder") : t("checkout.placeOrder")}
      </button>
    </div>
  );
}

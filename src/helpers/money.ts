import type { MoneyCurrency } from "../constants/currency";

export const formatMoney = (
  amount: number,
  currency: MoneyCurrency,
  locale: string,
) => {
  const fractionDigits =
    currency === "AMD" || currency === "RUB" || currency === "VND" ? 0 : 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
};

export type MoneyCurrency = "USD" | "EUR" | "RUB" | "VND";

export function formatMoney(
  amount: number,
  currency: MoneyCurrency,
  locale?: string,
) {
  // locale можно брать из i18n.language позже
  const safeLocale = locale ?? "en-US";

  try {
    return new Intl.NumberFormat(safeLocale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // fallback если валюта/локаль не поддержана
    return `${amount.toFixed(2)} ${currency}`;
  }
}

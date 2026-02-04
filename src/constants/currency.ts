export const CURRENCIES = ["USD", "EUR", "RUB", "VND", "AMD"] as const;

export type MoneyCurrency = (typeof CURRENCIES)[number];

export const DEFAULT_CURRENCY: MoneyCurrency = "AMD";

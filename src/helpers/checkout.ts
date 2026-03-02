import type { MoneyCurrency } from "../constants/currency.ts";

export type ShippingRuleInput = {
  subtotal: number;
  currency: MoneyCurrency;
  country?: string;
};

export function calcShipping(input: ShippingRuleInput): number {
  // MVP-правило (твое текущее):
  // бесплатно от 100, иначе 12
  // ВАЖНО: это временная логика, потом заменить на shipping из бэка
  const { subtotal } = input;
  return subtotal >= 100 ? 0 : 12;
}

export function calcOrderTotals(input: ShippingRuleInput) {
  const shipping = calcShipping(input);
  const total = input.subtotal + shipping;
  return { shipping, total };
}

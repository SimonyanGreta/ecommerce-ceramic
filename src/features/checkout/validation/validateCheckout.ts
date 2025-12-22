import type { CheckoutForm } from "../../../types/checkout";
import type { CheckoutErrorCodes } from "./checkoutValidation.types";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Простая “разумная” проверка телефона без либ:
// - разрешаем +, пробелы, (), -, но считаем только цифры
// TODO сделать правильную валидацию номера телефона
function normalizeDigits(input: string) {
  return input.replace(/\D/g, "");
}

export function validateCheckout(form: CheckoutForm): CheckoutErrorCodes {
  const e: CheckoutErrorCodes = {};

  if (!form.fullName.trim()) e.fullName = "required";

  if (!form.email.trim()) e.email = "required";
  else if (!emailRe.test(form.email.trim())) e.email = "invalid";

  if (!form.phone.trim()) e.phone = "required";
  else {
    const digits = normalizeDigits(form.phone);
    if (digits.length < 9) e.phone = "invalid";
  }

  if (!form.address.trim()) e.address = "required";

  if (!form.city.trim()) e.city = "required";
  if (!form.country.trim()) e.country = "required";

  return e;
}

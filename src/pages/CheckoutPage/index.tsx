import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { ShippingForm } from "./components/ShippingForm";
import { OrderItems } from "./components/OrderItems";
import { OrderSummary } from "./components/OrderSummary";
import { CartEmpty } from "./components/CartEmpty";

import type { CheckoutErrors, CheckoutForm } from "../../types/checkout";
import type { CreateOrderPayload } from "../../types/order";

import { calcOrderTotals } from "../../helpers/checkout";
import { ordersApi } from "../../services/orders";
import { validateCheckout } from "../../features/checkout/validation/validateCheckout";
import { toCheckoutErrors } from "../../features/checkout/validation/mapCheckoutErrors";
import { DEFAULT_CURRENCY } from "../../constants/currency";
import { useCheckoutResultStore } from "../../stores/checkout-result.store";

const CHECKOUT_DRAFT_KEY = "checkoutDraft:v1";

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  notes: "",
};

export const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLastSuccessOrder = useCheckoutResultStore(
    (state) => state.setLastSuccessOrder,
  );

  const [form, setForm] = useState<CheckoutForm>(() => {
    try {
      const raw = localStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (!raw) return initialForm;

      const parsed = JSON.parse(raw) as Partial<CheckoutForm>;
      return { ...initialForm, ...parsed };
    } catch {
      return initialForm;
    }
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(form));
    } catch {
      // ignore
    }
  }, [form]);

  const currency = items[0]?.currency ?? DEFAULT_CURRENCY;

  const { shipping, total } = useMemo(
    () => calcOrderTotals({ subtotal, currency, country: form.country }),
    [subtotal, currency, form.country],
  );

  const setField = <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const validate = (): CheckoutErrors => {
    const codes = validateCheckout(form);
    return toCheckoutErrors(t, codes);
  };

  const placeOrder = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: CreateOrderPayload = {
      customer: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
        notes: form.notes.trim() ? form.notes.trim() : undefined,
      },
      items: items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price: item.price,
      })),
      subtotal,
      shipping,
      total,
      currency,
    };

    setPlacing(true);

    try {
      const { orderId } = await ordersApi.createOrder(payload);

      setLastSuccessOrder({
        orderId,
        createdAt: new Date().toISOString(),
      });

      clear();
      localStorage.removeItem(CHECKOUT_DRAFT_KEY);

      navigate("/checkout/success", { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
      // TODO сделать правильную обработку после подключения бекенда
      // setErrors({ form: msg || t("checkout.errors.orderFailed") });
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-xl font-semibold">{t("checkout.title")}</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <ShippingForm
          form={form}
          errors={errors}
          setField={setField}
          placing={placing}
        />

        <div className="space-y-6">
          <OrderItems items={items} />

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            currency={currency}
            placing={placing}
            onPlaceOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
};

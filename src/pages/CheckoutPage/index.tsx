import { useMemo, useState, useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShippingForm } from "./components/ShippingForm";
import { OrderItems } from "./components/OrderItems";
import { OrderSummary } from "./components/OrderSummary";
import { CartEmpty } from "./components/CartEmpty";

import type { CheckoutErrors, CheckoutForm } from "../../types/checkout";
import { calcOrderTotals } from "../../helpers/checkout";

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

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(form));
    } catch {
      // ignore
    }
  }, [form]);

  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placing, setPlacing] = useState(false);

  const currency = items[0]?.currency ?? "USD";

  const { shipping, total } = useMemo(
    () => calcOrderTotals({ subtotal, currency, country: form.country }),
    [subtotal, currency, form.country],
  );

  if (items.length === 0) {
    return <CartEmpty />;
  }

  const setField = <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => {
      const { [key]: _, ...rest } = e;
      return rest;
    });
  };

  const validate = (): CheckoutErrors => {
    const e: CheckoutErrors = {};

    if (!form.fullName.trim()) e.fullName = t("checkout.errors.fullName");
    if (!form.email.trim()) e.email = t("checkout.errors.email");
    if (!form.address.trim()) e.address = t("checkout.errors.address");

    return e;
  };

  const placeOrder = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setPlacing(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // mock
      clear();
      localStorage.removeItem(CHECKOUT_DRAFT_KEY);
      navigate("/checkout/success", { replace: true });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="py-28 container mx-auto px-4">
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
}

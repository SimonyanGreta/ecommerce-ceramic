import { useMemo, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShippingForm } from "./components/ShippingForm.tsx";
import { OrderItems } from "./components/OrderItems.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";
import { CartEmpty } from "./components/CartEmpty.tsx";
import type { CheckoutErrors, CheckoutForm } from "../../types/checkout.ts";

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

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placing, setPlacing] = useState(false);

  const currency = items[0]?.currency ?? "USD";

  // мок-доставка: бесплатно от 100, иначе 12
  const shipping = useMemo(() => (subtotal >= 100 ? 0 : 12), [subtotal]);
  const total = subtotal + shipping;

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
      await new Promise((r) => setTimeout(r, 600)); // mock
      clear();
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

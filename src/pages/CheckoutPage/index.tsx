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
import type { CheckoutItemIssuesMap } from "../../features/checkout/checkoutIssues";

import { calcOrderTotals } from "../../helpers/checkout";
import { validateCheckout } from "../../features/checkout/validation/validateCheckout";
import { toCheckoutErrors } from "../../features/checkout/validation/mapCheckoutErrors";
import { mapOrderApiErrorToCheckoutState } from "../../features/checkout/mapOrderApiError";

import { DEFAULT_CURRENCY } from "../../constants/currency";
import { useCheckoutResultStore } from "../../stores/checkout-result.store";
import { ordersApi, parseOrderApiError } from "../../services/orders";

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
  const [itemIssues, setItemIssues] = useState<CheckoutItemIssuesMap>({});

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
      const { [key]: _removed, form: _form, ...rest } = prev;
      return rest;
    });
  };

  const validate = (): CheckoutErrors => {
    const codes = validateCheckout(form);
    return toCheckoutErrors(t, codes);
  };

  const placeOrder = async () => {
    setItemIssues({});

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

      if (!orderId) {
        setErrors({
          form: t("checkout.errors.orderFailed"),
        });
        return;
      }

      setItemIssues({});
      setLastSuccessOrder({
        orderId,
        createdAt: new Date().toISOString(),
      });

      clear();
      localStorage.removeItem(CHECKOUT_DRAFT_KEY);

      navigate("/checkout/success", { replace: true });
    } catch (err) {
      const apiError = parseOrderApiError(err);

      if (apiError) {
        const nextState = mapOrderApiErrorToCheckoutState(t, apiError);
        setErrors(nextState.errors);
        setItemIssues(nextState.itemIssues);
        return;
      }

      setErrors({
        form: t("checkout.errors.orderFailed"),
      });
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

      {errors.form && (
        <div className="mt-4 rounded-2xl border border-danger-border bg-danger-soft px-4 py-3 text-sm text-danger-text">
          {errors.form}
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <ShippingForm
          form={form}
          errors={errors}
          setField={setField}
          placing={placing}
        />

        <div className="space-y-6">
          <OrderItems items={items} issuesByProductId={itemIssues} />

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

import { useMemo, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../helpers/money";
import { FormField } from "../../components/form/FormField.tsx";
import { useNavigate } from "react-router-dom";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  country: string;
  notes: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>> & {
  form?: string;
};

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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placing, setPlacing] = useState(false);

  const currency = items[0]?.currency ?? "USD";

  // мок-доставка: бесплатно от 100, иначе 12
  const shipping = useMemo(() => (subtotal >= 100 ? 0 : 12), [subtotal]);
  const total = subtotal + shipping;

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

    if (items.length === 0) {
      e.form = t("checkout.errors.cartEmpty");
      return e;
    }

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
        {/* LEFT: SHIPPING FORM */}
        <div className="md:col-span-2 rounded-2xl border border-black/10 p-4 bg-white">
          {errors.form && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.form}
            </div>
          )}

          <h2 className="font-medium mb-4">{t("checkout.shippingTitle")}</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              label={t("checkout.fields.fullName")}
              required
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              error={errors.fullName}
              autoComplete="name"
            />

            <FormField
              label={t("checkout.fields.email")}
              required
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <FormField
              label={t("checkout.fields.phone")}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              autoComplete="tel"
            />

            <FormField
              label={t("checkout.fields.address")}
              required
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              error={errors.address}
              className="sm:col-span-2"
              autoComplete="street-address"
            />

            <FormField
              label={t("checkout.fields.city")}
              value={form.city}
              onChange={(e) => setField("city", e.target.value)}
              autoComplete="address-level2"
            />

            <FormField
              label={t("checkout.fields.country")}
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
              autoComplete="country-name"
            />

            <FormField
              as="textarea"
              label={t("checkout.fields.notes")}
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              className="sm:col-span-2"
            />
          </div>
        </div>

        {/* RIGHT: Order items + Summary */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-black/10 p-4 bg-white">
            <h2 className="font-medium mb-4">
              {t("checkout.orderItemsTitle")}
            </h2>

            {items.length === 0 ? (
              <div className="text-sm opacity-70">
                {t("checkout.emptyCart")}
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((it) => (
                  <div
                    key={it.productId}
                    className="flex items-center gap-3 rounded-xl border border-black/5 p-3"
                  >
                    <img
                      src={it.image}
                      className="w-12 h-12 object-cover rounded-lg"
                      alt={it.name}
                    />
                    <div className="flex-1">
                      <div className="text-sm">{it.name}</div>
                      <div className="text-xs opacity-70">
                        {it.qty} ×{" "}
                        {formatMoney(it.price, it.currency, i18n.language)}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {formatMoney(
                        it.qty * it.price,
                        it.currency,
                        i18n.language,
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-black/10 p-4 h-fit bg-white">
            <h2 className="font-medium mb-4">{t("checkout.summaryTitle")}</h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="opacity-70">
                  {t("checkout.totals.subtotal")}
                </span>
                <span className="font-medium">
                  {formatMoney(subtotal, currency, i18n.language)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="opacity-70">
                  {t("checkout.totals.shipping")}
                </span>
                <span className="font-medium">
                  {formatMoney(shipping, currency, i18n.language)}
                </span>
              </div>

              <div className="border-t border-black/10 pt-3 flex items-center justify-between">
                <span className="opacity-70">{t("checkout.totals.total")}</span>
                <span className="text-base font-semibold">
                  {formatMoney(total, currency, i18n.language)}
                </span>
              </div>
            </div>

            <button
              disabled={placing}
              onClick={placeOrder}
              className="w-full mt-4 rounded-xl px-4 py-3 border border-black/10 hover:bg-black hover:text-white transition disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-inherit"
            >
              {placing ? t("checkout.placingOrder") : t("checkout.placeOrder")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

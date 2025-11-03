import { FormField } from "../../../components/form/FormField.tsx";
import { useTranslation } from "react-i18next";
import type { CheckoutErrors, CheckoutForm } from "../../../types/checkout.ts";

type Props = {
  form: CheckoutForm;
  errors: CheckoutErrors;
  placing: boolean;
  setField: <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) => void;
};

export function ShippingForm({ form, errors, placing, setField }: Props) {
  const { t } = useTranslation();

  return (
    <div className="md:col-span-2 rounded-2xl border border-black/10 p-4 bg-white">
      <h2 className="font-medium mb-4">{t("checkout.shippingTitle")}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <FormField
          label={t("checkout.fields.fullName")}
          required
          value={form.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          error={errors.fullName}
          disabled={placing}
        />

        <FormField
          label={t("checkout.fields.email")}
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          error={errors.email}
          disabled={placing}
        />

        <FormField
          label={t("checkout.fields.phone")}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          disabled={placing}
        />

        <FormField
          label={t("checkout.fields.address")}
          required
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
          error={errors.address}
          className="sm:col-span-2"
          disabled={placing}
        />

        <FormField
          label={t("checkout.fields.city")}
          required
          value={form.city}
          onChange={(e) => setField("city", e.target.value)}
          error={errors.city}
          disabled={placing}
        />

        <FormField
          label={t("checkout.fields.country")}
          required
          value={form.country}
          onChange={(e) => setField("country", e.target.value)}
          error={errors.country}
          disabled={placing}
        />

        <FormField
          as="textarea"
          label={t("checkout.fields.notes")}
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
          className="sm:col-span-2"
          disabled={placing}
        />
      </div>
    </div>
  );
}

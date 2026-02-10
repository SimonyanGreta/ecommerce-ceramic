import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../../../ui/components/Button";
import { FormField } from "../../../ui/components/FormField";

type ContactFormState = {
  email: string;
  message: string;
};

const initialForm: ContactFormState = {
  email: "",
  message: "",
};

export const ContactForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactFormState>(initialForm);

  const setField = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    // TODO: подключить backend/API отправки формы
    console.log("contact form submit", form);
  };

  return (
    <section className="h-full rounded-2xl bg-white/30 backdrop-blur-md p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-semibold">{t("info.touchTitle")}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-secondary">
        <FormField
          required
          type="email"
          placeholder={t("info.fields.email")}
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          autoComplete="email"
        />

        <FormField
          as="textarea"
          required
          placeholder={t("info.fields.message")}
          rows={5}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
        />

        <Button type="submit" variant="primary" size="md" fullWidth>
          {t("info.actions.send")}
        </Button>
      </form>
    </section>
  );
};

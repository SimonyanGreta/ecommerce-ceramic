import { useTranslation } from "react-i18next";

import { Info } from "../../widgets/Info";
import { LocationMap } from "../../widgets/LocationMap";
import { ContactForm } from "./components/ContactForm";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {t("contact.title")}
        </h1>

        <p className="mt-3 text-sm leading-6 text-secondary md:text-base">
          {t("contact.description")}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <Info isContactPage />
        <ContactForm />
      </div>

      <div className="mt-10">
        <LocationMap />
      </div>
    </div>
  );
};

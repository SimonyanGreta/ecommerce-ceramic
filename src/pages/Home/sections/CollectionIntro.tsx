import { useTranslation } from "react-i18next";

export const CollectionIntro = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 text-center bg-accent">
      <h2 className="text-3xl font-bold mb-4 tracking-wide">
        {t("intro.ourCollection")}
      </h2>
      <p className="max-w-2xl mx-auto text-secondary text-lg">
        {t("intro.discover")}
      </p>
    </section>
  );
};

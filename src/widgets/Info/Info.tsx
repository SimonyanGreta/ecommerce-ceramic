import Instagram from "../../assets/icon/Instagram.tsx";
import { Button } from "../../ui/components/Button";
import { FormField } from "../../ui/components/FormField";
import { useTranslation } from "react-i18next";

export const Info = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-10">
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t("info.whereTitle")}</h2>

        <div className="space-y-6 text-secondary">
          <div>
            <p className="font-medium">Artashat, XXXX 15</p>
            <p className="text-sm">Nuard Boutique</p>
            <p className="text-sm mt-1">Mon–Sat: 10:00–18:00</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">Yerevan, Buzand St, Vernissage</p>
            <p className="text-sm">Art Market XX</p>
            <p className="text-sm mt-1">09:00–17:00</p>

            <a
              href="https://www.instagram.com/nuardceramics/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 hover:text-primary transition text-sm"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">{t("info.touchTitle")}</h2>

        <form className="bg-white/5 backdrop-blur-md p-6 rounded-xl space-y-4 shadow-inner text-secondary">
          <FormField
            required
            type="email"
            placeholder="you@example.com"
            value=""
            onChange={() => {}}
            autoComplete="email"
          />

          <FormField
            as="textarea"
            required
            placeholder="Your message..."
            rows={4}
            value=""
            onChange={() => {}}
          />

          <Button type="submit" variant="primary" size="md" fullWidth>
            {t("info.actions.send")}
          </Button>
        </form>
      </div>
    </div>
  );
};

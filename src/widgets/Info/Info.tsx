import { useTranslation } from "react-i18next";

import { ButtonLink } from "../../ui/components/Button";
import Instagram from "../../assets/icon/Instagram";
import Email from "../../assets/icon/email";
import Phone from "../../assets/icon/phone";

type InfoProps = {
  isContactPage?: boolean;
};

export const Info = ({ isContactPage = false }: InfoProps) => {
  const { t } = useTranslation();

  return (
    <section className="h-full rounded-2xl bg-white/30 p-6 shadow-sm backdrop-blur-md sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold">{t("info.whereTitle")}</h2>

        {!isContactPage && (
          <ButtonLink to="/contact" variant="outline" size="sm">
            {t("info.actions.openContactPage")}
          </ButtonLink>
        )}
      </div>

      <div className="space-y-8 text-secondary">
        <div className="space-y-2">
          <p className="font-medium text-black">Artashat, XXXX 15</p>
          <p className="text-sm">Nuard Boutique</p>
          <p className="text-sm">Mon–Sat: 10:00–18:00</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-black">
            Yerevan, Buzand St, Vernissage
          </p>
          <p className="text-sm">Art Market XX</p>
          <p className="text-sm">09:00–17:00</p>
        </div>
        <div className="flex md:flex-row flex-col gap-3 border-t border-black/10 pt-6">
          <a
            href="https://www.instagram.com/nuardceramics/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition hover:text-primary"
            aria-label="Instagram"
          >
            <Instagram />
            <span>@nuardceramics</span>
          </a>

          <a
            href="mailto:nuard@ceramics.com"
            className="inline-flex items-center gap-2 text-sm transition hover:text-primary"
            aria-label="Email"
          >
            <Email />
            <span>nuard@ceramics.com</span>
          </a>

          <a
            href="tel:+374xxxxxx"
            className="inline-flex items-center gap-2 text-sm transition hover:text-primary"
            aria-label="Phone"
          >
            <Phone />
            <span>+374 xxxxxx</span>
          </a>
        </div>{" "}
      </div>
    </section>
  );
};

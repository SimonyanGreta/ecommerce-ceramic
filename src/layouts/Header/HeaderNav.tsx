import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  onNavigate?: () => void;
  mobile?: boolean;
};

export const HeaderNav = ({ onNavigate, mobile = false }: Props) => {
  const { t } = useTranslation();

  const baseClass = mobile ? "rounded-xl px-3 py-2 transition" : "transition";

  const getClassName = ({ isActive }: { isActive: boolean }) =>
    [
      baseClass,
      mobile
        ? isActive
          ? "bg-primary/10 text-background-dark"
          : "hover:bg-primary/10 text-background-dark"
        : isActive
          ? "text-background-dark"
          : "hover:text-background-dark",
    ].join(" ");

  return (
    <nav
      className={
        mobile ? "flex flex-col gap-2 font-semibold" : "flex items-center gap-4"
      }
    >
      <NavLink to="/" onClick={onNavigate} className={getClassName}>
        {t("nav.home")}
      </NavLink>

      <NavLink to="/shop" onClick={onNavigate} className={getClassName}>
        {t("nav.shop")}
      </NavLink>

      <NavLink to="/about" onClick={onNavigate} className={getClassName}>
        {t("nav.about")}
      </NavLink>

      <NavLink to="/contact" onClick={onNavigate} className={getClassName}>
        {t("nav.contact")}
      </NavLink>
    </nav>
  );
};

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { useCart } from "../../hooks/useCart";
import { Button } from "../../ui/components/Button";
import Cart from "../../assets/icon/cart";

export const Header = () => {
  const { t } = useTranslation();
  const { toggleCart } = useCartDrawer();
  const { count } = useCart();

  return (
    <header className="fixed text-primary font-bold top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b p-4 border-white/20 shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Nuard Ceramics
        </Link>

        <nav className="flex items-center gap-4 mt-2 sm:mt-0">
          <Link to="/" className="hover:text-primary">
            {t("nav.home")}
          </Link>
          <Link to="/shop" className="hover:text-primary">
            {t("nav.shop")}
          </Link>
          <Link to="/about" className="hover:text-primary">
            {t("nav.about")}
          </Link>
          <Link to="/contact" className="hover:text-primary">
            {t("nav.contact")}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCart}
            aria-label="open cart"
            className="relative p-2 rounded"
          >
            <Cart />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 px-1.5 py-0.5 text-[10px] rounded-full bg-primary text-white leading-none">
                {count}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
};

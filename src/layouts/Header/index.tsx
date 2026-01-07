import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { useCart } from "../../hooks/useCart";

import { Button } from "../../ui/components/Button";
import { Drawer } from "../../ui/components/Drawer";
import { LanguageSelect } from "../../widgets/LanguageSelect";
import { HeaderNav } from "./HeaderNav";

import Cart from "../../assets/icon/cart";
import Menu from "../../assets/icon/menu";

export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const { toggleCart } = useCartDrawer();
  const { count } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  // Автозакрытие mobile menu при смене route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed text-primary font-bold top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b p-4 border-white/20 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label="open menu"
              className="p-2 rounded"
            >
              <Menu />
            </Button>
          </div>

          <Link to="/" className="text-xl font-bold tracking-wide shrink-0">
            Nuard Ceramics
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <HeaderNav />

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

          <LanguageSelect />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelect />

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
        </div>
      </div>

      <Drawer
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        position="left"
        width="18rem"
        title={t("menu.title")}
      >
        <HeaderNav mobile onNavigate={closeMobileMenu} />
      </Drawer>
    </header>
  );
};

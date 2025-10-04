import { Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";
import { Contact } from "../pages/Contact";
import { CursorSepia } from "../components/CursorSepia";
import { Footer } from "../ui/components/Footer";

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-main">
      <header className="fixed text-primary font-bold top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b p-4 border-white/20 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide">
            Nuard Ceramics
          </Link>

          <nav className="flex gap-4 mt-2 sm:mt-0">
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
          </nav>
        </div>
      </header>

      <CursorSepia />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

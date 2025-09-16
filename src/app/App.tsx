import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {About} from "../pages/About";
import {Home} from "../pages/Home";
import {Contact} from "../pages/Contact";

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4">
        <nav className="flex gap-4">
          <a href="/">{t("nav.home")}</a>
          <a href="/about">{t("nav.about")}</a>
          <a href="/contact">{t("nav.contact")}</a>
        </nav>
      </header>

      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 text-center py-4">
        <p>© {new Date().getFullYear()} MyB2B</p>
      </footer>
    </div>
  );
}

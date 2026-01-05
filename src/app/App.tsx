import { Routes, Route } from "react-router-dom";
import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";
import { Contact } from "../pages/Contact";
import { ProductDetails } from "../pages/ProductDetails";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutSuccess } from "../pages/CheckoutResult";
import { CartDrawer } from "../features/cart/CartDrawer.tsx";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { ScrollToTop } from "./ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-main">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </main>

      <CartDrawer />

      <Footer />
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";
import { Contact } from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import CheckoutPage from "../pages/CheckoutPage";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import { CartDrawer } from "../features/cart/CartDrawer.tsx";
import { CursorSepia } from "../components/CursorSepia";
import { Footer } from "../ui/components/Footer";
import { Header } from "../layouts/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-main">
      <Header />
      <CursorSepia />

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

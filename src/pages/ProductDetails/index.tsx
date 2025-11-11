import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";

// мок. Позже заменишь на fetch
import { useProduct } from "../../features/products/hooks/useProduct";
import { QuantitySelector } from "../../ui/components/QuantitySelector";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { add } = useCart();
  const { openCart } = useCartDrawer();
  const { product, loading, error } = useProduct(slug);

  const [qty, setQty] = useState(1);

  if (loading) {
    return (
      <div className="py-28 container mx-auto px-4 text-center opacity-70">
        {t("product.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-28 container mx-auto px-4 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-28 container mx-auto px-4 text-center opacity-70">
        {t("product.notFound")}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-28 grid gap-10 md:grid-cols-2">
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-[480px] object-contain"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 opacity-70">{product.description}</p>
        <div className="mt-4 text-xl font-medium">
          {product.price.toFixed(2)} {product.currency}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-sm opacity-70">{t("product.quantity")}</div>
          <QuantitySelector value={qty} onChange={setQty} min={1} max={99} />
        </div>

        <button
          onClick={() => {
            add(product, qty);
            openCart();
          }}
          className="mt-6 rounded-xl px-6 py-3 border border-black/10 hover:bg-black hover:text-white transition"
        >
          {t("product.addToCart")}
        </button>
        <div className="mt-8 text-sm opacity-70">
          <p>{t("product.freeShipping")}</p>
          <p>{t("product.securePayment")}</p>
        </div>
      </div>
    </div>
  );
}

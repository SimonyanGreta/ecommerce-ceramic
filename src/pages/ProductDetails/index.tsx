import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";

// TODO мок. Позже заменишь на fetch
import { useProduct } from "../../features/products/hooks/useProduct";
import { ProductDetailsSkeleton } from "../../widgets/ProductDetailsSkeleton";
import { Breadcrumbs } from "../../widgets/Breadcrumbs";
import { BackButton } from "../../widgets/BackButton";
import { Button } from "../../ui/components/Button";
import { formatMoney } from "../../helpers/money";
import { QuantitySelector } from "../../ui/components/QuantitySelector";
import billet from "../../assets/images/logoBalvanka.png";

export const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { add } = useCart();
  const { openCart } = useCartDrawer();
  const { product, loading, error } = useProduct(slug);

  const [qty, setQty] = useState(1);

  if (loading) {
    return <ProductDetailsSkeleton />;
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

  const breadcrumbItems = [
    { label: t("nav.shop"), to: "/shop" },
    {
      label: t(`shop.filters.categories.${product.category}`),
      to: `/shop?categories=${product.category}`,
    },
    { label: product.name },
  ];

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="mb-6 hidden md:flex items-center gap-3">
        <BackButton />
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
          <div className="absolute left-3 top-3 z-10 md:hidden">
            <BackButton />
          </div>

          <img
            src={product.image !== "img" ? product.image : billet}
            alt={product.name}
            className="w-full max-h-120 object-contain"
          />
        </div>

        <div className="lg:col-span-2 grid gap-8 md:grid-cols-12 md:items-start">
          <div className="flex flex-col md:col-span-7">
            <h1 className="text-3xl font-semibold text-background-dark">
              {product.name}
            </h1>

            <p className="mt-3 text-secondary opacity-80">
              {product.description}
            </p>

            <div className="mt-6 border-t border-primary/20 pt-4 text-sm text-secondary opacity-80 space-y-1">
              <p>{t("product.freeShipping")}</p>
              <p>{t("product.securePayment")}</p>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl border border-accent/20 bg-main shadow-lg backdrop-blur-sm p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xl font-semibold text-primary">
                {formatMoney(product.price, product.currency, i18n.language)}
              </div>

              <QuantitySelector
                value={qty}
                onChange={setQty}
                min={1}
                max={99}
              />
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              className="mt-4"
              onClick={() => {
                add(product, qty);
                openCart();
              }}
              aria-label="Add to cart"
            >
              {t("product.addToCart")}
            </Button>

            <div className="mt-3 text-sm text-secondary opacity-70 flex items-center justify-between">
              <span>{t("cart.summary.subtotal")}</span>
              <span className="font-semibold text-background-dark">
                {formatMoney(
                  product.price * qty,
                  product.currency,
                  i18n.language,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

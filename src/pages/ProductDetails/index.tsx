import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";

import { useProduct } from "../../features/products/hooks/useProduct";
import { ProductDetailsSkeleton } from "../../widgets/ProductDetailsSkeleton";
import { Breadcrumbs } from "../../widgets/Breadcrumbs";
import { BackButton } from "../../widgets/BackButton";
import { Button } from "../../ui/components/Button";
import { formatMoney } from "../../helpers/money";
import { QuantitySelector } from "../../ui/components/QuantitySelector";
import billet from "../../assets/images/logoBalvanka.png";
import {
  canAddToCart,
  getAvailabilityBadgeClassName,
  getAvailabilityLabel,
} from "../../helpers/productAvailability.ts";

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
      <div className="container mx-auto px-4 py-28 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-28 text-center opacity-70">
        {t("product.notFound")}
      </div>
    );
  }

  const isAddToCartDisabled = !canAddToCart(product);

  const availabilityLabel = getAvailabilityLabel(
    t,
    product.availabilityStatus,
    product.stockQty,
  );

  const availabilityClassName = getAvailabilityBadgeClassName(
    product.availabilityStatus,
    product.stockQty,
  );

  const breadcrumbItems = [
    { label: t("nav.shop"), to: "/shop" },
    {
      label: product.categoryLabel,
      to: `/shop?categories=${product.category}`,
    },
    { label: product.name },
  ];

  return (
    <div className="container mx-auto px-4 py-28">
      <div className="mb-6 hidden items-center gap-3 md:flex">
        <BackButton />
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="absolute left-3 top-3 z-10 md:hidden">
            <BackButton />
          </div>

          <img
            src={product.image !== "img" ? product.image : billet}
            alt={product.name}
            className="max-h-120 w-full object-contain"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:items-start lg:col-span-2">
          <div className="flex flex-col md:col-span-7">
            <h1 className="text-3xl font-semibold text-background-dark">
              {product.name}
            </h1>

            <p className="mt-3 text-secondary opacity-80">
              {product.description}
            </p>

            <div className="mt-4">
              <span className={availabilityClassName}>{availabilityLabel}</span>
            </div>

            <div className="mt-6 space-y-1 border-t border-primary/20 pt-4 text-sm text-secondary opacity-80">
              <p>{t("product.freeShipping")}</p>
              <p>{t("product.securePayment")}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-accent/20 bg-main p-5 shadow-lg backdrop-blur-sm md:col-span-5">
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
              disabled={isAddToCartDisabled}
              className="mt-4"
              onClick={() => {
                add(product, qty);
                openCart();
              }}
              aria-label={t("product.addToCart")}
            >
              {isAddToCartDisabled
                ? t("product.unavailableAction")
                : t("product.addToCart")}
            </Button>

            <div className="mt-3 flex items-center justify-between text-sm text-secondary opacity-70">
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

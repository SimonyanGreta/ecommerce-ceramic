import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import billet from "../../assets/images/logoBalvanka.png";
import CartPlus from "../../assets/icon/cart_plus";
import { useCart } from "../../hooks/useCart";
import { Button } from "../../ui/components/Button";
import { formatMoney } from "../../helpers/money";
import {
  canAddToCart,
  getAvailabilityBadgeClassName,
  getAvailabilityLabel,
} from "../../helpers/productAvailability";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { add } = useCart();
  const { i18n, t } = useTranslation();

  const isAddToCartDisabled = !canAddToCart(product);

  const availabilityLabel = getAvailabilityLabel(
    t,
    product.availabilityStatus,
    product.stockQty,
  );

  const availabilityClassName = getAvailabilityBadgeClassName(
    product.availabilityStatus,
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
      <Link
        to={`/product/${product.slug}`}
        className="relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden"
        aria-label={t("product.viewMore")}
      >
        <span className={`absolute left-3 top-3 z-10 ${availabilityClassName}`}>
          {availabilityLabel}
        </span>

        <img
          src={product.image !== "img" ? product.image : billet}
          alt={product.name}
          className="h-full object-contain transition duration-500 group-hover:scale-150"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-white/90 px-4 py-1 text-sm font-medium text-gray-800 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {t("product.viewMore")}
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="text-lg font-semibold text-dark">{product.name}</h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-lg font-semibold text-accent">
            {formatMoney(product.price, product.currency, i18n.language)}
          </p>

          <Button
            variant="ghost"
            size="sm"
            aria-label={t("product.addToCart")}
            disabled={isAddToCartDisabled}
            onClick={() => add(product, 1)}
          >
            <CartPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

import CartPlus from "../../../assets/icon/cart_plus";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import type { Product } from "../../../types/product";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../../helpers/money";
import { Button } from "../Button";

type ProductCardProps = { product: Product };

export const ProductCard = ({ product }: ProductCardProps) => {
  const { add } = useCart();
  const { i18n, t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group">
      <Link
        to={`/product/${product.slug}`}
        className="
          relative w-full h-80 flex items-center justify-center overflow-hidden
          cursor-pointer
        "
        aria-label={t("product.viewMore")}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transform group-hover:scale-150 transition duration-500"
        />
        <div
          className="
            absolute inset-0 bg-black/0 group-hover:bg-black/20
            transition duration-500
          "
        />
        <div
          className="
            absolute bottom-4 left-1/2 -translate-x-1/2
            bg-white/90 text-gray-800 text-sm font-medium
            px-4 py-1 rounded-lg opacity-0 group-hover:opacity-100
            transition-all duration-500
          "
        >
          {t("product.viewMore")}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-semibold text-dark">{product.name}</h3>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-accent font-semibold text-lg">
            {formatMoney(product.price, product.currency, i18n.language)}
          </p>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Add to cart"
            onClick={() => add(product, 1)}
          >
            <CartPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

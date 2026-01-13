import { useTranslation } from "react-i18next";
import { ProductCard } from "../../../widgets/ProductCard";
import { MOCK_PRODUCTS } from "../../../helpers/mocks.ts";
import { ButtonLink } from "../../../ui/components/Button";

export const ProductGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ButtonLink
        to="/shop"
        variant="primary"
        className="mt-8 justify-items-center"
      >
        {t("intro.shopNow")}
      </ButtonLink>
    </section>
  );
};

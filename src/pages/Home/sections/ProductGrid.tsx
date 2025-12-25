import { ProductCard } from "../../../widgets/ProductCard";
import {MOCK_PRODUCTS} from "../../../helpers/mocks.ts";

export const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

import { ProductCard } from "../../ui/components/ProductCard";
import {MOCK_PRODUCTS} from "../../helpers/mocks.ts";

export const Shop = () => {
  return (
    <div className="w-full py-24 px-10">
      <h1 className="text-3xl font-bold mb-12 text-center">All Products</h1>

      <section>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

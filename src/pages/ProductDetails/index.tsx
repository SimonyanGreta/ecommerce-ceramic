import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import { useCartDrawer } from '../../hooks/useCartDrawer';
import type { Product } from '../../types/product';

// примитивный мок. Позже заменишь на fetch по slug
import { MOCK_PRODUCTS } from '../../helpers/mocks';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { add } = useCart();
  const { openCart } = useCartDrawer();

  // находим товар по slug
  const product = useMemo<Product | undefined>(
    () => MOCK_PRODUCTS.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    return <div className="p-4 text-center text-gray-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-26 grid gap-10 md:grid-cols-2">
      {/* левая часть — изображение */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-[480px] object-contain"
        />
      </div>

      {/* правая часть — описание */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 text-xl font-medium">
          {product.price.toFixed(2)} {product.currency}
        </div>

        <button
          onClick={() => {
            add(product, 1);
            openCart();
          }}
          className="mt-6 rounded-xl px-6 py-3 border border-black/10 hover:bg-black hover:text-white transition"
        >
          Add to cart
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <p>Free worldwide shipping on orders over $100.</p>
          <p>Secure payment via PayPal or credit card.</p>
        </div>
      </div>
    </div>
  );
}
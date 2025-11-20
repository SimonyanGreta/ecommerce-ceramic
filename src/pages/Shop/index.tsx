import { useState } from "react";
import { ProductCard } from "../../ui/components/ProductCard";
import type { ProductsSort } from "../../services/products/products.api";
import { useProducts } from "../../features/products/hooks/useProducts";
import { useTranslation } from "react-i18next";
import { ProductCardSkeleton } from "../../ui/components/ProductCardSkeleton";

export const Shop = () => {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<ProductsSort>("featured");

  const { data, loading, error } = useProducts({
    q,
    sort,
    page: 1,
    pageSize: 24,
  });

  return (
    <div className="w-full py-24 px-10">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("shop.title")}</h1>

      <div className="container mx-auto mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:max-w-md rounded-xl border border-black/10 bg-white px-4 py-2 outline-none focus:border-black/30 transition"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as ProductsSort)}
          className="rounded-xl border border-black/10 bg-white px-3 py-2 outline-none focus:border-black/30 transition"
        >
          <option value="featured">Featured</option>
          <option value="priceAsc">Price: low → high</option>
          <option value="priceDesc">Price: high → low</option>
          <option value="nameAsc">Name: A → Z</option>
          <option value="nameDesc">Name: Z → A</option>
        </select>
      </div>

      <section className="container mx-auto">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
            {t("shop.error")}
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="mb-4 text-sm opacity-70">
              {t("shop.showing", {
                count: data.items.length,
                total: data.total,
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {data.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

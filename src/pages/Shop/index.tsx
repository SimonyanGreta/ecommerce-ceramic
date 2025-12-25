import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useProducts } from "../../features/products/hooks/useProducts";
import { useShopQueryState } from "../../hooks/useShopQueryState";

import { ProductCard } from "../../widgets/ProductCard";
import { ProductCardSkeleton } from "../../widgets/ProductCardSkeleton";
import { Pagination } from "../../ui/components/Pagination";
import { ShopEmptyState } from "./components/ShopEmptyState.tsx";
import type { ProductsSort } from "../../services/products/products.api.ts";

export const Shop = () => {
  const { t } = useTranslation();

  const {
    q,
    sort,
    page,
    pageSize,
    reset,
    setQuery,
    setSort,
    setPage,
    setTotalPages,
  } = useShopQueryState({ pageSize: 8, defaultSort: "featured" });

  const { data, loading, error } = useProducts({
    q,
    sort,
    page,
    pageSize,
  });

  // когда пришли данные — сообщаем хукy верхнюю границу
  useEffect(() => {
    if (!data) return;
    const tp = Math.max(1, Math.ceil(data.total / data.pageSize));
    setTotalPages(tp);
  }, [data, setTotalPages]);

  return (
    <div className="w-full py-24 px-10">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("shop.title")}</h1>

      <div className="container mx-auto mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("shop.searchPlaceholder")}
          className="w-full sm:max-w-md rounded-xl border border-black/10 bg-white px-4 py-2 outline-none focus:border-black/30 transition"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as ProductsSort)}
          className="rounded-xl border border-black/10 bg-white px-3 py-2 outline-none focus:border-black/30 transition"
        >
          <option value="featured">{t("shop.sort.featured")}</option>
          <option value="priceAsc">{t("shop.sort.priceAsc")}</option>
          <option value="priceDesc">{t("shop.sort.priceDesc")}</option>
          <option value="nameAsc">{t("shop.sort.nameAsc")}</option>
          <option value="nameDesc">{t("shop.sort.nameDesc")}</option>
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
            {data.items.length === 0 ? (
              <ShopEmptyState onReset={reset} />
            ) : (
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

                {data.total > data.pageSize && (
                  <Pagination
                    className="mt-10"
                    page={data.page}
                    pageSize={data.pageSize}
                    total={data.total}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

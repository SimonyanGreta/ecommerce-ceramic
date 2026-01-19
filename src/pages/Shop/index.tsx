import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useProducts } from "../../features/products/hooks/useProducts";
import { useShopQueryState } from "../../hooks/useShopQueryState";

import { ProductCard } from "../../widgets/ProductCard";
import { ProductCardSkeleton } from "../../widgets/ProductCardSkeleton";
import { Pagination } from "../../ui/components/Pagination";
import { Drawer } from "../../ui/components/Drawer";
import { Button } from "../../ui/components/Button";

import { ShopEmptyState } from "./components/ShopEmptyState";
import { ShopFilters } from "./components/ShopFilters";
import { ShopToolbar } from "./components/ShopToolbar";

import { getActiveFiltersCount } from "../../helpers/shopFilters";

import Filter from "../../assets/icon/filter";

export const Shop = () => {
  const { t } = useTranslation();

  const {
    q,
    sort,
    page,
    pageSize,
    categories,
    priceMin,
    priceMax,
    reset,
    setQuery,
    setSort,
    setPage,
    setCategories,
    setPriceMin,
    setPriceMax,
    setTotalPages,
  } = useShopQueryState({ pageSize: 8, defaultSort: "featured" });

  const [searchInput, setSearchInput] = useState(q);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(searchInput);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, setQuery]);

  const { data, loading, error } = useProducts({
    q,
    sort,
    page,
    pageSize,
    categories,
    priceMin,
    priceMax,
  });

  useEffect(() => {
    if (!data) return;
    const tp = Math.max(1, Math.ceil(data.total / data.pageSize));
    setTotalPages(tp);
  }, [data, setTotalPages]);

  const activeFiltersCount = getActiveFiltersCount({
    categories,
    priceMin,
    priceMax,
  });

  return (
    <div className="w-full py-24 px-4 md:px-8">
      <div className="container mx-auto grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <ShopFilters
            categories={categories}
            priceMin={priceMin}
            priceMax={priceMax}
            onCategoriesChange={setCategories}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            onReset={reset}
          />
        </div>

        <div>
          <div className="mb-4 flex lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFiltersOpen(true)}
              className="relative gap-2"
            >
              <span>{t("shop.filters.button")}</span>
              <Filter />

              {activeFiltersCount > 0 && (
                <span className="absolute -right-2 -top-2 min-w-5 h-5 px-1 inline-flex items-center justify-center rounded-full bg-primary text-white text-[10px] leading-none">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>

          <ShopToolbar
            searchValue={searchInput}
            sort={sort}
            onSearchChange={setSearchInput}
            onSortChange={setSort}
          />

          <section>
            {loading && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
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

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
      </div>

      <Drawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        position="right"
        width="20rem"
        title={t("shop.filters.button")}
      >
        <ShopFilters
          categories={categories}
          priceMin={priceMin}
          priceMax={priceMax}
          onCategoriesChange={setCategories}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
          onReset={reset}
          onAfterReset={() => setFiltersOpen(false)}
        />
      </Drawer>
    </div>
  );
};

import type { ProductCategory } from "../../../types/product";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { Button } from "../../../ui/components/Button";
import { useTranslation } from "react-i18next";

type Props = {
  categories: ProductCategory[];
  priceMin?: number;
  priceMax?: number;

  onCategoriesChange: (next: ProductCategory[]) => void;
  onPriceMinChange: (next?: number) => void;
  onPriceMaxChange: (next?: number) => void;
  onReset: () => void;
  onAfterReset?: () => void;
};

export const ShopFilters = ({
  categories,
  priceMin,
  priceMax,
  onCategoriesChange,
  onPriceMinChange,
  onPriceMaxChange,
  onReset,
  onAfterReset,
}: Props) => {
  const { t } = useTranslation();

  return (
    <aside className="h-full rounded-2xl bg-white/30 backdrop-blur-md p-2 shadow-sm sm:p-4 space-y-6">
      <CategoryFilter value={categories} onChange={onCategoriesChange} />

      <PriceFilter
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={onPriceMinChange}
        onPriceMaxChange={onPriceMaxChange}
      />

      <Button
        variant="outline"
        fullWidth
        onClick={() => {
          onReset();
          onAfterReset?.();
        }}
      >
        {t("shop.filters.reset")}
      </Button>
    </aside>
  );
};

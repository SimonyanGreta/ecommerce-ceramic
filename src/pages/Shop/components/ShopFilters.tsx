import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/components/Button";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import type { ProductCategory } from "../../../types/product";

type Props = {
  categories: ProductCategory[];
  priceMin?: number;
  priceMax?: number;

  onCategoriesChange: (next: ProductCategory[]) => void;
  onPriceMinChange: (next?: number) => void;
  onPriceMaxChange: (next?: number) => void;
  onReset: () => void;
};

export const ShopFilters = ({
  categories,
  priceMin,
  priceMax,
  onCategoriesChange,
  onPriceMinChange,
  onPriceMaxChange,
  onReset,
}: Props) => {
  const { t } = useTranslation();

  return (
    <aside className="border-r border-primary/20 p-4 space-y-6">
      <CategoryFilter value={categories} onChange={onCategoriesChange} />

      <PriceFilter
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={onPriceMinChange}
        onPriceMaxChange={onPriceMaxChange}
      />

      <Button variant="outline" fullWidth onClick={onReset}>
        {t("shop.filters.reset")}
      </Button>
    </aside>
  );
};

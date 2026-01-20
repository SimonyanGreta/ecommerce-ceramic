import { useTranslation } from "react-i18next";
import type { ProductCategory } from "../../../types/product";
import { SHOP_CATEGORIES } from "../../../constants/categories";
import { Checkbox } from "../../../ui/components/Checkbox";

type Props = {
  value: ProductCategory[];
  onChange: (next: ProductCategory[]) => void;
};

export const CategoryFilter = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  const toggleCategory = (category: ProductCategory) => {
    if (value.includes(category)) {
      onChange(value.filter((item) => item !== category));
      return;
    }

    onChange([...value, category]);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-background-dark mb-3">
        {t("shop.filters.categoryTitle")}
      </h3>

      <div className="flex flex-col gap-2">
        {SHOP_CATEGORIES.map((category) => {
          const checked = value.includes(category);

          return (
            <Checkbox
              key={category}
              id={`category-${category}`}
              checked={checked}
              onChange={() => toggleCategory(category)}
              label={t(`shop.filters.categories.${category}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

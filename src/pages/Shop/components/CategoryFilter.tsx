import { useTranslation } from "react-i18next";
import type { ProductCategory } from "../../../types/product";
import { SHOP_CATEGORIES } from "../../../constants/categories";

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
            <label
              key={category}
              className="inline-flex items-center gap-2 text-sm  cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 "
              />
              <span>{t(`shop.filters.categories.${category}`)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

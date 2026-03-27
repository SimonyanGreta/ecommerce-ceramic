import { useTranslation } from "react-i18next";
import { Checkbox } from "../../../ui/components/Checkbox";
import type { ProductCategory, CategoryOption } from "../../../types/product";

type Props = {
  value: ProductCategory[];
  options: CategoryOption[];
  onChange: (next: ProductCategory[]) => void;
};

export const CategoryFilter = ({ value, options, onChange }: Props) => {
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
        {options.map(({ code, isActive, label }) => (
          <Checkbox
            key={code}
            id={`category-${code}`}
            checked={value.includes(code)}
            onChange={() => toggleCategory(code)}
            label={label}
            disabled={!isActive}
          />
        ))}
      </div>
    </div>
  );
};

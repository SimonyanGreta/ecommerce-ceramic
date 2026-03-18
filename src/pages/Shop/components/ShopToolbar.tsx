import { useTranslation } from "react-i18next";
import type { ProductsSort } from "../../../services/products/products.api";

type Props = {
  searchValue: string;
  sort: ProductsSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductsSort) => void;
};

export const ShopToolbar = ({
  searchValue,
  sort,
  onSearchChange,
  onSortChange,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t("shop.searchPlaceholder")}
        className="w-full sm:max-w-md rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:border-primary transition"
      />

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as ProductsSort)}
        className="rounded-xl border border-primary/20 bg-white px-3 py-2 outline-none focus:border-primary transition"
      >
        <option value="featured">{t("shop.sort.featured")}</option>
        <option value="priceAsc">{t("shop.sort.priceAsc")}</option>
        <option value="priceDesc">{t("shop.sort.priceDesc")}</option>
      </select>
    </div>
  );
};

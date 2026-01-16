import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "../../../ui/components/FormField";

type Props = {
  priceMin?: number;
  priceMax?: number;
  onPriceMinChange: (next?: number) => void;
  onPriceMaxChange: (next?: number) => void;
};

const parseOptionalNumber = (value: string): number | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const num = Number(trimmed);
  if (Number.isNaN(num)) return undefined;

  return num;
};

export const PriceFilter = ({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: Props) => {
  const { t } = useTranslation();

  const [minInput, setMinInput] = useState(priceMin?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(priceMax?.toString() ?? "");

  // если значения пришли извне (например reset), синхронизируем UI
  useEffect(() => {
    setMinInput(priceMin?.toString() ?? "");
  }, [priceMin]);

  useEffect(() => {
    setMaxInput(priceMax?.toString() ?? "");
  }, [priceMax]);

  // debounce для min
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onPriceMinChange(parseOptionalNumber(minInput));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [minInput, onPriceMinChange]);

  // debounce для max
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onPriceMaxChange(parseOptionalNumber(maxInput));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [maxInput, onPriceMaxChange]);

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-background-dark">
        {t("shop.filters.priceTitle")}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label={t("shop.filters.priceMin")}
          type="number"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          placeholder="0"
        />

        <FormField
          label={t("shop.filters.priceMax")}
          type="number"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          placeholder="100"
        />
      </div>
    </div>
  );
};

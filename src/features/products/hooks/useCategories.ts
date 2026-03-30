import { useEffect, useMemo, useState } from "react";

import type { CategoryOption } from "../../../types/product";
import { metaApi } from "../../../services/meta";
import { normalizeLanguage } from "../../../helpers/language";
import { useTranslation } from "react-i18next";

type State = {
  categories: CategoryOption[];
  loading: boolean;
  error: string | null;
};

export const useCategories = () => {
  const [state, setState] = useState<State>({
    categories: [],
    loading: true,
    error: null,
  });

  const { i18n } = useTranslation();

  const currentLanguage = useMemo(
    () => normalizeLanguage(i18n.resolvedLanguage || i18n.language),
    [i18n.resolvedLanguage, i18n.language],
  );

  useEffect(() => {
    let alive = true;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    metaApi
      .getCategories()
      .then((categories) => {
        if (!alive) return;

        const preparedCategories = [...categories]
          .filter((category) => category.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        setState({
          categories: preparedCategories,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        if (!alive) return;

        setState({
          categories: [],
          loading: false,
          error: err?.message ?? "Error",
        });
      });

    return () => {
      alive = false;
    };
  }, [currentLanguage]);

  return state;
};

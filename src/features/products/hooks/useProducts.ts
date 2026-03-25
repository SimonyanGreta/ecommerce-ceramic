import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type {
  ProductsListParams,
  ProductsListResponse,
} from "../../../services/products/products.api";
import { productsApi } from "../../../services/products";
import { normalizeLanguage } from "../../../helpers/language";

type State = {
  data: ProductsListResponse | null;
  loading: boolean;
  error: string | null;
};


export const useProducts = (params: ProductsListParams) => {
  const { i18n } = useTranslation();

  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

  const categoriesKey = useMemo(
    () => (params.categories ?? []).slice().sort().join(","),
    [params.categories],
  );

  const currentLanguage = useMemo(
    () => normalizeLanguage(i18n.resolvedLanguage || i18n.language),
    [i18n.resolvedLanguage, i18n.language],
  );

  useEffect(() => {
    let alive = true;

    setState((s) => ({ ...s, loading: true, error: null }));

    productsApi
      .list(params)
      .then((data) => {
        if (!alive) return;
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!alive) return;
        setState({
          data: null,
          loading: false,
          error: err?.message ?? "Error",
        });
      });

    return () => {
      alive = false;
    };
  }, [
    params.q,
    params.sort,
    params.page,
    params.pageSize,
    categoriesKey,
    params.priceMin,
    params.priceMax,
    currentLanguage,
  ]);

  return state;
};

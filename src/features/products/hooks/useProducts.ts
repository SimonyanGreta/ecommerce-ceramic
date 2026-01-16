import { useEffect, useMemo, useState } from "react";
import type {
  ProductsListParams,
  ProductsListResponse,
} from "../../../services/products/products.api";
import { productsApi } from "../../../services/products";

type State = {
  data: ProductsListResponse | null;
  loading: boolean;
  error: string | null;
};

export const useProducts = (params: ProductsListParams) => {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

  const categoriesKey = useMemo(
    () => (params.categories ?? []).slice().sort().join(","),
    [params.categories],
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
  ]);

  return state;
};

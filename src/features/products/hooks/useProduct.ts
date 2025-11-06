import { useEffect, useState } from "react";
import type { Product } from "../../../types/product";
import { productsApi } from "../../../services/products";

type State = {
  product: Product | null;
  loading: boolean;
  error: string | null;
};

export function useProduct(slug?: string) {
  const [state, setState] = useState<State>({
    product: null,
    loading: !!slug,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ product: null, loading: false, error: null });
      return;
    }

    let alive = true;
    setState({ product: null, loading: true, error: null });

    productsApi
      .getBySlug(slug)
      .then((p) => {
        if (!alive) return;
        setState({ product: p, loading: false, error: null });
      })
      .catch((err) => {
        if (!alive) return;
        setState({
          product: null,
          loading: false,
          error: err?.message ?? "Error",
        });
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  return state;
}

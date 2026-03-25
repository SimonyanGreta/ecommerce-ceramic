import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Product } from "../../../types/product";
import { productsApi } from "../../../services/products";
import { normalizeLanguage } from "../../../helpers/language";

type State = {
  product: Product | null;
  loading: boolean;
  error: string | null;
};

export const useProduct = (slug?: string) => {
  const { i18n } = useTranslation();

  const [state, setState] = useState<State>({
    product: null,
    loading: !!slug,
    error: null,
  });

  const currentLanguage = useMemo(
    () => normalizeLanguage(i18n.resolvedLanguage || i18n.language),
    [i18n.resolvedLanguage, i18n.language],
  );

  useEffect(() => {
    if (!slug) {
      setState({ product: null, loading: false, error: null });
      return;
    }

    let alive = true;
    setState({ product: null, loading: true, error: null });

    productsApi
      .getBySlug(slug)
      .then((product) => {
        if (!alive) return;
        setState({ product, loading: false, error: null });
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
  }, [slug, currentLanguage]);

  return state;
};

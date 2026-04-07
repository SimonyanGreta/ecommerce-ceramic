import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { AboutResponse } from "../../services/about/about.types";
import { normalizeLanguage } from "../../helpers/language";
import { getAbout } from "../../services/about/about.api.ts";

type State = {
  data: AboutResponse | null;
  loading: boolean;
  error: string | null;
};

export const useAbout = () => {
  const { i18n } = useTranslation();

  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

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

    getAbout()
      .then((data) => {
        if (!alive) return;

        setState({
          data,
          loading: false,
          error: null,
        });
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
  }, [currentLanguage]);

  return state;
};

import { useEffect, useState } from "react";
import { getAbout } from "../../services/about/about.api";
import type { AboutResponse } from "../../services/about/about.types";

export const useAbout = (lang: string) => {
  const [data, setData] = useState<AboutResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setLoading(true);

    getAbout(lang).then((res) => {
      if (!active) return;
      setData(res);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [lang]);

  return { data, loading };
};

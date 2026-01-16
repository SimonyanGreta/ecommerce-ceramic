import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductsSort } from "../services/products/products.api";
import type { ProductCategory } from "../types/product";
import {
  clampInt,
  isOneOf,
  normalizePage,
  setOrDeleteParam,
} from "../helpers/queryParams";

const SORT_VALUES = [
  "featured",
  "priceAsc",
  "priceDesc",
  "nameAsc",
  "nameDesc",
] as const;

const CATEGORY_VALUES = [
  "cups-mugs",
  "plates-platters",
  "vases",
  "seasoning-containers",
  "kettles",
] as const;

type Options = {
  pageSize?: number;
  defaultSort?: ProductsSort;
};

type Return = {
  q: string;
  sort: ProductsSort;
  page: number;
  pageSize: number;

  categories: ProductCategory[];
  priceMin?: number;
  priceMax?: number;

  reset: () => void;
  setQuery: (q: string) => void;
  setSort: (sort: ProductsSort) => void;
  setPage: (page: number) => void;

  setCategories: (categories: ProductCategory[]) => void;
  setPriceMin: (value?: number) => void;
  setPriceMax: (value?: number) => void;

  setTotalPages: (totalPages?: number) => void;
};

const parseOptionalNumber = (raw: string | null): number | undefined => {
  if (!raw) return undefined;
  const n = Number(raw);
  if (Number.isNaN(n)) return undefined;
  return n;
};

const serializeCategories = (items: ProductCategory[]) => items.join(",");

const parseCategories = (raw: string | null): ProductCategory[] => {
  if (!raw) return [];

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is ProductCategory => isOneOf(item, CATEGORY_VALUES));
};

export const useShopQueryState = (options?: Options): Return => {
  const pageSize = options?.pageSize ?? 24;
  const defaultSort = options?.defaultSort ?? "featured";

  const [sp, setSp] = useSearchParams();
  const totalPagesRef = useRef<number | undefined>(undefined);

  const q = sp.get("q") ?? "";

  const sortRaw = sp.get("sort") ?? defaultSort;
  const sort: ProductsSort = isOneOf(sortRaw, SORT_VALUES)
    ? sortRaw
    : defaultSort;

  const categories = parseCategories(sp.get("categories"));
  const priceMin = parseOptionalNumber(sp.get("priceMin"));
  const priceMax = parseOptionalNumber(sp.get("priceMax"));

  const pageRaw = sp.get("page");

  const reset = useCallback(() => {
    setSp(() => new URLSearchParams());
  }, [setSp]);

  const pageMin = normalizePage(pageRaw, { fallback: 1 }).value;

  const page = normalizePage(pageRaw, {
    fallback: 1,
    totalPages: totalPagesRef.current,
  }).value;

  const normalizePageInUrl = useCallback(() => {
    if (pageRaw == null) return;

    const norm = normalizePage(pageRaw, {
      fallback: 1,
      totalPages: totalPagesRef.current,
    });

    if (norm.normalizedRaw == null) return;
    if (norm.normalizedRaw === pageRaw) return;

    setSp((prev) => {
      const n = new URLSearchParams(prev);
      n.set("page", norm.normalizedRaw!);
      return n;
    });
  }, [pageRaw, setSp]);

  useEffect(() => {
    normalizePageInUrl();
  }, [normalizePageInUrl]);

  const setQuery = useCallback(
    (nextQ: string) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);
        setOrDeleteParam(n, "q", nextQ);
        n.set("page", "1");
        return n;
      });
    },
    [setSp],
  );

  const setSort = useCallback(
    (nextSort: ProductsSort) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);
        if (nextSort !== "featured") n.set("sort", nextSort);
        else n.delete("sort");
        n.set("page", "1");
        return n;
      });
    },
    [setSp],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);
        n.set("page", String(clampInt(nextPage, 1)));
        return n;
      });
    },
    [setSp],
  );

  const setCategories = useCallback(
    (nextCategories: ProductCategory[]) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);

        if (nextCategories.length > 0) {
          n.set("categories", serializeCategories(nextCategories));
        } else {
          n.delete("categories");
        }

        n.set("page", "1");
        return n;
      });
    },
    [setSp],
  );

  const setPriceMin = useCallback(
    (value?: number) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);

        if (typeof value === "number") n.set("priceMin", String(value));
        else n.delete("priceMin");

        n.set("page", "1");
        return n;
      });
    },
    [setSp],
  );

  const setPriceMax = useCallback(
    (value?: number) => {
      setSp((prev) => {
        const n = new URLSearchParams(prev);

        if (typeof value === "number") n.set("priceMax", String(value));
        else n.delete("priceMax");

        n.set("page", "1");
        return n;
      });
    },
    [setSp],
  );

  const setTotalPages = useCallback(
    (tp?: number) => {
      totalPagesRef.current =
        typeof tp === "number" ? Math.max(1, Math.floor(tp)) : undefined;

      normalizePageInUrl();
    },
    [normalizePageInUrl],
  );

  return {
    q,
    sort,
    page: totalPagesRef.current ? page : pageMin,
    pageSize,

    categories,
    priceMin,
    priceMax,

    reset,
    setQuery,
    setSort,
    setPage,
    setCategories,
    setPriceMin,
    setPriceMax,
    setTotalPages,
  };
};

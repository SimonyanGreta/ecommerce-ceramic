import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductsSort } from "../services/products/products.api";
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

type Options = {
  pageSize?: number;
  defaultSort?: ProductsSort;
};

type Return = {
  q: string;
  sort: ProductsSort;
  page: number;
  pageSize: number;

  reset: () => void;
  setQuery: (q: string) => void;
  setSort: (sort: ProductsSort) => void;
  setPage: (page: number) => void;

  // вызывать после получения data (когда известно total)
  setTotalPages: (totalPages?: number) => void;
};

export function useShopQueryState(options?: Options): Return {
  const pageSize = options?.pageSize ?? 24;
  const defaultSort = options?.defaultSort ?? "featured";

  const [sp, setSp] = useSearchParams();

  const totalPagesRef = useRef<number | undefined>(undefined);

  const q = sp.get("q") ?? "";

  const sortRaw = sp.get("sort") ?? defaultSort;
  const sort: ProductsSort = isOneOf(sortRaw, SORT_VALUES)
    ? (sortRaw as ProductsSort)
    : defaultSort;

  const pageRaw = sp.get("page");

  const reset = useCallback(() => {
    setSp(() => new URLSearchParams());
  }, [setSp]);

  // сначала нормализуем минимум (>=1), чтобы сходить за данными
  const pageMin = normalizePage(pageRaw, { fallback: 1 }).value;

  // если уже знаем totalPages — нормализуем и верхнюю границу
  const page = normalizePage(pageRaw, {
    fallback: 1,
    totalPages: totalPagesRef.current,
  }).value;

  // ----------- INTERNAL: normalize URL (when page param exists)
  const normalizePageInUrl = useCallback(() => {
    if (pageRaw == null) return; // если param отсутствует — не добавляем насильно

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

  // чинит page=0/abc/-5 сразу при заходе
  useEffect(() => {
    normalizePageInUrl();
  }, [normalizePageInUrl]);

  // ----------- SETTERS (write to URL)
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

  // ----------- API: setTotalPages (called when data arrives)
  const setTotalPages = useCallback(
    (tp?: number) => {
      totalPagesRef.current =
        typeof tp === "number" ? Math.max(1, Math.floor(tp)) : undefined;

      // когда появилась верхняя граница — чинит page>totalPages
      normalizePageInUrl();
    },
    [normalizePageInUrl],
  );

  // ВАЖНО: для запроса используем pageMin (>=1) — чтобы не улететь на 0
  // но наружу возвращаем page (с учетом totalPages если он уже известен)
  // Это безопасно: до data page===pageMin, после data clamp’нется.
  return {
    q,
    sort,
    reset,
    page: totalPagesRef.current ? page : pageMin,
    pageSize,
    setQuery,
    setSort,
    setPage,
    setTotalPages,
  };
}

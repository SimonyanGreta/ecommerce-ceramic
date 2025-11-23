export function clampInt(value: number, min = 1, max?: number) {
  if (!Number.isFinite(value)) return min;
  const n = Math.floor(value);
  if (n < min) return min;
  if (typeof max === "number" && n > max) return max;
  return n;
}

export function setOrDeleteParam(
  sp: URLSearchParams,
  key: string,
  value?: string,
) {
  const v = (value ?? "").trim();
  if (v) sp.set(key, v);
  else sp.delete(key);
}

export function isOneOf<T extends string>(
  v: string,
  allowed: readonly T[],
): v is T {
  return (allowed as readonly string[]).includes(v);
}

export function normalizePage(
  raw: string | null,
  opts?: { totalPages?: number; fallback?: number },
) {
  const fallback = opts?.fallback ?? 1;

  // если вообще нет page в URL — считаем как fallback, но "rawNormalized" будет null
  if (raw == null) {
    return { value: fallback, normalizedRaw: null as string | null };
  }

  const n = Number(raw);
  let page = clampInt(n, 1);

  if (typeof opts?.totalPages === "number") {
    page = clampInt(page, 1, Math.max(1, opts.totalPages));
  }

  const normalizedRaw = String(page);
  return { value: page, normalizedRaw };
}

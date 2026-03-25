import i18n from "i18next";
import { normalizeLanguage } from "../helpers/language";

export type ApiError = {
  status: number;
  message: string;
  body?: string;
};

type ApiFetchInit = RequestInit & {
  timeoutMs?: number;
};

async function readTextSafe(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export async function apiFetch<T>(
  input: string,
  init?: ApiFetchInit,
): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 12_000;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  const currentLanguage = normalizeLanguage(
    i18n.resolvedLanguage || i18n.language,
  );

  try {
    const headers = new Headers(init?.headers);

    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json");
    }

    if (!headers.has("Accept-Language")) {
      headers.set("Accept-Language", currentLanguage);
    }

    const res = await fetch(input, {
      ...init,
      signal: controller.signal,
      headers,
    });

    if (!res.ok) {
      const body = await readTextSafe(res);

      const err: ApiError = {
        status: res.status,
        message: body || res.statusText || `HTTP ${res.status}`,
        body,
      };

      throw new Error(`${err.status}: ${err.message}`);
    }

    if (res.status === 204) {
      return undefined as T;
    }

    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

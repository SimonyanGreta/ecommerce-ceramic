import i18n from "i18next";
import { normalizeLanguage } from "../helpers/language";

export type ApiError = {
  status: number;
  message: string;
  body?: unknown;
};

type ApiFetchInit = RequestInit & {
  timeoutMs?: number;
};

async function readBodySafe(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      return await res.json();
    }

    return await res.text();
  } catch {
    return undefined;
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

    if (!headers.has("Content-Type") && init?.body) {
      headers.set("Content-Type", "application/json");
    }

    const res = await fetch(input, {
      ...init,
      signal: controller.signal,
      headers,
    });

    if (!res.ok) {
      const body = await readBodySafe(res);

      const message =
        typeof body === "string"
          ? body
          : res.statusText || `HTTP ${res.status}`;

      const err: ApiError = {
        status: res.status,
        message,
        body,
      };

      throw err;
    }

    if (res.status === 204) {
      return undefined as T;
    }

    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

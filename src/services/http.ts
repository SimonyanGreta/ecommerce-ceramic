export type ApiError = {
  status: number;
  message: string;
  body?: string;
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
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 12_000;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
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

    // если бэк когда-то вернёт 204
    if (res.status === 204) return undefined as T;

    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

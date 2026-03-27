import type { CategoryOption } from "../../types/product";
import { apiFetch } from "../http";
import type { MetaApi } from "./meta.api";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const metaApiHttp: MetaApi = {
  getCategories: async (): Promise<CategoryOption[]> => {
    return apiFetch<CategoryOption[]>(`${API_BASE}/meta/categories`, {
      method: "GET",
    });
  },
};

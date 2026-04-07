import type { AboutResponse } from "./about.types";
import { apiFetch } from "../http";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const getAbout = async (): Promise<AboutResponse> => {
  return apiFetch<AboutResponse>(`${API_BASE}/content/about`, {
    method: "GET",
  });
};

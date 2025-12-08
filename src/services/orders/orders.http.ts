import type { OrdersApi } from "./orders.api";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../../types/order";
import { apiFetch } from "../http";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const ordersApiHttp: OrdersApi = {
  createOrder: async (
    payload: CreateOrderPayload,
  ): Promise<CreateOrderResponse> => {
    return apiFetch<CreateOrderResponse>(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};

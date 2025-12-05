import type { OrdersApi } from "./orders.api";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../../types/order";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const ordersApiHttp: OrdersApi = {
  createOrder: async (
    payload: CreateOrderPayload,
  ): Promise<CreateOrderResponse> => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Failed to create order (${res.status})`);
    }

    return (await res.json()) as CreateOrderResponse;
  },
};

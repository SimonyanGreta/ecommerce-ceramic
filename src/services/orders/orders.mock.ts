import type { OrdersApi } from "./orders.api";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../../types/order";

const ORDERS_KEY = "orders:v1";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type StoredOrder = {
  id: string;
  createdAt: number;
  payload: CreateOrderPayload;
  status: "created";
};

function readAll(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(orders: StoredOrder[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function genOrderId() {
  // достаточно для mock, потом заменится на id с сервера
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export const ordersApiMock: OrdersApi = {
  createOrder: async (
    payload: CreateOrderPayload,
  ): Promise<CreateOrderResponse> => {
    await sleep(400);

    const id = genOrderId();
    const orders = readAll();

    orders.unshift({
      id,
      createdAt: Date.now(),
      payload,
      status: "created",
    });

    writeAll(orders);

    return { orderId: id, status: "created" };
  },
};

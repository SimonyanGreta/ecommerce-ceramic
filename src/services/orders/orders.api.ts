import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../../types/order";

export type OrdersApi = {
  createOrder: (payload: CreateOrderPayload) => Promise<CreateOrderResponse>;
};

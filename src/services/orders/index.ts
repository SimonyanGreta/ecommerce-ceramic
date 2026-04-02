import { ordersApiMock } from "./orders.mock";
import { ordersApiHttp } from "./orders.http";
import type { OrdersApi } from "./orders.api";

const USE_API = import.meta.env.VITE_USE_API === "true";

export const ordersApi: OrdersApi = USE_API ? ordersApiHttp : ordersApiMock;

export * from "./orders.errors";

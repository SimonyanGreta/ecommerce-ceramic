import { ordersApiMock } from "./orders.mock";
import { ordersApiHttp } from "./orders.http";
import type { OrdersApi } from "./orders.api";

const USE_HTTP = false;

export const ordersApi: OrdersApi = USE_HTTP ? ordersApiHttp : ordersApiMock;

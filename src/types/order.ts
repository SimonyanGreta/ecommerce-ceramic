import type { MoneyCurrency } from "../helpers/money";

export type OrderItemInput = {
  productId: string;
  qty: number;
  price: number; // клиентская цена (для UI), но серверу доверять нельзя
};

export type OrderCustomerInput = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes?: string;
};

export type CreateOrderPayload = {
  customer: OrderCustomerInput;
  items: OrderItemInput[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: MoneyCurrency;
};

export type CreateOrderResponse = {
  orderId: string;
  status: "created";
};

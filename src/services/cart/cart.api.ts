import type { CartItem } from "../../types/product";

export type CartApi = {
  fetchCart: () => Promise<CartItem[]>;
  pushCart: (items: CartItem[]) => Promise<void>;
};

const SERVER_CART_KEY = "serverCart:v1";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const cartApiMock: CartApi = {
  fetchCart: async () => {
    await sleep(150); // имитация сети
    const raw = localStorage.getItem(SERVER_CART_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  pushCart: async (items) => {
    await sleep(150);
    localStorage.setItem(SERVER_CART_KEY, JSON.stringify(items));
  },
};

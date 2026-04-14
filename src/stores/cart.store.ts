import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import type { CartItem, Product } from "../types/product";
import { DEFAULT_CURRENCY, type MoneyCurrency } from "../constants/currency";

type CartState = {
  items: Record<string, CartItem>; // productId => item
  currency: MoneyCurrency;
  updatedAt: number | null;
  version: number; // на будущее для миграций
};

type CartActions = {
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;

  // будущая интеграция:
  hydrateFromServer: (serverItems: CartItem[]) => void; // замена локально
  mergeFromServer: (serverItems: CartItem[]) => void; // merge-политика
};

type CartStore = CartState & CartActions;

const CART_PERSIST_KEY = "cart:v2";

const initialState: Omit<CartStore, keyof CartActions> = {
  items: {},
  currency: DEFAULT_CURRENCY,
  updatedAt: null,
  version: 1,
};

export const useCartStore = create<CartStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,

        add: (product, qty = 1) => {
          set((state) => {
            const existing = state.items[product.id];
            const nextQty = (existing?.qty ?? 0) + qty;

            return {
              items: {
                ...state.items,
                [product.id]: {
                  productId: product.id,
                  qty: nextQty,
                },
              },
              updatedAt: Date.now(),
            };
          });
        },

        remove: (productId) => {
          set((state) => {
            const { [productId]: _, ...rest } = state.items;
            return { items: rest, updatedAt: Date.now() };
          });
        },

        setQty: (productId, qty) => {
          if (qty <= 0) {
            get().remove(productId);
            return;
          }
          set((state) => {
            const it = state.items[productId];
            if (!it) return state;
            return {
              items: { ...state.items, [productId]: { ...it, qty } },
              updatedAt: Date.now(),
            };
          });
        },

        clear: () => set({ ...initialState }),

        // будущий API: заменить локальную корзину корзиной с сервера
        hydrateFromServer: (serverItems) => {
          const map: Record<string, CartItem> = {};
          for (const it of serverItems) map[it.productId] = it;
          set({ items: map, updatedAt: Date.now() });
        },

        // будущий API: merge (сейчас политика: max qty)
        mergeFromServer: (serverItems) => {
          const current = get().items;
          const merged: Record<string, CartItem> = { ...current };
          for (const s of serverItems) {
            const local = merged[s.productId];
            merged[s.productId] = local
              ? { ...local, qty: Math.max(local.qty, s.qty) }
              : s;
          }
          set({ items: merged, updatedAt: Date.now() });
        },

      }),
      {
        name: CART_PERSIST_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          currency: state.currency,
          updatedAt: state.updatedAt,
          version: state.version,
        }),
        version: 2,
        migrate: (persisted) => persisted as CartState,
      },
    ),
  ),
);

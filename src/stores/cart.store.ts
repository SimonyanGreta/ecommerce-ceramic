import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from "zustand/middleware";
import type { CartItem, Product } from "../types/product";

type CartState = {
  items: Record<string, CartItem>; // productId => item
  currency: "USD" | "EUR" | "RUB" | "VND";
  updatedAt: number | null;
  // служебное для будущей синхронизации
  pendingSync: boolean;
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
  markSync: (pending: boolean) => void;
};

type CartStore = CartState & CartActions;

const CART_PERSIST_KEY = "cart:v1";

const initialState: Omit<CartStore, keyof CartActions> = {
  items: {},
  currency: "USD",
  updatedAt: null,
  pendingSync: false,
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
                  name: product.name,
                  price: product.price,
                  currency: product.currency,
                  image: product.image,
                  qty: nextQty,
                },
              },
              updatedAt: Date.now(),
              pendingSync: true,
            };
          });
        },

        remove: (productId) => {
          set((state) => {
            const { [productId]: _, ...rest } = state.items;
            return { items: rest, updatedAt: Date.now(), pendingSync: true };
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
              pendingSync: true,
            };
          });
        },

        clear: () => set({ ...initialState }),

        // будущий API: заменить локальную корзину корзиной с сервера
        hydrateFromServer: (serverItems) => {
          const map: Record<string, CartItem> = {};
          for (const it of serverItems) map[it.productId] = it;
          set({ items: map, updatedAt: Date.now(), pendingSync: false });
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
          set({ items: merged, updatedAt: Date.now(), pendingSync: false });
        },

        markSync: (pending) => set({ pendingSync: pending }),
      }),
      {
        name: CART_PERSIST_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          currency: state.currency,
          updatedAt: state.updatedAt,
          version: state.version,
          // pendingSync не сохраняем
        }),
        version: 1,
        migrate: (persisted) => persisted as CartState,
      },
    ),
  ),
);

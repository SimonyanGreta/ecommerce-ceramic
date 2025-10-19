import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CART_DRAWER_PERSIST_KEY } from "../constants/cart";

type UiStore = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

export const useUiStore = create<UiStore>()(
  persist(
    (set, get) => ({
      cartOpen: false,
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      toggleCart: () => set({ cartOpen: !get().cartOpen }),
    }),
    {
      name: CART_DRAWER_PERSIST_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ cartOpen: s.cartOpen }),
    },
  ),
);

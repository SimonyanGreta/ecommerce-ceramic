import { create } from "zustand";

type CheckoutSuccessOrder = {
  orderId: string;
  createdAt: string;
};

type CheckoutResultState = {
  lastSuccessOrder: CheckoutSuccessOrder | null;
  isHydrated: boolean;
  setLastSuccessOrder: (order: CheckoutSuccessOrder) => void;
  hydrateLastSuccessOrder: () => void;
  clearLastSuccessOrder: () => void;
};

const STORAGE_KEY = "nuard:checkout-success:v1";

export const useCheckoutResultStore = create<CheckoutResultState>((set) => ({
  lastSuccessOrder: null,
  isHydrated: false,

  setLastSuccessOrder: (order) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // ignore storage write errors
    }

    set({
      lastSuccessOrder: order,
      isHydrated: true,
    });
  },

  hydrateLastSuccessOrder: () => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);

      if (!raw) {
        set({
          lastSuccessOrder: null,
          isHydrated: true,
        });
        return;
      }

      const parsed = JSON.parse(raw) as CheckoutSuccessOrder;

      if (!parsed?.orderId || !parsed?.createdAt) {
        sessionStorage.removeItem(STORAGE_KEY);

        set({
          lastSuccessOrder: null,
          isHydrated: true,
        });
        return;
      }

      set({
        lastSuccessOrder: parsed,
        isHydrated: true,
      });
    } catch {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore storage remove errors
      }

      set({
        lastSuccessOrder: null,
        isHydrated: true,
      });
    }
  },

  clearLastSuccessOrder: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage remove errors
    }

    set({
      lastSuccessOrder: null,
      isHydrated: true,
    });
  },
}));

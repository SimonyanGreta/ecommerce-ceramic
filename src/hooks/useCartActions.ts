import { useCartStore } from "../stores/cart.store";
import type { ProductId } from "../types/product";
import type { Product } from "../types/product";

export const useCartActions = () => {
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);

  return {
    add: (p: Product, qty = 1) => add(p, qty),
    remove: (id: ProductId) => remove(id),
    setQty: (id: ProductId, qty: number) => setQty(id, qty),
    clear,
  };
};

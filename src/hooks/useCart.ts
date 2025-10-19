import { useCartStore } from "../stores/cart.store";
import type { ProductId, Product } from "../types/product";

export const useCart = () => {
  const items = useCartStore((s) => s.items);
  const count = useCartStore((s) => s.count);
  const subtotal = useCartStore((s) => s.subtotal);
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);
  const hydrateFromServer = useCartStore((s) => s.hydrateFromServer);
  const mergeFromServer = useCartStore((s) => s.mergeFromServer);

  return {
    items: Object.values(items),
    count,
    subtotal,
    add: (p: Product, qty = 1) => add(p, qty),
    remove: (id: ProductId) => remove(id),
    setQty: (id: ProductId, qty: number) => setQty(id, qty),
    clear,
    hydrateFromServer,
    mergeFromServer,
  };
};

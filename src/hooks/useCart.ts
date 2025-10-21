import { useCartStore } from "../stores/cart.store";
import type { ProductId, Product } from "../types/product";

export const useCart = () => {
  const itemsMap = useCartStore((s) => s.items);
  const items = Object.values(itemsMap);

  const count = items.reduce((sum, it) => sum + it.qty, 0);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);

  return {
    items,
    count,
    subtotal,
    add: (p: Product, qty = 1) => add(p, qty),
    remove: (id: ProductId) => remove(id),
    setQty: (id: ProductId, qty: number) => setQty(id, qty),
    clear,
  };
};

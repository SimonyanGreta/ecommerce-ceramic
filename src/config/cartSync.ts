import { cartApiMock } from "../services/cart/cart.api";
import { scheduleCartSync } from "../services/cart/cart.sync";
import { useCartStore } from "../stores/cart.store";

export function initCartSync() {
  // подписка на изменения items/pendingSync
  useCartStore.subscribe(
    (s) => ({ items: s.items, pendingSync: s.pendingSync }),
    (slice, prev) => {
      // чтобы не дергать по пустякам — синкаем только если pendingSync true
      if (!slice.pendingSync) return;

      // можно сравнить items, но pendingSync уже означает "есть изменения"
      scheduleCartSync(cartApiMock, 600);
    },
    { equalityFn: (a, b) => a.pendingSync === b.pendingSync && a.items === b.items },
  );
}

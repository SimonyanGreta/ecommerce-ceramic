import type { CartItem } from "../../types/product";
import type { CartApi } from "./cart.api";
import { useCartStore } from "../../stores/cart.store";

function toArray(itemsMap: Record<string, CartItem>) {
  return Object.values(itemsMap);
}

let timer: number | null = null;

export async function syncCartOnAuth(api: CartApi) {
  const store = useCartStore.getState();

  // 1) забираем корзину с "сервера"
  const serverItems = await api.fetchCart();

  // 2) мержим в локальную (твоя политика max qty уже в store)
  store.mergeFromServer(serverItems);

  // 3) если локально были изменения — пушим на сервер
  const fresh = useCartStore.getState();
  if (fresh.pendingSync) {
    await api.pushCart(toArray(fresh.items));
    fresh.markSync(false);
  }
}

// Debounced sync: вызывать при изменениях корзины (например, в подписке)
export function scheduleCartSync(api: CartApi, delayMs = 800) {
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(async () => {
    const st = useCartStore.getState();
    if (!st.pendingSync) return;

    await api.pushCart(toArray(st.items));
    st.markSync(false);
  }, delayMs);
}

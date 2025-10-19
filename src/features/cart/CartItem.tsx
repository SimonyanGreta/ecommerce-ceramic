import { memo } from "react";
import { useCart } from "../../hooks/useCart";
import type { CartItem as TCartItem } from "../../types/product";

type Props = { item: TCartItem };

export const CartItem = memo(({ item }: Props) => {
  const { setQty, remove } = useCart();

  return (
    <div className="flex gap-3 py-3 border-b border-black/10">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-xl"
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>
        <div className="text-xs opacity-70">
          {item.price.toFixed(2)} {item.currency}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            className="px-2 py-1 rounded-lg border border-black/10"
            onClick={() => setQty(item.productId, Math.max(1, item.qty - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-8 text-center">{item.qty}</span>
          <button
            className="px-2 py-1 rounded-lg border border-black/10"
            onClick={() => setQty(item.productId, item.qty + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>

          <button
            className="ml-auto text-xs opacity-70 hover:opacity-100"
            onClick={() => remove(item.productId)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

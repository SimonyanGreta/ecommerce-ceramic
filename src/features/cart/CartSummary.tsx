import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

export const CartSummary = () => {
  const { subtotal, count, clear } = useCart();

  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur pt-3 border-t border-black/10">
      <div className="flex items-center justify-between text-sm">
        <div className="opacity-70">Items: {count}</div>
        <div className="font-semibold">Subtotal: {subtotal.toFixed(2)}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          to="/checkout"
          className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 border border-black/10 hover:bg-black hover:text-white transition"
        >
          Checkout
        </Link>

        <button
          className="px-4 py-2 rounded-xl border border-black/10 hover:border-red-500 hover:text-red-600"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

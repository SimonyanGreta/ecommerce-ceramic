import { useCart } from "../../hooks/useCart";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="py-28 container mx-auto">
      <h1 className="text-xl font-semibold">Checkout</h1>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-black/10 p-4">
          <h2 className="font-medium mb-3">Order items</h2>
          {items.map((it) => (
            <div
              key={it.productId}
              className="flex items-center gap-3 py-2 border-b border-black/5"
            >
              <img
                src={it.image}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="text-sm">{it.name}</div>
                <div className="text-xs opacity-70">
                  {it.qty} × {it.price.toFixed(2)} {it.currency}
                </div>
              </div>
              <div className="text-sm font-medium">
                {(it.qty * it.price).toFixed(2)} {it.currency}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-black/10 p-4 h-fit">
          <div className="flex items-center justify-between">
            <div className="opacity-70">Subtotal</div>
            <div className="font-semibold">{subtotal.toFixed(2)}</div>
          </div>
          {/* позже: доставка, налоги, купоны */}
          <button className="w-full mt-4 rounded-xl px-4 py-3 border border-black/10 hover:bg-black hover:text-white transition">
            Place order (mock)
          </button>
        </div>
      </div>
    </div>
  );
}

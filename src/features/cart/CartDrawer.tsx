import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { CartDrawerEmpty } from "./CartDrawerEmpty.tsx";
import { Drawer } from "../../ui/components/Drawer";

export const CartDrawer: React.FC = () => {
  const { open, closeCart } = useCartDrawer();
  const { items } = useCart();

  return (
    <Drawer
      isOpen={open}
      onClose={closeCart}
      position="right"
      width="24rem"
      title="Cart"
    >
      {items.length === 0 ? (
        <CartDrawerEmpty />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-3">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <CartSummary />
        </>
      )}
    </Drawer>
  );
};

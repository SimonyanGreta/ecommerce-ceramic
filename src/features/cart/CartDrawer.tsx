import { useCart } from "../../hooks/useCart";
import { useCartDrawer } from "../../hooks/useCartDrawer";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { CartDrawerEmpty } from "./CartDrawerEmpty.tsx";
import { Drawer } from "../../ui/components/Drawer";
import { useTranslation } from "react-i18next";

export const CartDrawer: React.FC = () => {
  const { t } = useTranslation();

  const { open, closeCart } = useCartDrawer();
  const { items } = useCart();

  return (
    <Drawer
      isOpen={open}
      onClose={closeCart}
      position="right"
      width="24rem"
      title={t("cart.title")}
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

import { useUiStore } from "../stores/ui.store";

export const useCartDrawer = () => {
  const open = useUiStore((s) => s.cartOpen);
  const openCart = useUiStore((s) => s.openCart);
  const closeCart = useUiStore((s) => s.closeCart);
  const toggleCart = useUiStore((s) => s.toggleCart);
  return { open, openCart, closeCart, toggleCart };
};

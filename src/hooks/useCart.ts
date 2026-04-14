import { useCartData } from "./useCartData";
import { useCartActions } from "./useCartActions";

export const useCart = () => {
  const data = useCartData();
  const actions = useCartActions();

  return {
    ...data,
    ...actions,
  };
};

import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useCheckoutResultStore } from "../../stores/checkout-result.store";
import { CheckoutSuccess } from "./CheckoutSuccess";

const CheckoutResult = () => {
  const lastSuccessOrder = useCheckoutResultStore(
    (state) => state.lastSuccessOrder,
  );
  const isHydrated = useCheckoutResultStore((state) => state.isHydrated);
  const hydrateLastSuccessOrder = useCheckoutResultStore(
    (state) => state.hydrateLastSuccessOrder,
  );

  useEffect(() => {
    hydrateLastSuccessOrder();
  }, [hydrateLastSuccessOrder]);

  if (!isHydrated) {
    return null;
  }

  if (!lastSuccessOrder?.orderId?.trim()) {
    return <Navigate to="/checkout" replace />;
  }

  return <CheckoutSuccess orderId={lastSuccessOrder.orderId} />;
};

export default CheckoutResult;

import { useEffect, useMemo, useRef, useState } from "react";
import { useCartStore } from "../stores/cart.store";
import { resolveCart } from "../services/products/cartResolve.api";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../helpers/language";
import type { CartViewItem } from "../types/cart";
import type { MoneyCurrency } from "../constants/currency.ts";

export const useCartData = () => {
  const itemsMap = useCartStore((s) => s.items);
  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  const { i18n } = useTranslation();
  const lang = normalizeLanguage(i18n.resolvedLanguage || i18n.language);

  const [resolved, setResolved] = useState<CartViewItem[]>([]);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  const itemsKey = useMemo(
    () => items.map((i) => `${i.productId}:${i.qty}`).join("|"),
    [items],
  );

  useEffect(() => {
    if (items.length === 0) {
      setResolved([]);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);

    resolveCart(items)
      .then((res) => {
        if (requestId !== requestIdRef.current) return;

        setResolved(
          res.items.map((r) => ({
            productId: r.productId,
            qty: items.find((i) => i.productId === r.productId)?.qty ?? 1,
            name: r.name,
            price: r.price,
            currency: r.currency as MoneyCurrency,
            image: r.image,
            availabilityStatus: r.availabilityStatus,
            stockQty: r.stockQty,
          })),
        );
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) return;
        setResolved([]);
      })
      .finally(() => {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      });
  }, [itemsKey, lang]);

  const count = resolved.reduce((sum, it) => sum + it.qty, 0);

  const subtotal = resolved.reduce((sum, it) => sum + it.price * it.qty, 0);

  return {
    items: resolved,
    count,
    subtotal,
    loading,
  };
};

"use client";
// ─────────────────────────────────────────────────────────────────────────
// CARRITO · Context + localStorage
//
// Mismo patrón que favoritos (arranca vacío, carga localStorage en useEffect
// para no romper la hidratación). Además maneja el estado abierto/cerrado del
// panel lateral (eso NO se persiste, es solo de la sesión).
// El propio Provider renderiza el <CartDrawer/>, así la app solo tiene que
// envolver con <CartProvider> y ya tiene el carrito completo.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "./CartDrawer";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartValue {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number; // suma de cantidades
  total: number; // suma de precio * cantidad
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({
  children,
  storageKey = "cart",
}: {
  children: ReactNode;
  storageKey?: string;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar del navegador después de montar (hidratación).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  // Persistir cuando cambian (después de hidratar).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated, storageKey]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + qty } : x,
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((x) => x.id !== id)),
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => x.id !== id)
        : prev.map((x) => (x.id === id ? { ...x, qty } : x)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = items.reduce((n, x) => n + x.qty, 0);
  const total = items.reduce((s, x) => s + x.price * x.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        total,
        hydrated,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

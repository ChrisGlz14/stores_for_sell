"use client";

import { useCart } from "./CartContext";

export interface AddToCartButtonProps {
  product: { id: string; name: string; price: number; image?: string };
  label?: string;
  className?: string;
}

/** Botón "Agregar al carrito": suma el producto y abre el panel lateral. */
export function AddToCartButton({
  product,
  label = "Agregar",
  className = "",
}: AddToCartButtonProps) {
  const { add, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // por si está dentro de un enlace
        e.stopPropagation();
        add(product);
        openCart();
      }}
      className={`rounded-xl bg-brand font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      {label}
    </button>
  );
}

"use client";

import { useCart } from "./CartContext";

/** Ícono de carrito con contador, para el navbar. Abre el panel lateral. */
export function CartButton() {
  const { count, hydrated, openCart } = useCart();
  const show = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative rounded-full p-2 text-black/70 transition hover:bg-black/5"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {show ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}

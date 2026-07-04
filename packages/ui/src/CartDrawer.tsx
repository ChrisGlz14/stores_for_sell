"use client";

import { useEffect } from "react";
import { useCart } from "./CartContext";
import { formatPrice } from "./format";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, clear, total, count } =
    useCart();

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Fondo oscuro */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel deslizante */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="text-lg font-bold">
            Tu carrito{count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 text-black/60 transition hover:bg-black/5"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <img className="text-5xl h-24" src="/img/payment-methods/carro-vacio.png" alt="Carrito vacío" />
              <p className="text-black/55">Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-brand">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-black/10">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label="Restar"
                          className="px-2.5 py-1 text-black/60 hover:text-brand"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label="Sumar"
                          className="px-2.5 py-1 text-black/60 hover:text-brand"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-xs text-black/40 hover:text-accent"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-black/5 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-black/60">Subtotal</span>
              <span className="text-xl font-extrabold">
                {formatPrice(total)}
              </span>
            </div>
            <a
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-xl bg-brand px-6 py-3 text-center font-semibold text-white transition hover:opacity-90"
            >
              Finalizar compra
            </a>
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full text-center text-xs text-black/40 hover:text-accent"
            >
              Vaciar carrito
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

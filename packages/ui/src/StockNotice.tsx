"use client";
// Aviso flotante para tiendas sin control de stock automático.
// Queda "pegado" arriba (sticky) mientras se scrollea la página de producto.

import { useState } from "react";

export interface StockNoticeProps {
  message?: string;
}

export function StockNotice({
  message = "Consultá el stock antes de comprar.",
}: StockNoticeProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="sticky top-16 z-40 mb-6 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
      <span className="flex-1 font-medium">{message}</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Cerrar aviso"
        className="shrink-0 rounded-full p-1 text-amber-700 transition hover:bg-amber-100"
      >
        <svg
          width="16"
          height="16"
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
      </button>
    </div>
  );
}

"use client";

import { useFavorites } from "./FavoritesContext";

export interface FavoriteButtonProps {
  productId: string;
  /** Clases extra (ej. para posicionarlo: "absolute right-3 top-3"). */
  className?: string;
}

export function FavoriteButton({ productId, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggle, hydrated } = useFavorites();
  // Antes de hidratar mostramos el corazón "vacío" (igual que en el server),
  // así el primer render coincide y no hay hydration mismatch.
  const active = hydrated && isFavorite(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault(); // por si está dentro de un enlace
        e.stopPropagation();
        toggle(productId);
      }}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white/80 shadow-sm backdrop-blur transition hover:bg-white ${
        active ? "text-accent" : "text-black/60 hover:text-accent"
      } ${className}`}
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

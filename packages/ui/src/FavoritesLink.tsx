"use client";

import { useFavorites } from "./FavoritesContext";

export interface FavoritesLinkProps {
  href?: string;
}

/** Ícono de corazón con contador, para el navbar. */
export function FavoritesLink({ href = "/favoritos" }: FavoritesLinkProps) {
  const { count, hydrated } = useFavorites();
  const show = hydrated && count > 0;

  return (
    <a
      href={href}
      aria-label="Favoritos"
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
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {show ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
          {count}
        </span>
      ) : null}
    </a>
  );
}

import type { ReactNode } from "react";
import type { NavLink } from "./types";
import { FavoritesLink } from "./FavoritesLink";

export interface NavbarProps {
  brand: string;
  links: NavLink[];
  /** Cantidad de items en el carrito (visual, por ahora) */
  cartCount?: number;
  /** Slot para el buscador (ej. <SearchBox items={...} />). */
  search?: ReactNode;
}

export function Navbar({ brand, links, cartCount = 0, search }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="/" className="shrink-0">
          <img
            src="/img/logo/logo.png"
            alt="Purcuá"
            className="h-14 w-14 object-contain"
          />
        </a>

        {search ? (
          <div className="hidden flex-1 sm:block sm:max-w-sm">{search}</div>
        ) : null}

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/70 transition hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <FavoritesLink href="/favoritos" />
          <button
            type="button"
            aria-label="Carrito"
            className="relative rounded-full p-2 text-black/70 transition hover:bg-black/5"
          >
            <CartIcon />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

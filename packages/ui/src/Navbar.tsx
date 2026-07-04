import type { ReactNode } from "react";
import type { NavLink } from "./types";
import { FavoritesLink } from "./FavoritesLink";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

export interface NavbarProps {
  brand: string;
  links: NavLink[];
  /** Slot para el buscador (ej. <SearchBox items={...} />). */
  search?: ReactNode;
}

export function Navbar({ brand, links, search }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        {/* Hamburguesa (solo mobile) */}
        <MobileMenu links={links} search={search} />

        <a href="/" className="shrink-0">
          <img
            src="/img/logo/logo.png"
            alt="Purcuá"
            className="h-14 w-14 object-contain"
          />
        </a>

        {/* Buscador (solo desktop; en mobile va dentro del menú) */}
        {search ? (
          <div className="hidden flex-1 md:block md:max-w-sm">{search}</div>
        ) : null}

        {/* Links (solo desktop) */}
        <nav className="hidden items-center gap-6 md:flex">
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

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <FavoritesLink href="/favoritos" />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

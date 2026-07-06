"use client";
// Menú lateral para mobile (hamburguesa), estilo acordeón: los grupos con
// sub-categorías se despliegan con +/−. Abajo, botones de sesión.

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { NavLink, MenuGroup } from "./types";

export interface MobileMenuProps {
  links: NavLink[];
  /** Estructura acordeón. Si no se pasa, usa `links` como lista plana. */
  groups?: MenuGroup[];
  search?: ReactNode;
  loginHref?: string;
  registerHref?: string;
}

export function MobileMenu({
  links,
  groups,
  search,
  loginHref = "#",
  registerHref = "#",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const toggle = (label: string) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  // Si no hay groups, convertimos los links planos en grupos simples.
  const menu: MenuGroup[] =
    groups ?? links.map((l) => ({ label: l.label, href: l.href }));

  const overlay = (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-4 py-4">
          <span className="font-bold">Menú</span>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={close}
            className="rounded-full p-2 text-accent transition hover:bg-black/5"
          >
            <CloseIcon />
          </button>
        </header>

        {search ? (
          <div className="border-b border-black/5 p-4">{search}</div>
        ) : null}

        {/* Acordeón */}
        <nav className="flex-1 overflow-y-auto">
          {menu.map((group) => {
            const hasChildren = !!group.children?.length;
            const isOpen = expanded.includes(group.label);

            if (!hasChildren) {
              return (
                <a
                  key={group.label}
                  href={group.href ?? "#"}
                  onClick={close}
                  className="block border-b border-black/5 px-5 py-4 text-sm font-bold text-foreground transition hover:bg-neutral-50"
                >
                  {group.label}
                </a>
              );
            }

            return (
              <div key={group.label} className="border-b border-black/5">
                <button
                  type="button"
                  onClick={() => toggle(group.label)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-bold text-foreground transition hover:bg-neutral-50"
                >
                  <span className="w-3 text-base leading-none text-brand">
                    {isOpen ? "−" : "+"}
                  </span>
                  {group.label}
                </button>
                {isOpen ? (
                  <div className="bg-neutral-50">
                    {group.children!.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={close}
                        className="block border-t border-black/5 px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-black/75 transition hover:text-brand"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* Sesión */}
        <div className="border-t border-black/5 p-4">
          <a
            href={loginHref}
            onClick={close}
            className="block w-full rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 py-3 text-center font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Iniciar sesión
          </a>
          <a
            href={registerHref}
            onClick={close}
            className="mt-3 block text-center text-sm font-bold text-foreground underline"
          >
            Crear cuenta
          </a>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
        className="-ml-2 rounded-full p-2 text-black/70 transition hover:bg-black/5"
      >
        <MenuIcon />
      </button>
      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

"use client";
// Menú lateral para mobile (hamburguesa). Muestra los links de navegación
// y el buscador, que en pantallas chicas no entran en la barra.

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "./types";

export interface MobileMenuProps {
  links: NavLink[];
  search?: ReactNode;
}

export function MobileMenu({ links, search }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Solo portaleamos en el cliente (document existe recién al montar).
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

  // El panel se renderiza en <body> (portal) para escapar del header, que
  // tiene backdrop-blur y "atraparía" el position:fixed dentro suyo.
  const overlay = (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex items-center justify-between border-b border-black/5 px-4 py-4">
            <span className="font-bold">Menú</span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-black/60 transition hover:bg-black/5"
            >
              <CloseIcon />
            </button>
          </header>

          {search ? (
            <div className="border-b border-black/5 p-4">{search}</div>
          ) : null}

          <nav className="flex flex-col p-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-black/75 transition hover:bg-brand-soft hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>
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

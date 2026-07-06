"use client";
// Layout del panel administrativo: sidebar de navegación + barra superior.
// Responsive: en mobile el sidebar es un drawer que se abre con el botón ☰.

import { useEffect, useState, type ReactNode } from "react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface AdminShellProps {
  brand: string;
  nav: AdminNavItem[];
  children: ReactNode;
}

export function AdminShell({ brand, nav, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState("");

  // Ruta actual (para marcar el link activo). En el cliente, tras montar.
  useEffect(() => setPathname(window.location.pathname), []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <span className="text-lg font-extrabold">{brand}</span>
        <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
          Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive(item.href)
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ← Ver la tienda
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50 text-foreground">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 bg-neutral-900 text-white md:block">
        {sidebar}
      </aside>

      {/* Sidebar mobile (drawer) */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-60 bg-neutral-900 text-white shadow-2xl transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar}
        </aside>
      </div>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/5 bg-white px-4 sm:px-6">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="-ml-2 rounded-full p-2 text-black/70 hover:bg-black/5 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              A
            </span>
            <span className="hidden text-sm font-medium sm:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

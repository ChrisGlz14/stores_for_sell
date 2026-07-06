// Layout del panel admin. Envuelve todo /admin con el sidebar (AdminShell).
//
// ⚠️ TODO SEGURIDAD: estas rutas HOY no están protegidas. Antes de usarlo en
// producción hay que agregar autenticación + autorización (rol "admin"):
//   - Login con Supabase Auth / Auth.js.
//   - Un middleware.ts que redirija a /login si no hay sesión admin.
//   - Revalidar el permiso en el servidor en cada acción (crear/editar/borrar).

import type { Metadata } from "next";
import { AdminShell, type AdminNavItem } from "@repo/ui";

export const metadata: Metadata = {
  title: "Admin · Purcuá",
};

const icon = (path: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
);

const nav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: icon("M3 13h8V3H3zM13 21h8V11h-8zM13 3v6h8V3zM3 21h8v-6H3z") },
  { label: "Productos", href: "/admin/productos", icon: icon("M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z") },
  { label: "Pedidos", href: "/admin/pedidos", icon: icon("M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0") },
  { label: "Configuración", href: "/admin/configuracion", icon: icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z") },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell brand="Purcuá" nav={nav}>
      {children}
    </AdminShell>
  );
}

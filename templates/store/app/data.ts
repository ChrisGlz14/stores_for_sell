import type { NavLink, Product, FooterColumn } from "@repo/ui";

// ⬇️ Editá todo este archivo con los datos reales del cliente.

export const navLinks: NavLink[] = [
  { label: "Productos", href: "#productos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export const categories: string[] = [
  "Destacados",
  "Novedades",
  "Ofertas",
  "Más vendidos",
];

export const productos: Product[] = [
  { id: "1", name: "Producto de ejemplo 1", price: 9900, emoji: "📦", badge: "Nuevo" },
  { id: "2", name: "Producto de ejemplo 2", price: 14900, oldPrice: 19900, emoji: "🛍️", badge: "Oferta" },
  { id: "3", name: "Producto de ejemplo 3", price: 7500, emoji: "🎁" },
  { id: "4", name: "Producto de ejemplo 4", price: 22900, emoji: "⭐" },
  { id: "5", name: "Producto de ejemplo 5", price: 4500, emoji: "✨" },
  { id: "6", name: "Producto de ejemplo 6", price: 12900, emoji: "🧩" },
  { id: "7", name: "Producto de ejemplo 7", price: 8900, emoji: "🎈" },
  { id: "8", name: "Producto de ejemplo 8", price: 16900, emoji: "🔥" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Tienda",
    links: [
      { label: "Productos", href: "#productos" },
      { label: "Ofertas", href: "#ofertas" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Cómo comprar", href: "#" },
      { label: "Envíos", href: "#" },
    ],
  },
  {
    title: "Nosotros",
    links: [
      { label: "Quiénes somos", href: "#nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

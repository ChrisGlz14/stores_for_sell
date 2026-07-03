import type { NavLink, Product, FooterColumn, CarouselSlide } from "@repo/ui";

// Ubicación de la tienda (para el mapa del footer).
export const storeLocation = {
  address: "Purcuá Tienda · Santa Fe, Argentina",
  // Mapa embebido con las coordenadas exactas (sin API key).
  mapEmbedUrl:
    "https://maps.google.com/maps?q=-31.6138106,-60.6965333&z=17&hl=es&output=embed",
  // Link para abrir en Google Maps.
  mapHref:
    "https://www.google.com/maps/place/PURCU%C3%81+TIENDA/@-31.6137424,-60.6967938,19z/data=!4m6!3m5!1s0x95b5070d340a268b:0x4aa48854d1f1509f!8m2!3d-31.6138106!4d-60.6965333!16s%2Fg%2F11q4j0tj9c",
};

export const heroSlides: CarouselSlide[] = [
  {
    image: "/img/banners/banner-hero-purcua.jpg",
    href: "#nuevos",
    alt: "Merch de anime, videojuegos, cine y cultura retro",
  },
  {
    image: "/img/banners/banner-installments-shipping.jpg",
    href: "#nuevos",
    alt: "Cuotas sin interés y envíos a todo el país",
  },
  {
    image: "/img/banners/banner-custom-products.png",
    href: "#personalizados",
    alt: "Productos personalizados",
  },
];

export const navLinks: NavLink[] = [
  { label: "Figuras", href: "/categoria/figuras" },
  { label: "Aros", href: "/categoria/aros" },
  { label: "Peluches", href: "/categoria/peluches" },
  { label: "Llaveros", href: "/categoria/llaveros" },
];

export const categories: string[] = [
  "Personalizados",
  "Figuras",
  "Bazar y Deco",
  "Peluches",
  "Mangas",
  "Librería",
  "Accesorios",
  "Indumentaria",
  "Ofertas",
  "Fandom",
];

export const nuevosIngresos: Product[] = [
  { id: "1", name: "Aros BT21 - colección oficial", price: 4500, emoji: "🎧", badge: "Nuevo", category: "Accesorios" },
  { id: "2", name: "Figura Funko Pop edición limitada", price: 18900, oldPrice: 22000, emoji: "🦸", badge: "-14%", category: "Figuras" },
  { id: "3", name: "Peluche kawaii 25cm", price: 12500, emoji: "🧸", badge: "Nuevo", category: "Peluches" },
  { id: "4", name: "Lámpara LED anime", price: 9900, emoji: "💡", category: "Bazar y Deco" },
  { id: "5", name: "Manga tomo 1 - edición español", price: 7800, emoji: "📖", category: "Mangas" },
  { id: "6", name: "Set stickers holográficos x20", price: 3200, emoji: "✨", badge: "Nuevo", category: "Librería" },
  { id: "7", name: "Taza térmica fandom", price: 8600, oldPrice: 10000, emoji: "☕", badge: "Oferta", category: "Bazar y Deco" },
  { id: "8", name: "Llavero acrílico personalizado", price: 2500, emoji: "🔑", category: "Personalizados" },
];

export const personalizados: Product[] = [
  { id: "p1", name: "Tarjetas de cumpleaños personalizadas x10", price: 6500, emoji: "🎂", category: "Personalizados" },
  { id: "p2", name: "Kit emprendedor: etiquetas + tarjetas", price: 15900, emoji: "🏷️", badge: "Combo", category: "Personalizados" },
  { id: "p3", name: "Invitaciones digitales a medida", price: 4900, emoji: "💌", category: "Personalizados" },
  { id: "p4", name: "Stickers con tu logo x50", price: 5200, emoji: "🎨", category: "Personalizados" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Tienda",
    links: [
      { label: "Novedades", href: "#nuevos" },
      { label: "Ofertas", href: "#ofertas" },
      { label: "Personalizados", href: "#personalizados" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Cómo comprar", href: "#" },
      { label: "Envíos", href: "#" },
      { label: "Cambios y devoluciones", href: "#" },
    ],
  },
  {
    title: "Nosotros",
    links: [
      { label: "Quiénes somos", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Términos y condiciones", href: "#" },
    ],
  },
];

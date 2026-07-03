// Helper para leer el catálogo (catalog.json) de forma tipada.
// Al ser Server Components, las páginas pueden llamar a estas funciones
// directamente (sin useEffect, sin fetch): se ejecutan en el servidor.

import type { Product, SearchItem } from "@repo/ui";
import { formatPrice } from "@repo/ui";
import catalogJson from "../catalog.json";

export interface CatalogProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  category: { slug: string; name: string };
  saga: { slug: string; name: string };
  character: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
}

const products = catalogJson.products as CatalogProduct[];

/** Todos los productos. */
export function getAllProducts(): CatalogProduct[] {
  return products;
}

/** Un producto por su slug (o undefined si no existe). */
export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return products.find((p) => p.slug === slug);
}

/** Lista de categorías (con su conteo), desde el catálogo. */
export function getCategories() {
  return catalogJson.categories as { slug: string; name: string; count: number }[];
}

/** Una categoría por su slug. */
export function getCategoryBySlug(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

/** Todos los productos de una categoría. */
export function getProductsByCategory(slug: string): CatalogProduct[] {
  return products.filter((p) => p.category.slug === slug);
}

/** Productos de la misma saga (para "relacionados"), excluyendo el actual. */
export function getRelated(product: CatalogProduct, limit = 4): CatalogProduct[] {
  return products
    .filter((p) => p.saga.slug === product.saga.slug && p.slug !== product.slug)
    .slice(0, limit);
}

/** Convierte un producto del catálogo al formato que espera <ProductCard>. */
export function toCard(p: CatalogProduct): Product {
  const hasSaga =
    p.saga.slug !== "otros" &&
    p.character.toLowerCase() !== p.saga.name.toLowerCase();
  const singular = p.category.name.replace(/s$/, ""); // Figuras -> Figura

  return {
    id: p.slug,
    name: p.title,
    price: p.price,
    image: p.image,
    description: hasSaga
      ? `${singular} de ${p.character}, de ${p.saga.name}.`
      : `${singular} de ${p.character}.`,
    tags: [hasSaga ? p.saga.name : p.category.name, ...p.tags]
      .filter((t, i, arr) => t && arr.indexOf(t) === i)
      .slice(0, 2),
    badge: p.featured ? "Destacado" : undefined,
  };
}

/** Arma los items para el buscador (título + datos por los que se busca). */
export function getSearchItems(): SearchItem[] {
  return products.map((p) => ({
    title: p.title,
    href: `/producto/${p.slug}`,
    subtitle: `${p.saga.name} · ${formatPrice(p.price)}`,
    image: p.image,
    // Palabras extra por las que también se puede encontrar el producto:
    keywords: [p.character, p.saga.name, p.category.name, ...p.tags],
  }));
}

/** Datos institucionales de la tienda (logo, pagos, envíos, etc.). */
export const store = catalogJson.store;

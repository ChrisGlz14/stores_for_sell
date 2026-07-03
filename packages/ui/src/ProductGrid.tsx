import type { Product } from "./types";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
  /** Opcional: construye la URL de cada producto (ej. p => `/producto/${p.id}`). */
  getHref?: (product: Product) => string;
}

export function ProductGrid({ products, getHref }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          href={getHref?.(product)}
        />
      ))}
    </div>
  );
}

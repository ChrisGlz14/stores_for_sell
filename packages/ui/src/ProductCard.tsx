import type { Product } from "./types";
import { formatPrice } from "./format";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, price, oldPrice, image, emoji, badge } = product;
  const hasDiscount = typeof oldPrice === "number" && oldPrice > price;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-brand-soft">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">
            {emoji ?? "🛍️"}
          </div>
        )}
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-black/80">{name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(price)}
          </span>
          {hasDiscount ? (
            <span className="text-sm text-black/40 line-through">
              {formatPrice(oldPrice!)}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="mt-1 w-full rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

import type { Product } from "./types";
import { formatPrice } from "./format";
import { FavoriteButton } from "./FavoriteButton";
import { AddToCartButton } from "./AddToCartButton";

export interface ProductCardProps {
  product: Product;
  /** Si se pasa, la imagen y el título enlazan a esta URL (ej. /producto/slug). */
  href?: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  const { name, price, oldPrice, image, emoji, badge, description, tags } =
    product;
  const hasDiscount = typeof oldPrice === "number" && oldPrice > price;

  const media = (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-7xl">
          {emoji ?? "🛍️"}
        </div>
      )}
      {badge ? (
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
          {badge}
        </span>
      ) : null}
    </div>
  );

  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
      {/* Imagen + botón de favorito */}
      <div className="relative">
        {href ? <a href={href}>{media}</a> : media}
        <FavoriteButton
          productId={product.id}
          productName={name}
          className="absolute right-3 top-3"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="text-lg font-bold leading-tight text-foreground">
          {href ? (
            <a href={href} className="transition hover:text-brand">
              {name}
            </a>
          ) : (
            name
          )}
        </h3>

        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-black/55"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-black/55">
            {description}
          </p>
        ) : null}

        {/* Precio + botón (apilado en mobile, lado a lado desde sm) */}
        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-black/40">
              Precio
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-foreground">
                {formatPrice(price)}
              </span>
              {hasDiscount ? (
                <span className="text-sm text-black/40 line-through">
                  {formatPrice(oldPrice!)}
                </span>
              ) : null}
            </div>
          </div>
          <AddToCartButton
            product={{
              id: product.id,
              name,
              price,
              image,
            }}
            className="w-full px-4 py-2.5 text-sm sm:w-auto sm:shrink-0"
          />
        </div>
      </div>
    </article>
  );
}

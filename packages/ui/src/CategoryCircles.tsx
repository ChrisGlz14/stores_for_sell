export interface CategoryCircleItem {
  label: string;
  href: string;
  image?: string;
}

export interface CategoryCirclesProps {
  items: CategoryCircleItem[];
}

/**
 * Selectores de categoría circulares con aro degradé y glow al pasar el mouse.
 */
export function CategoryCircles({ items }: CategoryCirclesProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Mobile: fila horizontal deslizable. Desktop: centrado y wrap. */}
      <div className="flex snap-x gap-6 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-10 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 sm:w-32"
          >
            {/* Aro degradé */}
            <span className="rounded-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-pink-500 p-[3px] shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_28px_rgba(236,72,153,0.6)]">
              <span className="block h-24 w-24 overflow-hidden rounded-full bg-neutral-100 ring-4 ring-white sm:h-28 sm:w-28">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                ) : null}
              </span>
            </span>
            <span className="text-center text-sm font-bold text-foreground transition group-hover:text-brand">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

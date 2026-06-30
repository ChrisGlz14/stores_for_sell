export interface CategoryBarProps {
  categories: string[];
}

/** Barra horizontal de categorias (chips) debajo del hero. */
export function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="border-y border-black/5 bg-brand-soft/40">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
            className="whitespace-nowrap rounded-full border border-brand/20 bg-white px-4 py-1.5 text-sm font-medium text-black/70 transition hover:border-brand hover:text-brand"
          >
            {cat}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// RUTA DINÁMICA:  /producto/<slug>
//
// La CARPETA define la URL:
//   app/producto/[slug]/page.tsx   ->   /producto/lo-que-sea
//
// Los corchetes [slug] hacen que ese tramo de la URL sea "variable".
// Ese valor llega a la página dentro de `params`.
// ─────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, FavoriteButton } from "@repo/ui";
import { getAllProducts, getProductBySlug, getRelated } from "../../lib/catalog";

// 1) generateStaticParams: le dice a Next QUÉ slugs existen, así genera
//    todas las páginas de producto como HTML estático en el build (rápidas y
//    buenas para SEO). Sin esto, se generarían a demanda.
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

// 2) generateMetadata: título y descripción para Google/redes, por producto.
//    Ojo: en Next 16, `params` es una Promise -> hay que await-earla.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado · Purcuá" };
  return {
    title: `${product.title} · Purcuá`,
    description: `${product.saga.name} — ${product.character}. ${formatPrice(product.price)}`,
  };
}

// 3) La página. Es un Server Component async: puede leer datos directo.
export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Si el slug no matchea ningún producto -> 404 (renderiza not-found.tsx).
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Link = navegación del lado del cliente (sin recargar la página). */}
      <Link href="/" className="text-sm text-brand hover:underline">
        ← Volver a la tienda
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-neutral-100 md:mx-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover object-center"
          />
          <FavoriteButton
            productId={product.slug}
            className="absolute right-3 top-3 z-10"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              {product.category.name}
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {product.saga.name}
            </span>
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">{product.title}</h1>
          <p className="mt-1 text-black/55">Personaje: {product.character}</p>

          <p className="mt-6 text-3xl font-extrabold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-sm">
            {product.inStock ? (
              <span className="text-green-600">● En stock</span>
            ) : (
              <span className="text-black/40">● Sin stock</span>
            )}
          </p>

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Relacionados: más ejemplos de <Link> hacia otras rutas dinámicas */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold">Más de {product.saga.name}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/producto/${r.slug}`}
                className="group rounded-xl border border-black/5 p-3 transition hover:shadow-md"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="25vw"
                    className="object-cover object-center transition group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-medium">{r.title}</p>
                <p className="text-sm font-bold text-brand">{formatPrice(r.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

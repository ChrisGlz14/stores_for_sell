// ─────────────────────────────────────────────────────────────────────────
// RUTA DINÁMICA:  /categoria/<slug>
//
// UN SOLO archivo genera TODAS las páginas de categoría (figuras, aros,
// peluches, llaveros). Según el slug de la URL, filtra el catalog.json.
// Es la "opción 2" bien hecha: misma pantalla, distintos datos, con URL propia.
// ─────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar, SearchBox, ProductGrid, SectionHeading, Footer } from "@repo/ui";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getSearchItems,
  toCard,
} from "../../lib/catalog";
import { navLinks, footerColumns, storeLocation } from "../../data";

const BRAND = "Purcuá";

// Genera una página estática por cada categoría del catálogo.
export function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada · Purcuá" };
  return { title: `${category.name} · Purcuá` };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <>
      <Navbar
        brand={BRAND}
        links={navLinks}
        search={<SearchBox items={getSearchItems()} />}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link href="/" className="text-sm text-brand hover:underline">
            ← Volver al inicio
          </Link>

          <div className="mt-6">
            <SectionHeading
              title={category.name}
              subtitle={`${products.length} producto${products.length === 1 ? "" : "s"}`}
            />
          </div>

          <ProductGrid
            products={products.map(toCard)}
            getHref={(p) => `/producto/${p.id}`}
          />
        </div>
      </main>

      <Footer
        brand={BRAND}
        columns={footerColumns}
        paymentMethods={["Mercado Pago", "Visa", "Transferencia"]}
        shippingMethods={["Correo Argentino", "Retiro en local"]}
        address={storeLocation.address}
        mapEmbedUrl={storeLocation.mapEmbedUrl}
        mapHref={storeLocation.mapHref}
      />
    </>
  );
}

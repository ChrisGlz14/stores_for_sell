"use client";
// Página de favoritos. Es CLIENTE porque lee el estado de favoritos
// (que vive en el navegador vía Context + localStorage).

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Navbar,
  SearchBox,
  ProductCard,
  SectionHeading,
  Footer,
  useFavorites,
} from "@repo/ui";
import { navLinks, footerColumns, storeLocation } from "../data";
import {
  getAllProducts,
  getSearchItems,
  toCard,
  type CatalogProduct,
} from "../lib/catalog";

const BRAND = "Purcuá";
const ALL = getAllProducts();

export default function FavoritosPage() {
  const { favorites, hydrated } = useFavorites();

  return (
    <>
      <Navbar
        brand={BRAND}
        links={navLinks}
        cartCount={0}
        search={<SearchBox items={getSearchItems()} />}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link href="/" className="text-sm text-brand hover:underline">
            ← Volver al inicio
          </Link>

          <div className="mt-6">
            <SectionHeading
              title="Mis favoritos"
              subtitle={
                hydrated
                  ? `${favorites.length} producto${favorites.length === 1 ? "" : "s"} guardado${favorites.length === 1 ? "" : "s"}`
                  : "Cargando…"
              }
            />
          </div>

          {/* Hasta que no hidrata, no mostramos nada (evita el flash). */}
          {hydrated ? <FavoritesGrid favorites={favorites} /> : null}
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

/**
 * Grilla que anima la SALIDA de las cards.
 *
 * Clave: `items` (lo que se renderiza) está desacoplado de `favorites`.
 * Cuando sacás un favorito, la card NO se borra al instante: queda marcada
 * como "saliendo" (aplica la animación) y recién se elimina de `items`
 * cuando termina la animación (onAnimationEnd).
 */
function FavoritesGrid({ favorites }: { favorites: string[] }) {
  const [items, setItems] = useState<CatalogProduct[]>(() =>
    ALL.filter((p) => favorites.includes(p.slug)),
  );

  // Agregar a la grilla los favoritos nuevos que todavía no estén.
  useEffect(() => {
    setItems((prev) => {
      const shown = new Set(prev.map((p) => p.slug));
      const adds = ALL.filter(
        (p) => favorites.includes(p.slug) && !shown.has(p.slug),
      );
      return adds.length ? [...prev, ...adds] : prev;
    });
  }, [favorites]);

  const favSet = new Set(favorites);

  // Sacar de la grilla (definitivo) cuando terminó la animación.
  function handleAnimationEnd(slug: string) {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-black/10 py-20 text-center">
        <span className="text-5xl">🤍</span>
        <p className="text-black/60">Todavía no guardaste favoritos.</p>
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:opacity-90"
        >
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => {
        const leaving = !favSet.has(p.slug); // ya no es favorito → animar salida
        return (
          <div
            key={p.slug}
            className={leaving ? "animate-slide-out-blurred-top" : undefined}
            onAnimationEnd={leaving ? () => handleAnimationEnd(p.slug) : undefined}
          >
            <ProductCard product={toCard(p)} href={`/producto/${p.slug}`} />
          </div>
        );
      })}
    </div>
  );
}

import {
  Navbar,
  SearchBox,
  BannerCarousel,
  CategoryBar,
  SectionHeading,
  ProductGrid,
  InstagramSection,
  Footer,
} from "@repo/ui";
import {
  navLinks,
  heroSlides,
  categories,
  footerColumns,
  storeLocation,
  storeInstagram,
} from "./data";
import { getSearchItems, getAllProducts, toCard } from "./lib/catalog";

const BRAND = "Purcuá";

export default function Home() {
  // Productos reales del catálogo para las secciones de la home.
  const productos = getAllProducts();
  const nuevosIngresos = productos.slice(10, 18).map(toCard); // figuras
  const personalizados = productos.slice(0, 8).map(toCard); // aros/otros

  return (
    <>
      <Navbar
        brand={BRAND}
        links={navLinks}
        search={<SearchBox items={getSearchItems()} />}
      />

      <main className="flex-1">
        <BannerCarousel slides={heroSlides} interval={6000} />

        <CategoryBar categories={categories} />

        <section id="nuevos" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            title="Nuevos ingresos"
            subtitle="Lo último que sumamos a la tienda"
            action={
              <a href="#" className="text-sm font-semibold text-brand hover:underline">
                Ver todos →
              </a>
            }
          />
          <ProductGrid
            products={nuevosIngresos}
            getHref={(p) => `/producto/${p.id}`}
          />
        </section>

        <section id="personalizados" className="bg-brand-soft/30 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              title="Papelería personalizada"
              subtitle="Para cumples y emprendimientos: lo hacemos a tu medida"
            />
            <ProductGrid
              products={personalizados}
              getHref={(p) => `/producto/${p.id}`}
            />
          </div>
        </section>

        <InstagramSection
          user={storeInstagram.user}
          postUrls={storeInstagram.posts}
        />
      </main>

      <Footer
        brand={BRAND}
        description="Tu tienda de coleccionables, anime y personalizados. Desde Argentina para todo el país."
        columns={footerColumns}
        paymentMethods={["Mercado Pago", "Visa", "Mastercard", "Transferencia"]}
        shippingMethods={["Correo Argentino", "Andreani", "Retiro en local"]}
        whatsapp="5491100000000"
        instagram="https://instagram.com"
        address={storeLocation.address}
        mapEmbedUrl={storeLocation.mapEmbedUrl}
        mapHref={storeLocation.mapHref}
      />
    </>
  );
}

import {
  Navbar,
  Banner,
  CategoryBar,
  SectionHeading,
  ProductGrid,
  Footer,
} from "@repo/ui";
import {
  navLinks,
  categories,
  nuevosIngresos,
  personalizados,
  footerColumns,
} from "./data";

const BRAND = "Purcuá";

export default function Home() {
  return (
    <>
      <Navbar brand={BRAND} links={navLinks} cartCount={2} />

      <main className="flex-1">
        <Banner
          eyebrow="Envíos a todo el país"
          title="Coleccionables, anime y todo lo que amás"
          subtitle="Figuras, peluches, accesorios y papelería personalizada. Encontrá tu próximo favorito."
          ctaLabel="Ver novedades"
          ctaHref="#nuevos"
          art="🎁"
        />

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
          <ProductGrid products={nuevosIngresos} />
        </section>

        <section id="personalizados" className="bg-brand-soft/30 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              title="Papelería personalizada"
              subtitle="Para cumples y emprendimientos: lo hacemos a tu medida"
            />
            <ProductGrid products={personalizados} />
          </div>
        </section>
      </main>

      <Footer
        brand={BRAND}
        description="Tu tienda de coleccionables, anime y personalizados. Desde Argentina para todo el país."
        columns={footerColumns}
        paymentMethods={["Mercado Pago", "Visa", "Mastercard", "Transferencia"]}
        shippingMethods={["Correo Argentino", "Andreani", "Retiro en local"]}
        whatsapp="5491100000000"
        instagram="https://instagram.com"
      />
    </>
  );
}

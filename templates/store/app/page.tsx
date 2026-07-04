import {
  Navbar,
  Banner,
  CategoryBar,
  SectionHeading,
  ProductGrid,
  Footer,
} from "@repo/ui";
import { navLinks, categories, productos, footerColumns } from "./data";

// ⬇️ Cambiá el nombre visible de la tienda
const BRAND = "Mi Tienda";

export default function Home() {
  return (
    <>
      <Navbar brand={BRAND} links={navLinks} />

      <main className="flex-1">
        <Banner
          eyebrow="Envíos a todo el país"
          title="Bienvenido a tu nueva tienda"
          subtitle="Cambiá este texto, los productos y los colores para dejarla a medida del cliente."
          ctaLabel="Ver productos"
          ctaHref="#productos"
          art="🛍️"
        />

        <CategoryBar categories={categories} />

        <section id="productos" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            title="Nuestros productos"
            subtitle="Lo mejor de nuestra tienda"
            action={
              <a href="#" className="text-sm font-semibold text-brand hover:underline">
                Ver todos →
              </a>
            }
          />
          <ProductGrid products={productos} />
        </section>
      </main>

      <Footer
        brand={BRAND}
        description="Descripción corta del negocio. Cambiala por la real."
        columns={footerColumns}
        paymentMethods={["Mercado Pago", "Visa", "Transferencia"]}
        shippingMethods={["Correo Argentino", "Retiro en local"]}
        whatsapp="5491100000000"
        instagram="https://instagram.com"
      />
    </>
  );
}

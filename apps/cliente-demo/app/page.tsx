import { Hero } from "@repo/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero
        brand="Cliente Demo"
        title="La web de tu negocio, lista para vender"
        subtitle="Este Hero vive en @repo/ui y lo comparten todos los clientes. El contenido y el color de marca los define cada app."
        ctaLabel="Pedir presupuesto"
        ctaHref="#contacto"
      />
    </main>
  );
}

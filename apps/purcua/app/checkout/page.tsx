"use client";
// Checkout. Es CLIENTE porque lee el carrito (Context + localStorage).
// Por ahora, al confirmar muestra un resumen y vacía el carrito
// (todavía sin backend ni API de envíos).

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  SearchBox,
  Footer,
  CheckoutForm,
  useCart,
  formatPrice,
  type CheckoutData,
} from "@repo/ui";
import { navLinks, menuGroups, footerColumns, storeLocation } from "../data";
import { getSearchItems } from "../lib/catalog";

const BRAND = "Purcuá";

export default function CheckoutPage() {
  const { items, total, hydrated, clear } = useCart();
  const [done, setDone] = useState<CheckoutData | null>(null);

  function handleSubmit(data: CheckoutData) {
    // TODO: acá irá el pago (Mercado Pago) o el pedido por WhatsApp,
    // y la cotización de envío (Correo Argentino / Andreani).
    setDone(data);
    clear();
  }

  return (
    <>
      <Navbar
        brand={BRAND}
        links={navLinks}
        menuGroups={menuGroups}
        search={<SearchBox items={getSearchItems()} />}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link href="/" className="text-sm text-brand hover:underline">
            ← Seguir comprando
          </Link>

          <h1 className="mt-6 mb-8 text-3xl font-bold tracking-tight">Finalizar compra</h1>

          {!hydrated ? null : done ? (
            <Confirmacion data={done} />
          ) : items.length === 0 ? (
            <CarritoVacio />
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Formulario */}
              <div>
                <CheckoutForm onSubmit={handleSubmit} submitLabel="Confirmar pedido" />
              </div>

              {/* Resumen del pedido */}
              <aside className="h-fit rounded-2xl border border-black/5 bg-brand-soft/30 p-6">
                <h2 className="mb-4 text-lg font-bold">Tu pedido</h2>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-3 text-sm">
                      <span className="min-w-0">
                        <span className="line-clamp-1">{item.name}</span>
                        <span className="text-black/50">x{item.qty}</span>
                      </span>
                      <span className="shrink-0 font-medium">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between border-t border-black/10 pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-extrabold">{formatPrice(total)}</span>
                </div>
                <p className="mt-3 text-xs text-black/45">
                  El costo de envío se calcula en el siguiente paso.
                </p>
              </aside>
            </div>
          )}
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

function Confirmacion({ data }: { data: CheckoutData }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-black/5 py-16 text-center">
      <span className="text-6xl">✅</span>
      <h2 className="text-2xl font-bold">¡Gracias, {data.nombre}!</h2>
      <p className="max-w-sm text-black/60">
        Recibimos tu pedido. Te vamos a contactar a <b>{data.email}</b> para
        coordinar el pago y el envío a {data.ciudad}, {data.provincia}.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:opacity-90"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}

function CarritoVacio() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-black/10 py-20 text-center">
      <img className="text-5xl h-24" src="/img/payment-methods/carro-vacio.png" alt="Carrito vacío" />
      <p className="text-black/60">Tu carrito está vacío.</p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:opacity-90"
      >
        Explorar productos
      </Link>
    </div>
  );
}

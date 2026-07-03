import type { NavLink } from "./types";

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterProps {
  brand: string;
  description?: string;
  columns?: FooterColumn[];
  /** Texto de medios de pago, ej. ["Mercado Pago", "Visa", "Transferencia"] */
  paymentMethods?: string[];
  /** Texto de medios de envio, ej. ["Correo Argentino", "Andreani"] */
  shippingMethods?: string[];
  whatsapp?: string;
  instagram?: string;
  /** Dirección en texto (ej. "Av. Siempreviva 742, Santa Fe"). */
  address?: string;
  /** URL del iframe de Google Maps (embed). Si se pasa, muestra el mapa. */
  mapEmbedUrl?: string;
  /** Link para abrir la ubicación en Google Maps (al tocar "Cómo llegar"). */
  mapHref?: string;
}

export function Footer({
  brand,
  description,
  columns = [],
  paymentMethods = [],
  shippingMethods = [],
  whatsapp,
  instagram,
  address,
  mapEmbedUrl,
  mapHref,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/5 bg-brand-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-extrabold text-brand">{brand}</span>
            {description ? (
              <p className="mt-3 max-w-xs text-sm text-black/55">{description}</p>
            ) : null}
            <div className="mt-4 flex gap-3 text-sm font-medium text-brand">
              {instagram ? (
                <a href={instagram} className="hover:underline">
                  Instagram
                </a>
              ) : null}
              {whatsapp ? (
                <a href={`https://wa.me/${whatsapp}`} className="hover:underline">
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black/55 transition hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {mapEmbedUrl ? (
          <div className="mt-10 grid gap-6 border-t border-black/5 pt-8 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">
                Dónde estamos
              </h3>
              {address ? (
                <p className="mt-3 max-w-xs text-sm text-black/60">{address}</p>
              ) : null}
              {mapHref ? (
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  Cómo llegar →
                </a>
              ) : null}
            </div>
            <iframe
              src={mapEmbedUrl}
              title={`Ubicación de ${brand}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-64 w-full rounded-2xl border-0 shadow-sm ring-1 ring-black/5"
            />
          </div>
        ) : null}

        {(paymentMethods.length > 0 || shippingMethods.length > 0) && (
          <div className="mt-10 grid gap-6 border-t border-black/5 pt-8 sm:grid-cols-2">
            {paymentMethods.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-black/50">
                  Medios de pago
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {paymentMethods.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs text-black/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {shippingMethods.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-black/50">
                  Medios de envío
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {shippingMethods.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs text-black/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-black/40">
          © {year} {brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

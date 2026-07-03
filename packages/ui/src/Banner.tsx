import { Button } from "./Button";

export interface BannerProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Emoji o icono grande decorativo a la derecha (solo sin imagen de fondo) */
  art?: string;
  /**
   * Imagen de fondo. Si la imagen ya trae su propio texto/logo, NO pases
   * title/subtitle: se muestra la imagen sola (y enlaza a ctaHref si se pasa).
   */
  backgroundImage?: string;
}

/** Banner promocional principal de una tienda. */
export function Banner({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  art = "🎁",
  backgroundImage,
}: BannerProps) {
  const hasText = Boolean(eyebrow || title || subtitle || ctaLabel);

  // Caso 1: imagen que ya es un banner completo -> se muestra sola.
  if (backgroundImage && !hasText) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <a
          href={ctaHref}
          className="block overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt={title ?? "Banner promocional"}
            className="aspect-[12/5] w-full object-cover"
          />
        </a>
      </section>
    );
  }

  // Caso 2: banner con texto (con o sin imagen de fondo con overlay).
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div
        className={`relative overflow-hidden rounded-3xl px-8 py-14 text-white sm:px-14 sm:py-20 ${
          backgroundImage ? "" : "bg-gradient-to-br from-brand to-accent"
        }`}
      >
        {backgroundImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Oscurecido a la izquierda para que el texto se lea */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </>
        ) : null}

        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-4 text-lg text-white/85">{subtitle}</p>
          ) : null}
          {ctaLabel ? (
            <a href={ctaHref} className="mt-8 inline-block">
              <Button className="bg-white text-brand hover:bg-white/90">
                {ctaLabel}
              </Button>
            </a>
          ) : null}
        </div>

        {!backgroundImage ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-10 select-none text-[12rem] opacity-30 sm:right-10 sm:text-[16rem] sm:opacity-100"
          >
            {art}
          </span>
        ) : null}
      </div>
    </section>
  );
}

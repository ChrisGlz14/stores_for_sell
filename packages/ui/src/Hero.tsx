import type { ReactNode } from "react";
import { Button } from "./Button";

export interface HeroProps {
  /** Nombre del negocio / cliente */
  brand: string;
  title: string;
  subtitle?: string;
  /** Texto del boton principal */
  ctaLabel?: string;
  /** Destino del boton principal */
  ctaHref?: string;
  children?: ReactNode;
}

/**
 * Bloque Hero compartido, agnostico al cliente.
 * El contenido (textos, marca) llega por props; el color de marca
 * se controla con la variable CSS --color-brand definida por cada app.
 */
export function Hero({
  brand,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  children,
}: HeroProps) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand,#171717)]">
        {brand}
      </span>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="max-w-xl text-lg text-black/60 dark:text-white/60">
          {subtitle}
        </p>
      ) : null}
      {ctaLabel ? (
        <a href={ctaHref}>
          <Button>{ctaLabel}</Button>
        </a>
      ) : null}
      {children}
    </section>
  );
}

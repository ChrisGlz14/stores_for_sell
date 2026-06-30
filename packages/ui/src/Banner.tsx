import { Button } from "./Button";

export interface BannerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Emoji o icono grande decorativo a la derecha */
  art?: string;
}

/** Banner promocional principal de una tienda. */
export function Banner({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  art = "🎁",
}: BannerProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-accent px-8 py-14 text-white sm:px-14 sm:py-20">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
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
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 select-none text-[12rem] opacity-30 sm:right-10 sm:text-[16rem] sm:opacity-100"
        >
          {art}
        </span>
      </div>
    </section>
  );
}

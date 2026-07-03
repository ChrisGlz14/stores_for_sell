"use client";
// ─────────────────────────────────────────────────────────────────────────
// COMPONENTE CLIENTE ("use client")
//
// La directiva de arriba le dice a Next que este componente corre en el
// NAVEGADOR. Es obligatorio acá porque usamos interactividad: estado
// (qué slide se ve), un timer (cambio automático) y clicks (flechas/puntos).
// Los Server Components no pueden usar useState/useEffect/onClick.
// ─────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";

export interface CarouselSlide {
  image: string;
  href?: string;
  alt?: string;
}

export interface BannerCarouselProps {
  slides: CarouselSlide[];
  /** Milisegundos entre cambios automáticos (por defecto 6000 = 6s). */
  interval?: number;
}

export function BannerCarousel({ slides, interval = 6000 }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  // Usamos "updater functions" (i => ...) para no depender de `index`.
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );

  // Timer: cada `interval` ms avanza. Se reinicia cuando cambia `index`
  // (así, si tocás una flecha, los 6s vuelven a contar desde ahí).
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id); // limpieza al desmontar / re-ejecutar
  }, [next, interval, count, index]);

  if (count === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="group relative aspect-[12/5] overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5">
        {/* Slides apilados; el activo se ve, los demás en opacity-0 (crossfade) */}
        {slides.map((slide, i) => {
          const img = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.image}
              alt={slide.alt ?? ""}
              className="h-full w-full object-cover"
            />
          );
          return (
            <div
              key={slide.image}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {slide.href ? (
                <a href={slide.href} className="block h-full w-full">
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}

        {/* Flechas */}
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Banner anterior"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-black/70 shadow backdrop-blur transition hover:bg-white"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Banner siguiente"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-black/70 shadow backdrop-blur transition hover:bg-white"
            >
              <Chevron dir="right" />
            </button>

            {/* Puntos indicadores */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al banner ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

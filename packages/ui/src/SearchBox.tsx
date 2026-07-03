"use client";
// Buscador con dropdown de resultados en vivo. Componente CLIENTE porque
// usa estado, teclado y clicks. La lógica: normalizar (sin acentos) +
// tokens con AND + ranking simple. Ver explicación en el chat.

import { useEffect, useMemo, useRef, useState } from "react";

export interface SearchItem {
  title: string;
  href: string;
  subtitle?: string;
  image?: string;
  /** Palabras extra por las que se puede encontrar (saga, categoría, etc.) */
  keywords?: string[];
}

export interface SearchBoxProps {
  items: SearchItem[];
  placeholder?: string;
  /** Máximo de resultados mostrados. */
  limit?: number;
}

/** minúsculas + sin acentos (para que "pokemon" encuentre "Pokémon"). */
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

interface Indexed extends SearchItem {
  hay: string;
  titleNorm: string;
}

export function SearchBox({
  items,
  placeholder = "Buscar productos...",
  limit = 8,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // Índice normalizado (se calcula una vez por lista de items).
  const indexed = useMemo<Indexed[]>(
    () =>
      items.map((it) => ({
        ...it,
        titleNorm: normalize(it.title),
        hay: normalize(
          [it.title, it.subtitle, ...(it.keywords ?? [])]
            .filter(Boolean)
            .join(" "),
        ),
      })),
    [items],
  );

  // Filtro + ranking. Todos los tokens deben aparecer (AND).
  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    const scored: { item: Indexed; score: number }[] = [];
    for (const it of indexed) {
      let score = 0;
      let ok = true;
      for (const t of tokens) {
        if (!it.hay.includes(t)) {
          ok = false;
          break;
        }
        score += 1;
        if (it.titleNorm.includes(t)) score += 2; // pesa más si está en el título
        if (it.titleNorm.startsWith(t)) score += 3; // aún más si empieza con eso
      }
      if (ok) scored.push({ item: it, score });
    }
    scored.sort(
      (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
    );
    return scored.slice(0, limit).map((s) => s.item);
  }, [query, indexed, limit]);

  // Cerrar el dropdown al hacer click afuera.
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => setActive(0), [query]);

  const showPanel = open && query.trim().length >= 2;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      const r = results[active];
      if (r) window.location.href = r.href;
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 focus-within:border-brand">
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Buscar productos"
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
        />
      </div>

      {showPanel ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-black/50">
              Sin resultados para “{query}”.
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 px-3 py-2 ${
                      i === active ? "bg-brand-soft" : "hover:bg-black/5"
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-neutral-100 text-lg">
                      {r.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "🛍️"
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {r.title}
                      </span>
                      {r.subtitle ? (
                        <span className="block truncate text-xs text-black/50">
                          {r.subtitle}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-black/40"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

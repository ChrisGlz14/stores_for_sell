"use client";
// ─────────────────────────────────────────────────────────────────────────
// FAVORITOS · Context + localStorage
//
// Como no hay cuentas de usuario, guardamos los favoritos en el navegador
// (localStorage). El Context comparte el estado entre TODOS los corazones.
//
// EL TEMA DE LA HIDRATACIÓN (lo nuevo para vos):
// El primer render ocurre en el SERVIDOR, donde NO existe localStorage.
// Si ahí ya pintáramos los favoritos, el HTML del server no coincidiría con
// el del navegador y React tiraría "hydration mismatch".
// Por eso arrancamos SIEMPRE vacío (igual en server y en cliente), y recién
// leemos localStorage DESPUÉS de montar (useEffect). El flag `hydrated`
// avisa cuándo ya se cargó, para no pintar de más antes de tiempo.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface FavoritesValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
  /** true una vez que se cargó localStorage (después de montar). */
  hydrated: boolean;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({
  children,
  storageKey = "favorites",
}: {
  children: ReactNode;
  storageKey?: string;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 1) Al montar (solo en el navegador): leer localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // localStorage puede fallar (modo incógnito, etc.) → ignoramos.
    }
    setHydrated(true);
  }, [storageKey]);

  // 2) Cada vez que cambian, persistir (solo después de hidratar, para no
  //    pisar lo guardado con el array vacío inicial).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites, hydrated, storageKey]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggle, count: favorites.length, hydrated }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  }
  return ctx;
}

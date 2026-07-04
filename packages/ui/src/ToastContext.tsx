"use client";
// Sistema de "toasts" (avisos temporales abajo de la pantalla).
// Genérico: cualquier componente llama showToast("...") y aparece un cartelito
// que se va solo. Se usa, por ejemplo, al agregar a favoritos o al carrito.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

export function ToastProvider({
  children,
  duration = 3000,
}: {
  children: ReactNode;
  duration?: number;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback(
    (message: string) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [duration],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <ToastItem key={t.id} message={t.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ message }: { message: string }) {
  // Aparece con una transición suave (sube y aparece) al montar.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="text-accent"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {message}
    </div>
  );
}

export function useToast(): ToastValue {
  // Fallback no-op si no hay provider (no rompe).
  return useContext(ToastContext) ?? { showToast: () => {} };
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-extrabold text-brand">404</h1>
      <p className="text-lg text-black/60">
        No encontramos lo que buscabas.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:opacity-90"
      >
        Volver a la tienda
      </Link>
    </main>
  );
}

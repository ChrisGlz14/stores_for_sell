import { formatPrice } from "@repo/ui";
import { productos } from "../../data";

export default function AdminProductos() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
        <button
          type="button"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Nuevo producto
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-black/45">
              <th className="p-3 font-semibold">Producto</th>
              <th className="p-3 font-semibold">Etiqueta</th>
              <th className="p-3 font-semibold">Precio</th>
              <th className="p-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-neutral-100 text-lg">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        p.emoji ?? "🛍️"
                      )}
                    </span>
                    <span className="line-clamp-1 font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 text-black/60">{p.badge ?? "—"}</td>
                <td className="p-3 font-semibold">{formatPrice(p.price)}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2 text-xs font-medium">
                    <button type="button" className="text-brand hover:underline">Editar</button>
                    <button type="button" className="text-red-600 hover:underline">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

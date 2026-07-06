import { formatPrice } from "@repo/ui";
import { recentOrders, type OrderStatus } from "../mock";

const statusStyles: Record<OrderStatus, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  pagado: "bg-blue-100 text-blue-800",
  enviado: "bg-green-100 text-green-800",
};

export default function AdminPedidos() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Pedidos</h1>

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-black/45">
              <th className="p-3 font-semibold">Pedido</th>
              <th className="p-3 font-semibold">Cliente</th>
              <th className="p-3 font-semibold">Fecha</th>
              <th className="p-3 font-semibold">Total</th>
              <th className="p-3 font-semibold">Estado</th>
              <th className="p-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                <td className="p-3 font-medium">{o.id}</td>
                <td className="p-3">{o.cliente}</td>
                <td className="p-3 text-black/60">{o.fecha}</td>
                <td className="p-3 font-semibold">{formatPrice(o.total)}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[o.estado]}`}>
                    {o.estado}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button type="button" className="text-xs font-medium text-brand hover:underline">
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

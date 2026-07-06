import { StatCard, AdminBarChart, formatPrice } from "@repo/ui";
import { productos } from "../data";
import { salesLast7, recentOrders, type OrderStatus } from "./mock";

const statusStyles: Record<OrderStatus, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  pagado: "bg-blue-100 text-blue-800",
  enviado: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const ventasSemana = salesLast7.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ventas (semana)" value={formatPrice(ventasSemana)} hint="+18% vs. anterior" trend="up" />
        <StatCard label="Pedidos nuevos" value={String(recentOrders.length)} hint="2 pendientes" />
        <StatCard label="Productos" value={String(productos.length)} hint="Publicados" />
        <StatCard label="Stock bajo" value="0" hint="Todo ok" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <AdminBarChart title="Ventas últimos 7 días" data={salesLast7} formatValue={formatPrice} />

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-bold">Pedidos recientes</h3>
          <ul className="flex flex-col divide-y divide-black/5">
            {recentOrders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-2 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{o.cliente}</p>
                  <p className="text-xs text-black/45">{o.id} · {o.fecha}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{formatPrice(o.total)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[o.estado]}`}>
                    {o.estado}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

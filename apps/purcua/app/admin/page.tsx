import { StatCard, AdminBarChart, formatPrice } from "@repo/ui";
import { getAllProducts } from "../lib/catalog";
import { salesLast7, recentOrders, type OrderStatus } from "./mock";

const statusStyles: Record<OrderStatus, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  pagado: "bg-blue-100 text-blue-800",
  enviado: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const productos = getAllProducts();
  const ventasMes = salesLast7.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ventas (semana)" value={formatPrice(ventasMes)} hint="+18% vs. anterior" trend="up" icon={<Icon path="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />} />
        <StatCard label="Pedidos nuevos" value={String(recentOrders.length)} hint="2 pendientes" trend="neutral" icon={<Icon path="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />} />
        <StatCard label="Productos" value={String(productos.length)} hint="Publicados" trend="neutral" icon={<Icon path="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8" />} />
        <StatCard label="Stock bajo" value="3" hint="Requieren reposición" trend="down" icon={<Icon path="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />} />
      </div>

      {/* Gráfico + pedidos recientes */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <AdminBarChart
          title="Ventas últimos 7 días"
          data={salesLast7}
          formatValue={formatPrice}
        />

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

function Icon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

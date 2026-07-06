// Datos de EJEMPLO para el panel admin (todavía sin base de datos).
// Cuando conectes la DB, esto sale de una consulta real.

import type { BarDatum } from "@repo/ui";

export const salesLast7: BarDatum[] = [
  { label: "Lun", value: 38000 },
  { label: "Mar", value: 52000 },
  { label: "Mié", value: 41000 },
  { label: "Jue", value: 68000 },
  { label: "Vie", value: 91000 },
  { label: "Sáb", value: 120000 },
  { label: "Dom", value: 74000 },
];

export type OrderStatus = "pendiente" | "pagado" | "enviado";

export interface AdminOrder {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  estado: OrderStatus;
}

export const recentOrders: AdminOrder[] = [
  { id: "#1042", cliente: "María López", fecha: "06/07", total: 18900, estado: "pendiente" },
  { id: "#1041", cliente: "Juan Pérez", fecha: "06/07", total: 45200, estado: "pagado" },
  { id: "#1040", cliente: "Sofía Gómez", fecha: "05/07", total: 12500, estado: "enviado" },
  { id: "#1039", cliente: "Lucas Díaz", fecha: "05/07", total: 8600, estado: "enviado" },
  { id: "#1038", cliente: "Camila Ruiz", fecha: "04/07", total: 32000, estado: "pagado" },
  { id: "#1037", cliente: "Tomás Fernández", fecha: "04/07", total: 5200, estado: "pendiente" },
];

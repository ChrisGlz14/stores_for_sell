import type { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: string;
  /** Texto secundario (ej. "+12% vs. mes pasado"). */
  hint?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export function StatCard({ label, value, hint, trend = "neutral", icon }: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-600"
        : "text-black/45";

  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-black/45">
          {label}
        </p>
        <p className="mt-1 text-2xl font-extrabold text-foreground">{value}</p>
        {hint ? (
          <p className={`mt-1 text-xs font-medium ${trendColor}`}>{hint}</p>
        ) : null}
      </div>
      {icon ? (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
          {icon}
        </span>
      ) : null}
    </div>
  );
}

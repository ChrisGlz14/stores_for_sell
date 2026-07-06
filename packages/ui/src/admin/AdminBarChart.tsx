export interface BarDatum {
  label: string;
  value: number;
}

export interface AdminBarChartProps {
  title?: string;
  data: BarDatum[];
  /** Formatea el valor para el tooltip (ej. precio). */
  formatValue?: (v: number) => string;
}

/**
 * Gráfico de barras de UNA serie (magnitud a lo largo del tiempo).
 * Una sola serie => un solo color (el de marca), sin leyenda.
 */
export function AdminBarChart({
  title,
  data,
  formatValue = (v) => String(v),
}: AdminBarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      {title ? <h3 className="mb-4 text-sm font-bold">{title}</h3> : null}
      <div className="flex h-48 items-end gap-2 border-b border-black/10 pb-0">
        {data.map((d) => (
          <div
            key={d.label}
            className="group flex flex-1 flex-col items-center justify-end gap-2"
            title={`${d.label}: ${formatValue(d.value)}`}
          >
            <div
              className="w-full rounded-t bg-brand transition group-hover:bg-accent"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        {data.map((d) => (
          <span
            key={d.label}
            className="flex-1 text-center text-[11px] text-black/45"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

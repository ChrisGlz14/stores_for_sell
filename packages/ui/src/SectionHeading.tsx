import type { ReactNode } from "react";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Contenido a la derecha (ej. link "Ver todos") */
  action?: ReactNode;
}

export function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-black/55">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

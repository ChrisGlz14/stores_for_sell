export default function AdminConfiguracion() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Configuración</h1>

      <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <Field label="Nombre de la tienda" value="Purcuá" />
        <Field label="Email de contacto" value="hola@purcua.com.ar" />
        <Field label="WhatsApp" value="+54 9 11 0000 0000" />
        <Field label="Instagram" value="@purcuatienda" />
        <div className="pt-2">
          <button
            type="button"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-black/45">
        Estos datos son de ejemplo. Cuando conectes la base de datos, se leen y
        guardan desde acá.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-black/60">{label}</span>
      <input
        defaultValue={value}
        className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}

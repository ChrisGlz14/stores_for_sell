"use client";
// Formulario de checkout (datos de contacto + envío). Genérico y reutilizable:
// no sabe nada del carrito; al enviar, entrega los datos por `onSubmit`.

import { useState } from "react";

export interface CheckoutData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  provincia: string;
  ciudad: string;
  cp: string;
  calle: string;
  numero: string;
  pisoDepto: string;
  notas: string;
}

export interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  submitLabel?: string;
}

const PROVINCIAS = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const EMPTY: CheckoutData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  provincia: "",
  ciudad: "",
  cp: "",
  calle: "",
  numero: "",
  pisoDepto: "",
  notas: "",
};

const inputClass =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-brand";

export function CheckoutForm({
  onSubmit,
  submitLabel = "Confirmar pedido",
}: CheckoutFormProps) {
  const [data, setData] = useState<CheckoutData>(EMPTY);

  function set<K extends keyof CheckoutData>(key: K, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
      className="flex flex-col gap-6"
    >
      {/* Contacto */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-black/70">
          Tus datos
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre" required>
            <input
              className={inputClass}
              value={data.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              required
            />
          </Field>
          <Field label="Apellido" required>
            <input
              className={inputClass}
              value={data.apellido}
              onChange={(e) => set("apellido", e.target.value)}
              required
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              className={inputClass}
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              required
            />
          </Field>
          <Field label="Teléfono / WhatsApp" required>
            <input
              type="tel"
              className={inputClass}
              value={data.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              required
            />
          </Field>
        </div>
      </fieldset>

      {/* Envío */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-black/70">
          Dirección de envío
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Provincia" required>
            <select
              className={inputClass}
              value={data.provincia}
              onChange={(e) => set("provincia", e.target.value)}
              required
            >
              <option value="" disabled>
                Elegí una provincia
              </option>
              {PROVINCIAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ciudad / Localidad" required>
            <input
              className={inputClass}
              value={data.ciudad}
              onChange={(e) => set("ciudad", e.target.value)}
              required
            />
          </Field>
          <Field label="Calle" required>
            <input
              className={inputClass}
              value={data.calle}
              onChange={(e) => set("calle", e.target.value)}
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Número" required>
              <input
                className={inputClass}
                value={data.numero}
                onChange={(e) => set("numero", e.target.value)}
                required
              />
            </Field>
            <Field label="Piso / Depto">
              <input
                className={inputClass}
                value={data.pisoDepto}
                onChange={(e) => set("pisoDepto", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Código postal" required>
            <input
              className={inputClass}
              value={data.cp}
              onChange={(e) => set("cp", e.target.value)}
              required
            />
          </Field>
        </div>
        <Field label="Notas para el envío (opcional)">
          <textarea
            className={`${inputClass} min-h-20 resize-y`}
            value={data.notas}
            onChange={(e) => set("notas", e.target.value)}
            placeholder="Ej. entregar por la tarde, timbre B, etc."
          />
        </Field>
      </fieldset>

      <button
        type="submit"
        className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-black/60">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

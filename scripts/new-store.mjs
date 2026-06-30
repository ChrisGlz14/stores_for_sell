#!/usr/bin/env node
// Crea una tienda nueva en apps/<nombre> a partir de templates/store.
// Uso:  pnpm nueva-tienda <nombre-en-kebab-case>
//   ej: pnpm nueva-tienda cliente-ferreteria

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const templateDir = path.join(repoRoot, "templates", "store");

const name = process.argv[2];

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

// 1) Validaciones
if (!name) {
  fail(
    "Falta el nombre.\n   Uso: pnpm nueva-tienda <nombre>\n   Ej:  pnpm nueva-tienda cliente-ferreteria",
  );
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  fail(
    `Nombre inválido: "${name}"\n   Usá solo minúsculas, números y guiones. Ej: cliente-ferreteria`,
  );
}

const destDir = path.join(repoRoot, "apps", name);
if (fs.existsSync(destDir)) {
  fail(`Ya existe una tienda en apps/${name}. Elegí otro nombre.`);
}
if (!fs.existsSync(templateDir)) {
  fail("No encuentro la plantilla en templates/store.");
}

// 2) Copiar la plantilla
console.log(`\n📦 Creando apps/${name} desde la plantilla...`);
fs.cpSync(templateDir, destDir, { recursive: true });

// 3) Reemplazar el nombre en package.json
const pkgPath = path.join(destDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.name = name;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// 4) Instalar dependencias para enlazar la app al workspace
console.log("🔗 Enlazando con pnpm install...\n");
try {
  execSync("pnpm install", { cwd: repoRoot, stdio: "inherit" });
} catch {
  console.warn(
    "\n⚠️  No pude correr pnpm install automáticamente. Corré 'pnpm install' a mano.",
  );
}

// 5) Listo
console.log(`\n✅ Tienda creada: apps/${name}\n`);
console.log("Próximos pasos:");
console.log(`  1. Editá apps/${name}/app/data.ts        → productos, menú, footer`);
console.log(`  2. Editá apps/${name}/app/page.tsx       → la constante BRAND y las secciones`);
console.log(`  3. Editá apps/${name}/app/globals.css    → los colores (--color-brand, --color-accent)`);
console.log(`\nLevantala con:  pnpm --filter ${name} dev\n`);

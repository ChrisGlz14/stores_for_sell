#!/usr/bin/env node
// Genera un catálogo (JSON estilo base de datos no relacional / documentos)
// leyendo las imágenes de apps/purcua/public/img.
// Uso:  pnpm catalogo
// Salida: apps/purcua/app/catalog.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const APP = "purcua";
const imgRoot = path.join(repoRoot, "apps", APP, "public", "img");
const outFile = path.join(repoRoot, "apps", APP, "app", "catalog.json");

// ---- Config de dominio -----------------------------------------------------

// Carpeta de productos -> categoría (nombre + singular para el título)
const CATEGORIES = {
  earrings: { slug: "aros", name: "Aros", singular: "Aros" },
  figures: { slug: "figuras", name: "Figuras", singular: "Figura" },
  keychains: { slug: "llaveros", name: "Llaveros", singular: "Llavero" },
  plush: { slug: "peluches", name: "Peluches", singular: "Peluche" },
};

// Rango de precios por categoría [min, max] (ARS). Ajustá a gusto.
const PRICE_RANGE = {
  earrings: [4500, 6500],
  figures: [15900, 28900],
  keychains: [3200, 4800],
  plush: [10900, 15900],
};

// Detección de saga/franquicia a partir del slug. Orden = prioridad.
const FRANCHISES = [
  { match: (s) => s.startsWith("dragonball") || s.startsWith("figure-goku"), slug: "dragon-ball", name: "Dragon Ball", drop: ["dragonball", "figure"] },
  { match: (s) => s.startsWith("jujutsu-kaisen"), slug: "jujutsu-kaisen", name: "Jujutsu Kaisen", drop: ["jujutsu", "kaisen"] },
  { match: (s) => s.startsWith("naruto"), slug: "naruto", name: "Naruto", drop: ["naruto"] },
  { match: (s) => s.startsWith("mha"), slug: "my-hero-academia", name: "My Hero Academia", drop: ["mha"] },
  { match: (s) => s.startsWith("sailor"), slug: "sailor-moon", name: "Sailor Moon", drop: ["sailor", "moon"] },
  { match: (s) => s.startsWith("saint-seiya"), slug: "saint-seiya", name: "Saint Seiya", drop: ["saint", "seiya"] },
  { match: (s) => s.startsWith("spy-x-family"), slug: "spy-x-family", name: "Spy x Family", drop: ["spy", "x", "family"] },
  { match: (s) => s.startsWith("one-piece") || s.includes("chopper"), slug: "one-piece", name: "One Piece", drop: ["one", "piece"] },
  { match: (s) => s.startsWith("bleach"), slug: "bleach", name: "Bleach", drop: ["bleach"] },
  { match: (s) => s.startsWith("chainsaw-man"), slug: "chainsaw-man", name: "Chainsaw Man", drop: ["chainsaw", "man"] },
  { match: (s) => s.startsWith("demon-slayer"), slug: "demon-slayer", name: "Demon Slayer", drop: ["demon", "slayer"] },
  { match: (s) => s.startsWith("pokemon") || s.includes("pikachu"), slug: "pokemon", name: "Pokémon", drop: ["pokemon"] },
  { match: (s) => s.includes("bt21"), slug: "bt21", name: "BT21 (BTS)", drop: ["bt21"] },
  { match: (s) => s.includes("kuromi") || s.includes("pochacco"), slug: "sanrio", name: "Sanrio", drop: [] },
  { match: (s) => s.includes("kirby"), slug: "kirby", name: "Kirby", drop: [] },
  { match: (s) => s.includes("predator"), slug: "predator", name: "Predator", drop: [] },
  { match: (s) => s.includes("patrick"), slug: "bob-esponja", name: "Bob Esponja", drop: [] },
];
const FRANCHISE_DEFAULT = { slug: "otros", name: "Otros", drop: [] };

// Tokens que son "línea/edición", se sacan del nombre y van como etiquetas.
const LINE_TAGS = { qposket: "Q Posket" };
// Tokens que se mantienen en el nombre pero también se marcan como etiqueta.
const KEEP_TAGS = { chibi: "Chibi", set: "Set", diorama: "Diorama", statue: "Estatua" };

// Nombres lindos para medios de pago
const PAYMENT_NAMES = {
  mercadopago: "Mercado Pago",
  "bank-transfer": "Transferencia bancaria",
  pagofacil: "Pago Fácil",
  "diners-club": "Diners Club",
  gocuotas: "GoCuotas",
  acordar: "A acordar",
};
const SHIPPING_NAMES = { "correo-argentino": "Correo Argentino" };

// Acrónimos que van en mayúscula al titular
const UPPER = new Set(["rj", "bt21", "afip", "jhr"]);

// ---- Helpers ---------------------------------------------------------------

const stripExt = (f) => f.replace(/\.[^.]+$/, "");

const CONNECTORS = { and: "y", vs: "vs" };
function titleCase(tokens) {
  return tokens
    .map((t, i) => {
      if (i > 0 && CONNECTORS[t]) return CONNECTORS[t];
      if (UPPER.has(t)) return t.toUpperCase();
      return t.charAt(0).toUpperCase() + t.slice(1);
    })
    .join(" ");
}

// Precio determinístico dentro del rango, estable por slug.
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function priceFor(folder, slug) {
  const [min, max] = PRICE_RANGE[folder] ?? [5000, 10000];
  const steps = Math.floor((max - min) / 100) + 1;
  return min + (hash(slug) % steps) * 100;
}

function detectFranchise(slug) {
  return FRANCHISES.find((f) => f.match(slug)) ?? FRANCHISE_DEFAULT;
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile());
}

// ---- Construcción de productos --------------------------------------------

const products = [];
const sagaCount = {};
const categoryList = [];

const productsRoot = path.join(imgRoot, "products");
for (const folder of Object.keys(CATEGORIES)) {
  const dir = path.join(productsRoot, folder);
  const files = listFiles(dir);
  if (files.length === 0) continue;
  const cat = CATEGORIES[folder];
  categoryList.push({ slug: cat.slug, name: cat.name, count: files.length });

  for (const file of files) {
    const slug = stripExt(file);
    const franchise = detectFranchise(slug);
    let tokens = slug.split("-");

    // sacar el token de categoría inicial (earrings/figure/keychain/plush)
    const catToken = folder.replace(/s$/, ""); // earrings->earring, figures->figure...
    tokens = tokens.filter((t) => t !== catToken && t !== folder && t !== "earrings");
    // sacar tokens de la franquicia
    tokens = tokens.filter((t) => !franchise.drop.includes(t));

    // etiquetas
    const tags = [];
    // "anime heroes" (línea de figuras)
    if (tokens.includes("anime") && tokens.includes("heroes")) {
      tags.push("Anime Heroes");
      tokens = tokens.filter((t) => t !== "anime" && t !== "heroes");
    }
    for (const [tok, label] of Object.entries(LINE_TAGS)) {
      if (tokens.includes(tok)) {
        tags.push(label);
        tokens = tokens.filter((t) => t !== tok);
      }
    }
    for (const [tok, label] of Object.entries(KEEP_TAGS)) {
      if (tokens.includes(tok)) tags.push(label);
    }

    const character = tokens.length ? titleCase(tokens) : franchise.name;

    // título
    const sameAsFranchise = character.toLowerCase() === franchise.name.toLowerCase();
    const title =
      sameAsFranchise || franchise.slug === "otros"
        ? `${cat.singular} ${character}`
        : `${cat.singular} ${franchise.name} - ${character}`;

    sagaCount[franchise.slug] = sagaCount[franchise.slug] || { slug: franchise.slug, name: franchise.name, count: 0 };
    sagaCount[franchise.slug].count++;

    products.push({
      id: slug,
      slug,
      title,
      price: priceFor(folder, slug),
      image: `/img/products/${folder}/${file}`,
      category: { slug: cat.slug, name: cat.name },
      saga: { slug: franchise.slug, name: franchise.name },
      character,
      tags,
      inStock: true,
      featured: false,
    });
  }
}

// ---- Assets institucionales (logo, banners, pagos, envíos) -----------------

function assetsFrom(folder, nameMap = {}) {
  return listFiles(path.join(imgRoot, folder)).map((file) => {
    const slug = stripExt(file);
    const key = slug.replace(/^(payment|shipping)-/, "");
    const name = nameMap[key] ?? titleCase(key.split("-"));
    return { slug, name, image: `/img/${folder}/${file}` };
  });
}

const logoFile = listFiles(path.join(imgRoot, "logo"))[0];

const catalog = {
  _meta: {
    generatedAt: new Date().toISOString(),
    source: `apps/${APP}/public/img`,
    note: "Generado con `pnpm catalogo`. Editá precios/destacados a mano o volvé a correr el script.",
    totalProducts: products.length,
  },
  store: {
    name: "Purcuá",
    logo: logoFile ? `/img/logo/${logoFile}` : null,
    banners: assetsFrom("banners"),
    customWork: assetsFrom("custom-work"),
    paymentMethods: assetsFrom("payment-methods", PAYMENT_NAMES),
    shippingMethods: assetsFrom("shipping", SHIPPING_NAMES),
  },
  categories: categoryList,
  sagas: Object.values(sagaCount).sort((a, b) => b.count - a.count),
  products,
};

fs.writeFileSync(outFile, JSON.stringify(catalog, null, 2) + "\n");

console.log(`\n✅ Catálogo generado: apps/${APP}/app/catalog.json`);
console.log(`   ${products.length} productos · ${categoryList.length} categorías · ${catalog.sagas.length} sagas\n`);
console.log("Sagas detectadas:");
for (const s of catalog.sagas) console.log(`   - ${s.name}: ${s.count}`);
console.log("");

# stores-for-sell (monorepo)

Monorepo de webs para pymes. Una base de componentes compartidos y una app
Next.js por cliente. Gestionado con **pnpm workspaces** + **Turborepo**.

## Estructura

```
apps/
  cliente-demo/      # una web Next.js por cliente
packages/
  ui/                # componentes compartidos (@repo/ui)
  tsconfig/          # configs TypeScript base (@repo/tsconfig)
```

## Comandos (desde la raíz)

```bash
pnpm install        # instala todo el workspace
pnpm dev            # levanta todas las apps en modo dev (turbo)
pnpm build          # buildea todas las apps (con caché de turbo)
pnpm lint           # lint de todo el monorepo
```

Para una sola app: `pnpm --filter cliente-demo dev`.

## Cómo agregar un cliente nuevo

Usá el script (copia la plantilla `templates/store` y la enlaza sola):

```bash
pnpm nueva-tienda cliente-x
```

Después editás 3 archivos en `apps/cliente-x/`:
1. `app/data.ts` → productos, menú, footer.
2. `app/page.tsx` → la constante `BRAND` y qué secciones mostrar.
3. `app/globals.css` → los colores (`--color-brand`, `--color-accent`).

Y la levantás con `pnpm --filter cliente-x dev`.

Los componentes nuevos que sirvan a varios clientes van en `packages/ui`.
La plantilla base que copia el script vive en `templates/store/`.

## Nota sobre pnpm

Este entorno usa pnpm vía corepack. Si el comando `pnpm` no está en el PATH,
los shims están en `~/.corepack-bin` (agregar esa carpeta al PATH), o usar
`corepack pnpm <comando>`.

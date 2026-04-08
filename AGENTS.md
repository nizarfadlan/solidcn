# AGENTS

This file is the canonical guidance for coding agents in this repository.

## Monorepo Overview

solidcn is a shadcn/ui-style ecosystem for SolidJS: copy-paste components, not a black-box runtime library.

### Stack

- SolidJS + SolidStart (`apps/docs`)
- `@kobalte/core` for accessible primitives
- `corvu` for advanced primitives (Drawer, Resizable, etc.)
- Tailwind CSS v4 + tailwind-variants
- Biome for lint + format
- pnpm workspaces

### Package Map

- `packages/core` -> `@solidcn/core`
- `packages/toast` -> `@solidcn/toast`
- `packages/themes` -> `@solidcn/themes`
- `packages/cli` -> `solidcn`
- `packages/create-solidcn-app` -> `create-solidcn-app`
- `packages/mcp-cloudflare` -> `@solidcn/mcp-cloudflare`
- `apps/docs` -> `@solidcn/docs`

### Before Changing Docs

Build imported workspace packages first:

```bash
pnpm --filter @solidcn/core build
pnpm --filter @solidcn/toast build
pnpm --filter @solidcn/themes build
```

### Conventions

- TypeScript strict + `exactOptionalPropertyTypes`
- Use Biome formatting (`biome.json` defines style)
- Use `lucide-solid` for public docs UI icons
- Prefer Solid primitives (`<Show>`, `<For>`) over React patterns

## Docs UI Guidance

### Theme

- Default is light; dark mode uses `.dark` on `<html>`
- Font is Inter (configured in docs app entry)

### Layout

- Header: `h-14`, border + backdrop blur
- Desktop sidebar: compact width, grouped sections, active row highlighted
- Mobile menu state is owned by `app.tsx` (not `DocLayout`)
- `DocLayout` renders article + right-side TOC on xl screens
- `DocPage` supports SEO (`docPath`), copy page markdown, prev/next pager, optional playground embed
- Keep 404 route + prerender setup intact

### TOC Behavior

- Label should remain "On this page"
- Active section should follow scroll position reliably near page bottom

### Code Block Behavior

- Shiki theme follows docs theme (`github-light` / `github-dark`)
- `variant="card"`: keep readable, theme-appropriate backgrounds
- `variant="figure"`: use docs code surface tokens; transparent `pre.shiki` inside figure surface
- With `filename`: keep a dedicated header row with copy action

### Component Demo Behavior

- Preserve shadcn-like sequence: preview -> code toggle -> code panel
- Collapsed code should use partial height + bottom-only fade
- Expanded code shows full content

### Prose Styling

- Main title: `text-4xl font-bold tracking-tight`
- Section title: `text-xl font-semibold`
- Keep CLI docs sections linkable via TOC ids + `scroll-mt-*`

### Do Not

- Do not use emoji as icons in public docs UI
- Do not force dark code surfaces in light mode

## Registry and CLI Rules

### Schema Source of Truth

- `packages/cli/src/schema/json-schemas/registry.json`
- `packages/cli/src/schema/json-schemas/registry-item.json`
- `packages/cli/src/schema/json-schemas/config.json`

### Hosted Registry in Docs

For `apps/docs/public/r/`:

- Every `registry.json` entry must map to a fetchable JSON file
- Keep paths compatible with `solidcn add`

### After Core Component Changes

1. Regenerate/update registry as needed (`pnpm registry:build`)
2. Keep docs component pages and docs navigation in sync

### CLI Constraints

- Avoid hardcoded absolute paths
- Respect `cwd` and project config
- Keep registry command behavior aligned with schemas

# create-solidcn-app

Create a new SolidJS application with solidcn UI components pre-configured.

## Usage

```bash
npm create solidcn-app@latest
pnpm create solidcn-app@latest
bun create solidcn-app@latest
```

## What It Does

`solidcn` scaffolds a complete SolidStart project with:

1. **SolidStart** — file-based routing, SSR, and server functions
2. **Tailwind CSS v4** — utility-first styling with solidcn design tokens
3. **solidcn configuration** — `solidcn.json` with component aliases and theme settings
4. **Utility setup** — `cn()` helper for Tailwind class merging
5. **Component aliases** — `~/components/ui` and `~/lib/utils` path aliases ready to use
6. **ThemeProvider** — `@solidcn/themes` wrapped at the app root

## Interactive Prompts

| Prompt | Options |
|---|---|---|
| **Project name** | Any lowercase alphanumeric string with hyphens/underscores |
| **Template** | `default` (SolidStart + solidcn + Tailwind v4), `minimal` (bare essential components) |
| **Base color** | `default`, `slate`, `zinc`, `rose`, `blue`, `green`, `orange` |
| **Package manager** | `npm`, `pnpm`, `bun` |

## Generated Structure

```
my-app/
├── src/
│   ├── components/ui/     # solidcn components install here
│   ├── lib/
│   │   └── utils.ts       # cn() helper
│   ├── routes/
│   │   └── index.tsx      # Home page
│   ├── app.tsx            # App root with ThemeProvider
│   └── app.css             # Tailwind directives
├── solidcn.json            # solidcn CLI configuration
├── package.json
└── tsconfig.json
```

## After Creation

Navigate to your new project and start developing:

```bash
cd my-app
npm run dev
```

Add components with CLI:

```bash
npx solidcn@latest add button dialog card
npx solidcn@latest add form input label
```

If setup drift happens later, `solidcn add` now runs preflight checks and can auto-fix Tailwind/plugin/alias gaps before install.

Update existing components when the registry changes:

```bash
npx solidcn@latest diff button
npx solidcn@latest update button
```

## SolidStart Integration

The generated project uses SolidStart's file-based routing:

```tsx
// src/routes/index.tsx
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div class="container mx-auto flex min-h-screen items-center justify-center">
      <Button>Hello, SolidJS</Button>
    </div>
  );
}
```

Path aliases (`~/*`) resolve to `src/*` automatically through the project's TypeScript configuration.

## Non-Interactive Usage

For CI/CD or scripted scaffolding, you can use the interactive prompts with stdin piping or use `expect`-style tools. The CLI requires interactive input — it does not currently support all-options-on-flags mode.

## Requirements

- Node.js ≥ 20
- npm, pnpm, or bun

## License

MIT

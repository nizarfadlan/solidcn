<div align="center">
  <h1>solidcn</h1>
  <p>Beautifully designed components for SolidJS. Copy, paste, own.</p>

  <p>
    <a href="https://solidcn.dev">Documentation</a>
    ·
    <a href="https://solidcn.dev/docs/components/button">Components</a>
    ·
    <a href="https://solidcn.dev/docs/registry">Registry</a>
    ·
    <a href="https://solidcn.dev/docs/cli">CLI</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/SolidJS-2.x-blue?logo=solid" alt="SolidJS" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  </p>
</div>

---

## What is this?

**solidcn** is a port of [shadcn/ui](https://ui.shadcn.com) for [SolidJS](https://www.solidjs.com). It is **not a component library** — it is a collection of reusable, accessible, copy-paste components that you own and can customize.

Pick the components you need. Copy the source into your project. Adapt them to your design. No black box.

Built on top of:

- **[Kobalte](https://kobalte.dev)** — headless, accessible UI primitives
- **[corvu](https://corvu.dev)** — advanced SolidJS UI primitives (Drawer, Resizable, etc.)
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **[class-variance-authority](https://cva.style)** — type-safe variant management
- **[@modular-forms/solid](https://modularforms.dev)** — form handling

---

## Quick Start

```bash
# Scaffold a new project
npm create solidcn-app@latest my-app

# Or add to an existing SolidStart project
npx solidcn@latest init
```

Then add your first component:

```bash
npx solidcn@latest add button
```

Use it in your app:

```tsx
import { Button } from "~/components/ui/button";

export default function App() {
  return <Button>Hello, SolidJS</Button>;
}
```

---

## Components

42 components across all categories, built with accessibility in mind.

| Category | Components |
|---|---|
| **Core** | Button, Badge, Separator, Accordion, Checkbox, Radio Group, Toggle, Switch, Slider, Progress, Tooltip, Popover, Dialog, Alert Dialog, Dropdown Menu, Context Menu, Select, Combobox, Tabs, Collapsible |
| **Layout & Form** | Card, Table, Avatar, Skeleton, Input, Textarea, Label, Form, Calendar, Date Picker, Command, Breadcrumb, Pagination, Navigation Menu, Menubar |
| **Complex & Overlay** | Sheet, Drawer, Resizable, Carousel, Scroll Area, Sidebar, Hover Card |
| **Toast** | Standard Toast, Sileo Toast (physics-based SVG morphing) |

---

## Packages

| Package | Description |
|---|---|
| `@solidcn/core` | 42+ UI components |
| `@solidcn/toast` | Dual toast system — Standard + physics-based Sileo mode |
| `@solidcn/themes` | CSS variable tokens, `ThemeProvider`, `useTheme`, 7 built-in themes |
| `solidcn` (CLI) | `init`, `add`, `diff`, `update`, `search`, `list`, `view`, `registry`, `mcp` commands |
| `create-solidcn-app` | `npm create solidcn-app` project scaffolder |
| `@solidcn/mcp-cloudflare` | Cloudflare Worker for HTTP MCP transport |

---

## Theming

All components are styled with CSS variables. Swap themes at runtime, or generate your own.

```tsx
import { ThemeProvider } from "@solidcn/themes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="zinc" defaultColorScheme="dark">
      {/* your app */}
    </ThemeProvider>
  );
}
```

Built-in themes: `default` · `slate` · `zinc` · `rose` · `blue` · `green` · `orange`

---

## Open Registry

solidcn supports a decentralized registry protocol. Publish your own components, use from any URL.

```json
// solidcn.json
{
  "registries": {
    "@acme": "https://ui.acme.com/r/{name}.json"
  }
}
```

```bash
# Install from a named registry
npx solidcn@latest add @acme/card

# Install directly from a URL
npx solidcn@latest add https://ui.acme.com/r/card.json
```

---

## Update Workflow (shadcn-like)

Use this flow to safely update components you already installed:

```bash
# 1) Inspect what would change
npx solidcn@latest diff button --only-modified

# Optional: show line-level patch
npx solidcn@latest diff button --only-modified --patch

# 2) Apply updates
npx solidcn@latest update button --only-modified

# Optional: preview update without writing files
npx solidcn@latest update button --dry-run --only-modified
```

---

## MCP Server

solidcn ships with a built-in [Model Context Protocol](https://modelcontextprotocol.io) server, letting AI agents browse and install components directly.

```bash
# Cursor / Claude Desktop
npx solidcn@latest mcp
```

Available tools: `search_components` · `get_component` · `install_component` · `list_components` · `get_registry_info` · `get_component_docs`

Deploy your own HTTP MCP endpoint with `@solidcn/mcp-cloudflare`:

```bash
cd packages/mcp-cloudflare
pnpm deploy
```

---

## Repository Structure

```
solidcn/
├── packages/
│   ├── core/                 → @solidcn/core (42+ components)
│   ├── toast/                → @solidcn/toast (Standard + Sileo)
│   ├── themes/               → @solidcn/themes (CSS vars + ThemeProvider)
│   ├── cli/                  → solidcn CLI (npx solidcn@latest)
│   ├── create-solidcn-app/   → npm create solidcn-app
│   └── mcp-cloudflare/       → @solidcn/mcp-cloudflare (HTTP MCP Worker)
├── apps/
│   └── docs/                 → Documentation site (SolidStart)
├── biome.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Development

**Prerequisites:** Node.js ≥ 20, pnpm ≥ 9

```bash
# Clone and install
git clone https://github.com/nizarfadlan/solidcn.git
cd solidcn
pnpm install

# Build all packages
pnpm build

# Start docs site
pnpm --filter @solidcn/docs dev

# Typecheck everything
pnpm typecheck

# Lint
pnpm lint
```

---

## FAQ

**Is this affiliated with shadcn/ui?**
No. solidcn is an independent port inspired by shadcn/ui's approach (copy-paste, not a dependency). It follows the same philosophy for the SolidJS ecosystem.

**Do I need to install `@solidcn/core` as a dependency?**
No. When you run `npx solidcn@latest add button`, the component source is copied directly into your project under `src/components/ui/`. You own the code.

**Can I use solidcn without the CLI?**
Yes. Every component can be manually copied from the [documentation](https://solidcn.dev).

**Is dark mode supported?**
Yes. All components use CSS variables. Dark mode works via the `.dark` class strategy or `prefers-color-scheme` media query, configurable per project.

---

## License

MIT © [SolidCn Community](https://solidcn.dev)

---

<div align="center">
  <sub>Built with ❤️ for the SolidJS community</sub>
</div>

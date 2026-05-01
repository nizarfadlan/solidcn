# solidcn

CLI for managing SolidJS UI components from any shadcn-compatible registry.

## Features

- **Init bootstrap** — `init` sets up `solidcn.json`, Tailwind CSS entry/token block, plugin checks, and TS alias for `~/*`
- **Fresh-project preflight** — `add` detects missing setup and offers auto-fix before installing components
- **Offline-safe baseline** — built-in `tailwind-base` fallback when default registry unavailable
- **Add components** — fetch from any HTTP registry, resolve dependencies, install with import rewriting
- **Update safely** — preview diffs, apply patches, skip unmodified files
- **Multi-registry support** — configure named registries with custom headers and env variable interpolation
- **MCP server** — let AI agents browse and install components via Model Context Protocol
- **Local registry tooling** — create, build, validate, and publish your own component registry

## Installation

```bash
npm install -D solidcn
pnpm add -D solidcn
yarn add -D solidcn
bun add -D solidcn
```

Requires Node.js ≥ 20.

## Quick Start

Initialize SolidStart or Vite project:

```bash
npx solidcn@latest init
```

What `init` does now:

- writes `solidcn.json`
- ensures Tailwind CSS entrypoint import exists in configured CSS file
- injects solidcn base token block idempotently
- checks/patches Tailwind Vite plugin setup (`app.config.*` or `vite.config.*`)
- ensures TS alias `~/*` points to `./src/*`

Add components:

```bash
npx solidcn@latest add button
npx solidcn@latest add dialog card tooltip
```

## Commands

### User Commands

| Command | Description |
|---|---|
| `init` | Generate `solidcn.json` + run setup bootstrap for Tailwind/plugin/alias |
| `add <components...>` | Install components from registry with preflight setup checks |
| `update <components...>` | Update installed components to latest registry version |
| `diff <component>` | Preview changes between installed and remote versions |
| `search <query>` | Search all configured registries by name or description |
| `list [registry]` | List available components |
| `view <component>` | Inspect a component's metadata, deps, and source |
| `mcp` | Start an interactive MCP stdio server for AI tooling |

### Registry Commands

| Command | Description |
|---|---|
| `registry create` | Scaffold a new registry project structure |
| `registry add [name]` | Add a new component to the local registry |
| `registry build` | Build registry JSON from source components |
| `registry validate` | Validate registry items against the schema |

### Command Options

**add / update**

| Flag | Description |
|---|---|
| `-y, --yes` | Skip confirmation prompts |
| `--overwrite` | Overwrite existing files without prompting |
| `--skip-preflight` | Skip setup preflight checks before install |
| `--dry-run` | Show what would be written without modifying files |

**diff**

| Flag | Description |
|---|---|
| `--patch` | Show unified diff (git-style patch output) |
| `--only-modified` | Only show files that differ from the registry |

**list**

| Flag | Description |
|---|---|
| `--type <type>` | Filter by type (`ui`, `block`, `hook`, `lib`, `page`) |

## Configuration

`solidcn init` generates a config file. You can also create one manually:

```json
{
  "$schema": "https://solidcn.dev/schema/config.json",
  "style": "default",
  "tailwind": {
    "css": "src/app.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "~/components/ui",
    "utils": "~/lib/utils",
    "hooks": "~/hooks"
  },
  "registries": {
    "@acme": {
      "url": "https://ui.acme.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${API_TOKEN}"
      }
    }
  }
}
```

### Config Options

| Field | Type | Default | Description |
|---|---|---|---|
| `style` | `"default"` \| `"new-york"` | `"default"` | Component style variant |
| `tailwind.css` | `string` | `"src/app.css"` | Path to main CSS file |
| `tailwind.baseColor` | `string` | `"slate"` | Base color theme |
| `aliases.components` | `string` | `"~/components/ui"` | Component path alias |
| `aliases.utils` | `string` | `"~/lib/utils"` | Utils path alias |
| `aliases.hooks` | `string` | `"~/hooks"` | Hooks path alias |
| `registries` | `Record<string, object>` | `{}` | Named external registries |

### Multi-Registry Usage

Configure a private registry and install from it:

```json
{
  "registries": {
    "@acme": "https://ui.acme.com/r/{name}.json"
  }
}
```

```bash
npx solidcn@latest add @acme/card
```

Or install directly from a URL:

```bash
npx solidcn@latest add https://example.com/components/button.json
```

## MCP Integration

Start an interactive MCP stdio server:

```bash
npx solidcn@latest mcp
```

Available tools:

| Tool | Description |
|---|---|
| `search_components` | Search components by name, titles, or descriptions |
| `get_component` | Get full registry item JSON and source code |
| `install_component` | Install a component (non-interactive MCP mode) |
| `list_components` | List all available components, optionally filtered by type |
| `get_registry_info` | Get registry metadata and configuration |
| `get_component_docs` | Get concise documentation and install command for a component |

## Building Your Own Registry

```bash
# Create a registry project
npx solidcn@latest registry create my-ui
cd my-ui

# Add a component
npx solidcn@latest registry add custom-button

# Build the registry JSON
npx solidcn@latest registry build

# Deploy public/ to any static host
```

## Scripts

| Script | Description |
|---|---|
| `registry:build` | Build registry JSON from source components |
| `registry:validate` | Validate registry items against schema |

## License

MIT

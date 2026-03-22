# @solidcn/mcp-cloudflare

A Cloudflare Worker that exposes your solidcn-compatible registry as an **MCP HTTP server**.

AI tools that support the MCP HTTP transport (e.g. Cursor, Claude Code, Windsurf) can connect directly to your deployed registry and install components without any local CLI setup.

## Quick start

```bash
# Clone / copy this package into your registry project
cp -r packages/mcp-cloudflare my-registry/

# Configure
cp .dev.vars.example .dev.vars
# edit REGISTRY_URL and REGISTRY_NAME

# Develop
pnpm dev

# Deploy
pnpm deploy
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `REGISTRY_URL` | ✅ | Base URL of your registry JSON files (e.g. `https://acme.com/r`) |
| `REGISTRY_NAME` | Optional | Registry namespace (default: derived from `registry.json`) |
| `API_TOKEN` | Optional | Bearer token to protect the `/mcp` endpoint |

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/mcp` | Server info + available tools |
| `POST` | `/mcp` | JSON-RPC 2.0 tool call |

## Connecting from Cursor / Claude Code

```json
// .mcp.json
{
  "mcpServers": {
    "acme-registry": {
      "type": "http",
      "url": "https://solidcn-mcp.your-domain.workers.dev/mcp"
    }
  }
}
```

## Available tools

| Tool | Input | Description |
|---|---|---|
| `search_components` | `{ query }` | Search by name/title/description |
| `get_component` | `{ name }` | Full registry item JSON + source |
| `list_components` | `{ type? }` | All items (optional type filter) |
| `get_registry_info` | `{}` | Registry metadata |
| `get_component_docs` | `{ name }` | Concise docs + install command |

## KV caching (optional)

Add a KV namespace to `wrangler.jsonc` for 5-minute caching of registry responses:

```jsonc
{
  "kv_namespaces": [
    { "binding": "REGISTRY_CACHE", "id": "your-kv-namespace-id" }
  ]
}
```

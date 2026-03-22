/**
 * @solidcn/mcp-cloudflare
 *
 * A Cloudflare Worker that exposes a solidcn-compatible MCP server over HTTP.
 * Deploy it alongside your registry to let AI tools (Cursor, Claude Code, etc.)
 * browse and install components directly.
 *
 * Endpoints:
 *   GET  /mcp   → server info + tool list (SSE or JSON)
 *   POST /mcp   → JSON-RPC 2.0 tool call
 *   GET  /health → health check
 */

export interface Env {
  /** Base URL for registry JSON files (e.g. https://registry.acme.com/r) */
  REGISTRY_URL: string;
  /** Registry namespace name (e.g. "acme") */
  REGISTRY_NAME?: string;
  /** Optional bearer token to protect the /mcp endpoint */
  API_TOKEN?: string;
  /** Optional KV namespace for caching registry responses */
  REGISTRY_CACHE?: KVNamespace;
}

// ---------------------------------------------------------------------------
// MCP JSON-RPC types
// ---------------------------------------------------------------------------

interface McpRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: {
    name?: string;
    arguments?: Record<string, unknown>;
  };
}

interface McpResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: unknown;
  error?: { code: number; message: string };
}

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "search_components",
    description: "Search for components in this registry",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component",
    description: "Get full details and source for a component",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_components",
    description: "List all available components in this registry",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["ui", "block", "hook", "lib", "page"],
          description: "Filter by item type",
        },
      },
    },
  },
  {
    name: "get_registry_info",
    description: "Get metadata about this registry",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_component_docs",
    description: "Get concise docs/usage info for a component",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name" },
      },
      required: ["name"],
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Registry helpers
// ---------------------------------------------------------------------------

async function fetchJson<T>(url: string, cache?: KVNamespace): Promise<T> {
  const cacheKey = `registry:${url}`;

  if (cache) {
    const cached = await cache.get(cacheKey);
    if (cached) return JSON.parse(cached) as T;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} → ${res.status}`);
  const data = (await res.json()) as T;

  if (cache) {
    // Cache for 5 minutes
    await cache.put(cacheKey, JSON.stringify(data), { expirationTtl: 300 });
  }

  return data;
}

interface RegistryIndex {
  name: string;
  homepage?: string;
  description?: string;
  items: Array<{ name: string; type: string; title?: string; description?: string }>;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{ path: string; type: string; content: string }>;
  cssVars?: { light?: Record<string, string>; dark?: Record<string, string> };
}

async function getIndex(env: Env): Promise<RegistryIndex> {
  return fetchJson<RegistryIndex>(`${env.REGISTRY_URL}/registry.json`, env.REGISTRY_CACHE);
}

async function getItem(env: Env, name: string): Promise<RegistryItem> {
  return fetchJson<RegistryItem>(`${env.REGISTRY_URL}/${name}.json`, env.REGISTRY_CACHE);
}

// ---------------------------------------------------------------------------
// Tool handler
// ---------------------------------------------------------------------------

async function handleTool(name: string, args: Record<string, unknown>, env: Env): Promise<unknown> {
  switch (name) {
    case "search_components": {
      const query = (args.query as string).toLowerCase();
      const index = await getIndex(env);
      const results = index.items.filter(
        (i) =>
          i.name.includes(query) ||
          i.title?.toLowerCase().includes(query) ||
          i.description?.toLowerCase().includes(query),
      );
      return { results, total: results.length };
    }

    case "get_component": {
      const item = await getItem(env, args.name as string);
      return item;
    }

    case "list_components": {
      const index = await getIndex(env);
      const typeFilter = args.type as string | undefined;
      const items = typeFilter
        ? index.items.filter((i) => i.type === `registry:${typeFilter}`)
        : index.items;
      return { items, total: items.length };
    }

    case "get_registry_info": {
      const index = await getIndex(env);
      return {
        name: index.name,
        homepage: index.homepage,
        description: index.description,
        totalItems: index.items.length,
        types: [...new Set(index.items.map((i) => i.type))],
        namespace: env.REGISTRY_NAME ?? index.name,
        registryUrl: env.REGISTRY_URL,
      };
    }

    case "get_component_docs": {
      const item = await getItem(env, args.name as string);
      return {
        name: item.name,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies ?? [],
        registryDependencies: item.registryDependencies ?? [],
        files: item.files?.map((f) => ({ path: f.path, type: f.type })) ?? [],
        cssVars: item.cssVars,
        installCommand: `npx solidcn@latest add @${env.REGISTRY_NAME ?? "registry"}/${item.name}`,
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ---------------------------------------------------------------------------
// JSON-RPC dispatcher
// ---------------------------------------------------------------------------

async function dispatch(req: McpRequest, env: Env): Promise<McpResponse> {
  const { id, method, params } = req;

  try {
    if (method === "initialize") {
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: {
            name: env.REGISTRY_NAME ?? "solidcn-registry",
            version: "1.0.0",
          },
        },
      };
    }

    if (method === "tools/list") {
      return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
    }

    if (method === "tools/call") {
      const toolName = params?.name;
      const toolArgs = (params?.arguments ?? {}) as Record<string, unknown>;

      if (!toolName) {
        return { jsonrpc: "2.0", id, error: { code: -32602, message: "Missing tool name" } };
      }

      const result = await handleTool(toolName, toolArgs, env);
      return {
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] },
      };
    }

    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { jsonrpc: "2.0", id, error: { code: -32603, message } };
  }
}

// ---------------------------------------------------------------------------
// CORS helper
// ---------------------------------------------------------------------------

function cors(res: Response): Response {
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, { status: res.status, headers });
}

// ---------------------------------------------------------------------------
// Worker fetch handler
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    // Health check
    if (url.pathname === "/health") {
      return cors(
        new Response(JSON.stringify({ status: "ok", registry: env.REGISTRY_URL }), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    }

    if (url.pathname !== "/mcp") {
      return cors(new Response("Not found", { status: 404 }));
    }

    // Optional auth check
    if (env.API_TOKEN) {
      const auth = request.headers.get("Authorization");
      if (auth !== `Bearer ${env.API_TOKEN}`) {
        return cors(new Response("Unauthorized", { status: 401 }));
      }
    }

    // GET /mcp → server info (useful for discovery)
    if (request.method === "GET") {
      const info = {
        name: env.REGISTRY_NAME ?? "solidcn-registry",
        version: "1.0.0",
        protocolVersion: "2024-11-05",
        transport: "http",
        registryUrl: env.REGISTRY_URL,
        tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      };
      return cors(
        new Response(JSON.stringify(info, null, 2), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    }

    // POST /mcp → JSON-RPC 2.0 tool call
    if (request.method === "POST") {
      let body: McpRequest;
      try {
        body = (await request.json()) as McpRequest;
      } catch {
        return cors(
          new Response(
            JSON.stringify({
              jsonrpc: "2.0",
              id: null,
              error: { code: -32700, message: "Parse error" },
            }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          ),
        );
      }

      const response = await dispatch(body, env);
      return cors(
        new Response(JSON.stringify(response), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    }

    return cors(new Response("Method not allowed", { status: 405 }));
  },
} satisfies ExportedHandler<Env>;

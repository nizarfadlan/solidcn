import { resolve } from "node:path";
import { Command } from "commander";
import { Fetcher } from "../registry/fetcher.js";
import { Installer } from "../registry/installer.js";
import { Resolver } from "../registry/resolver.js";
import { loadConfig } from "../schema/config.js";

// ---------------------------------------------------------------------------
// MCP protocol types (minimal subset)
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
    description: "Search for components across configured registries",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        registry: { type: "string", description: "Optional registry namespace (e.g. @acme)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component",
    description: "Get full registry item details for a component",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name or namespace/name" },
      },
      required: ["name"],
    },
  },
  {
    name: "install_component",
    description: "Install a component into the current project",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Component name or namespace/name" },
        targetDir: { type: "string", description: "Override target directory" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_components",
    description: "List all available components",
    inputSchema: {
      type: "object",
      properties: {
        registry: { type: "string", description: "Optional registry namespace" },
        type: { type: "string", enum: ["ui", "block", "hook"], description: "Filter by type" },
      },
    },
  },
  {
    name: "get_registry_info",
    description: "Get metadata about a registry",
    inputSchema: {
      type: "object",
      properties: {
        registry: { type: "string", description: "Registry namespace or URL" },
      },
      required: ["registry"],
    },
  },
  {
    name: "check_config",
    description: "Read the solidcn.json config for the current project",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_component_docs",
    description: "Get usage docs and props for a component",
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
// Handler
// ---------------------------------------------------------------------------

async function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
  cwd: string,
): Promise<unknown> {
  const config = await loadConfig(cwd);
  const fetcher = new Fetcher(config);
  const resolver = new Resolver(fetcher, config);

  switch (toolName) {
    case "search_components": {
      const query = args.query as string;
      const registryNs = args.registry as string | undefined;
      const index = await fetcher.fetchIndex(registryNs);
      const matches = index.items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
      return { results: matches };
    }

    case "get_component": {
      const name = args.name as string;
      const item = await fetcher.fetchItem(name);
      return item;
    }

    case "install_component": {
      const name = args.name as string;
      const installer = new Installer(cwd, config, false, false, false);
      const items = await resolver.resolve(name);
      for (const item of items) {
        await installer.install(item);
      }
      return { installed: items.map((i) => i.name) };
    }

    case "list_components": {
      const registryNs = args.registry as string | undefined;
      const typeFilter = args.type as string | undefined;
      const index = await fetcher.fetchIndex(registryNs);
      const items = typeFilter
        ? index.items.filter((i) => i.type === `registry:${typeFilter}`)
        : index.items;
      return { items };
    }

    case "get_registry_info": {
      const registryNs = args.registry as string;
      const index = await fetcher.fetchIndex(registryNs);
      return index;
    }

    case "check_config": {
      return config;
    }

    case "get_component_docs": {
      const name = args.name as string;
      const item = await fetcher.fetchItem(name);
      return {
        name: item.name,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies,
        files: item.files?.map((f) => ({ path: f.path, type: f.type })),
        cssVars: item.cssVars,
      };
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// ---------------------------------------------------------------------------
// stdio MCP server loop
// ---------------------------------------------------------------------------

async function runMcpServer(cwd: string): Promise<void> {
  process.stdin.setEncoding("utf-8");

  let buffer = "";

  process.stdin.on("data", async (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      let request: McpRequest;
      try {
        request = JSON.parse(trimmed) as McpRequest;
      } catch {
        continue;
      }

      const response = await dispatch(request, cwd);
      process.stdout.write(`${JSON.stringify(response)}\n`);
    }
  });
}

async function dispatch(request: McpRequest, cwd: string): Promise<McpResponse> {
  const { id, method, params } = request;

  try {
    if (method === "initialize") {
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "solidcn", version: "0.0.1" },
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

      const result = await handleToolCall(toolName, toolArgs, cwd);
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        },
      };
    }

    return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { jsonrpc: "2.0", id, error: { code: -32603, message } };
  }
}

export const mcpCommand = new Command("mcp")
  .description("Start the MCP server (stdio transport)")
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (opts: { cwd: string }) => {
    const cwd = resolve(opts.cwd);
    await runMcpServer(cwd);
  });

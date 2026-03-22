import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";

const mcpSetup = `// .mcp.json (local, per project)
{
  "mcpServers": {
    "solidcn": {
      "type": "stdio",
      "command": "npx",
      "args": ["solidcn@latest", "mcp"]
    }
  }
}`;

const workflowExample = `// Example AI interaction:
User: "Add a data table with sorting and pagination"

AI agent:
→ search_components({ query: "data table sorting pagination" })
→ get_component({ name: "data-table" })
→ get_component_docs({ name: "data-table" })
→ install_component({ name: "data-table" })
→ install_component({ name: "pagination" })
→ Generate usage code based on props docs`;

const thirdPartyMcp = `// Use multiple registries via MCP
{
  "mcpServers": {
    "solidcn": {
      "type": "stdio",
      "command": "npx",
      "args": ["solidcn@latest", "mcp"]
    },
    "acme-components": {
      "type": "http",
      "url": "https://registry.acme.com/mcp"
    }
  }
}`;

const tools = [
  { name: "search_components", input: "{ query, registry? }", output: "Matching components list" },
  { name: "get_component", input: "{ name }", output: "Full registry item JSON" },
  { name: "install_component", input: "{ name, targetDir? }", output: "Installed files list" },
  { name: "list_components", input: "{ registry?, type? }", output: "All available items" },
  { name: "get_registry_info", input: "{ registry }", output: "Registry metadata" },
  { name: "check_config", input: "{}", output: "Current solidcn.json" },
  { name: "get_component_docs", input: "{ name }", output: "Props, usage, examples" },
];

export default function McpPage() {
  return (
    <DocLayout>
      <DocsSeo
        title="MCP Server — solidcn"
        description="Model Context Protocol server for solidcn — search, install, and document components from AI tools."
        path="/docs/mcp"
      />
      <div class="max-w-3xl space-y-10">
        <div>
          <div class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary mb-3">
            AI Integration
          </div>
          <h1 class="text-3xl font-bold tracking-tight">MCP Server</h1>
          <p class="mt-3 text-muted-foreground">
            solidcn ships a built-in{" "}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noreferrer"
              class="underline hover:text-foreground"
            >
              Model Context Protocol
            </a>{" "}
            server. AI agents in Cursor, Claude Code, Windsurf, and VS Code Copilot can install
            components directly without leaving the editor.
          </p>
        </div>

        <hr class="border-border" />

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Setup</h2>
          <p class="text-sm text-muted-foreground">
            Add to your project's <code class="text-xs bg-muted px-1 rounded">.mcp.json</code> or
            Cursor settings:
          </p>
          <CodeBlock code={mcpSetup} lang="json" filename=".mcp.json" />
          <p class="text-sm text-muted-foreground">
            Then restart your AI editor — solidcn tools will appear in the AI's toolbox.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Available tools</h2>
          <div class="overflow-x-auto rounded-lg border">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b bg-muted/50">
                  <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Tool</th>
                  <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Input</th>
                  <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Returns</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((t, i) => (
                  <tr class={i % 2 === 0 ? "" : "bg-muted/20"}>
                    <td class="px-4 py-2.5 font-mono text-xs text-primary">{t.name}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{t.input}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{t.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Example AI workflow</h2>
          <CodeBlock code={workflowExample} lang="ts" />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Third-party registries via MCP</h2>
          <p class="text-sm text-muted-foreground">
            Registries that implement the MCP HTTP transport can also be used directly by AI tools.
          </p>
          <CodeBlock code={thirdPartyMcp} lang="json" filename=".mcp.json" />
        </section>

        <section class="rounded-lg border bg-primary/5 p-5 space-y-2">
          <h3 class="font-semibold text-sm">HTTP MCP Transport</h3>
          <p class="text-sm text-muted-foreground">
            Third-party registries can expose{" "}
            <code class="text-xs bg-muted px-1 rounded">GET /mcp</code> and{" "}
            <code class="text-xs bg-muted px-1 rounded">POST /mcp</code> endpoints to implement the
            MCP protocol over HTTP. Ideal for deployment to Cloudflare Workers.
          </p>
          <CodeBlock
            code={`GET  /mcp   → server info + tool list
POST /mcp   → tool call handler (JSON-RPC 2.0)`}
            lang="bash"
          />
        </section>
      </div>
    </DocLayout>
  );
}

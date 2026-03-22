import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";

const communityRegistries = [
  {
    name: "solidcn (official)",
    namespace: "@solidcn",
    url: "https://solidcn.nizarfadlan.dev/r",
    homepage: "https://solidcn.nizarfadlan.dev",
    description: "Official solidcn components — 42+ components ported from shadcn/ui.",
    items: 42,
    badge: "official",
  },
];

const createRegistryCode = `# 1. Scaffold
npx solidcn@latest create-registry my-components
cd my-components

# 2. Add components
npx solidcn@latest registry add button
npx solidcn@latest registry add data-table

# 3. Build registry JSON
npx solidcn@latest registry build
# → generates public/r/registry.json, public/r/button.json ...

# 4. Deploy (any static host)
# Vercel, Netlify, Cloudflare Pages, GitHub Pages

# 5. Users can now install from your registry
npx solidcn@latest add @my-namespace/button`;

const mcpCode = `# Add remote MCP to your registry
cp -r node_modules/@solidcn/mcp-cloudflare worker/
# Edit worker/wrangler.jsonc: set REGISTRY_URL and REGISTRY_NAME
npx wrangler deploy worker/

# Users can now use in .mcp.json:
# {
#   "mcpServers": {
#     "my-registry": {
#       "type": "http",
#       "url": "https://my-worker.workers.dev/mcp"
#     }
#   }
# }`;

const configCode = `// solidcn.json — add your registry
{
  "registries": {
    "@my-namespace": "https://my-registry.vercel.app/r/{name}.json"
  }
}`;

export default function RegistryPage() {
  return (
    <DocLayout>
      <DocsSeo
        title="Open Registry — solidcn"
        description="Host your own solidcn-compatible component registry and publish JSON the CLI can install from."
        path="/docs/registry"
      />
      <div class="max-w-3xl space-y-10">
        <div>
          <p class="text-sm font-medium text-primary">Getting Started</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Open Registry</h1>
          <p class="mt-3 text-muted-foreground">
            Anyone can host a solidcn-compatible registry. No central approval. Just serve JSON that
            matches the schema — and others can install from your registry with{" "}
            <code class="text-xs bg-muted px-1 rounded">
              npx solidcn@latest add @yourname/component
            </code>
            .
          </p>
        </div>

        <hr class="border-border" />

        {/* Registry directory */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Registry directory</h2>
          <p class="text-sm text-muted-foreground">
            Known solidcn-compatible registries. Submit a PR to add yours.
          </p>
          <div class="space-y-3">
            {communityRegistries.map((reg) => (
              <div class="rounded-xl border bg-card p-5">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-semibold">{reg.name}</p>
                      {reg.badge === "official" && (
                        <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">
                          Official
                        </span>
                      )}
                    </div>
                    <p class="mt-1 text-sm text-muted-foreground">{reg.description}</p>
                  </div>
                  <a
                    href={reg.homepage}
                    target="_blank"
                    rel="noreferrer"
                    class="shrink-0 text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Visit →
                  </a>
                </div>
                <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    <code class="bg-muted px-1 rounded">{reg.namespace}</code>
                  </span>
                  <span>{reg.items} components</span>
                  <code class="bg-muted px-1 rounded font-mono">{reg.url}/registry.json</code>
                </div>
              </div>
            ))}

            {/* Submit placeholder */}
            <a
              href="https://github.com/solidcn/solidcn/blob/main/REGISTRIES.md"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center gap-2 rounded-xl border border-dashed p-5 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <span class="text-lg">+</span>
              Submit your registry
            </a>
          </div>
        </section>

        {/* How to create */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Create your own registry</h2>
          <CodeBlock code={createRegistryCode} lang="bash" />
        </section>

        {/* Connect to solidcn.json */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Connect a registry</h2>
          <p class="text-sm text-muted-foreground">
            Add any registry to your project's{" "}
            <code class="text-xs bg-muted px-1 rounded">solidcn.json</code>:
          </p>
          <CodeBlock code={configCode} lang="typescript" filename="solidcn.json" />
        </section>

        {/* Schema */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Registry protocol</h2>
          <div class="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "registry.json",
                desc: "Index file listing all available items.",
                href: "https://solidcn.dev/schema/registry.json",
              },
              {
                title: "registry-item.json",
                desc: "Single item with files, deps, and CSS vars.",
                href: "https://solidcn.dev/schema/registry-item.json",
              },
              {
                title: "config.json",
                desc: "solidcn.json project config schema.",
                href: "https://solidcn.dev/schema/config.json",
              },
              {
                title: "@solidcn/mcp-cloudflare",
                desc: "Expose your registry as an MCP HTTP server.",
                href: "/docs/mcp",
              },
            ].map((s) => (
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                class="rounded-lg border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p class="font-mono text-sm font-medium">{s.title}</p>
                <p class="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* MCP section */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Add MCP support to your registry</h2>
          <p class="text-sm text-muted-foreground">
            Use <code class="text-xs bg-muted px-1 rounded">@solidcn/mcp-cloudflare</code> to deploy
            a Cloudflare Worker alongside your registry, making it accessible to AI tools.
          </p>
          <CodeBlock code={mcpCode} lang="bash" />
        </section>
      </div>
    </DocLayout>
  );
}

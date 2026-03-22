import { For } from "solid-js";
import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";
import type { TocItem } from "../../lib/toc.js";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-|-$/g, "");
}

const commands = [
  {
    cmd: "solidcn init",
    desc: "Initialize solidcn in an existing project",
    code: "npx solidcn@latest init",
  },
  {
    cmd: "solidcn add",
    desc: "Add components from the default or a third-party registry",
    code: `npx solidcn@latest add button
npx solidcn@latest add dialog toast
npx solidcn@latest add @acme/data-table          # third-party namespace
npx solidcn@latest add https://example.com/r/button.json   # direct URL`,
  },
  {
    cmd: "solidcn view",
    desc: "Preview a component's source before installing",
    code: `npx solidcn@latest view button
npx solidcn@latest view @acme/data-table`,
  },
  {
    cmd: "solidcn search",
    desc: "Search across all configured registries",
    code: "npx solidcn@latest search input",
  },
  {
    cmd: "solidcn list",
    desc: "List all available components",
    code: `npx solidcn@latest list
npx solidcn@latest list @acme`,
  },
  {
    cmd: "solidcn registry build",
    desc: "Build registry JSON files from source components",
    code: "npx solidcn@latest registry build --input src/components --output public/r",
  },
  {
    cmd: "solidcn registry create",
    desc: "Scaffold a new registry project",
    code: "npx solidcn@latest create-registry my-registry",
  },
  {
    cmd: "solidcn mcp",
    desc: "Start the MCP server (for AI tools)",
    code: "npx solidcn@latest mcp",
  },
];

const toc: TocItem[] = [
  { id: "overview", title: "Overview", level: 2 },
  ...commands.map((c) => ({
    id: slugify(c.cmd),
    title: c.cmd,
    level: 3 as const,
  })),
  { id: "open-registry", title: "Open Registry", level: 2 },
  { id: "auth-support", title: "Auth support", level: 2 },
];

export default function CLIPage() {
  return (
    <DocLayout toc={toc}>
      <DocsSeo
        title="CLI — solidcn"
        description="solidcn CLI: init, add, view, search, list, registry build, and MCP server."
        path="/docs/cli"
      />

      <div class="space-y-10 pb-16" id="overview">
        <div class="space-y-3">
          <p class="text-sm font-medium text-muted-foreground">Getting Started</p>
          <h1 class="text-4xl font-bold tracking-tight text-foreground">CLI</h1>
          <p class="text-base leading-7 text-muted-foreground">
            The{" "}
            <code class="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px]">
              solidcn
            </code>{" "}
            CLI manages component installation, registry hosting, and MCP server.
          </p>
        </div>

        <hr class="border-border" />

        <section class="space-y-10" aria-labelledby="commands-heading">
          <h2 id="commands-heading" class="sr-only">
            Commands
          </h2>
          <For each={commands}>
            {(c) => (
              <div class="scroll-mt-24 space-y-3" id={slugify(c.cmd)}>
                <div>
                  <h3 class="font-mono text-base font-semibold tracking-tight text-foreground">
                    {c.cmd}
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">{c.desc}</p>
                </div>
                <CodeBlock code={c.code} lang="bash" />
              </div>
            )}
          </For>
        </section>

        <section class="scroll-mt-24 space-y-4" id="open-registry">
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Open Registry</h2>
          <p class="text-sm leading-7 text-muted-foreground">
            Anyone can host a solidcn-compatible registry. No central approval. Just serve JSON that
            conforms to the{" "}
            <code class="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              registry-item.json
            </code>{" "}
            schema.
          </p>
          <CodeBlock
            code={`# Scaffold a registry
npx solidcn@latest create-registry my-registry
cd my-registry

# Add components
npx solidcn@latest registry add button

# Build → generates JSON into public/r/
npx solidcn@latest registry build

# Deploy (Vercel, Netlify, Cloudflare Pages, GitHub Pages)
# Then users can install from your registry:
npx solidcn@latest add @yourname/button`}
            lang="bash"
          />
        </section>

        <section class="scroll-mt-24 space-y-4" id="auth-support">
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Auth support</h2>
          <p class="text-sm leading-7 text-muted-foreground">
            Private registries can require auth headers. Configure via{" "}
            <code class="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              solidcn.json
            </code>
            :
          </p>
          <CodeBlock
            code={`{
  "registries": {
    "@internal": {
      "url": "https://registry.company.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer \${REGISTRY_TOKEN}"
      }
    }
  }
}`}
            lang="json"
            filename="solidcn.json"
          />
          <p class="text-sm leading-7 text-muted-foreground">
            <code class="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              ${"{ENV_VAR}"}
            </code>{" "}
            syntax reads from environment variables at runtime.
          </p>
        </section>
      </div>
    </DocLayout>
  );
}

import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";

export default function InstallationPage() {
  return (
    <DocLayout>
      <DocsSeo
        title="Installation — solidcn"
        description="Set up solidcn in a new SolidStart project with Tailwind v4 and CSS variables."
        path="/docs/installation"
      />
      <div class="max-w-3xl space-y-10">
        <div>
          <p class="text-sm font-medium text-primary">Getting Started</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Installation</h1>
          <p class="mt-3 text-muted-foreground">
            Set up solidcn in a new SolidStart project in under 5 minutes.
          </p>
        </div>

        <hr class="border-border" />

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">1. Create a SolidStart project</h2>
          <CodeBlock
            code={`npm create solid@latest my-app
cd my-app
npm install`}
            lang="bash"
          />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">2. Run the solidcn init command</h2>
          <p class="text-sm text-muted-foreground">
            This installs Tailwind v4, sets up CSS variables, and creates{" "}
            <code class="text-xs bg-muted px-1 py-0.5 rounded">solidcn.json</code>.
          </p>
          <CodeBlock code="npx solidcn@latest init" lang="bash" />
          <p class="text-sm text-muted-foreground">The init command will ask:</p>
          <ul class="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
            <li>Which base color theme? (default, slate, zinc, rose, blue, green, orange)</li>
            <li>
              Where is your global CSS file? (e.g.{" "}
              <code class="bg-muted px-1 rounded">src/app.css</code>)
            </li>
            <li>
              Where should components be placed? (e.g.{" "}
              <code class="bg-muted px-1 rounded">~/components/ui</code>)
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">3. Add components</h2>
          <CodeBlock
            code={`# Add individual components
npx solidcn@latest add button
npx solidcn@latest add dialog toast

# Add multiple at once
npx solidcn@latest add button dialog tooltip dropdown-menu`}
            lang="bash"
          />
          <p class="text-sm text-muted-foreground">
            Components are copied to{" "}
            <code class="text-xs bg-muted px-1 py-0.5 rounded">src/components/ui/</code> (or
            wherever you configured).
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">4. Use components</h2>
          <CodeBlock
            code={`import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

export default function App() {
  return (
    <Dialog>
      <DialogTrigger as={Button}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Hello from solidcn!</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}`}
            lang="tsx"
            filename="src/routes/index.tsx"
          />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Manual installation (optional)</h2>
          <p class="text-sm text-muted-foreground">
            If you prefer the distributed package over copy-paste:
          </p>
          <CodeBlock
            code={`npm install @solidcn/core @kobalte/core corvu tailwind-variants
npm install @solidcn/toast        # optional — toast system
npm install @solidcn/themes       # optional — theming`}
            lang="bash"
          />
          <p class="text-sm text-muted-foreground">
            Then import directly from{" "}
            <code class="text-xs bg-muted px-1 py-0.5 rounded">@solidcn/core</code>.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">solidcn.json reference</h2>
          <CodeBlock
            code={`{
  "$schema": "https://solidcn.dev/schema/config.json",
  "style": "default",
  "tailwind": {
    "css": "src/app.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "~/components/ui",
    "utils": "~/lib/utils"
  },
  "registries": {
    "@acme": "https://registry.acme.com/r/{name}.json"
  }
}`}
            lang="json"
            filename="solidcn.json"
          />
        </section>
      </div>
    </DocLayout>
  );
}

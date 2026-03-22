import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";

const cssVarsExample = `/* src/app.css */
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
  /* ... more tokens */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... */
}`;

const providerExample = `// src/app.tsx
import { ThemeProvider } from "@solidcn/themes";

export default function App() {
  return (
    <ThemeProvider
      theme="blue"            // built-in preset
      colorScheme="system"    // "light" | "dark" | "system"
      darkModeStrategy="class" // adds .dark to <html>
    >
      <Router>
        <FileRoutes />
      </Router>
    </ThemeProvider>
  );
}`;

const toggleExample = `import { useColorScheme } from "@solidcn/themes";

function DarkModeToggle() {
  const { isDark, toggle } = useColorScheme();
  return (
    <button onClick={toggle}>
      {isDark() ? "Switch to light" : "Switch to dark"}
    </button>
  );
}`;

const generateExample = `import { generateTheme, generateThemeCSS } from "@solidcn/themes/generator";

// Generate from any HSL color
const brandTheme = generateTheme({
  name: "brand",
  label: "Brand",
  primaryHsl: "258 89% 66%",   // purple-ish
  radius: "0.75rem",
});

// Or get the raw CSS string
const css = generateThemeCSS({
  name: "brand",
  primaryHsl: "258 89% 66%",
});
// → ":root { --background: ...; --primary: 258 89% 66%; ... }\\n.dark { ... }"`;

export default function ThemingPage() {
  return (
    <DocLayout>
      <DocsSeo
        title="Theming — solidcn"
        description="CSS variables, ThemeProvider, dark mode, and theme generation for solidcn."
        path="/docs/theming"
      />
      <div class="max-w-3xl space-y-10">
        <div>
          <p class="text-sm font-medium text-primary">Getting Started</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Theming</h1>
          <p class="mt-3 text-muted-foreground">
            solidcn uses CSS variables for theming. Define once in your CSS, works everywhere.
          </p>
        </div>

        <hr class="border-border" />

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">CSS variables</h2>
          <p class="text-sm text-muted-foreground">
            All components read from CSS custom properties. Tailwind v4 maps them via{" "}
            <code class="text-xs bg-muted px-1 rounded">@theme inline</code>.
          </p>
          <CodeBlock code={cssVarsExample} lang="css" filename="src/app.css" />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Built-in themes</h2>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["default", "slate", "zinc", "rose", "blue", "green", "orange"].map((t) => (
              <div class="flex items-center gap-2 rounded-lg border bg-card p-3">
                <div
                  class="h-5 w-5 rounded-full border shadow-sm"
                  style={{
                    background:
                      {
                        default: "hsl(222 47% 11%)",
                        slate: "hsl(215 25% 27%)",
                        zinc: "hsl(240 6% 10%)",
                        rose: "hsl(347 77% 50%)",
                        blue: "hsl(221 83% 53%)",
                        green: "hsl(142 76% 36%)",
                        orange: "hsl(25 95% 53%)",
                      }[t] ?? "#000",
                  }}
                />
                <span class="text-sm capitalize">{t}</span>
              </div>
            ))}
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">ThemeProvider</h2>
          <p class="text-sm text-muted-foreground">
            Use <code class="text-xs bg-muted px-1 rounded">@solidcn/themes</code> for runtime theme
            switching.
          </p>
          <CodeBlock code={providerExample} lang="tsx" filename="src/app.tsx" />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Dark mode toggle</h2>
          <CodeBlock code={toggleExample} lang="tsx" />
          <p class="text-sm text-muted-foreground">
            The <code class="text-xs bg-muted px-1 rounded">useColorScheme()</code> hook also
            provides <code class="text-xs bg-muted px-1 rounded">cycle()</code> (light → dark →
            system) and <code class="text-xs bg-muted px-1 rounded">setColorScheme()</code>.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Theme generator</h2>
          <p class="text-sm text-muted-foreground">
            Generate a full theme palette from a single primary HSL color. Named color shortcuts
            available: <code class="text-xs bg-muted px-1 rounded">rose</code>,{" "}
            <code class="text-xs bg-muted px-1 rounded">blue</code>,{" "}
            <code class="text-xs bg-muted px-1 rounded">violet</code>, and{" "}
            <a
              href="https://github.com/solidcn/solidcn#named-colors"
              class="underline hover:text-foreground"
            >
              17 more
            </a>
            .
          </p>
          <CodeBlock code={generateExample} lang="ts" />
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Token reference</h2>
          <div class="overflow-x-auto rounded-lg border text-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b bg-muted/50">
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Token</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">
                    CSS variable
                  </th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Used for</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["background", "--background", "Page background"],
                  ["foreground", "--foreground", "Default text"],
                  ["primary", "--primary", "Primary action color"],
                  ["primary-foreground", "--primary-foreground", "Text on primary"],
                  ["muted", "--muted", "Subtle backgrounds"],
                  ["muted-foreground", "--muted-foreground", "Subdued text"],
                  ["accent", "--accent", "Hover highlights"],
                  ["destructive", "--destructive", "Error/danger"],
                  ["border", "--border", "Default borders"],
                  ["ring", "--ring", "Focus rings"],
                  ["radius", "--radius", "Border radius"],
                ].map(([name, variable, desc]) => (
                  <tr class="border-b last:border-0">
                    <td class="px-4 py-2 font-mono text-xs">{name}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{variable}</td>
                    <td class="px-4 py-2 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocLayout>
  );
}

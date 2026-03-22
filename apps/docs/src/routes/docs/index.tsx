import { A } from "@solidjs/router";
import { DocLayout } from "../../components/layout/DocLayout.js";
import { DocsSeo } from "../../lib/docs-seo.js";

export default function DocsIntroduction() {
  return (
    <DocLayout>
      <DocsSeo
        title="Introduction — solidcn"
        description="solidcn is a port of shadcn/ui for SolidJS — copy-paste components you own. Accessible, composable, and framework-native."
        path="/docs"
      />
      <div class="prose-sm max-w-3xl space-y-8">
        <div>
          <p class="text-sm font-medium text-primary">Introduction</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">solidcn</h1>
          <p class="mt-3 text-lg text-muted-foreground">
            A port of{" "}
            <a
              href="https://ui.shadcn.com"
              class="underline hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              shadcn/ui
            </a>{" "}
            for SolidJS — accessible, composable, and yours to own.
          </p>
        </div>

        <hr class="border-border" />

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">What is solidcn?</h2>
          <p class="text-muted-foreground leading-relaxed">
            solidcn is <strong class="text-foreground">not a component library</strong> in the
            traditional sense. It's a collection of reusable components that you{" "}
            <strong class="text-foreground">copy and paste</strong> into your project. You own the
            source code. No version lock-in, no library to update, no style overrides.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Pick the components you need, copy them into{" "}
            <code class="text-xs bg-muted px-1 py-0.5 rounded">src/components/ui/</code>, and
            customize them to your heart's content.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Tech stack</h2>
          <div class="grid gap-3 sm:grid-cols-2">
            {[
              { name: "@kobalte/core", desc: "Headless WAI-ARIA primitives for SolidJS" },
              { name: "corvu", desc: "Advanced UI primitives (Drawer, Resizable)" },
              { name: "tailwind-variants", desc: "Type-safe variant management" },
              { name: "Tailwind CSS v4", desc: "Utility-first CSS with CSS variables" },
            ].map((t) => (
              <div class="rounded-lg border bg-card p-4">
                <p class="font-mono text-sm font-medium">{t.name}</p>
                <p class="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">FAQ</h2>
          <div class="space-y-4">
            {[
              {
                q: "Is this a dependency I install?",
                a: "No. solidcn is a CLI that copies component source files into your project. @solidcn/core is only needed if you want the distributed package instead of the copy-paste workflow.",
              },
              {
                q: "Can I customize components?",
                a: "Absolutely. Since you own the source, you can change anything — styles, behavior, types. It's just TypeScript + Tailwind.",
              },
              {
                q: "Is it production ready?",
                a: "Components are built on well-tested headless libraries (Kobalte, corvu). The styling layer is Tailwind which you control.",
              },
            ].map((item) => (
              <div class="rounded-lg border bg-muted/20 p-4">
                <p class="font-medium text-sm">{item.q}</p>
                <p class="mt-1 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div class="flex gap-3">
          <A
            href="/docs/installation"
            class="inline-flex h-9 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started →
          </A>
        </div>
      </div>
    </DocLayout>
  );
}

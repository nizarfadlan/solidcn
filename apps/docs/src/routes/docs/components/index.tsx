import { A } from "@solidjs/router";
import { DocLayout } from "../../../components/layout/DocLayout.js";
import { DocsSeo } from "../../../lib/docs-seo.js";
import { navigation } from "../../../lib/nav.js";

export default function ComponentsIndex() {
  const componentGroups = navigation.filter((g) =>
    ["Core Primitives", "Layout & Form", "Complex & Overlay", "Toast"].includes(g.title),
  );

  return (
    <DocLayout>
      <DocsSeo
        title="Components — solidcn"
        description="Browse 42+ accessible SolidJS UI components — copy-paste into your project."
        path="/docs/components"
      />
      <div class="max-w-3xl space-y-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Components</h1>
          <p class="mt-3 text-muted-foreground">
            42+ accessible, composable UI components for SolidJS. Copy-paste into your project.
          </p>
        </div>

        <hr class="border-border" />

        {componentGroups.map((group) => (
          <section class="space-y-3">
            <h2 class="text-lg font-semibold">{group.title}</h2>
            <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <A
                  href={item.href}
                  class="flex items-center justify-between rounded-lg border bg-card p-3 text-sm hover:border-primary/40 hover:bg-accent/30 transition-colors"
                >
                  <span class="font-medium">{item.title}</span>
                  {item.badge && (
                    <span class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {item.badge}
                    </span>
                  )}
                </A>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocLayout>
  );
}

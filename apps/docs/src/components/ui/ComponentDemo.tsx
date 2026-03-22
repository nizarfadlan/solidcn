import { ChevronDown } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { Show, createSignal } from "solid-js";
import { CodeBlock } from "./CodeBlock.js";

interface ComponentDemoProps {
  preview: JSX.Element;
  code: string;
  filename?: string;
  class?: string;
}

/** Collapsed height — matches shadcn CodeCollapsible (~max-h-64) */
const PEEK_MAX_H = "max-h-64";

export const ComponentDemo: Component<ComponentDemoProps> = (props) => {
  const [codeOpen, setCodeOpen] = createSignal(false);

  return (
    <div class={`rounded-lg border border-border bg-card shadow-sm ${props.class ?? ""}`}>
      {/* Preview — bottom border is the seam the pill straddles */}
      <div class="flex min-h-[200px] items-center justify-center rounded-t-lg border-b border-border bg-background/80 p-8">
        {props.preview}
      </div>

      {/* Code + floating “View code” centered on the seam (shadcn-style) */}
      <div class="relative rounded-b-lg">
        <button
          type="button"
          onClick={() => setCodeOpen((v) => !v)}
          class={[
            "absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2",
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-md transition-colors",
            "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
            "dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
          ].join(" ")}
          aria-expanded={codeOpen()}
        >
          <ChevronDown
            class={[
              "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
              codeOpen() ? "rotate-180" : "",
            ].join(" ")}
            stroke-width={2}
            aria-hidden="true"
          />
          {codeOpen() ? "Hide code" : "View code"}
        </button>

        <div
          class={[
            "relative overflow-hidden rounded-b-lg transition-[max-height] duration-200 ease-out",
            codeOpen() ? "max-h-none" : `${PEEK_MAX_H}`,
          ].join(" ")}
        >
          <CodeBlock
            variant="figure"
            code={props.code}
            lang="tsx"
            {...(props.filename !== undefined ? { filename: props.filename } : {})}
            class="rounded-none rounded-b-lg"
          />
          <Show when={!codeOpen()}>
            {/* Bottom fade only (shadcn-style), not a full-panel wash */}
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--docs-code) / 0.5), hsl(var(--docs-code)))",
              }}
              aria-hidden="true"
            />
          </Show>
        </div>
      </div>
    </div>
  );
};

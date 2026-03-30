import { Check, ChevronDown, Copy } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";
import { CodeBlock } from "./CodeBlock.js";

interface ComponentDemoProps {
  preview: JSX.Element;
  code: string;
  filename?: string;
  class?: string;
}

/** Collapse threshold in px — matches max-h-64 (256px) */
const PEEK_H = 256;

export const ComponentDemo: Component<ComponentDemoProps> = (props) => {
  const [expanded, setExpanded] = createSignal(false);
  const [copied, setCopied] = createSignal(false);
  const [needsExpand, setNeedsExpand] = createSignal(false);
  let codeInner: HTMLDivElement | undefined;

  const copy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Measure actual rendered code height to decide if we need collapse
  onMount(() => {
    if (!codeInner) return;
    // scrollHeight is the real content height regardless of max-height CSS
    const observe = () => {
      if (codeInner && codeInner.scrollHeight > PEEK_H + 4) {
        setNeedsExpand(true);
      }
    };
    // Run after Shiki finishes (waits up to ~800ms)
    observe();
    const t1 = setTimeout(observe, 150);
    const t2 = setTimeout(observe, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  });

  return (
    <div
      class={`overflow-hidden rounded-xl border border-border bg-background shadow-sm ${props.class ?? ""}`}
    >
      {/* ── Preview pane ── */}
      <div class="docs-preview-grid flex min-h-[200px] items-center justify-center p-8 sm:min-h-[220px]">
        {props.preview}
      </div>

      {/* ── Code area ── */}
      <div class="border-t border-border">
        {/* Toolbar */}
        <div class="flex h-10 items-center gap-1.5 border-b border-border bg-[hsl(var(--docs-code))] px-4">
          <span class="flex-1 truncate font-mono text-xs text-muted-foreground">
            {props.filename ?? "example.tsx"}
          </span>

          {/* Copy */}
          <button
            type="button"
            onClick={copy}
            class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-black/[0.06] hover:text-foreground dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
            aria-label={copied() ? "Copied" : "Copy code"}
          >
            <Show
              when={copied()}
              fallback={<Copy class="size-3.5" stroke-width={2} aria-hidden="true" />}
            >
              <Check
                class="size-3.5 text-green-600 dark:text-green-400"
                stroke-width={2}
                aria-hidden="true"
              />
            </Show>
          </button>

          {/* Separator + Expand toggle — only rendered when overflow detected */}
          <Show when={needsExpand()}>
            <span class="h-4 w-px bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              class="inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground transition-colors hover:bg-black/[0.06] hover:text-foreground dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
              aria-expanded={expanded()}
            >
              <ChevronDown
                class={`size-3.5 shrink-0 transition-transform duration-200 ${expanded() ? "rotate-180" : ""}`}
                stroke-width={2}
                aria-hidden="true"
              />
              <span>{expanded() ? "Collapse" : "Expand"}</span>
            </button>
          </Show>
        </div>

        {/* Code body */}
        <div class="relative">
          <div
            ref={codeInner}
            class={`overflow-hidden transition-[max-height] duration-300 ease-out ${
              needsExpand() && !expanded() ? "max-h-64" : "max-h-[none]"
            }`}
          >
            <CodeBlock
              variant="figure"
              code={props.code}
              lang="tsx"
              {...(props.filename !== undefined ? { filename: props.filename } : {})}
              class="rounded-none border-0 shadow-none"
            />
          </div>

          {/* Bottom gradient + "View source" — only when overflow AND collapsed */}
          <Show when={needsExpand() && !expanded()}>
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--docs-code) / 0.85), hsl(var(--docs-code)))",
              }}
              aria-hidden="true"
            />
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-center pb-3">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                class="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
              >
                <ChevronDown class="size-3 shrink-0" stroke-width={2} aria-hidden="true" />
                View source
              </button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

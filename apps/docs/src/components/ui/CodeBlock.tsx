import { Check, Copy } from "lucide-solid";
import { type Component, Show, createEffect, createSignal } from "solid-js";
import { highlight } from "../../lib/highlight.js";
import { docsTheme } from "../../lib/theme.js";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  class?: string;
  /** `figure` = flat demo panel (inside ComponentDemo); `card` = standalone code blocks in prose */
  variant?: "card" | "figure";
}

/** Map common file extensions to a short display label */
function extLabel(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    tsx: "tsx",
    ts: "ts",
    jsx: "jsx",
    js: "js",
    css: "css",
    json: "json",
    bash: "sh",
    sh: "sh",
    md: "md",
    mdx: "mdx",
  };
  return map[ext] ?? ext;
}

/** Icon pill for file type — small colored badge like vscode tabs */
const ExtBadge: Component<{ filename: string }> = (props) => {
  const label = () => extLabel(props.filename);
  return (
    <span class="shrink-0 rounded px-1 py-0.5 font-mono text-[10px] font-medium leading-none bg-muted text-muted-foreground">
      {label()}
    </span>
  );
};

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [html, setHtml] = createSignal<string>("");
  const [copied, setCopied] = createSignal(false);

  const variant = () => props.variant ?? "card";
  const isDark = () => docsTheme() === "dark";

  createEffect(() => {
    const code = props.code;
    const lang = props.lang ?? "tsx";
    const mode = isDark() ? "dark" : "light";
    void highlight(code, lang, mode).then(setHtml);
  });

  const copy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Root wrapper classes ── */
  const rootClass = () => {
    const base = props.class ?? "";
    if (variant() === "figure") {
      return `docs-code-figure relative bg-[hsl(var(--docs-code))] text-[hsl(var(--docs-code-foreground))] ${base}`.trim();
    }
    // card — standalone in prose
    const bg = isDark() ? "bg-zinc-950" : "bg-[#f6f8fa]";
    return `group relative overflow-hidden rounded-lg border border-border shadow-sm ${bg} ${base}`.trim();
  };

  /* ── Pre inner class (applied via shiki wrapper) ── */
  const preClass = () => {
    const base =
      "[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:overflow-y-hidden [&>pre]:text-[0.8125rem] [&>pre]:leading-[1.625]";
    if (variant() === "figure") {
      return `${base} [&>pre]:rounded-none [&>pre]:px-4 [&>pre]:pb-4 [&>pre]:pt-3`;
    }
    return `${base} [&>pre]:rounded-none [&>pre]:p-4`;
  };

  /* ── figcaption / filename bar ── */
  const barClass = () => {
    if (variant() === "figure") {
      return "flex h-9 items-center gap-2 border-b border-black/[0.06] bg-[hsl(var(--docs-code))] px-4 dark:border-white/[0.08]";
    }
    return isDark()
      ? "flex h-9 items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4"
      : "flex h-9 items-center gap-2 border-b border-border bg-muted/40 px-4";
  };

  /* ── Copy button (in figcaption bar) ── */
  const copyBarClass = () =>
    "ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-black/[0.06] hover:text-foreground dark:hover:bg-white/[0.08] dark:hover:text-zinc-100 shrink-0";

  /* ── Floating copy (no filename, card variant) ── */
  const copyFloatClass = () =>
    isDark()
      ? "absolute right-2.5 top-2.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
      : "absolute right-2.5 top-2.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground";

  return (
    <div class={rootClass()}>
      {/* ── Filename bar (shown when filename provided) ── */}
      <Show when={props.filename}>
        {(fname) => (
          <div class={barClass()}>
            <ExtBadge filename={fname()} />
            <span
              class={`flex-1 truncate font-mono text-xs ${
                isDark() ? "text-zinc-400" : "text-muted-foreground"
              }`}
            >
              {fname()}
            </span>
            <button
              type="button"
              onClick={copy}
              class={copyBarClass()}
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
          </div>
        )}
      </Show>

      {/* ── Highlighted code ── */}
      <div class="relative">
        <Show
          when={html()}
          fallback={
            <pre
              class={[
                "m-0 overflow-x-auto font-mono text-[0.8125rem] leading-[1.625]",
                variant() === "figure"
                  ? "bg-transparent px-4 pb-4 pt-3 text-[hsl(var(--docs-code-foreground))]"
                  : isDark()
                    ? "bg-zinc-950 p-4 text-zinc-200"
                    : "bg-[#f6f8fa] p-4 text-foreground",
              ].join(" ")}
            >
              <code>{props.code}</code>
            </pre>
          }
        >
          <div class={preClass()} innerHTML={html()} />
        </Show>

        {/* Floating copy button (no filename) */}
        <Show when={!props.filename}>
          <button
            type="button"
            onClick={copy}
            class={copyFloatClass()}
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
        </Show>
      </div>
    </div>
  );
};

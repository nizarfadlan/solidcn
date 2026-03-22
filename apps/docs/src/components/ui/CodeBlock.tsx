import { Check, Copy } from "lucide-solid";
import { type Component, Show, createEffect, createSignal } from "solid-js";
import { highlight } from "../../lib/highlight.js";
import { docsTheme } from "../../lib/theme.js";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  class?: string;
  /** `figure` = flat demo panel (ui.shadcn.com-style); `card` = bordered doc blocks */
  variant?: "card" | "figure";
}

const copyBtnHeaderDark =
  "shrink-0 rounded-md border border-zinc-600 bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors";

const copyBtnHeaderLight =
  "shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors";

const copyBtnFloating =
  "rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors";

const copyBtnFigure =
  "inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-black/[0.06] dark:hover:bg-white/[0.08] dark:text-zinc-400 dark:hover:text-zinc-100";

/** Shiki output: layout + horizontal scroll; background from panel in figure variant */
const shikiPreCard =
  "[&>pre]:m-0 [&>pre]:max-h-none [&>pre]:overflow-x-auto [&>pre]:overflow-y-hidden [&>pre]:rounded-none [&>pre]:p-4 [&>pre]:text-[13px] [&>pre]:leading-relaxed";

const shikiPreFigure =
  "[&>pre]:m-0 [&>pre]:max-h-none [&>pre]:overflow-x-auto [&>pre]:overflow-y-hidden [&>pre]:rounded-none [&>pre]:px-4 [&>pre]:pb-4 [&>pre]:pt-3 [&>pre]:text-[13px] [&>pre]:leading-relaxed";

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [html, setHtml] = createSignal<string>("");
  const [copied, setCopied] = createSignal(false);

  const variant = () => props.variant ?? "card";

  createEffect(() => {
    const code = props.code;
    const lang = props.lang ?? "tsx";
    const mode = docsTheme() === "dark" ? "dark" : "light";
    void highlight(code, lang, mode).then(setHtml);
  });

  const copy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rootClass = () => {
    const extra = props.class ?? "";
    if (variant() === "figure") {
      return [
        "docs-code-figure group relative rounded-b-lg border-0 border-t border-border shadow-none",
        "bg-[hsl(var(--docs-code))] text-[hsl(var(--docs-code-foreground))]",
        extra,
      ]
        .filter(Boolean)
        .join(" ");
    }
    return [
      "group relative rounded-lg border border-border shadow-sm",
      props.filename ? "bg-card" : "",
      !props.filename && docsTheme() === "dark" ? "bg-zinc-950" : "",
      !props.filename && docsTheme() !== "dark" ? "bg-[#f6f8fa]" : "",
      extra,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const innerShellClass = () => {
    if (variant() === "figure") {
      return "relative min-h-0";
    }
    return [
      "relative min-h-0",
      props.filename ? "bg-background" : "",
      !props.filename && docsTheme() === "dark" ? "bg-zinc-950" : "",
      !props.filename && docsTheme() !== "dark" ? "bg-[#f6f8fa]" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const filenameBarClass = () => {
    if (variant() === "figure") {
      return [
        "flex items-center justify-between gap-3 border-b px-4 py-2.5",
        "border-black/[0.06] dark:border-white/[0.08]",
        "bg-[hsl(var(--docs-code))]",
      ].join(" ");
    }
    return [
      "flex items-center justify-between gap-3 border-b px-4 py-2.5",
      docsTheme() === "dark" ? "border-zinc-800 bg-zinc-950" : "border-border bg-muted/50",
    ].join(" ");
  };

  const filenameTextClass = () => {
    if (variant() === "figure") {
      return "truncate font-mono text-xs text-muted-foreground dark:text-zinc-500";
    }
    return [
      "truncate font-mono text-xs",
      docsTheme() === "dark" ? "text-zinc-400" : "text-muted-foreground",
    ].join(" ");
  };

  return (
    <div class={rootClass()}>
      <Show when={props.filename}>
        <div class={filenameBarClass()}>
          <span class={filenameTextClass()}>{props.filename}</span>
          <button
            type="button"
            onClick={copy}
            class={
              variant() === "figure"
                ? docsTheme() === "dark"
                  ? copyBtnHeaderDark
                  : copyBtnHeaderLight
                : docsTheme() === "dark"
                  ? copyBtnHeaderDark
                  : copyBtnHeaderLight
            }
            aria-label="Copy code"
          >
            {copied() ? "Copied!" : "Copy"}
          </button>
        </div>
      </Show>

      <div class={innerShellClass()}>
        <Show
          when={html()}
          fallback={
            <pre
              class={[
                "m-0 overflow-x-auto overflow-y-hidden font-mono text-[13px] leading-relaxed",
                variant() === "figure"
                  ? "bg-transparent px-4 pb-4 pt-3 text-[hsl(var(--docs-code-foreground))]"
                  : props.filename
                    ? "bg-background p-4 text-foreground"
                    : docsTheme() === "dark"
                      ? "bg-zinc-950 p-4 text-zinc-200"
                      : "bg-[#f6f8fa] p-4 text-foreground",
              ].join(" ")}
            >
              <code>{props.code}</code>
            </pre>
          }
        >
          <div class={variant() === "figure" ? shikiPreFigure : shikiPreCard} innerHTML={html()} />
        </Show>

        <Show when={!props.filename}>
          <button
            type="button"
            onClick={copy}
            class={[
              "absolute right-2 top-2 z-10",
              variant() === "figure" ? copyBtnFigure : copyBtnFloating,
            ].join(" ")}
            aria-label={copied() ? "Copied" : "Copy code"}
          >
            <Show when={variant() === "figure"}>
              <Show
                when={copied()}
                fallback={<Copy class="size-3.5 shrink-0" stroke-width={2} aria-hidden="true" />}
              >
                <Check
                  class="size-3.5 shrink-0 text-green-600 dark:text-green-400"
                  stroke-width={2}
                  aria-hidden="true"
                />
              </Show>
            </Show>
            <Show when={variant() !== "figure"}>{copied() ? "Copied!" : "Copy"}</Show>
          </button>
        </Show>
      </div>
    </div>
  );
};

import { Check, Clipboard } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { For, Show, createMemo, createSignal } from "solid-js";
import { buildDocPageMarkdown } from "../../lib/build-doc-markdown.js";
import { DocsSeo } from "../../lib/docs-seo.js";
import { getDocNeighbors } from "../../lib/nav.js";
import type { TocItem } from "../../lib/toc.js";
import { DocLayout } from "../layout/DocLayout.js";
import { CodeBlock } from "./CodeBlock.js";
import { ComponentDemo } from "./ComponentDemo.js";
import { DocPager } from "./DocPager.js";
import type { DocPagerProps } from "./DocPager.js";
import type { PropDef } from "./PropsTable.js";
import { PropsTable } from "./PropsTable.js";

export interface DocExample {
  title: string;
  description?: string;
  preview: JSX.Element;
  code: string;
  filename?: string;
}

export interface DocPageProps {
  title: string;
  description: string;
  /** e.g. "Core Primitives" */
  phase?: string;
  /** Component name for solidcn add command, e.g. "button" */
  componentName?: string;
  /** Manual install code (npm install ...) */
  manualInstall?: string;
  /** Basic usage import + JSX snippet */
  usage?: string;
  examples: DocExample[];
  props?: PropDef[];
  notes?: JSX.Element;
  /** Enables Copy page, Prev/Next, and SEO canonical/OG for this path */
  docPath?: string;
  /** Optional embedded playground (StackBlitz `?embed=1`, etc.) */
  playground?: {
    embedSrc: string;
    caption?: string;
  };
}

/** Styled inline tab buttons (no outer border box — shadcn-like) */
const TabButton: Component<{
  active: boolean;
  onClick: () => void;
  children: JSX.Element;
}> = (props) => (
  <button
    type="button"
    onClick={props.onClick}
    class={[
      "relative px-3 pb-2.5 pt-1 text-sm font-medium transition-colors",
      "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors",
      props.active
        ? "text-foreground after:bg-foreground"
        : "text-muted-foreground hover:text-foreground after:bg-transparent",
    ].join(" ")}
  >
    {props.children}
  </button>
);

export const DocPage: Component<DocPageProps> = (props) => {
  const [installTab, setInstallTab] = createSignal<"command" | "manual">("command");
  const [pageCopied, setPageCopied] = createSignal(false);

  const neighbors = createMemo(() =>
    props.docPath ? getDocNeighbors(props.docPath) : { prev: undefined, next: undefined },
  );

  const pagerProps = createMemo((): DocPagerProps => {
    const n = neighbors();
    const o: DocPagerProps = {};
    if (n.prev !== undefined) o.prev = n.prev;
    if (n.next !== undefined) o.next = n.next;
    return o;
  });

  const copyPageMarkdown = async () => {
    const input: Parameters<typeof buildDocPageMarkdown>[0] = {
      title: props.title,
      description: props.description,
      examples: props.examples.map((e) => {
        const row: { title: string; code: string; description?: string } = {
          title: e.title,
          code: e.code,
        };
        if (e.description !== undefined) row.description = e.description;
        return row;
      }),
    };
    if (props.phase !== undefined) input.phase = props.phase;
    if (props.componentName !== undefined) input.componentName = props.componentName;
    if (props.manualInstall !== undefined) input.manualInstall = props.manualInstall;
    if (props.usage !== undefined) input.usage = props.usage;
    if (props.props !== undefined) input.props = props.props;

    const md = buildDocPageMarkdown(input);
    await navigator.clipboard.writeText(md);
    setPageCopied(true);
    setTimeout(() => setPageCopied(false), 2000);
  };

  // Build TOC from page sections
  const toc: TocItem[] = [];
  if (props.componentName ?? props.manualInstall) {
    toc.push({ id: "installation", title: "Installation", level: 2 });
  }
  if (props.usage) {
    toc.push({ id: "usage", title: "Usage", level: 2 });
  }
  if (props.examples.length > 0) {
    toc.push({ id: "examples", title: "Examples", level: 2 });
    for (const ex of props.examples) {
      toc.push({
        id: `example-${ex.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: ex.title,
        level: 3,
      });
    }
  }
  if (props.props && props.props.length > 0) {
    toc.push({ id: "api-reference", title: "API Reference", level: 2 });
  }
  if (props.playground) {
    toc.push({ id: "playground", title: "Playground", level: 2 });
  }

  return (
    <DocLayout toc={toc}>
      <Show when={props.docPath} keyed>
        {(path) => (
          <DocsSeo title={`${props.title} — solidcn`} description={props.description} path={path} />
        )}
      </Show>

      <div class="space-y-8 pb-16">
        {/* ── Page header ── */}
        <div class="space-y-3">
          {/* Badge row */}
          <div class="flex flex-wrap items-center gap-2">
            <Show when={props.phase}>
              <span class="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {props.phase}
              </span>
            </Show>

            <Show when={props.docPath}>
              <button
                type="button"
                onClick={() => void copyPageMarkdown()}
                class="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Show
                  when={pageCopied()}
                  fallback={<Clipboard class="h-3 w-3" stroke-width={2} aria-hidden="true" />}
                >
                  <Check
                    class="h-3 w-3 text-green-600 dark:text-green-400"
                    stroke-width={2}
                    aria-hidden="true"
                  />
                </Show>
                {pageCopied() ? "Copied!" : "Copy page"}
              </button>
            </Show>
          </div>

          <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {props.title}
          </h1>
          <p class="text-base text-muted-foreground leading-relaxed">{props.description}</p>
        </div>

        <hr class="border-border" />

        {/* ── Installation ── */}
        <Show when={props.componentName ?? props.manualInstall}>
          <section class="space-y-4" id="installation">
            <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Installation</h2>

            {/* Clean tab row — no outer box */}
            <div class="border-b border-border">
              <div class="flex gap-0">
                <TabButton
                  active={installTab() === "command"}
                  onClick={() => setInstallTab("command")}
                >
                  CLI
                </TabButton>
                <Show when={props.manualInstall}>
                  <TabButton
                    active={installTab() === "manual"}
                    onClick={() => setInstallTab("manual")}
                  >
                    Manual
                  </TabButton>
                </Show>
              </div>
            </div>

            {/* Tab content */}
            <Show when={installTab() === "command"}>
              <CodeBlock code={`npx solidcn@latest add ${props.componentName ?? ""}`} lang="bash" />
            </Show>

            <Show when={installTab() === "manual" && props.manualInstall}>
              {(manualCode) => (
                <div class="space-y-4">
                  {/* Step 1 */}
                  <div class="flex gap-4">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground">
                      1
                    </div>
                    <div class="flex-1 space-y-2 pt-0.5">
                      <p class="text-sm font-medium">Install the dependency</p>
                      <CodeBlock code={manualCode()} lang="bash" />
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div class="flex gap-4">
                    <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground">
                      2
                    </div>
                    <div class="flex-1 pt-0.5">
                      <p class="text-sm font-medium">
                        Copy the component source into your project from the{" "}
                        <a
                          href="/docs/registry"
                          class="underline underline-offset-4 hover:text-foreground"
                        >
                          registry
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Show>
          </section>
        </Show>

        {/* ── Usage ── */}
        <Show when={props.usage}>
          {(usageCode) => (
            <section class="space-y-4" id="usage">
              <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Usage</h2>
              <CodeBlock code={usageCode()} lang="tsx" />
            </section>
          )}
        </Show>

        {/* ── Examples ── */}
        <Show when={props.examples.length > 0}>
          <section class="space-y-10" id="examples">
            <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Examples</h2>
            <For each={props.examples}>
              {(example) => (
                <div
                  class="space-y-3"
                  id={`example-${example.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <h3 class="text-sm font-semibold scroll-mt-20 text-foreground">
                    {example.title}
                  </h3>
                  <Show when={example.description}>
                    <p class="text-sm text-muted-foreground">{example.description}</p>
                  </Show>
                  <ComponentDemo
                    preview={example.preview}
                    code={example.code}
                    {...(example.filename !== undefined ? { filename: example.filename } : {})}
                  />
                </div>
              )}
            </For>
          </section>
        </Show>

        {/* ── API Reference ── */}
        <Show when={props.props && props.props.length > 0 ? props.props : null}>
          {(propsData) => (
            <section class="space-y-4" id="api-reference">
              <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">API Reference</h2>
              <PropsTable props={propsData()} />
            </section>
          )}
        </Show>

        {/* ── Notes (slot for custom content) ── */}
        <Show when={props.notes}>
          <section>{props.notes}</section>
        </Show>

        {/* ── Playground ── */}
        <Show when={props.playground}>
          {(pg) => (
            <section class="space-y-3 scroll-mt-20" id="playground" aria-label="Playground">
              <h2 class="text-xl font-semibold tracking-tight">Playground</h2>
              <p class="text-sm text-muted-foreground">
                {pg().caption ??
                  "Solid + Vite sandbox — paste snippets from this page into the editor."}
              </p>
              <div class="overflow-hidden rounded-xl border border-border shadow-sm">
                <iframe
                  title="Solid playground"
                  src={pg().embedSrc}
                  class="block min-h-[min(70vh,520px)] w-full bg-background"
                  loading="lazy"
                />
              </div>
            </section>
          )}
        </Show>

        <Show when={props.docPath}>
          <DocPager {...pagerProps()} />
        </Show>
      </div>
    </DocLayout>
  );
};

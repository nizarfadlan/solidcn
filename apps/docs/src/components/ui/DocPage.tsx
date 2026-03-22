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

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const StorybookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 256 319" fill="currentColor" aria-hidden="true">
    <path
      fill-rule="evenodd"
      d="M188.806 0L194.805 66.456C196.986 68.369 199.304 70.4 201.752 72.548L201.785 72.576C210.083 79.69 219.747 87.985 226.938 100.478C232.624 110.43 232.93 121.075 232.93 128C232.93 134.925 232.624 145.57 226.938 155.522C219.747 168.015 210.083 176.31 201.785 183.424L201.752 183.452C199.304 185.6 196.986 187.631 194.805 189.544L188.806 256H67.194L61.195 189.544C59.014 187.631 56.696 185.6 54.248 183.452L54.215 183.424C45.917 176.31 36.253 168.015 29.062 155.522C23.376 145.57 23.07 134.925 23.07 128C23.07 121.075 23.376 110.43 29.062 100.478C36.253 87.985 45.917 79.69 54.215 72.576L54.248 72.548C56.696 70.4 59.014 68.369 61.195 66.456L67.194 0H188.806ZM128 82.778C101.49 82.778 80 104.268 80 130.778C80 157.288 101.49 178.778 128 178.778C154.51 178.778 176 157.288 176 130.778C176 104.268 154.51 82.778 128 82.778Z"
    />
  </svg>
);

export interface DocExample {
  title: string;
  description?: string;
  preview: JSX.Element;
  code: string;
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
  /** Link to Storybook story, e.g. "/?path=/story/button--default" */
  storybookPath?: string;
  /** URL of deployed Storybook */
  storybookUrl?: string;
  /** Enables Copy page, Prev/Next, and SEO canonical/OG for this path */
  docPath?: string;
  /** Optional embedded playground (StackBlitz `?embed=1`, etc.) */
  playground?: {
    embedSrc: string;
    caption?: string;
  };
}

export const DocPage: Component<DocPageProps> = (props) => {
  const [installTab, setInstallTab] = createSignal<"command" | "manual">("command");
  const [pageCopied, setPageCopied] = createSignal(false);

  const storybookBase = () => props.storybookUrl ?? "http://localhost:6006";
  const storybookLink = () =>
    props.storybookPath ? `${storybookBase()}${props.storybookPath}` : null;

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
          <DocsSeo
            title={`${props.title} — solidcn`}
            description={props.description}
            path={path}
          />
        )}
      </Show>
      <div class="space-y-10 pb-16">
        {/* Page header */}
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <Show when={props.phase}>
              <span class="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {props.phase}
              </span>
            </Show>
            <Show when={props.docPath}>
              <button
                type="button"
                onClick={() => void copyPageMarkdown()}
                class="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Show when={pageCopied()} fallback={<Clipboard class="h-3.5 w-3.5" stroke-width={2} />}>
                  <Check class="h-3.5 w-3.5 text-green-600 dark:text-green-400" stroke-width={2} />
                </Show>
                {pageCopied() ? "Copied" : "Copy page"}
              </button>
            </Show>
            <Show when={storybookLink()}>
              {(link) => (
                <a
                  href={link()}
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <StorybookIcon />
                  Open in Storybook
                  <ExternalLinkIcon />
                </a>
              )}
            </Show>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-foreground">{props.title}</h1>
          <p class="mt-3 text-lg text-muted-foreground">{props.description}</p>
        </div>

        <hr class="border-border" />

        {/* Installation */}
        <Show when={props.componentName ?? props.manualInstall}>
          <section class="space-y-4" id="installation">
            <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Installation</h2>

            {/* Tabs */}
            <div class="rounded-lg border border-border overflow-hidden">
              <div class="flex border-b border-border bg-muted/30">
                <button
                  type="button"
                  onClick={() => setInstallTab("command")}
                  class={[
                    "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                    installTab() === "command"
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  CLI
                </button>
                <Show when={props.manualInstall}>
                  <button
                    type="button"
                    onClick={() => setInstallTab("manual")}
                    class={[
                      "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                      installTab() === "manual"
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    Manual
                  </button>
                </Show>
              </div>

              <div class="p-4">
                <Show when={installTab() === "command"}>
                  <CodeBlock
                    code={`npx solidcn@latest add ${props.componentName ?? ""}`}
                    lang="bash"
                    class="border-0 bg-transparent"
                  />
                </Show>
                <Show when={installTab() === "manual" && props.manualInstall}>
                  {(manualCode) => (
                    <CodeBlock code={manualCode()} lang="bash" class="border-0 bg-transparent" />
                  )}
                </Show>
              </div>
            </div>
          </section>
        </Show>

        {/* Usage */}
        <Show when={props.usage}>
          {(usageCode) => (
            <section class="space-y-4" id="usage">
              <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Usage</h2>
              <CodeBlock code={usageCode()} lang="tsx" />
            </section>
          )}
        </Show>

        {/* Examples */}
        <Show when={props.examples.length > 0}>
          <section class="space-y-8" id="examples">
            <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">Examples</h2>
            <For each={props.examples}>
              {(example) => (
                <div
                  class="space-y-3"
                  id={`example-${example.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <h3 class="text-base font-semibold scroll-mt-20">{example.title}</h3>
                  <Show when={example.description}>
                    <p class="text-sm text-muted-foreground">{example.description}</p>
                  </Show>
                  <ComponentDemo preview={example.preview} code={example.code} />
                </div>
              )}
            </For>
          </section>
        </Show>

        {/* API Reference */}
        <Show when={props.props && props.props.length > 0 ? props.props : null}>
          {(propsData) => (
            <section class="space-y-4" id="api-reference">
              <h2 class="text-xl font-semibold tracking-tight scroll-mt-20">API Reference</h2>
              <PropsTable props={propsData()} />
            </section>
          )}
        </Show>

        {/* Notes */}
        <Show when={props.notes}>
          <section>{props.notes}</section>
        </Show>

        <Show when={props.playground}>
          {(pg) => (
            <section class="space-y-3 scroll-mt-20" id="playground" aria-label="Playground">
              <h2 class="text-xl font-semibold tracking-tight">Playground</h2>
              <p class="text-sm text-muted-foreground">
                {pg().caption ??
                  "Solid + Vite sandbox — paste snippets from this page into the editor."}
              </p>
              <div class="overflow-hidden rounded-xl border border-border bg-muted/20 shadow-sm">
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

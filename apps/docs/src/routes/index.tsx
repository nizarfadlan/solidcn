import { A } from "@solidjs/router";
import { Bot, Boxes, ClipboardCopy, Palette, Share2, Waves } from "lucide-solid";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { DocsSeo } from "../lib/docs-seo.js";

interface Feature {
  Icon: Component<{ class?: string; "stroke-width"?: number }>;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    Icon: Boxes,
    title: "42+ Components",
    desc: "Button to Sidebar — every shadcn/ui component ported to SolidJS with full accessibility.",
  },
  {
    Icon: ClipboardCopy,
    title: "Copy & Paste",
    desc: "No black-box npm packages. Own your UI. Copy components directly into your project.",
  },
  {
    Icon: Palette,
    title: "7 Built-in Themes",
    desc: "Default, Slate, Zinc, Rose, Blue, Green, Orange. Theme generator for custom palettes.",
  },
  {
    Icon: Waves,
    title: "Physics Toast",
    desc: "Dual toast system: Standard (Tailwind) + Sileo (SVG gooey morphing spring animation).",
  },
  {
    Icon: Share2,
    title: "Open Registry",
    desc: "Host your own registry. Share components via JSON. No central registrar required.",
  },
  {
    Icon: Bot,
    title: "MCP Server",
    desc: "AI-native. Install components from Cursor, Claude, or any MCP-compatible AI tool.",
  },
];

const stack = [
  { name: "SolidJS", href: "https://solidjs.com" },
  { name: "@kobalte/core", href: "https://kobalte.dev" },
  { name: "corvu", href: "https://corvu.dev" },
  { name: "Tailwind v4", href: "https://tailwindcss.com" },
  { name: "tailwind-variants", href: "https://www.tailwind-variants.org" },
];

export default function Home() {
  return (
    <main>
      <DocsSeo
        title="solidcn — SolidJS UI Components"
        description="A shadcn/ui-style component system for SolidJS — copy-paste, accessible, open registry, and MCP."
        path="/"
      />

      {/* Hero — light-first, shadcn-style marketing */}
      <section class="relative overflow-hidden border-b border-border/80 bg-background">
        <div class="mx-auto max-w-4xl px-6 py-24 text-center">
          <div class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/80" />
            <span>Open Registry</span>
            <span class="text-border" aria-hidden="true">
              ·
            </span>
            <span>MCP Ready</span>
            <span class="text-border" aria-hidden="true">
              ·
            </span>
            <span>Physics Toast</span>
          </div>

          <h1 class="mt-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            <span class="block">Build faster with</span>
            <span class="mt-1 block bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              SolidJS UI
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A port of shadcn/ui for SolidJS — 42+ accessible components built on Kobalte and corvu.
            Copy-paste, own your code, extend freely.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <A
              href="/docs/installation"
              class="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Get started
            </A>
            <A
              href="/docs/components/button"
              class="inline-flex h-10 items-center rounded-md border bg-background px-6 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Browse components
            </A>
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Built with</span>
            <For each={stack}>
              {(s) => (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  class="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  {s.name}
                </a>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Quick install — light: soft panel (shadcn-like); dark: terminal strip */}
      <section class="border-b border-border bg-[#f6f8fa] dark:border-zinc-800 dark:bg-zinc-950">
        <div class="mx-auto max-w-2xl px-6 py-8">
          <p class="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Quick install
          </p>
          <div class="rounded-lg border border-border bg-card p-4 font-mono text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
            <div class="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span class="h-2 w-2 rounded-full bg-red-500/80" />
              <span class="h-2 w-2 rounded-full bg-yellow-500/80" />
              <span class="h-2 w-2 rounded-full bg-green-500/80" />
              <span class="ml-2">Terminal</span>
            </div>
            <div class="space-y-1 text-foreground dark:text-zinc-300">
              <p>
                <span class="select-none text-muted-foreground">$ </span>
                <span class="text-emerald-700 dark:text-green-400">npx</span> solidcn@latest init
              </p>
              <p>
                <span class="select-none text-muted-foreground">$ </span>
                <span class="text-emerald-700 dark:text-green-400">npx</span> solidcn@latest add button dialog toast
              </p>
              <p>
                <span class="select-none text-muted-foreground">$ </span>
                <span class="text-emerald-700 dark:text-green-400">npx</span> solidcn@latest add @acme/data-table
                <span class="ml-2 text-muted-foreground dark:text-zinc-600">
                  # third-party registry
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section class="mx-auto max-w-5xl px-6 py-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tight">Everything you need</h2>
          <p class="mt-2 text-muted-foreground">
            A complete UI system designed for SolidJS applications.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <For each={features}>
            {(f) => (
              <div class="rounded-xl border bg-card p-6 hover:border-primary/30 transition-colors">
                <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/40">
                  <f.Icon class="h-5 w-5 text-foreground" stroke-width={1.5} />
                </div>
                <h3 class="font-semibold text-foreground">{f.title}</h3>
                <p class="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* CTA */}
      <section class="border-t border-border/80 bg-muted/40">
        <div class="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 class="text-2xl font-bold">Ready to build?</h2>
          <p class="mt-2 text-muted-foreground">
            Start with installation or browse the component library.
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <A
              href="/docs/installation"
              class="inline-flex h-9 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Installation guide
            </A>
            <A
              href="/docs"
              class="inline-flex h-9 items-center rounded-md border px-5 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Read the docs
            </A>
          </div>
        </div>
      </section>
    </main>
  );
}

import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { DocsSeo } from "../lib/docs-seo.js";

const NotFound: Component = () => {
  return (
    <main class="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg flex-col justify-center px-4 py-20 text-center">
      <DocsSeo
        title="Page not found — solidcn"
        description="The page you are looking for does not exist in the solidcn documentation."
        path="/404"
      />
      <p class="text-sm font-medium text-muted-foreground">404</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-foreground">Page not found</h1>
      <p class="mt-3 text-muted-foreground">
        The link may be broken or the page may have been moved.
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <A
          href="/docs"
          class="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to docs
        </A>
        <A
          href="/"
          class="inline-flex h-10 items-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Home
        </A>
      </div>
    </main>
  );
};

export default NotFound;

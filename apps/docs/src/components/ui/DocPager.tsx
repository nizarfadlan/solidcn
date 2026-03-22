import { A } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import type { NavItem } from "../../lib/nav.js";

export interface DocPagerProps {
  prev?: NavItem;
  next?: NavItem;
}

export const DocPager: Component<DocPagerProps> = (props) => {
  return (
    <nav
      class="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      aria-label="Documentation pages"
    >
      <div class="flex min-h-[4.5rem] items-stretch justify-start">
        <Show when={props.prev}>
          {(p) => (
            <A
              href={p().href}
              class="group flex w-full max-w-md flex-col justify-center rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50"
            >
              <span class="text-xs font-medium text-muted-foreground">Previous</span>
              <span class="mt-0.5 font-medium text-foreground group-hover:underline">
                {p().title}
              </span>
            </A>
          )}
        </Show>
      </div>
      <div class="flex min-h-[4.5rem] items-stretch justify-end sm:col-start-2">
        <Show when={props.next}>
          {(n) => (
            <A
              href={n().href}
              class="group flex w-full max-w-md flex-col items-end justify-center rounded-lg border border-border bg-card px-4 py-3 text-right transition-colors hover:bg-muted/50"
            >
              <span class="text-xs font-medium text-muted-foreground">Next</span>
              <span class="mt-0.5 font-medium text-foreground group-hover:underline">
                {n().title}
              </span>
            </A>
          )}
        </Show>
      </div>
    </nav>
  );
};

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
      class="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      aria-label="Documentation pages"
    >
      <div class="flex">
        <Show when={props.prev}>
          {(p) => (
            <A
              href={p().href}
              class="group flex w-full flex-col gap-1 rounded-lg border border-border px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
            >
              <span class="flex items-center gap-1 text-xs text-muted-foreground">
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
              </span>
              <span class="text-sm font-medium text-foreground">{p().title}</span>
            </A>
          )}
        </Show>
      </div>

      <div class="flex sm:justify-end">
        <Show when={props.next}>
          {(n) => (
            <A
              href={n().href}
              class="group flex w-full flex-col items-end gap-1 rounded-lg border border-border px-4 py-3.5 text-right transition-colors hover:bg-muted/40"
            >
              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                Next
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
              <span class="text-sm font-medium text-foreground">{n().title}</span>
            </A>
          )}
        </Show>
      </div>
    </nav>
  );
};

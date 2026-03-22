import { A } from "@solidjs/router";
import { type Component, For, Show, createSignal, onMount } from "solid-js";
import { navigation } from "../../lib/nav.js";

interface SearchResult {
  title: string;
  href: string;
  group: string;
}

interface CommandSearchProps {
  onClose: () => void;
}

export const CommandSearch: Component<CommandSearchProps> = (props) => {
  const [query, setQuery] = createSignal("");
  let inputRef: HTMLInputElement | undefined;

  const allItems: SearchResult[] = navigation.flatMap((group) =>
    group.items.map((item) => ({
      title: item.title,
      href: item.href,
      group: group.title,
    })),
  );

  const results = () => {
    const q = query().toLowerCase().trim();
    if (!q) return allItems.slice(0, 10);
    return allItems.filter(
      (item) => item.title.toLowerCase().includes(q) || item.group.toLowerCase().includes(q),
    );
  };

  onMount(() => {
    inputRef?.focus();
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") props.onClose();
  };

  return (
    <div
      class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      onClick={props.onClose}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      {/* Backdrop */}
      <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <dialog
        open
        class="relative w-full max-w-lg mx-4 rounded-lg border border-border bg-popover shadow-2xl overflow-hidden p-0 m-0"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label="Search documentation"
      >
        {/* Search input */}
        <div class="flex items-center border-b border-border px-3">
          <svg
            class="h-4 w-4 shrink-0 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            class="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd class="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div class="max-h-[60vh] overflow-y-auto p-2">
          <Show
            when={results().length > 0}
            fallback={
              <p class="py-6 text-center text-sm text-muted-foreground">No results found.</p>
            }
          >
            <For each={results()}>
              {(item) => (
                <A
                  href={item.href}
                  onClick={props.onClose}
                  class="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent group transition-colors"
                >
                  <span class="text-xs text-muted-foreground group-hover:text-muted-foreground/70 w-24 shrink-0">
                    {item.group}
                  </span>
                  <span class="text-foreground">{item.title}</span>
                </A>
              )}
            </For>
          </Show>
        </div>

        {/* Footer hint */}
        <div class="border-t border-border px-3 py-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono">↵</kbd>
            to select
          </span>
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono">↑↓</kbd>
            to navigate
          </span>
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-border bg-muted px-1 py-0.5 font-mono">esc</kbd>
            to close
          </span>
        </div>
      </dialog>
    </div>
  );
};

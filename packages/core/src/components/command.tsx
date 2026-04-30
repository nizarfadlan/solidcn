import { Search } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";
import { Dialog, DialogContent } from "./dialog.js";

// ---------------------------------------------------------------------------
// Command — a searchable command palette built on Dialog + native list
// ---------------------------------------------------------------------------

export type CommandItem = {
  value: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: JSX.Element;
  onSelect?: () => void;
  disabled?: boolean;
};

export type CommandProps = {
  class?: string;
  placeholder?: string;
  items?: CommandItem[];
  children?: JSX.Element;
  emptyMessage?: string;
};

export const Command: Component<CommandProps> = (props) => {
  const [local] = splitProps(props, ["class", "placeholder", "items", "children", "emptyMessage"]);
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return local.items ?? [];
    return (local.items ?? []).filter((i) => i.label.toLowerCase().includes(q));
  });

  const groups = createMemo(() => {
    const result = new Map<string, CommandItem[]>();
    for (const item of filtered()) {
      const key = item.group ?? "";
      if (!result.has(key)) result.set(key, []);
      result.get(key)?.push(item);
    }
    return result;
  });

  return (
    <div
      class={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        local.class,
      )}
    >
      <div class="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={local.placeholder ?? "Type a command or search..."}
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
          aria-label="Search commands"
        />
      </div>

      <div class="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <Show
          when={filtered().length > 0 || local.children}
          fallback={
            <p class="py-6 text-center text-sm text-muted-foreground">
              {local.emptyMessage ?? "No results found."}
            </p>
          }
        >
          {local.children ?? (
            <div class="overflow-hidden p-1">
              <For each={[...groups().entries()]}>
                {([group, items]) => (
                  <div>
                    <Show when={group}>
                      <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {group}
                      </div>
                    </Show>
                    <For each={items}>
                      {(item) => (
                        <button
                          type="button"
                          class={cn(
                            "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                            "hover:bg-accent hover:text-accent-foreground",
                            "disabled:pointer-events-none disabled:opacity-50",
                          )}
                          disabled={item.disabled}
                          onClick={() => item.onSelect?.()}
                        >
                          <Show when={item.icon}>
                            <span class="mr-2 flex h-4 w-4 items-center justify-center">
                              {item.icon}
                            </span>
                          </Show>
                          {item.label}
                          <Show when={item.shortcut}>
                            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
                              {item.shortcut}
                            </span>
                          </Show>
                        </button>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          )}
        </Show>
      </div>
    </div>
  );
};

// CommandDialog — Command inside a Dialog (command palette UX)
export type CommandDialogProps = CommandProps & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [local, rest] = splitProps(props, ["open", "onOpenChange"]);
  return (
    <Dialog
      {...(local.open !== undefined ? { open: local.open } : {})}
      {...(local.onOpenChange !== undefined ? { onOpenChange: local.onOpenChange } : {})}
    >
      <DialogContent class="overflow-hidden p-0 shadow-lg">
        <Command
          class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
          {...rest}
        />
      </DialogContent>
    </Dialog>
  );
};

// Composable sub-components for custom Command layouts
export const CommandInput: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class="flex items-center border-b px-3">
      <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        class={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};

export const CommandList: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", local.class)} {...rest} />
  );
};

export const CommandEmpty: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("py-6 text-center text-sm text-muted-foreground", local.class)} {...rest} />
  );
};

export const CommandGroup: Component<JSX.HTMLAttributes<HTMLDivElement> & { heading?: string }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "heading", "children"]);
  return (
    <div class={cn("overflow-hidden p-1 text-foreground", local.class)} {...rest}>
      <Show when={local.heading}>
        <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground" cmdk-group-heading="">
          {local.heading}
        </div>
      </Show>
      {local.children}
    </div>
  );
};

export const CommandSeparator: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("-mx-1 h-px bg-border", local.class)} {...rest} />;
};

export const CommandItem: Component<
  JSX.HTMLAttributes<HTMLButtonElement> & {
    onSelect?: () => void;
    disabled?: boolean;
    shortcut?: string;
    selected?: boolean;
  }
> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "onSelect",
    "disabled",
    "children",
    "shortcut",
    "selected",
  ]);
  return (
    <button
      type="button"
      aria-selected={local.selected ?? false}
      disabled={local.disabled}
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      onClick={local.onSelect}
      {...rest}
    >
      {local.children}
      <Show when={local.shortcut}>
        <span class="ml-auto text-xs tracking-widest text-muted-foreground">{local.shortcut}</span>
      </Show>
    </button>
  );
};

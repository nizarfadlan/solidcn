import { Combobox as KobalteCombobox } from "@kobalte/core/combobox";
import { Check, ChevronsUpDown } from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Combobox = KobalteCombobox;

const ComboboxTrigger: Component<{ class?: string }> = (props) => {
  return (
    <KobalteCombobox.Control class={cn("flex items-center", props.class)}>
      <KobalteCombobox.Input
        class={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
          "text-sm ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      />
      <KobalteCombobox.Trigger class="-ml-10 flex h-10 w-10 items-center justify-center">
        <ChevronsUpDown class="h-4 w-4 opacity-50" />
      </KobalteCombobox.Trigger>
    </KobalteCombobox.Control>
  );
};

const ComboboxContent: Component<ComponentProps<typeof KobalteCombobox.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteCombobox.Portal>
      <KobalteCombobox.Content
        class={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      >
        <KobalteCombobox.Listbox class="p-1" />
      </KobalteCombobox.Content>
    </KobalteCombobox.Portal>
  );
};

const ComboboxItem: Component<ComponentProps<typeof KobalteCombobox.Item>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteCombobox.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteCombobox.ItemIndicator>
          <Check class="h-4 w-4" />
        </KobalteCombobox.ItemIndicator>
      </span>
      <KobalteCombobox.ItemLabel>{local.children}</KobalteCombobox.ItemLabel>
    </KobalteCombobox.Item>
  );
};

export { Combobox, ComboboxTrigger, ComboboxContent, ComboboxItem };

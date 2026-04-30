import { Select as KobalteSelect } from "@kobalte/core/select";
import { Check, ChevronsUpDown } from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Select = KobalteSelect;

const SelectTrigger: Component<
  ComponentProps<typeof KobalteSelect.Trigger> & { placeholder?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "placeholder"]);
  return (
    <KobalteSelect.Trigger
      class={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
        "text-sm ring-offset-background",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        local.class,
      )}
      {...rest}
    >
      <KobalteSelect.Value<string>>
        {(state) => state.selectedOption() ?? local.placeholder ?? "Select..."}
      </KobalteSelect.Value>
      <KobalteSelect.Icon>
        <ChevronsUpDown class="h-4 w-4 opacity-50" />
      </KobalteSelect.Icon>
    </KobalteSelect.Trigger>
  );
};

const SelectContent: Component<ComponentProps<typeof KobalteSelect.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteSelect.Portal>
      <KobalteSelect.Content
        class={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      >
        <KobalteSelect.Listbox class="p-1" />
      </KobalteSelect.Content>
    </KobalteSelect.Portal>
  );
};

const SelectItem: Component<ComponentProps<typeof KobalteSelect.Item>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteSelect.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteSelect.ItemIndicator>
          <Check class="h-4 w-4" />
        </KobalteSelect.ItemIndicator>
      </span>
      <KobalteSelect.ItemLabel>{local.children}</KobalteSelect.ItemLabel>
    </KobalteSelect.Item>
  );
};

const SelectLabel: Component<ComponentProps<typeof KobalteSelect.Label>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteSelect.Label
      class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", local.class)}
      {...rest}
    />
  );
};

const SelectGroup = KobalteSelect.Section;

export { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup };

import { ContextMenu as KobalteContextMenu } from "@kobalte/core/context-menu";
import { Check, ChevronRight, Circle } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const ContextMenu = KobalteContextMenu;
const ContextMenuTrigger = KobalteContextMenu.Trigger;
const ContextMenuSub = KobalteContextMenu.Sub;
const ContextMenuRadioGroup = KobalteContextMenu.RadioGroup;

const ContextMenuContent: Component<ComponentProps<typeof KobalteContextMenu.Content>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteContextMenu.Portal>
      <KobalteContextMenu.Content
        class={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          local.class,
        )}
        {...rest}
      />
    </KobalteContextMenu.Portal>
  );
};

const ContextMenuItem: Component<
  ComponentProps<typeof KobalteContextMenu.Item> & { inset?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteContextMenu.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  );
};

const ContextMenuCheckboxItem: Component<ComponentProps<typeof KobalteContextMenu.CheckboxItem>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteContextMenu.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteContextMenu.ItemIndicator>
          <Check class="h-4 w-4" />
        </KobalteContextMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteContextMenu.CheckboxItem>
  );
};

const ContextMenuRadioItem: Component<ComponentProps<typeof KobalteContextMenu.RadioItem>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteContextMenu.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteContextMenu.ItemIndicator>
          <Circle class="h-2 w-2 fill-current" />
        </KobalteContextMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteContextMenu.RadioItem>
  );
};

const ContextMenuLabel: Component<
  ComponentProps<typeof KobalteContextMenu.GroupLabel> & { inset?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteContextMenu.GroupLabel
      class={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  );
};

const ContextMenuSeparator: Component<ComponentProps<typeof KobalteContextMenu.Separator>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteContextMenu.Separator class={cn("-mx-1 my-1 h-px bg-border", local.class)} {...rest} />
  );
};

const ContextMenuShortcut: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <span class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)} {...rest} />;
};

const ContextMenuSubTrigger: Component<
  ComponentProps<typeof KobalteContextMenu.SubTrigger> & { inset?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset", "children"]);
  return (
    <KobalteContextMenu.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "focus:bg-accent data-[expanded]:bg-accent",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronRight class="ml-auto h-4 w-4" />
    </KobalteContextMenu.SubTrigger>
  );
};

const ContextMenuSubContent: Component<ComponentProps<typeof KobalteContextMenu.SubContent>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteContextMenu.SubContent
      class={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        local.class,
      )}
      {...rest}
    />
  );
};

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};

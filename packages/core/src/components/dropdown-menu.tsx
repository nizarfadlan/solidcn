import { DropdownMenu as KobalteDropdownMenu } from "@kobalte/core/dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const DropdownMenu = KobalteDropdownMenu;
const DropdownMenuTrigger = KobalteDropdownMenu.Trigger;
const DropdownMenuPortal = KobalteDropdownMenu.Portal;
const DropdownMenuSub = KobalteDropdownMenu.Sub;
const DropdownMenuRadioGroup = KobalteDropdownMenu.RadioGroup;

const DropdownMenuSubTrigger: Component<
  ComponentProps<typeof KobalteDropdownMenu.SubTrigger> & { inset?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset", "children"]);
  return (
    <KobalteDropdownMenu.SubTrigger
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
    </KobalteDropdownMenu.SubTrigger>
  );
};

const DropdownMenuSubContent: Component<ComponentProps<typeof KobalteDropdownMenu.SubContent>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDropdownMenu.SubContent
      class={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        "data-[expanded]:animate-in data-[closed]:animate-out",
        "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
        local.class,
      )}
      {...rest}
    />
  );
};

const DropdownMenuContent: Component<ComponentProps<typeof KobalteDropdownMenu.Content>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDropdownMenu.Portal>
      <KobalteDropdownMenu.Content
        class={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      />
    </KobalteDropdownMenu.Portal>
  );
};

const DropdownMenuItem: Component<
  ComponentProps<typeof KobalteDropdownMenu.Item> & { inset?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteDropdownMenu.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class,
      )}
      {...rest}
    />
  );
};

const DropdownMenuCheckboxItem: Component<
  ComponentProps<typeof KobalteDropdownMenu.CheckboxItem>
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteDropdownMenu.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteDropdownMenu.ItemIndicator>
          <Check class="h-4 w-4" />
        </KobalteDropdownMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteDropdownMenu.CheckboxItem>
  );
};

const DropdownMenuRadioItem: Component<ComponentProps<typeof KobalteDropdownMenu.RadioItem>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteDropdownMenu.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <KobalteDropdownMenu.ItemIndicator>
          <Circle class="h-2 w-2 fill-current" />
        </KobalteDropdownMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteDropdownMenu.RadioItem>
  );
};

const DropdownMenuLabel: Component<JSX.HTMLAttributes<HTMLDivElement> & { inset?: boolean }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <div
      class={cn("px-2 py-1.5 text-sm font-semibold", local.inset && "pl-8", local.class)}
      {...rest}
    />
  );
};

const DropdownMenuSeparator: Component<ComponentProps<typeof KobalteDropdownMenu.Separator>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDropdownMenu.Separator class={cn("-mx-1 my-1 h-px bg-muted", local.class)} {...rest} />
  );
};

const DropdownMenuShortcut: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <span class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)} {...rest} />;
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

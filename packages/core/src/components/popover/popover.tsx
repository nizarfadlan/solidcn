import { Popover as KobaltePopover } from "@kobalte/core/popover";
import { X } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Popover = KobaltePopover;
const PopoverTrigger = KobaltePopover.Trigger;
const PopoverAnchor = KobaltePopover.Anchor;

const PopoverContent: Component<
  ComponentProps<typeof KobaltePopover.Content> & { showClose?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "showClose", "children"]);
  return (
    <KobaltePopover.Portal>
      <KobaltePopover.Content
        class={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "animate-in fade-in-0 zoom-in-95",
          "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
          local.class,
        )}
        {...rest}
      >
        {local.showClose !== false && (
          <KobaltePopover.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </KobaltePopover.CloseButton>
        )}
        {local.children as JSX.Element}
      </KobaltePopover.Content>
    </KobaltePopover.Portal>
  );
};

const PopoverHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("flex flex-col space-y-2", local.class)} {...rest} />;
};

const PopoverTitle: Component<ComponentProps<typeof KobaltePopover.Title>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <KobaltePopover.Title class={cn("text-sm font-semibold", local.class)} {...rest} />;
};

const PopoverDescription: Component<ComponentProps<typeof KobaltePopover.Description>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobaltePopover.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};

import Drawer from "corvu/drawer";
import { X } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { type VariantProps, tv } from "tailwind-variants";
import { cn } from "~/lib/cn.js";

// Sheet is a Drawer that slides from a side edge

const Sheet = Drawer;
const SheetTrigger = Drawer.Trigger;
const SheetClose = Drawer.Close;
const SheetPortal = Drawer.Portal;

const SheetOverlay: Component<ComponentProps<typeof Drawer.Overlay>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Drawer.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-black/80",
        "corvu-transitioning:transition-opacity corvu-transitioning:duration-200",
        "corvu-open:opacity-100 corvu-closed:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
};

export const sheetVariants = tv({
  base: [
    "fixed z-50 gap-4 bg-background p-6 shadow-lg",
    "transition ease-in-out",
    "corvu-transitioning:duration-300",
  ],
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b corvu-open:translate-y-0 corvu-closed:-translate-y-full",
      bottom: "inset-x-0 bottom-0 border-t corvu-open:translate-y-0 corvu-closed:translate-y-full",
      left: "inset-y-0 left-0 h-full w-3/4 border-r corvu-open:translate-x-0 corvu-closed:-translate-x-full sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l corvu-open:translate-x-0 corvu-closed:translate-x-full sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

export type SheetContentProps = ComponentProps<typeof Drawer.Content> &
  VariantProps<typeof sheetVariants> & {
    class?: string;
    showClose?: boolean;
  };

const SheetContent: Component<SheetContentProps> = (props) => {
  const [local, variants, rest] = splitProps(props, ["class", "showClose", "children"], ["side"]);
  return (
    <Drawer.Portal>
      <SheetOverlay />
      <Drawer.Content class={cn(sheetVariants(variants), local.class)} {...rest}>
        {local.showClose !== false && (
          <Drawer.Close class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </Drawer.Close>
        )}
        {local.children}
      </Drawer.Content>
    </Drawer.Portal>
  );
};

const SheetHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)} {...rest} />
  );
};

const SheetFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...rest}
    />
  );
};

const SheetTitle: Component<ComponentProps<typeof Drawer.Label>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Drawer.Label class={cn("text-lg font-semibold text-foreground", local.class)} {...rest} />
  );
};

const SheetDescription: Component<ComponentProps<typeof Drawer.Description>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <Drawer.Description class={cn("text-sm text-muted-foreground", local.class)} {...rest} />;
};

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

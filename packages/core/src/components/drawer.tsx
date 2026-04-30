import Drawer from "corvu/drawer";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

// Drawer — a bottom sheet / drawer using Corvu

const DrawerRoot = Drawer;
const DrawerTrigger = Drawer.Trigger;
const DrawerClose = Drawer.Close;
const DrawerPortal = Drawer.Portal;

const DrawerOverlay: Component<ComponentProps<typeof Drawer.Overlay>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Drawer.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-black/80",
        "corvu-transitioning:transition-opacity corvu-transitioning:duration-300",
        "corvu-open:opacity-100 corvu-closed:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
};

const DrawerContent: Component<ComponentProps<typeof Drawer.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <Drawer.Portal>
      <DrawerOverlay />
      <Drawer.Content
        class={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          "corvu-transitioning:transition-transform corvu-transitioning:duration-300 corvu-transitioning:ease-in-out",
          local.class,
        )}
        {...rest}
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {local.children}
      </Drawer.Content>
    </Drawer.Portal>
  );
};

const DrawerHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)} {...rest} />;
};

const DrawerFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("mt-auto flex flex-col gap-2 p-4", local.class)} {...rest} />;
};

const DrawerTitle: Component<ComponentProps<typeof Drawer.Label>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Drawer.Label
      class={cn("text-lg font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

const DrawerDescription: Component<ComponentProps<typeof Drawer.Description>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <Drawer.Description class={cn("text-sm text-muted-foreground", local.class)} {...rest} />;
};

export {
  DrawerRoot as Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

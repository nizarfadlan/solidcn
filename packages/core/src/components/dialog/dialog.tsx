import { Dialog as KobalteDialog } from "@kobalte/core/dialog";
import { X } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Dialog = KobalteDialog;
const DialogTrigger = KobalteDialog.Trigger;
const DialogPortal = KobalteDialog.Portal;
const DialogClose = KobalteDialog.CloseButton;

const DialogOverlay: Component<ComponentProps<typeof KobalteDialog.Overlay>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDialog.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-black/80",
        "data-[expanded]:animate-in data-[closed]:animate-out",
        "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        local.class,
      )}
      {...rest}
    />
  );
};

const DialogContent: Component<ComponentProps<typeof KobalteDialog.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteDialog.Portal>
      <DialogOverlay />
      <KobalteDialog.Content
        class={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "gap-4 border bg-background p-6 shadow-lg duration-200",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          "data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%]",
          "data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%]",
          "sm:rounded-lg",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <KobalteDialog.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[expanded]:bg-accent data-[expanded]:text-muted-foreground">
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </KobalteDialog.CloseButton>
      </KobalteDialog.Content>
    </KobalteDialog.Portal>
  );
};

const DialogHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", local.class)} {...rest} />
  );
};

const DialogFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...rest}
    />
  );
};

const DialogTitle: Component<ComponentProps<typeof KobalteDialog.Title>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDialog.Title
      class={cn("text-lg font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

const DialogDescription: Component<ComponentProps<typeof KobalteDialog.Description>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteDialog.Description class={cn("text-sm text-muted-foreground", local.class)} {...rest} />
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};

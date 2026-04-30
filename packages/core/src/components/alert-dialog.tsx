import { AlertDialog as KobalteAlertDialog } from "@kobalte/core/alert-dialog";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const AlertDialog = KobalteAlertDialog;
const AlertDialogTrigger = KobalteAlertDialog.Trigger;

const AlertDialogOverlay: Component<ComponentProps<typeof KobalteAlertDialog.Overlay>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.Overlay
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

const AlertDialogContent: Component<ComponentProps<typeof KobalteAlertDialog.Content>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAlertDialog.Portal>
      <AlertDialogOverlay />
      <KobalteAlertDialog.Content
        class={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </KobalteAlertDialog.Content>
    </KobalteAlertDialog.Portal>
  );
};

const AlertDialogHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)} {...rest} />
  );
};

const AlertDialogFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...rest}
    />
  );
};

const AlertDialogTitle: Component<ComponentProps<typeof KobalteAlertDialog.Title>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <KobalteAlertDialog.Title class={cn("text-lg font-semibold", local.class)} {...rest} />;
};

const AlertDialogDescription: Component<ComponentProps<typeof KobalteAlertDialog.Description>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

const AlertDialogAction = KobalteAlertDialog.CloseButton;
const AlertDialogCancel = KobalteAlertDialog.CloseButton;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

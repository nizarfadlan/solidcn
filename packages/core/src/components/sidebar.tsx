import { PanelLeft } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { createContext, createSignal, splitProps, useContext } from "solid-js";
import { cn } from "~/lib/cn.js";
import { Button } from "./button.js";
import { Sheet, SheetContent } from "./sheet.js";

// ---------------------------------------------------------------------------
// Sidebar — responsive sidebar that collapses to Sheet on mobile
// ---------------------------------------------------------------------------

interface SidebarContext {
  open: () => boolean;
  setOpen: (v: boolean) => void;
  isMobile: () => boolean;
}

const SidebarContext = createContext<SidebarContext>({
  open: () => false,
  setOpen: () => {},
  isMobile: () => false,
});

export const useSidebar = () => useContext(SidebarContext);

export type SidebarProviderProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
  children?: JSX.Element;
};

export const SidebarProvider: Component<SidebarProviderProps> = (props) => {
  const [local] = splitProps(props, ["defaultOpen", "open", "onOpenChange", "class", "children"]);

  const [_open, _setOpen] = createSignal(local.defaultOpen ?? true);
  const controlled = () => local.open !== undefined;
  const open = () => (controlled() ? (local.open as boolean) : _open());
  const setOpen = (v: boolean) => {
    if (!controlled()) _setOpen(v);
    local.onOpenChange?.(v);
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  };

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      <div
        class={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          local.class,
        )}
        data-sidebar="provider"
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
};

export type SidebarProps = JSX.HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

export const Sidebar: Component<SidebarProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "side", "variant", "collapsible", "children"]);
  const { open, setOpen, isMobile } = useSidebar();

  const side = () => local.side ?? "left";
  const variant = () => local.variant ?? "sidebar";
  const collapsible = () => local.collapsible ?? "offcanvas";

  if (isMobile()) {
    return (
      <Sheet open={open()} onOpenChange={setOpen}>
        <SheetContent
          side={side()}
          showClose={false}
          class="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          data-sidebar="sidebar"
          data-mobile="true"
        >
          <div class="flex h-full w-full flex-col">{local.children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      class={cn("group peer hidden md:block text-sidebar-foreground", local.class)}
      data-state={open() ? "expanded" : "collapsed"}
      data-collapsible={!open() ? collapsible() : ""}
      data-variant={variant()}
      data-side={side()}
      {...rest}
    >
      <div
        class={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant() === "floating" || variant() === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        class={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side() === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant() === "floating" || variant() === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
        )}
      >
        <div
          data-sidebar="sidebar"
          class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {local.children}
        </div>
      </div>
    </div>
  );
};

export const SidebarTrigger: Component<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { open, setOpen } = useSidebar();
  const [local, rest] = splitProps(props, ["class", "onClick"]);
  return (
    <Button
      variant="ghost"
      size="icon"
      class={cn("h-7 w-7", local.class)}
      onClick={(e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
        setOpen(!open());
        if (typeof local.onClick === "function") {
          (
            local.onClick as (
              e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element },
            ) => void
          )(e);
        }
      }}
      data-sidebar="trigger"
      {...rest}
    >
      <PanelLeft />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export const SidebarHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("flex flex-col gap-2 p-2", local.class)} data-sidebar="header" {...rest} />;
};

export const SidebarFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("flex flex-col gap-2 p-2", local.class)} data-sidebar="footer" {...rest} />;
};

export const SidebarContent: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class,
      )}
      data-sidebar="content"
      {...rest}
    />
  );
};

export const SidebarGroup: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
      data-sidebar="group"
      {...rest}
    />
  );
};

export const SidebarGroupLabel: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa]",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class,
      )}
      data-sidebar="group-label"
      {...rest}
    />
  );
};

export const SidebarMenu: Component<JSX.HTMLAttributes<HTMLUListElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
      data-sidebar="menu"
      {...rest}
    />
  );
};

export const SidebarMenuItem: Component<JSX.HTMLAttributes<HTMLLIElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li class={cn("group/menu-item relative", local.class)} data-sidebar="menu-item" {...rest} />
  );
};

export const SidebarMenuButton: Component<
  JSX.HTMLAttributes<HTMLButtonElement> & { isActive?: boolean; tooltip?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "isActive", "tooltip", "children"]);
  return (
    <button
      type="button"
      data-sidebar="menu-button"
      data-active={local.isActive}
      class={cn(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring",
        "transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground",
        "data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground",
        "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </button>
  );
};

export const SidebarSeparator: Component<JSX.HTMLAttributes<HTMLHRElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <hr
      class={cn("mx-2 w-auto bg-sidebar-border", local.class)}
      data-sidebar="separator"
      {...rest}
    />
  );
};

import { NavigationMenu as KobalteNavigationMenu } from "@kobalte/core/navigation-menu";
import { ChevronDown } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

// Kobalte NavigationMenu API:
// NavigationMenu = root (renders as <ul> horizontal list)
// NavigationMenu.Menu = individual menu container
// NavigationMenu.Trigger = button that opens the content
// NavigationMenu.Content = dropdown content
// NavigationMenu.Viewport = animated viewport wrapper
// NavigationMenu.Arrow = optional arrow
// NavigationMenu.Item = navigable item (link) inside content

const NavigationMenu: Component<
  ComponentProps<typeof KobalteNavigationMenu> & { class?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteNavigationMenu
      class={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", local.class)}
      {...rest}
    />
  );
};

const NavigationMenuMenu = KobalteNavigationMenu.Menu;

const NavigationMenuTrigger: Component<ComponentProps<typeof KobalteNavigationMenu.Trigger>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteNavigationMenu.Trigger
      class={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2",
        "text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-accent/50 data-[expanded]:bg-accent/50",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronDown
        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[expanded]:rotate-180"
        aria-hidden="true"
      />
    </KobalteNavigationMenu.Trigger>
  );
};

const NavigationMenuContent: Component<ComponentProps<typeof KobalteNavigationMenu.Content>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteNavigationMenu.Portal>
      <KobalteNavigationMenu.Content
        class={cn(
          "left-0 top-0 w-full md:absolute md:w-auto",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      />
    </KobalteNavigationMenu.Portal>
  );
};

const NavigationMenuViewport: Component<ComponentProps<typeof KobalteNavigationMenu.Viewport>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class="absolute left-0 top-full flex justify-center">
      <KobalteNavigationMenu.Viewport
        class={cn(
          "origin-top-center relative mt-1.5 h-[var(--kb-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg",
          "data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:zoom-out-95 data-[expanded]:zoom-in-90",
          "md:w-[var(--kb-navigation-menu-viewport-width)]",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
};

// NavigationMenuLink — native anchor styled as a nav link
const navigationMenuLinkStyle = cn(
  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
  "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
);

const NavigationMenuLink: Component<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <a class={cn(navigationMenuLinkStyle, local.class)} {...rest} />;
};

const NavigationMenuIndicator: Component<ComponentProps<typeof KobalteNavigationMenu.Arrow>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteNavigationMenu.Arrow
      class={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out data-[expanded]:fade-in",
        local.class,
      )}
      {...rest}
    >
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </KobalteNavigationMenu.Arrow>
  );
};

export {
  NavigationMenu,
  NavigationMenuMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  NavigationMenuIndicator,
  navigationMenuLinkStyle,
};

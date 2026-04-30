import { Tabs as KobalteTabs } from "@kobalte/core/tabs";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Tabs = KobalteTabs;

const TabsList: Component<ComponentProps<typeof KobalteTabs.List>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.List
      class={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        local.class,
      )}
      {...rest}
    />
  );
};

const TabsTrigger: Component<ComponentProps<typeof KobalteTabs.Trigger>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
        "ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
        local.class,
      )}
      {...rest}
    />
  );
};

const TabsContent: Component<ComponentProps<typeof KobalteTabs.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.Content
      class={cn(
        "mt-2 ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        local.class,
      )}
      {...rest}
    />
  );
};

const TabsIndicator: Component<ComponentProps<typeof KobalteTabs.Indicator>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.Indicator
      class={cn("absolute transition-all duration-200", local.class)}
      {...rest}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator };

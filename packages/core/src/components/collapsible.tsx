import { Collapsible as KobalteCollapsible } from "@kobalte/core/collapsible";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Collapsible = KobalteCollapsible;
const CollapsibleTrigger = KobalteCollapsible.Trigger;

const CollapsibleContent: Component<ComponentProps<typeof KobalteCollapsible.Content>> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteCollapsible.Content
      class={cn(
        "overflow-hidden transition-all",
        "data-[expanded]:animate-collapsible-down data-[closed]:animate-collapsible-up",
        local.class,
      )}
      {...rest}
    />
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

import { Tooltip as KobalteTooltip } from "@kobalte/core/tooltip";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Tooltip = KobalteTooltip;
const TooltipTrigger = KobalteTooltip.Trigger;

const TooltipContent: Component<ComponentProps<typeof KobalteTooltip.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTooltip.Portal>
      <KobalteTooltip.Content
        class={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
          local.class,
        )}
        {...rest}
      />
    </KobalteTooltip.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };

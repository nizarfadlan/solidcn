import { HoverCard as KobalteHoverCard } from "@kobalte/core/hover-card";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const HoverCard = KobalteHoverCard;
const HoverCardTrigger = KobalteHoverCard.Trigger;

const HoverCardContent: Component<ComponentProps<typeof KobalteHoverCard.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteHoverCard.Portal>
      <KobalteHoverCard.Content
        class={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "data-[expanded]:animate-in data-[closed]:animate-out",
          "data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          "data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      />
    </KobalteHoverCard.Portal>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent };

import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

// Scroll Area — lightweight native implementation with custom scrollbar styling

const ScrollArea: Component<
  JSX.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both" }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children", "orientation"]);
  const orientation = () => local.orientation ?? "vertical";

  return (
    <div class={cn("relative overflow-hidden", local.class)} {...rest}>
      <div
        class={cn(
          "h-full w-full rounded-[inherit]",
          orientation() === "vertical" && "overflow-y-auto overflow-x-hidden",
          orientation() === "horizontal" && "overflow-x-auto overflow-y-hidden",
          orientation() === "both" && "overflow-auto",
          // Custom scrollbar via Tailwind / CSS vars
          "[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
          "[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/40",
        )}
      >
        {local.children}
      </div>
    </div>
  );
};

const ScrollBar: Component<
  JSX.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "orientation"]);
  const isHorizontal = () => local.orientation === "horizontal";
  return (
    <div
      class={cn(
        "flex touch-none select-none transition-colors",
        isHorizontal()
          ? "h-2.5 flex-col border-t border-t-transparent p-[1px]"
          : "h-full w-2.5 border-l border-l-transparent p-[1px]",
        local.class,
      )}
      {...rest}
    >
      <div class="relative flex-1 rounded-full bg-border" />
    </div>
  );
};

export { ScrollArea, ScrollBar };

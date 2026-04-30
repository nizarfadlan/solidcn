import { ToggleButton as KobalteToggle } from "@kobalte/core/toggle-button";
import { type VariantProps, cva } from "class-variance-authority";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "hover:bg-muted hover:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ToggleProps = ComponentProps<typeof KobalteToggle> &
  VariantProps<typeof toggleVariants> & {
    class?: string;
  };

export const Toggle: Component<ToggleProps> = (props) => {
  const [local, variants, rest] = splitProps(props, ["class"], ["variant", "size"]);
  return <KobalteToggle class={cn(toggleVariants(variants), local.class)} {...rest} />;
};

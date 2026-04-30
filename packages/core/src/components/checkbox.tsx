import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import { Check } from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export type CheckboxProps = ComponentProps<typeof KobalteCheckbox> & {
  label?: string;
  class?: string;
};

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "label"]);

  return (
    <KobalteCheckbox class={cn("flex items-center gap-2", local.class)} {...rest}>
      <KobalteCheckbox.Input class="sr-only" />
      <KobalteCheckbox.Control
        class={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[checked]:bg-primary data-[checked]:text-primary-foreground",
        )}
      >
        <KobalteCheckbox.Indicator class="flex items-center justify-center text-current">
          <Check class="h-3.5 w-3.5" />
        </KobalteCheckbox.Indicator>
      </KobalteCheckbox.Control>
      {local.label && (
        <KobalteCheckbox.Label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {local.label}
        </KobalteCheckbox.Label>
      )}
    </KobalteCheckbox>
  );
};

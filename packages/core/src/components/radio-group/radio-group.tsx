import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const RadioGroup: Component<ComponentProps<typeof KobalteRadioGroup> & { class?: string }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <KobalteRadioGroup class={cn("grid gap-2", local.class)} {...rest} />;
};

const RadioGroupLabel: Component<
  ComponentProps<typeof KobalteRadioGroup.Label> & { class?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteRadioGroup.Label
      class={cn("text-sm font-medium leading-none", local.class)}
      {...rest}
    />
  );
};

const RadioGroupItem: Component<
  ComponentProps<typeof KobalteRadioGroup.Item> & { class?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteRadioGroup.Item class={cn("flex items-center space-x-2", local.class)} {...rest}>
      <KobalteRadioGroup.ItemInput class="sr-only" />
      <KobalteRadioGroup.ItemControl
        class={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary",
          "text-primary ring-offset-background",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[checked]:bg-primary",
        )}
      >
        <KobalteRadioGroup.ItemIndicator class="flex items-center justify-center">
          <div class="h-2 w-2 rounded-full bg-background" />
        </KobalteRadioGroup.ItemIndicator>
      </KobalteRadioGroup.ItemControl>
    </KobalteRadioGroup.Item>
  );
};

const RadioGroupItemLabel: Component<
  ComponentProps<typeof KobalteRadioGroup.ItemLabel> & { class?: string }
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteRadioGroup.ItemLabel
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
};

export { RadioGroup, RadioGroupLabel, RadioGroupItem, RadioGroupItemLabel };

import { TextField as KobalteTextField } from "@kobalte/core/text-field";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export type LabelProps = ComponentProps<typeof KobalteTextField.Label> & {
  class?: string;
};

export const Label: Component<LabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <KobalteTextField.Label
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
};

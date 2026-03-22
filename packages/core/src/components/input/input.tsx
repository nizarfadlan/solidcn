import { TextField as KobalteTextField } from "@kobalte/core/text-field";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export type InputProps = ComponentProps<typeof KobalteTextField.Input> & {
  class?: string;
};

export const Input: Component<InputProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "type"]);
  return (
    <KobalteTextField.Input
      type={local.type ?? "text"}
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

export type StandaloneInputProps = ComponentProps<"input"> & {
  class?: string;
};

export const StandaloneInput: Component<StandaloneInputProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "type"]);
  return (
    <input
      type={local.type ?? "text"}
      class={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};

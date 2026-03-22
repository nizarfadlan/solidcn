import { Slider as KobalteSlider } from "@kobalte/core/slider";
import type { Component, ComponentProps } from "solid-js";
import { For, splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export type SliderProps = ComponentProps<typeof KobalteSlider> & {
  label?: string;
  class?: string;
};

export const Slider: Component<SliderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "label", "defaultValue"]);
  const values = () => (rest.value ?? local.defaultValue ?? [0]) as number[];

  return (
    <KobalteSlider
      class={cn(
        "relative flex w-full touch-none select-none flex-col items-center gap-2",
        local.class,
      )}
      {...(local.defaultValue !== undefined ? { defaultValue: local.defaultValue } : {})}
      {...rest}
    >
      {local.label && (
        <div class="flex w-full justify-between">
          <KobalteSlider.Label class="text-sm font-medium leading-none">
            {local.label}
          </KobalteSlider.Label>
          <KobalteSlider.ValueLabel class="text-sm text-muted-foreground" />
        </div>
      )}
      <KobalteSlider.Track class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <KobalteSlider.Fill class="absolute h-full bg-primary" />
        <For each={values()}>
          {(_, _i) => (
            <KobalteSlider.Thumb
              class={cn(
                "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "top-[-6px]",
              )}
            >
              <KobalteSlider.Input />
            </KobalteSlider.Thumb>
          )}
        </For>
      </KobalteSlider.Track>
    </KobalteSlider>
  );
};

import { Progress as KobalteProgress } from "@kobalte/core/progress";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

export type ProgressProps = ComponentProps<typeof KobalteProgress> & {
  label?: string;
  showValue?: boolean;
  class?: string;
};

export const Progress: Component<ProgressProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "label", "showValue"]);

  return (
    <KobalteProgress class={cn("flex flex-col gap-2", local.class)} {...rest}>
      {(local.label || local.showValue) && (
        <div class="flex justify-between text-sm">
          {local.label && (
            <KobalteProgress.Label class="font-medium">{local.label}</KobalteProgress.Label>
          )}
          {local.showValue && <KobalteProgress.ValueLabel class="text-muted-foreground" />}
        </div>
      )}
      <KobalteProgress.Track class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <KobalteProgress.Fill class="h-full w-[--kb-progress-fill-width] bg-primary transition-all" />
      </KobalteProgress.Track>
    </KobalteProgress>
  );
};

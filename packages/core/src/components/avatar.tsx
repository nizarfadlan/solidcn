import type { Component, JSX } from "solid-js";
import { Show, createSignal, splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Avatar: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      class={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", local.class)}
      {...rest}
    />
  );
};

type AvatarImageProps = JSX.ImgHTMLAttributes<HTMLImageElement>;

const AvatarImage: Component<AvatarImageProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "src", "alt", "onError"]);
  const [error, setError] = createSignal(false);

  return (
    <Show when={!error()}>
      {/* biome-ignore lint/a11y/useAltText: alt forwarded via local.alt — callers provide meaningful text */}
      <img
        class={cn("aspect-square h-full w-full object-cover", local.class)}
        src={local.src}
        alt={local.alt ?? ""}
        onError={(e) => {
          setError(true);
          if (typeof local.onError === "function") {
            local.onError(e);
          }
        }}
        {...rest}
      />
    </Show>
  );
};

const AvatarFallback: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      class={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
        local.class,
      )}
      {...rest}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };

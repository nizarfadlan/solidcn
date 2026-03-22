import { type Component, Show, createEffect, onCleanup } from "solid-js";
import { tv } from "tailwind-variants";
import type { StandardToastItem } from "../types.js";
import { toast as toastApi } from "./store.js";

const toastVariants = tv({
  base: [
    "group pointer-events-auto relative flex w-full items-center justify-between",
    "space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
  ],
  variants: {
    type: {
      default: "border bg-background text-foreground",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
      error:
        "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      warning:
        "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
      loading: "border bg-background text-foreground",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

interface ToastItemProps {
  toast: StandardToastItem;
  richColors?: boolean;
  closeButton?: boolean;
}

export const ToastItem: Component<ToastItemProps> = (props) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  createEffect(() => {
    const duration = props.toast.duration;
    if (duration === null || duration === undefined) return;

    const ms = duration ?? 4000;
    timer = setTimeout(() => {
      props.toast.onAutoClose?.(props.toast.id);
      toastApi.dismiss(props.toast.id);
    }, ms);
  });

  onCleanup(() => {
    if (timer !== undefined) clearTimeout(timer);
  });

  return (
    <div
      class={toastVariants({
        type: props.richColors ? props.toast.type : "default",
      })}
      aria-live="polite"
      aria-atomic="true"
    >
      <div class="flex flex-col gap-1">
        <Show when={props.toast.message}>
          <p class="text-sm font-semibold">{props.toast.message}</p>
        </Show>
        <Show when={props.toast.description}>
          <p class="text-xs opacity-70">{props.toast.description}</p>
        </Show>
        <Show when={props.toast.action}>
          {(action) => (
            <button
              type="button"
              class="mt-1 text-xs font-medium underline underline-offset-2"
              onClick={action().onClick}
            >
              {action().label}
            </button>
          )}
        </Show>
      </div>

      <Show when={props.closeButton ?? true}>
        <button
          type="button"
          class="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
          onClick={() => {
            props.toast.onDismiss?.(props.toast.id);
            toastApi.dismiss(props.toast.id);
          }}
          aria-label="Dismiss toast"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </Show>
    </div>
  );
};

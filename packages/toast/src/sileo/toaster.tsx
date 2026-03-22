import { type Component, For } from "solid-js";
import { Portal } from "solid-js/web";
import type { SileoToasterProps } from "../types.js";
import { SileoItem } from "./sileo.js";
import { sileoStore } from "./store.js";

const positionClasses: Record<string, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

export const SileoToaster: Component<SileoToasterProps> = (props) => {
  const position = () => props.position ?? "bottom-right";
  const maxToasts = () => props.maxToasts ?? 5;
  const offsetX = () => props.offset?.x ?? 16;
  const offsetY = () => props.offset?.y ?? 16;
  const preset = () => props.sileoPreset ?? "default";
  const animation = () => props.animation ?? "spring";

  const visibleToasts = () => sileoStore.toasts.slice(-maxToasts());

  return (
    <Portal>
      <ol
        class={`fixed z-[100] flex flex-col gap-2 ${positionClasses[position()] ?? ""}`}
        style={{
          padding: `${offsetY()}px ${offsetX()}px`,
          width: "clamp(280px, 380px, 100vw)",
        }}
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
      >
        <For each={visibleToasts()}>
          {(t) => (
            <li>
              <SileoItem toast={t} preset={preset()} globalAnimation={animation()} />
            </li>
          )}
        </For>
      </ol>
    </Portal>
  );
};

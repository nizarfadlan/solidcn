import { type Component, For, createSignal, onMount, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import type { StandardToasterProps } from "../types.js";
import { toastStore } from "./store.js";
import { ToastItem } from "./toast.js";

function resolveThemeClass(theme: StandardToasterProps["theme"]): string | undefined {
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  return undefined; // "system" = follow document
}

const positionClasses: Record<string, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

/** Stacked offset/scale for non-frontmost toasts (shadcn/sonner style). */
const STACK_OFFSET_PX = 10;
const STACK_SCALE_STEP = 0.05;
const MAX_STACK_VISIBLE = 3;

export const StandardToaster: Component<StandardToasterProps> = (props) => {
  const position = () => props.position ?? "bottom-right";
  const maxToasts = () => props.maxToasts ?? 5;
  const offsetX = () => props.offset?.x ?? 16;
  const offsetY = () => props.offset?.y ?? 16;
  const gap = () => props.gap ?? 8;
  const expandProp = () => props.expand ?? false;

  const [hovered, setHovered] = createSignal(false);
  const isExpanded = () => expandProp() || hovered();

  const themeClass = () => resolveThemeClass(props.theme);

  const isBottom = () =>
    position() === "bottom-left" ||
    position() === "bottom-center" ||
    position() === "bottom-right";

  // most recent toast is last in array → front of stack
  const visibleToasts = () => {
    const all = toastStore.toasts;
    return all.slice(-maxToasts());
  };

  // index 0 = oldest (back of stack), last = newest (front)
  const stackIndex = (i: number) => visibleToasts().length - 1 - i;

  return (
    <Portal>
      <ol
        class={`fixed z-[100] flex flex-col ${positionClasses[position()] ?? ""}${themeClass() ? ` ${themeClass()}` : ""}`}
        style={{
          padding: `${offsetY()}px ${offsetX()}px`,
          width: "clamp(240px, 360px, 100vw)",
          gap: isExpanded() ? `${gap()}px` : "0",
        }}
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusIn={() => setHovered(true)}
        onFocusOut={() => setHovered(false)}
      >
        <For each={visibleToasts()}>
          {(t, i) => {
            const si = () => stackIndex(i());
            // si() === 0 → front (newest), higher → older (back)
            const isVisible = () => isExpanded() || si() < MAX_STACK_VISIBLE;

            // stacked transform when collapsed
            const stackTranslate = () => {
              if (isExpanded()) return "0px";
              const dir = isBottom() ? -1 : 1;
              return `${dir * si() * STACK_OFFSET_PX}px`;
            };
            const stackScale = () =>
              isExpanded() ? 1 : Math.max(0, 1 - si() * STACK_SCALE_STEP);
            const stackOpacity = () =>
              isExpanded() ? 1 : si() < MAX_STACK_VISIBLE ? 1 - si() * 0.1 : 0;
            const stackZIndex = () => maxToasts() - si();

            return (
              <li
                style={{
                  transform: `translateY(${stackTranslate()}) scale(${stackScale()})`,
                  opacity: stackOpacity(),
                  "z-index": stackZIndex(),
                  visibility: isVisible() ? "visible" : "hidden",
                  transition:
                    "transform 300ms cubic-bezier(0.32,0.72,0,1), opacity 200ms ease, scale 200ms ease",
                  // When stacked, pull older toasts up so they peek behind the front one
                  "margin-bottom": isExpanded() ? "0" : si() > 0 ? `-${STACK_OFFSET_PX * 2}px` : "0",
                }}
              >
                <ToastItem
                  toast={t}
                  {...(props.richColors !== undefined ? { richColors: props.richColors } : {})}
                  {...(props.closeButton !== undefined ? { closeButton: props.closeButton } : {})}
                />
              </li>
            );
          }}
        </For>
      </ol>
    </Portal>
  );
};

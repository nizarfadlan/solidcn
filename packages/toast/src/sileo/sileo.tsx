import { type Component, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import type { SileoPreset, SileoToastItem, ToastAnimation } from "../types.js";
import { SPRING_CONFIGS, isSettled, springTick } from "./animations.js";
import { resolveStyles } from "./presets.js";
import { sileo } from "./store.js";

interface SileoItemProps {
  toast: SileoToastItem;
  preset: SileoPreset;
  globalAnimation: ToastAnimation;
}

export const SileoItem: Component<SileoItemProps> = (props) => {
  const [translateY, setTranslateY] = createSignal(40);
  const [opacity, setOpacity] = createSignal(0);
  const [scale, setScale] = createSignal(0.92);

  let rafId: number;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const styles = () =>
    resolveStyles(props.toast.preset ?? props.preset, props.toast.type, props.toast.styles);

  const animation = () => props.toast.animation ?? props.globalAnimation;
  const isPhysics = () => animation() === "spring" || animation() === "bounce";

  onMount(() => {
    if (animation() === "none") {
      setTranslateY(0);
      setOpacity(1);
      setScale(1);
      return;
    }

    if (!isPhysics()) {
      setTranslateY(0);
      setOpacity(1);
      setScale(1);
      return;
    }

    const config = SPRING_CONFIGS[animation()] ??
      SPRING_CONFIGS.spring ?? { stiffness: 280, damping: 20, mass: 1 };
    let yState = { value: 40, velocity: 0 };
    let opState = { value: 0, velocity: 0 };
    let scaleState = { value: 0.92, velocity: 0 };
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.064);
      lastTime = time;

      yState = springTick(yState, 0, config, dt);
      opState = springTick(opState, 1, config, dt);
      scaleState = springTick(scaleState, 1, config, dt);

      setTranslateY(yState.value);
      setOpacity(opState.value);
      setScale(scaleState.value);

      if (!isSettled(yState, 0) || !isSettled(opState, 1) || !isSettled(scaleState, 1)) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
  });

  createEffect(() => {
    const duration = props.toast.duration;
    if (duration === null || duration === undefined) return;

    const ms = duration ?? 4000;
    timer = setTimeout(() => {
      props.toast.onDismiss?.(props.toast.id);
      sileo.dismiss(props.toast.id);
    }, ms);
  });

  onCleanup(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (timer !== undefined) clearTimeout(timer);
  });

  const isGlass = () => props.toast.preset === "glass" || props.preset === "glass";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        transform: `translateY(${translateY()}px) scale(${scale()})`,
        opacity: opacity(),
        "background-color": styles().fill,
        "border-color": styles().borderColor,
        "backdrop-filter": isGlass() ? "blur(12px)" : undefined,
        "-webkit-backdrop-filter": isGlass() ? "blur(12px)" : undefined,
      }}
      class="relative flex w-full items-start gap-3 rounded-2xl border p-4 shadow-lg"
    >
      <Show when={props.toast.icon}>
        <span style={{ color: styles().iconColor }} class="mt-0.5 shrink-0 text-lg">
          {props.toast.icon}
        </span>
      </Show>

      <div class="flex flex-1 flex-col gap-0.5 min-w-0">
        <p style={{ color: styles().titleColor }} class="text-sm font-semibold leading-tight">
          {props.toast.title}
        </p>
        <Show when={props.toast.description}>
          <p
            style={{ color: styles().descriptionColor }}
            class="text-xs leading-relaxed opacity-90"
          >
            {props.toast.description}
          </p>
        </Show>
        <Show when={props.toast.button}>
          {(btn) => (
            <button
              type="button"
              style={{ color: styles().iconColor }}
              class="mt-1.5 self-start rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-current/20 hover:ring-current/40 transition-all"
              onClick={btn().onClick}
            >
              {btn().title}
            </button>
          )}
        </Show>
      </div>

      <button
        type="button"
        style={{ color: styles().descriptionColor }}
        class="shrink-0 rounded-full p-0.5 opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2"
        onClick={() => sileo.dismiss(props.toast.id)}
        aria-label="Dismiss"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

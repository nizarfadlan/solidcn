import { createStore, produce } from "solid-js/store";
import type { SileoToastItem, SileoToastOptions, ToastType } from "../types.js";

let idCounter = 0;
const genId = () => `sileo-${++idCounter}-${Date.now()}`;

interface SileoStore {
  toasts: SileoToastItem[];
}

const [store, setStore] = createStore<SileoStore>({ toasts: [] });

export const sileoStore = store;

function add(type: ToastType, options: SileoToastOptions): string {
  const id = options.id ?? genId();

  setStore(
    produce((s) => {
      const existing = s.toasts.findIndex((t) => t.id === id);
      if (existing !== -1) {
        s.toasts[existing] = { ...s.toasts[existing], ...options, id, type } as SileoToastItem;
      } else {
        s.toasts.push({ ...options, id, type, createdAt: Date.now() });
      }
    }),
  );

  return id;
}

function dismiss(id?: string) {
  setStore(
    produce((s) => {
      if (id) {
        s.toasts = s.toasts.filter((t) => t.id !== id);
      } else {
        s.toasts = [];
      }
    }),
  );
}

function promise<T>(
  p: Promise<T>,
  opts: {
    loading: SileoToastOptions;
    success: SileoToastOptions | ((data: T) => SileoToastOptions);
    error: SileoToastOptions | ((err: unknown) => SileoToastOptions);
  },
): string {
  const id = genId();
  add("loading", { ...opts.loading, id, duration: null });

  p.then((data) => {
    const resolved = typeof opts.success === "function" ? opts.success(data) : opts.success;
    add("success", { ...resolved, id });
  }).catch((err: unknown) => {
    const resolved = typeof opts.error === "function" ? opts.error(err) : opts.error;
    add("error", { ...resolved, id });
  });

  return id;
}

export const sileo = {
  success: (opts: SileoToastOptions) => add("success", opts),
  error: (opts: SileoToastOptions) => add("error", opts),
  warning: (opts: SileoToastOptions) => add("warning", opts),
  info: (opts: SileoToastOptions) => add("info", opts),
  loading: (opts: SileoToastOptions) => add("loading", { duration: null, ...opts }),
  action: (opts: SileoToastOptions) => add("default", opts),
  promise,
  dismiss,
};

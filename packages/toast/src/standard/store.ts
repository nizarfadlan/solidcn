import { createStore, produce } from "solid-js/store";
import type { StandardToastItem, StandardToastOptions, ToastType } from "../types.js";

let idCounter = 0;
const genId = () => `toast-${++idCounter}-${Date.now()}`;

interface ToastStore {
  toasts: StandardToastItem[];
}

const [store, setStore] = createStore<ToastStore>({ toasts: [] });

export const toastStore = store;

function add(type: ToastType, message: string, options: StandardToastOptions = {}): string {
  const id = options.id ?? genId();

  setStore(
    produce((s) => {
      const existing = s.toasts.findIndex((t) => t.id === id);
      if (existing !== -1) {
        s.toasts[existing] = {
          ...s.toasts[existing],
          type,
          message,
          ...options,
          id,
        } as StandardToastItem;
      } else {
        s.toasts.push({ id, type, message, createdAt: Date.now(), ...options });
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
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((err: unknown) => string);
  },
): string {
  const id = genId();
  add("loading", opts.loading, { id, duration: null });

  p.then((data) => {
    const msg = typeof opts.success === "function" ? opts.success(data) : opts.success;
    add("success", msg, { id });
  }).catch((err: unknown) => {
    const msg = typeof opts.error === "function" ? opts.error(err) : opts.error;
    add("error", msg, { id });
  });

  return id;
}

export const toast = {
  success: (msg: string, opts?: StandardToastOptions) => add("success", msg, opts),
  error: (msg: string, opts?: StandardToastOptions) => add("error", msg, opts),
  warning: (msg: string, opts?: StandardToastOptions) => add("warning", msg, opts),
  info: (msg: string, opts?: StandardToastOptions) => add("info", msg, opts),
  loading: (msg: string, opts?: StandardToastOptions) =>
    add("loading", msg, { duration: null, ...opts }),
  message: (msg: string, opts?: StandardToastOptions) => add("default", msg, opts),
  promise,
  dismiss,
};

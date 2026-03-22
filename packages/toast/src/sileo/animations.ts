import type { ToastAnimation } from "../types.js";

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export const SPRING_CONFIGS: Record<string, SpringConfig> = {
  spring: { stiffness: 280, damping: 20, mass: 1 },
  bounce: { stiffness: 400, damping: 10, mass: 0.8 },
  slide: { stiffness: 350, damping: 30, mass: 1 },
  fade: { stiffness: 300, damping: 25, mass: 1 },
  none: { stiffness: 9999, damping: 9999, mass: 1 },
};

export interface SpringState {
  value: number;
  velocity: number;
}

/**
 * Single RAF tick of a spring simulation.
 * Returns updated state without mutating input.
 */
export function springTick(
  state: SpringState,
  target: number,
  config: SpringConfig,
  dt: number,
): SpringState {
  const displacement = state.value - target;
  const springForce = -config.stiffness * displacement;
  const dampingForce = -config.damping * state.velocity;
  const acceleration = (springForce + dampingForce) / config.mass;

  const velocity = state.velocity + acceleration * dt;
  const value = state.value + velocity * dt;

  return { value, velocity };
}

export function isSettled(state: SpringState, target: number, threshold = 0.001): boolean {
  return Math.abs(state.value - target) < threshold && Math.abs(state.velocity) < threshold;
}

/**
 * Returns CSS animation classes for non-physics animations (fade, slide).
 */
export function getAnimationClass(animation: ToastAnimation, entering: boolean): string {
  if (animation === "none") return "";

  const base = "transition-all duration-200";

  if (animation === "fade") {
    return entering ? `${base} animate-in fade-in-0` : `${base} animate-out fade-out-0`;
  }

  if (animation === "slide") {
    return entering
      ? `${base} animate-in slide-in-from-right-full`
      : `${base} animate-out slide-out-to-right-full`;
  }

  return "";
}

export function clampValue(minimum, value, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function smoothStep(value) {
  const normalized = clampValue(0, value, 1);

  return normalized * normalized * (3 - 2 * normalized);
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

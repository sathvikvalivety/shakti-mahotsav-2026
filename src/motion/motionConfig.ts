/**
 * Shared tuning for the Home hero motion.
 *
 * CSS owns the simple continuous loops (glow, petals, scroll cue — see
 * src/styles/home-hero.css; background ambience lives in index.css).
 * This file holds the values JavaScript needs: pointer parallax strengths
 * and the goddess renderer frame budget. The goddess rig itself lives in
 * components/SacredHero/goddessRig.ts.
 */

/**
 * Maximum pointer-parallax travel per layer, in CSS pixels. Only the artwork
 * moves; the background, text and event card stay anchored.
 */
export const PARALLAX = {
  glow: 2.5,
  goddess: 4,
  /** Fabric travel; the renderer applies (fabric - goddess) inside the canvas. */
  fabric: 7,
} as const;

export const PARALLAX_TUNING = {
  /** 0..1 — fraction of the remaining distance covered each frame. Lower is softer. */
  easing: 0.055,
  /** Intensity multipliers for narrower viewports that still have a fine pointer. */
  tabletScale: 0.6,
  mobileScale: 0.35,
} as const;

export const GODDESS_RENDER = {
  /** Ambient motion is slow; 30fps is visually identical and halves GPU work. */
  maxFps: 30,
  mobileMaxFps: 24,
  /** Device-pixel cap for the canvas backing store. */
  maxPixelRatio: 2,
  mobileMaxPixelRatio: 2,
  /** Upper bound on canvas backing-store pixels (≈ 2560×1440 × 2). */
  maxCanvasPixels: 7_000_000,
  /** Seconds for motion to ease in after the artwork appears. */
  motionRampSeconds: 2.5,
} as const;

export const MOBILE_QUERY = '(max-width: 767px)';
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

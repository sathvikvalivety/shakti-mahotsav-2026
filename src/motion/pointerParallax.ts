import { useEffect, useRef } from 'react';
import { FINE_POINTER_QUERY, PARALLAX_TUNING, REDUCED_MOTION_QUERY } from './motionConfig';

/**
 * One shared pointer-parallax engine for every layer on the page.
 *
 * A single passive pointermove listener sets a target; a requestAnimationFrame
 * loop eases toward it and writes `transform` directly onto registered layer
 * elements (no React re-renders, no layout). The loop stops once settled.
 * Only runs for fine hover-capable pointers and when reduced motion is off.
 */

interface Layer {
  el: HTMLElement;
  strength: number;
}

const layers = new Set<Layer>();
const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
let frame = 0;
let listening = false;
let teardown: (() => void) | null = null;

function viewportScale(): number {
  const w = window.innerWidth;
  if (w < 768) return PARALLAX_TUNING.mobileScale;
  if (w < 1024) return PARALLAX_TUNING.tabletScale;
  return 1;
}

/** Current eased offset, in CSS px, for a layer of the given strength. */
export function getParallaxOffset(strength: number): { x: number; y: number } {
  const k = strength * viewportScale();
  return { x: -pointer.x * k, y: -pointer.y * k };
}

function applyLayers() {
  for (const { el, strength } of layers) {
    const { x, y } = getParallaxOffset(strength);
    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  }
}

function tick() {
  pointer.x += (pointer.targetX - pointer.x) * PARALLAX_TUNING.easing;
  pointer.y += (pointer.targetY - pointer.y) * PARALLAX_TUNING.easing;
  applyLayers();
  const settled =
    Math.abs(pointer.targetX - pointer.x) < 0.001 && Math.abs(pointer.targetY - pointer.y) < 0.001;
  frame = settled ? 0 : requestAnimationFrame(tick);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;
  pointer.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  schedule();
}

function onPointerExit(e: MouseEvent) {
  if (e.relatedTarget) return;
  pointer.targetX = 0;
  pointer.targetY = 0;
  schedule();
}

function start() {
  const finePointer = window.matchMedia(FINE_POINTER_QUERY);
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

  const sync = () => {
    const shouldListen = finePointer.matches && !reducedMotion.matches;
    if (shouldListen === listening) return;
    listening = shouldListen;
    if (shouldListen) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mouseout', onPointerExit, { passive: true });
    } else {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mouseout', onPointerExit);
      cancelAnimationFrame(frame);
      frame = 0;
      pointer.x = pointer.y = pointer.targetX = pointer.targetY = 0;
      applyLayers();
    }
  };

  sync();
  finePointer.addEventListener('change', sync);
  reducedMotion.addEventListener('change', sync);

  teardown = () => {
    finePointer.removeEventListener('change', sync);
    reducedMotion.removeEventListener('change', sync);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('mouseout', onPointerExit);
    cancelAnimationFrame(frame);
    frame = 0;
    listening = false;
  };
}

/**
 * Register an element as a parallax layer. The element's `transform` is owned
 * by the engine, so put CSS animations on a child element, not on this one.
 */
export function useParallaxLayer<T extends HTMLElement>(strength: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const layer: Layer = { el, strength };
    layers.add(layer);
    if (!teardown) start();
    applyLayers();

    return () => {
      layers.delete(layer);
      el.style.transform = '';
      if (layers.size === 0 && teardown) {
        teardown();
        teardown = null;
      }
    };
  }, [strength]);

  return ref;
}

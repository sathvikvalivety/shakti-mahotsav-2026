import React, { useEffect, useRef, useState } from 'react';
import { GODDESS_RENDER, MOBILE_QUERY, PARALLAX } from '../../motion/motionConfig';
import { getParallaxOffset } from '../../motion/pointerParallax';
import { usePrefersReducedMotion } from '../../motion/usePrefersReducedMotion';
import { GODDESS_ART, poseAt } from './goddessRig';
import { createGoddessRenderer } from './goddessRenderer';

interface GoddessCanvasProps {
  /** False while the hero is off-screen; the render loop pauses. */
  active: boolean;
}

type Status = 'loading' | 'ready' | 'fallback';

const smoothRamp = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/**
 * Renders the goddess artwork through the WebGL rig so its parts can move
 * independently. Falls back to the plain image when WebGL2 is unavailable.
 */
export const GoddessCanvas: React.FC<GoddessCanvasProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState<Status>('loading');

  // Live flags read by the render loop without re-running the setup effect.
  const activeRef = useRef(active);
  const reducedRef = useRef(reducedMotion);
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    reducedRef.current = reducedMotion;
    syncRef.current?.();
  }, [active, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createGoddessRenderer(canvas);
    if (!renderer) {
      setStatus('fallback');
      return;
    }

    let disposed = false;
    let ready = false;
    let frame = 0;
    let startTime = 0;
    let lastDraw = 0;
    let frameInterval = 1000 / GODDESS_RENDER.maxFps;

    const draw = (now: number) => {
      const t = (now - startTime) / 1000;
      const intensity = reducedRef.current ? 0 : smoothRamp(t / GODDESS_RENDER.motionRampSeconds);
      // Fabric travels further than the figure; convert the difference to image pixels.
      const shift = getParallaxOffset(PARALLAX.fabric - PARALLAX.goddess);
      const toArt = GODDESS_ART.width / Math.max(1, canvas.clientWidth);
      renderer.render(poseAt(t, intensity), { x: shift.x * toArt, y: shift.y * toArt });
      lastDraw = now;
    };

    const shouldAnimate = () => ready && !disposed && activeRef.current && !reducedRef.current;

    const loop = (now: number) => {
      frame = 0;
      if (!shouldAnimate()) return;
      frame = requestAnimationFrame(loop);
      if (now - lastDraw >= frameInterval - 2) draw(now);
    };

    // Start, stop or redraw after the hero visibility or motion preference changes.
    const sync = () => {
      if (!ready || disposed) return;
      if (shouldAnimate()) {
        if (!frame) frame = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        if (reducedRef.current) draw(performance.now());
      }
    };
    syncRef.current = sync;

    const resize = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (!cssWidth || !cssHeight) return;
      const mobile = window.matchMedia(MOBILE_QUERY).matches;
      const cap = mobile ? GODDESS_RENDER.mobileMaxPixelRatio : GODDESS_RENDER.maxPixelRatio;
      // Render at the screen's own density (one resampling step keeps the art
      // sharp), within a pixel budget so large screens stay smooth.
      const budget = Math.sqrt(GODDESS_RENDER.maxCanvasPixels / (cssWidth * cssHeight));
      const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, cap, budget));
      renderer.resize(Math.round(cssWidth * ratio), Math.round(cssHeight * ratio));
      frameInterval = 1000 / (mobile ? GODDESS_RENDER.mobileMaxFps : GODDESS_RENDER.maxFps);
      if (ready) draw(performance.now());
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (disposed) return;
      renderer.setArtwork(image);
      ready = true;
      startTime = performance.now();
      resize();
      draw(startTime);
      setStatus('ready');
      sync();
    };
    image.onerror = () => !disposed && setStatus('fallback');
    image.src = GODDESS_ART.src;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      ready = false;
      setStatus('fallback');
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      disposed = true;
      syncRef.current = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      image.onload = null;
      image.onerror = null;
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="sacred-goddess"
        data-status={status}
        role="img"
        aria-label={GODDESS_ART.alt}
        hidden={status === 'fallback'}
      />
      {status === 'fallback' && (
        <img
          src={GODDESS_ART.src}
          alt={GODDESS_ART.alt}
          className="sacred-goddess sacred-goddess--fallback"
          decoding="async"
        />
      )}
    </>
  );
};

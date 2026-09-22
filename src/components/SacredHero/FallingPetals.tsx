import React from 'react';

/**
 * A handful of flower petals drifting down through the hero sky. Pure CSS
 * animation (transform + opacity only); the values below are deterministic
 * so the scene looks natural but never reshuffles between renders.
 * Fewer petals show on smaller screens, and none with reduced motion
 * (see .sacred-petals in home-hero.css).
 */

const PETAL_COUNT = 14;
const VARIANTS = ['marigold', 'rose', 'crimson', 'gold'] as const;

// Small deterministic pseudo-random generator (0..1) per petal and channel.
const noise = (i: number, channel: number) => {
  const x = Math.sin(i * 12.9898 + channel * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const PETALS = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const r = (channel: number) => noise(i + 1, channel);
  const fall = 17 + r(1) * 13; // seconds to cross the hero
  return {
    variant: VARIANTS[i % VARIANTS.length],
    style: {
      // Spread across the width, with a little jitter so it never looks gridded.
      left: `${((i + 0.5) / PETAL_COUNT) * 100 + (r(2) - 0.5) * 6}%`,
      '--size': `${12 + r(3) * 10}px`,
      '--fall': `${fall}s`,
      '--delay': `${-r(4) * fall}s`,
      '--drift': `${(r(5) - 0.5) * 140}px`,
      '--sway': `${14 + r(6) * 26}px`,
      '--sway-dur': `${3.6 + r(7) * 2.6}s`,
      '--spin-a': `${-30 + r(8) * 40}deg`,
      '--spin-b': `${20 + r(9) * 50}deg`,
      '--alpha': `${0.55 + r(10) * 0.35}`,
    } as React.CSSProperties,
  };
});

export const FallingPetals: React.FC = () => (
  <div className="sacred-petals" aria-hidden="true">
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="petal-marigold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="petal-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="petal-crimson" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="petal-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#C8963E" />
        </linearGradient>
      </defs>
    </svg>

    {PETALS.map((petal, i) => (
      <span key={i} className="sacred-petal" style={petal.style}>
        <svg className="sacred-petal__body" viewBox="0 0 20 28">
          <path
            d="M10 0.5C16.2 6 19.4 14 15.4 22.2 13.3 26.4 6.7 26.4 4.6 22.2 0.6 14 3.8 6 10 0.5Z"
            fill={`url(#petal-${petal.variant})`}
          />
          <path d="M10 4C9.4 10.5 10.6 17 10 24" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" fill="none" />
        </svg>
      </span>
    ))}
  </div>
);

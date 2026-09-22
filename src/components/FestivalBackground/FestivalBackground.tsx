import React from 'react';
import { StarField } from './StarField';
import { Mandala } from './Mandala';
import { HangingOrnaments } from './HangingOrnaments';
import { FestivalSkyline } from './FestivalSkyline';

/**
 * The site's fixed night-sky environment. It sits behind every section and
 * takes no space in the page flow. Motion here is deliberately quiet: stars
 * twinkle, ornaments sway, skyline lamps flicker — the sky itself never moves
 * or zooms, and the corner mandalas stay still.
 */
export const FestivalBackground: React.FC = () => {
  return (
    <div
      id="festival-background-container"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#020817]"
      aria-hidden="true"
    >
      {/* LAYER 1 — BASE SKY */}
      <div
        id="base-sky-layer"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #020817 0%,
            #06152B 24%,
            #0A2342 48%,
            #0D2948 72%,
            #14111D 90%,
            #120F18 100%
          )`,
        }}
      />

      {/* LAYER 2 — ATMOSPHERIC NEBULA (static) */}
      <div id="nebula-layer" className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-[15%] opacity-15 sm:opacity-18 md:opacity-20 blur-[70px] md:blur-[100px]"
          style={{
            background: `
              radial-gradient(ellipse 65% 45% at 25% 30%, rgba(59, 130, 246, 0.35) 0%, transparent 70%),
              radial-gradient(ellipse 55% 50% at 75% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 65%),
              radial-gradient(ellipse 70% 40% at 50% 65%, rgba(67, 56, 202, 0.25) 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 60% 20%, rgba(192, 132, 252, 0.2) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* LAYER 3 — STAR FIELD */}
      <div className="absolute inset-0">
        <StarField />
      </div>

      {/* LAYER 4 — GOLDEN HORIZON GLOW */}
      <div
        id="horizon-glow-layer"
        className="absolute bottom-0 left-0 right-0 h-[45vh]"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 50% 100%,
              rgba(245, 213, 138, 0.28) 0%,
              rgba(212, 168, 79, 0.22) 28%,
              rgba(194, 94, 34, 0.18) 52%,
              rgba(10, 35, 66, 0.12) 75%,
              transparent 100%
            )
          `,
        }}
      />

      {/* LAYER 5 — SKYLINE & LAMPS */}
      <div className="absolute bottom-0 left-0 right-0">
        <FestivalSkyline />
      </div>

      {/* LAYER 6 — CORNER MANDALAS (static) */}
      <div className="absolute inset-0 overflow-hidden">
        <Mandala position="top-left" />
        <Mandala position="top-right" />
      </div>

      {/* LAYER 7 — HANGING ORNAMENTS */}
      <div className="absolute top-0 left-0 right-0">
        <HangingOrnaments />
      </div>
    </div>
  );
};

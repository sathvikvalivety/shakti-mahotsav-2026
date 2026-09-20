import React from 'react';
import { StarField } from './StarField';
import { GoldenParticles } from './GoldenParticles';
import { Mandala } from './Mandala';
import { HangingOrnaments } from './HangingOrnaments';
import { FestivalSkyline } from './FestivalSkyline';

interface FestivalBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const FestivalBackground: React.FC<FestivalBackgroundProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      id="festival-background-container"
      className={`relative w-full min-h-screen overflow-hidden bg-[#020817] ${className}`}
    >
      {/* LAYER 1 — BASE SKY */}
      <div
        id="base-sky-layer"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `linear-gradient(180deg, 
            #020817 0%, 
            #06152B 24%, 
            #0A2342 48%, 
            #0D2948 72%, 
            #14111D 90%, 
            #120F18 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* LAYER 2 — ATMOSPHERIC NEBULA */}
      <div
        id="nebula-layer"
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <div
          className="absolute -inset-[15%] opacity-15 sm:opacity-18 md:opacity-20 blur-[70px] md:blur-[100px] animate-nebula"
          style={{
            animation: 'slow-nebula-drift 150s ease-in-out infinite alternate',
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
      <div style={{ zIndex: 2 }} className="fixed inset-0 pointer-events-none">
        <StarField />
      </div>

      {/* LAYER 4 — GOLDEN PARTICLES */}
      <div style={{ zIndex: 3 }} className="fixed inset-0 pointer-events-none">
        <GoldenParticles />
      </div>

      {/* LAYER 7 — GOLDEN HORIZON GLOW */}
      <div
        id="horizon-glow-layer"
        className="fixed bottom-0 left-0 right-0 h-[45vh] pointer-events-none select-none"
        style={{
          zIndex: 4,
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
        aria-hidden="true"
      />

      {/* LAYER 8 & 9 — SKYLINE & WATER REFLECTION */}
      <div style={{ zIndex: 5 }} className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <FestivalSkyline />
      </div>

      {/* LAYER 5 — TOP CORNER MANDALA DECORATIONS */}
      <div style={{ zIndex: 6 }} className="fixed inset-0 pointer-events-none overflow-hidden">
        <Mandala position="top-left" duration={75} />
        <Mandala position="top-right" duration={75} />
      </div>

      {/* LAYER 6 — GOLDEN HANGING ORNAMENTS */}
      <div style={{ zIndex: 7 }} className="fixed top-0 left-0 right-0 pointer-events-none">
        <HangingOrnaments />
      </div>

      {/* LAYER 10 — WEBSITE CONTENT */}
      {children && (
        <div
          id="website-content-layer"
          className="relative min-h-screen w-full flex flex-col justify-between"
          style={{ zIndex: 10 }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

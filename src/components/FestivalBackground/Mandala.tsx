import React from 'react';

interface MandalaProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

/** Corner mandala background decoration: rotates smoothly clockwise. */
export const Mandala: React.FC<MandalaProps> = ({ position, className = '' }) => {
  const positionClasses = {
    'top-left': '-top-32 -left-32 sm:-top-36 sm:-left-36 md:-top-40 md:-left-40 lg:-top-44 lg:-left-44',
    'top-right': '-top-32 -right-32 sm:-top-36 sm:-right-36 md:-top-40 md:-right-40 lg:-top-44 lg:-right-44',
    'bottom-left': '-bottom-32 -left-32 sm:-bottom-36 sm:-left-36 md:-bottom-40 md:-left-40 lg:-bottom-44 lg:-left-44',
    'bottom-right': '-bottom-32 -right-32 sm:-bottom-36 sm:-right-36 md:-bottom-40 md:-right-40 lg:-bottom-44 lg:-right-44',
  }[position];

  return (
    <div
      className={`
        absolute
        pointer-events-none
        select-none
        ${positionClasses}
        ${className}
      `}
      aria-hidden="true"
    >
      <div
        className={`
          animate-mandala-rotate
          opacity-20
          sm:opacity-25
          md:opacity-30
          flex
          items-center
          justify-center
          origin-center
        `}
        style={{
          // Smooth clockwise rotation cycle
          animationDuration: position === 'top-left' || position === 'bottom-right' ? '48s' : '56s',
          animationDelay: position === 'top-left' || position === 'bottom-right' ? '0s' : '-14s',
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="
            w-64 h-64
            sm:w-72 sm:h-72
            md:w-80 md:h-80
            lg:w-[430px] lg:h-[430px]
            xl:w-[480px] xl:h-[480px]
          "
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`goldGrad-${position}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F5D58A" />
              <stop offset="35%" stopColor="#D4A84F" />
              <stop offset="70%" stopColor="#B3802A" />
              <stop offset="100%" stopColor="#F5D58A" />
            </linearGradient>

            <radialGradient
              id={`glowCenter-${position}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="#F5D58A" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#D4A84F" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#B3802A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* CENTRAL AURA */}
          <circle
            cx="300"
            cy="300"
            r="185"
            fill={`url(#glowCenter-${position})`}
          />

          {/* CENTER BINDU */}
          <circle
            cx="300"
            cy="300"
            r="7"
            fill={`url(#goldGrad-${position})`}
          />

          <circle
            cx="300"
            cy="300"
            r="20"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="1.2"
          />

          <circle
            cx="300"
            cy="300"
            r="30"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.7"
            strokeDasharray="2 3"
          />

          {/* CENTRAL 8-PETAL LOTUS */}
          {[...Array(8)].map((_, i) => {
            const angle = i * 45;
            return (
              <g
                key={`central-petal-${i}`}
                transform={`rotate(${angle} 300 300)`}
              >
                <path
                  d="
                    M300 270
                    C290 252 285 240 300 220
                    C315 240 310 252 300 270
                    Z
                  "
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle
                  cx="300"
                  cy="235"
                  r="1.8"
                  fill="#F5D58A"
                />
              </g>
            );
          })}

          {/* INNER RINGS */}
          <circle
            cx="300"
            cy="300"
            r="80"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="1.2"
          />

          <circle
            cx="300"
            cy="300"
            r="88"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />

          {/* 16 PETAL TIER */}
          {[...Array(16)].map((_, i) => {
            const angle = i * 22.5;
            return (
              <g
                key={`petal-${i}`}
                transform={`rotate(${angle} 300 300)`}
              >
                <path
                  d="
                    M300 212
                    C288 190 282 170 300 150
                    C318 170 312 190 300 212
                    Z
                  "
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="1.1"
                  fill="none"
                />
                <line
                  x1="300"
                  y1="212"
                  x2="300"
                  y2="165"
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="0.7"
                />
                <circle
                  cx="300"
                  cy="150"
                  r="2"
                  fill="#F5D58A"
                />
              </g>
            );
          })}

          {/* MID CIRCLE */}
          <circle
            cx="300"
            cy="300"
            r="150"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="1.2"
          />

          {/* DIAMOND CHAIN */}
          {[...Array(24)].map((_, i) => {
            const angle = i * 15;
            return (
              <g
                key={`diamond-${i}`}
                transform={`rotate(${angle} 300 300)`}
              >
                <polygon
                  points="
                    300,144
                    304,150
                    300,156
                    296,150
                  "
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            );
          })}

          <circle
            cx="300"
            cy="300"
            r="158"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="1.1"
          />

          {/* SACRED GEOMETRY */}
          <polygon
            points="
              300,100
              441,241
              441,359
              300,500
              159,359
              159,241
            "
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.9"
            strokeDasharray="4 4"
            fill="none"
          />

          <polygon
            points="
              359,159
              500,300
              359,441
              241,441
              100,300
              241,159
            "
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.9"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* LARGE OUTER LOTUS ARCHES */}
          {[...Array(16)].map((_, i) => {
            const angle = i * 22.5;
            return (
              <g
                key={`outer-petal-${i}`}
                transform={`rotate(${angle} 300 300)`}
              >
                <path
                  d="
                    M280 142
                    C275 115 290 85 300 70
                    C310 85 325 115 320 142
                  "
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="1.3"
                  fill="none"
                />
                <path
                  d="
                    M292 125
                    C290 105 296 90 300 82
                    C304 90 310 105 308 125
                  "
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="0.75"
                  fill="none"
                />
                <circle
                  cx="300"
                  cy="65"
                  r="2.5"
                  fill={`url(#goldGrad-${position})`}
                />
                <line
                  x1="300"
                  y1="62"
                  x2="300"
                  y2="48"
                  stroke={`url(#goldGrad-${position})`}
                  strokeWidth="0.9"
                />
                <circle
                  cx="300"
                  cy="45"
                  r="1.5"
                  fill="#F5D58A"
                />
              </g>
            );
          })}

          {/* OUTER RINGS */}
          <circle
            cx="300"
            cy="300"
            r="235"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.9"
            strokeDasharray="3 5"
          />

          <circle
            cx="300"
            cy="300"
            r="248"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="1.4"
          />

          <circle
            cx="300"
            cy="300"
            r="255"
            stroke={`url(#goldGrad-${position})`}
            strokeWidth="0.8"
          />

          {/* OUTER BEADS */}
          {[...Array(32)].map((_, i) => {
            const angle = i * 11.25;
            return (
              <circle
                key={`outer-bead-${i}`}
                cx="300"
                cy="42"
                r="1.2"
                fill="#D4A84F"
                transform={`rotate(${angle} 300 300)`}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

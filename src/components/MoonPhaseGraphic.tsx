import React from 'react';
import { motion } from 'motion/react';
import { LunarPhaseInfo } from '../types';

interface MoonPhaseGraphicProps {
  phase: LunarPhaseInfo;
  isActive: boolean;
  isHovered?: boolean;
  size?: number;
  dayNumber?: number;
}

export const MoonPhaseGraphic: React.FC<MoonPhaseGraphicProps> = ({
  phase,
  isActive,
  isHovered = false,
  size = 64,
  dayNumber,
}) => {
  const radius = size / 2;
  const moonR = radius * 0.72;
  const uniqueId = `moon-p-${phase.type}-${dayNumber || 0}`;

  // Calculate terminator paths for realistic lunar phases
  // We use SVG mask or clipPath based on the phase
  const renderPhaseIllumination = () => {
    switch (phase.type) {
      case 'new':
        // New Moon: dark disk with very subtle earthshine / ethereal edge crescent
        return (
          <g>
            {/* Dark lunar body */}
            <circle cx={radius} cy={radius} r={moonR} fill="#141E2E" />
            {/* Subtle ethereal rim light */}
            <circle
              cx={radius}
              cy={radius}
              r={moonR}
              fill="none"
              stroke="#D4A84F"
              strokeWidth={isActive ? "1.5" : "0.75"}
              strokeOpacity={isActive ? "0.6" : "0.25"}
            />
          </g>
        );

      case 'waxing-crescent':
        // ~25% right illuminated
        return (
          <g mask={`url(#${uniqueId}-mask)`}>
            <circle cx={radius} cy={radius} r={moonR} fill="#111B2B" />
            <path
              d={`M ${radius} ${radius - moonR} 
                  A ${moonR * 0.45} ${moonR} 0 0 1 ${radius} ${radius + moonR} 
                  A ${moonR} ${moonR} 0 0 0 ${radius} ${radius - moonR} Z`}
              fill="url(#moon-lit-grad)"
            />
          </g>
        );

      case 'first-quarter':
        // 50% right illuminated
        return (
          <g>
            {/* Dark left half */}
            <path
              d={`M ${radius} ${radius - moonR} A ${moonR} ${moonR} 0 0 0 ${radius} ${radius + moonR} Z`}
              fill="#101926"
            />
            {/* Bright right half */}
            <path
              d={`M ${radius} ${radius - moonR} A ${moonR} ${moonR} 0 0 1 ${radius} ${radius + moonR} Z`}
              fill="url(#moon-lit-grad)"
            />
          </g>
        );

      case 'waxing-gibbous':
        // ~75% right illuminated
        return (
          <g>
            <circle cx={radius} cy={radius} r={moonR} fill="url(#moon-lit-grad)" />
            {/* Shadow on far left */}
            <path
              d={`M ${radius} ${radius - moonR} 
                  A ${moonR * 0.55} ${moonR} 0 0 1 ${radius} ${radius + moonR} 
                  A ${moonR} ${moonR} 0 0 1 ${radius} ${radius - moonR} Z`}
              fill="#101926"
            />
          </g>
        );

      case 'full':
        // Full Moon: completely illuminated golden pearl
        return (
          <g>
            <circle cx={radius} cy={radius} r={moonR} fill="url(#moon-full-grad)" />
          </g>
        );

      case 'waning-gibbous':
        // ~75% left illuminated
        return (
          <g>
            <circle cx={radius} cy={radius} r={moonR} fill="url(#moon-lit-grad)" />
            {/* Shadow on far right */}
            <path
              d={`M ${radius} ${radius - moonR} 
                  A ${moonR * 0.55} ${moonR} 0 0 0 ${radius} ${radius + moonR} 
                  A ${moonR} ${moonR} 0 0 0 ${radius} ${radius - moonR} Z`}
              fill="#101926"
            />
          </g>
        );

      case 'last-quarter':
        // 50% left illuminated
        return (
          <g>
            {/* Bright left half */}
            <path
              d={`M ${radius} ${radius - moonR} A ${moonR} ${moonR} 0 0 0 ${radius} ${radius + moonR} Z`}
              fill="url(#moon-lit-grad)"
            />
            {/* Dark right half */}
            <path
              d={`M ${radius} ${radius - moonR} A ${moonR} ${moonR} 0 0 1 ${radius} ${radius + moonR} Z`}
              fill="#101926"
            />
          </g>
        );

      case 'waning-crescent':
        // ~25% left illuminated
        return (
          <g>
            <circle cx={radius} cy={radius} r={moonR} fill="#111B2B" />
            <path
              d={`M ${radius} ${radius - moonR} 
                  A ${moonR * 0.45} ${moonR} 0 0 0 ${radius} ${radius + moonR} 
                  A ${moonR} ${moonR} 0 0 1 ${radius} ${radius - moonR} Z`}
              fill="url(#moon-lit-grad)"
            />
          </g>
        );

      case 'eclipse':
        // Day 9: Solar-Lunar eclipse with vibrant golden corona and diamond sparkles
        return (
          <g>
            {/* Corona rays */}
            <circle
              cx={radius}
              cy={radius}
              r={moonR * 1.12}
              fill="none"
              stroke="#D4A84F"
              strokeWidth="2"
              strokeDasharray="2 3"
              className="animate-spin-slow"
              strokeOpacity="0.8"
            />
            {/* Dark eclipse disc */}
            <circle cx={radius} cy={radius} r={moonR} fill="#0A101D" />
            {/* Diamond ring gleam */}
            <circle
              cx={radius + moonR * 0.7}
              cy={radius - moonR * 0.65}
              r={moonR * 0.28}
              fill="#FFF4D0"
              filter={`url(#diamond-flare-${uniqueId})`}
            />
          </g>
        );

      default:
        return <circle cx={radius} cy={radius} r={moonR} fill="url(#moon-lit-grad)" />;
    }
  };

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Active Golden Halo & Breathing Aura */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 35px 8px rgba(212, 168, 79, 0.55), 0 0 65px 18px rgba(245, 213, 138, 0.25)',
          }}
        />
      )}

      {/* Rotating Thin Ring around Active Moon */}
      {isActive && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-4px] rounded-full border border-dashed border-[#F5D58A]/80 pointer-events-none"
        />
      )}

      {/* Hover Ring for inactive moons */}
      {!isActive && isHovered && (
        <div className="absolute inset-[-2px] rounded-full border border-[#D4A84F]/50 transition-all duration-300 pointer-events-none" />
      )}

      {/* SVG Moon Rendering */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          {/* Lit Moon Gradient (creamy silver/gold moonlight) */}
          <radialGradient id="moon-lit-grad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="35%" stopColor="#F5E8C7" />
            <stop offset="75%" stopColor="#E0C998" />
            <stop offset="100%" stopColor="#A88B52" />
          </radialGradient>

          {/* Full Moon Radiant Gradient */}
          <radialGradient id="moon-full-grad" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF4D0" />
            <stop offset="65%" stopColor="#F2D38B" />
            <stop offset="90%" stopColor="#D4A84F" />
            <stop offset="100%" stopColor="#8C6724" />
          </radialGradient>

          {/* 3D Lunar Shadow Overlay Gradient */}
          <radialGradient id="lunar-shadow-overlay" cx="30%" cy="30%" r="75%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#020813" stopOpacity="0.65" />
          </radialGradient>

          {/* Diamond Flare Filter for Eclipse Day 9 */}
          <filter id={`diamond-flare-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Glow on Active Moon */}
        {isActive && (
          <circle
            cx={radius}
            cy={radius}
            r={moonR * 1.25}
            fill="none"
            stroke="#F5D58A"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        )}

        {/* Clip Moon to Circle for Craters and Phases */}
        <g clipPath={`url(#${uniqueId}-clip)`}>
          <clipPath id={`${uniqueId}-clip`}>
            <circle cx={radius} cy={radius} r={moonR} />
          </clipPath>

          {/* Base Moon Phase Illumination */}
          {renderPhaseIllumination()}

          {/* Realistic Lunar Craters & Maria Features */}
          <g opacity={phase.type === 'new' ? 0.2 : 0.28}>
            {/* Tycho-like major crater */}
            <circle
              cx={radius + moonR * 0.22}
              cy={radius + moonR * 0.38}
              r={moonR * 0.16}
              fill="#221C14"
              stroke="#E8D1A0"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            {/* Crater 2 (Sea of Tranquility mark) */}
            <ellipse
              cx={radius - moonR * 0.25}
              cy={radius - moonR * 0.18}
              rx={moonR * 0.24}
              ry={moonR * 0.18}
              fill="#181512"
              transform={`rotate(-15 ${radius - moonR * 0.25} ${radius - moonR * 0.18})`}
            />
            {/* Crater 3 (Copernicus mark) */}
            <circle
              cx={radius - moonR * 0.12}
              cy={radius + moonR * 0.15}
              r={moonR * 0.12}
              fill="#282218"
              stroke="#D4A84F"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            {/* Small crater cluster */}
            <circle cx={radius + moonR * 0.35} cy={radius - moonR * 0.22} r={moonR * 0.08} fill="#1F1A14" />
            <circle cx={radius + moonR * 0.1} cy={radius - moonR * 0.4} r={moonR * 0.07} fill="#1F1A14" />
            <circle cx={radius - moonR * 0.38} cy={radius + moonR * 0.28} r={moonR * 0.09} fill="#241E16" />
          </g>

          {/* Spherical 3D Volume Shadow */}
          <circle cx={radius} cy={radius} r={moonR} fill="url(#lunar-shadow-overlay)" />
        </g>

        {/* Outer Fine Golden Border */}
        <circle
          cx={radius}
          cy={radius}
          r={moonR}
          fill="none"
          stroke={isActive ? "#F5D58A" : "#D4A84F"}
          strokeWidth={isActive ? "2" : "1"}
          strokeOpacity={isActive ? "0.95" : "0.35"}
        />
      </svg>
    </div>
  );
};

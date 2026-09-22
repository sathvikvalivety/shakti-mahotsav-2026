import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FestivalEvent } from '../types';
import { MoonPhaseGraphic } from './MoonPhaseGraphic';
import { CenterEventDisplay, CenterEventImage } from './CenterEventDisplay';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Calendar, Sparkles } from 'lucide-react';

interface LunarOrbitTimelineProps {
  events: FestivalEvent[];
  activeDay: number;
  onSelectDay: (day: number) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onViewDetails: (event: FestivalEvent) => void;
  isPausedByUser: boolean;
  onResumeTimeline: () => void;
  autoPlayInterval?: number;
  onIntervalChange?: (interval: number) => void;
  loopAtEnd?: boolean;
  onToggleLoop?: () => void;
  isRealDateMode?: boolean;
  onToggleRealDateMode?: () => void;
}

export const LunarOrbitTimeline: React.FC<LunarOrbitTimelineProps> = ({
  events,
  activeDay,
  onSelectDay,
  onPrevDay,
  onNextDay,
  isPlaying,
  onTogglePlay,
  onViewDetails,
  isPausedByUser,
  onResumeTimeline,
}) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState<number>(270);

  // Particle traveling state
  const [particleAngle, setParticleAngle] = useState<number>(-90);
  const prevDayRef = useRef<number>(activeDay);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll mobile moon carousel when activeDay changes
  useEffect(() => {
    if (mobileScrollRef.current) {
      const activeBtn = mobileScrollRef.current.querySelector<HTMLElement>(`#mobile-moon-${activeDay}`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeDay]);

  // Responsive radius calculation
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 360) {
        setOrbitRadius(118);
      } else if (w < 420) {
        setOrbitRadius(135);
      } else if (w < 640) {
        setOrbitRadius(155);
      } else if (w < 768) {
        setOrbitRadius(200);
      } else if (w < 1024) {
        setOrbitRadius(235);
      } else if (w < 1280) {
        setOrbitRadius(255);
      } else if (w < 1536) {
        setOrbitRadius(285);
      } else {
        setOrbitRadius(310);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate angle for each day (1 to N)
  // Day 1 starts at top (-90 degrees / 12 o'clock)
  // Clockwise progression: 360 degrees / total days
  const stepAngle = 360 / (events.length || 10);
  const totalDays = events.length || 10;

  const getDayAngle = (day: number) => {
    return -90 + (day - 1) * stepAngle;
  };

  // Animate the traveling glowing particle along the circular orbit when activeDay changes
  useEffect(() => {
    const prevDay = prevDayRef.current;
    if (prevDay === activeDay) {
      setParticleAngle(getDayAngle(activeDay));
      return;
    }

    const startAngle = getDayAngle(prevDay);
    let targetAngle = getDayAngle(activeDay);

    // Normalize forward angular direction if moving across the loop boundary
    if (activeDay === 1 && prevDay === totalDays) {
      targetAngle = startAngle + stepAngle; // smoothly complete circle
    } else if (activeDay === totalDays && prevDay === 1) {
      targetAngle = startAngle - stepAngle;
    }

    setIsTraveling(true);
    const startTime = performance.now();
    const travelDuration = 800; // ms

    const animateParticle = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / travelDuration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startAngle + (targetAngle - startAngle) * easeProgress;
      setParticleAngle(current);

      if (progress < 1) {
        requestAnimationFrame(animateParticle);
      } else {
        setParticleAngle(getDayAngle(activeDay));
        setIsTraveling(false);
        prevDayRef.current = activeDay;
      }
    };

    const animId = requestAnimationFrame(animateParticle);
    return () => cancelAnimationFrame(animId);
  }, [activeDay, totalDays, stepAngle]);

  const activeEvent = events.find((e) => e.day === activeDay) || events[0];

  // Helper to convert polar to cartesian coordinates
  const polarToCartesian = (radius: number, angleDegrees: number) => {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return {
      x: radius * Math.cos(angleRadians),
      y: radius * Math.sin(angleRadians),
    };
  };

  // Particle position on orbit
  const particlePos = polarToCartesian(orbitRadius, particleAngle);

  // Active moon position
  const activeMoonAngle = getDayAngle(activeDay);
  const activeMoonPos = polarToCartesian(orbitRadius, activeMoonAngle);

  const isMobile = orbitRadius < 180;
  const isSmallMobile = orbitRadius < 135;
  const pad = isSmallMobile ? 42 : isMobile ? 48 : 80;

  return (
    <section className="relative w-full mx-auto select-none flex flex-col items-center justify-center">
      {/* ==================================================== */}
      {/* CIRCULAR LUNAR TIMELINE ORBIT (Responsive on all screens) */}
      {/* ==================================================== */}
      <div className="flex flex-col items-center justify-center relative w-full overflow-visible py-2 sm:py-4">
        {/* The Central Circular Orbit Canvas */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: orbitRadius * 2 + pad * 2,
            height: orbitRadius * 2 + pad * 2,
            maxWidth: '100%',
          }}
        >
          {/* Subtle Outer Concentric Orbit Decorator */}
          <div
            className="absolute rounded-full border border-[#D4A84F]/10 pointer-events-none"
            style={{
              width: orbitRadius * 2 + (isMobile ? 30 : 70),
              height: orbitRadius * 2 + (isMobile ? 30 : 70),
            }}
          />

          {/* SVG Orbit Track & Glowing Particle */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox={`-${orbitRadius + pad} -${orbitRadius + pad} ${
              (orbitRadius + pad) * 2
            } ${(orbitRadius + pad) * 2}`}
          >
            <defs>
              {/* Golden Orbit Gradient */}
              <linearGradient id="orbit-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A84F" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#F5D58A" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#D4A84F" stopOpacity="0.6" />
              </linearGradient>

              {/* Radial Glow for Traveling Particle */}
              <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Orbit Path: Thin Elegant Golden Line */}
            <circle
              cx="0"
              cy="0"
              r={orbitRadius}
              fill="none"
              stroke="url(#orbit-gold-gradient)"
              strokeWidth={isMobile ? "1.2" : "1.5"}
              strokeDasharray={isMobile ? "3 4" : "4 6"}
              className="opacity-75"
            />

            {/* Inner Solid Fine Guide Ring */}
            <circle
              cx="0"
              cy="0"
              r={orbitRadius}
              fill="none"
              stroke="#D4A84F"
              strokeWidth="0.5"
              className="opacity-40"
            />

            {/* Subtle Radial Connector Beam between Center and Active Moon */}
            <line
              x1="0"
              y1="0"
              x2={activeMoonPos.x}
              y2={activeMoonPos.y}
              stroke="#F5D58A"
              strokeWidth={isMobile ? "1" : "1.2"}
              strokeDasharray="3 3"
              className="opacity-60 animate-pulse"
            />

            {/* Small decorative golden ticks along orbit circumference */}
            {Array.from({ length: 36 }).map((_, i) => {
              const tickAngle = (i * 10 * Math.PI) / 180;
              const tickLen = isMobile ? 2 : 3;
              const x1 = (orbitRadius - tickLen) * Math.cos(tickAngle);
              const y1 = (orbitRadius - tickLen) * Math.sin(tickAngle);
              const x2 = (orbitRadius + tickLen) * Math.cos(tickAngle);
              const y2 = (orbitRadius + tickLen) * Math.sin(tickAngle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D4A84F"
                  strokeWidth="0.75"
                  opacity={i % 4 === 0 ? "0.6" : "0.2"}
                />
              );
            })}

            {/* ONE MOVING GOLDEN PARTICLE TRAVELING ALONG THE CIRCULAR ORBIT */}
            <g
              transform={`translate(${particlePos.x}, ${particlePos.y})`}
              filter="url(#particle-glow)"
            >
              <circle cx="0" cy="0" r={isMobile ? 6 : 9} fill="#D4A84F" opacity="0.45" />
              <circle cx="0" cy="0" r={isMobile ? 3.5 : 5} fill="#F5D58A" opacity="0.85" />
              <circle cx="0" cy="0" r={isMobile ? 1.8 : 2.5} fill="#FFFFFF" />
            </g>
          </svg>

          {/* Exact Geometric Center: Circular Event Image with Rotating Mandala */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <CenterEventImage event={activeEvent} />
          </div>

          {/* THE 10 FIXED MOONS AROUND THE ORBIT */}
          {events.map((evt) => {
            const angle = getDayAngle(evt.day);
            const pos = polarToCartesian(orbitRadius, angle);
            const isActive = evt.day === activeDay;
            const isHovered = hoveredDay === evt.day;

            return (
              <div
                key={evt.day}
                className="absolute z-30 flex flex-col items-center justify-center transition-transform duration-700"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Moon Phase Button */}
                <button
                  id={`moon-node-day-${evt.day}`}
                  onClick={() => onSelectDay(evt.day)}
                  onMouseEnter={() => setHoveredDay(evt.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  aria-label={`Day ${evt.day} — ${evt.title} — ${evt.date}`}
                  className={`group relative rounded-full focus:outline-none transition-all duration-700 cursor-pointer ${
                    isActive
                      ? 'scale-[1.15] opacity-100 z-30'
                      : isHovered
                      ? 'scale-110 opacity-90 z-20'
                      : 'scale-100 opacity-70 hover:opacity-95 z-10'
                  }`}
                >
                  <MoonPhaseGraphic
                    phase={evt.lunarPhase}
                    isActive={isActive}
                    isHovered={isHovered}
                    size={
                      isActive
                        ? isSmallMobile
                          ? 40
                          : isMobile
                          ? 46
                          : 68
                        : isSmallMobile
                        ? 28
                        : isMobile
                        ? 34
                        : 54
                    }
                    dayNumber={evt.day}
                  />

                  {/* Day Badge Tag attached to Moon */}
                  <div
                    className={`absolute ${
                      isMobile
                        ? '-bottom-4 text-[8px] px-1 py-0.1'
                        : '-bottom-6 text-[10px] px-2 py-0.5'
                    } left-1/2 -translate-x-1/2 rounded-full font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-500 ${
                      isActive
                        ? 'bg-[#D4A84F] text-[#061426] shadow-[0_0_12px_rgba(212,168,79,0.7)] scale-105'
                        : 'bg-[#0B1F3A]/90 border border-[#D4A84F]/30 text-[#F8F2E3]/75 group-hover:text-[#F5D58A]'
                    }`}
                  >
                    {isMobile ? `D${evt.day}` : `DAY ${evt.day}`}
                  </div>
                </button>

                {/* Floating Tooltip / Label on Hover (when inactive) */}
                <AnimatePresence>
                  {!isActive && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      className="absolute bottom-[-54px] z-40 px-3 py-1.5 rounded-lg bg-[#061426]/95 border border-[#D4A84F]/50 backdrop-blur-md shadow-2xl text-center pointer-events-none whitespace-nowrap"
                    >
                      <p className="text-xs font-bold text-[#F5D58A]">{evt.title}</p>
                      <p className="text-[10px] text-[#F8F2E3]/70">{evt.date}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Timeline Controls Bar */}
        <div className="mt-4 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 z-30">
          {/* Previous Day Button */}
          <button
            id="btn-prev-day"
            onClick={onPrevDay}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/80 hover:bg-[#142B4F] hover:border-[#D4A84F] text-[#F8F2E3] text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label="Previous Festival Night"
          >
            <ChevronLeft size={15} className="text-[#D4A84F]" />
            <span>Previous</span>
          </button>

          {/* Play / Pause Auto Timeline */}
          <button
            id="btn-toggle-play"
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-[#142B4F] border border-[#D4A84F]/60 text-[#F5D58A] hover:bg-[#1D3B6C]'
                : 'bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] shadow-[0_0_20px_rgba(212,168,79,0.4)]'
            }`}
            aria-label={isPlaying ? "Pause Automatic Timeline" : "Start Automatic Timeline"}
          >
            {isPlaying ? (
              <>
                <Pause size={13} fill="currentColor" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                <span>Play Timeline</span>
              </>
            )}
          </button>

          {/* Next Day Button */}
          <button
            id="btn-next-day"
            onClick={onNextDay}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/80 hover:bg-[#142B4F] hover:border-[#D4A84F] text-[#F8F2E3] text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label="Next Festival Night"
          >
            <span>Next</span>
            <ChevronRight size={15} className="text-[#D4A84F]" />
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="mt-3 hidden sm:block text-[11px] text-[#F8F2E3]/40 tracking-wider text-center">
          Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-[#142B4F] text-[#F5D58A] border border-[#D4A84F]/20 font-mono text-[10px]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-[#142B4F] text-[#F5D58A] border border-[#D4A84F]/20 font-mono text-[10px]">→</kbd> arrow keys to navigate · <kbd className="px-1.5 py-0.5 rounded bg-[#142B4F] text-[#F5D58A] border border-[#D4A84F]/20 font-mono text-[10px]">Space</kbd> to play/pause
        </p>
      </div>
    </section>
  );
};

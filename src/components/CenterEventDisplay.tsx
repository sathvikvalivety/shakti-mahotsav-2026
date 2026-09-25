import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { FestivalEvent } from '../types';

interface CenterEventImageProps {
  event: FestivalEvent;
}

export const CenterEventImage: React.FC<CenterEventImageProps> = ({ event }) => {
  return (
    <div className="relative flex items-center justify-center select-none
      w-28 h-28 min-[360px]:w-32 min-[360px]:h-32 min-[420px]:w-40 min-[420px]:h-40
      sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem]">

      {/* Outer slow-spinning mandala ring */}
      <div className="absolute inset-[-10px] sm:inset-[-16px] md:inset-[-20px] rounded-full pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          <circle cx="50" cy="50" r="48" stroke="#D4A84F" strokeOpacity="0.35" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="44" stroke="#D4A84F" strokeOpacity="0.2" strokeWidth="0.25" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={50 + 46 * Math.cos((i * 45 * Math.PI) / 180)}
              cy={50 + 46 * Math.sin((i * 45 * Math.PI) / 180)}
              r="1.8"
              fill="#F5D58A"
              fillOpacity="0.7"
            />
          ))}
        </svg>
      </div>

      {/* Inner counter-rotating dashed ring */}
      <div className="absolute inset-[-4px] sm:inset-[-8px] md:inset-[-10px] rounded-full border border-dashed border-[#F5D58A]/35 pointer-events-none animate-spin-reverse-slow" />

      {/* Golden glow halo */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_48px_rgba(212,168,79,0.4),0_0_80px_rgba(212,168,79,0.15)] pointer-events-none" />

      {/* Circular image */}
      <div className="w-full h-full rounded-full overflow-hidden border-[2.5px] border-[#D4A84F] bg-[#0B1F3A] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.day}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <img
              src={event.image}
              alt={`${event.title}`}
              className="w-full h-full object-cover object-top"
              loading="eager"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface CenterEventInfoProps {
  event: FestivalEvent;
  onViewDetails: (event: FestivalEvent) => void;
  isFinalNightReached?: boolean;
}

export const CenterEventInfo: React.FC<CenterEventInfoProps> = ({ event, onViewDetails }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.day}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full select-none rounded-2xl border border-[#D4A84F]/30
          bg-gradient-to-b from-[#0E1E3A]/90 via-[#091529]/92 to-[#040D1A]/95
          backdrop-blur-md shadow-[0_0_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,168,79,0.08)]
          overflow-hidden"
      >
        {/* Gold top accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4A84F]/70 to-transparent" />

        <div className="px-4 py-4 sm:px-6 sm:py-5 space-y-3 sm:space-y-4">

          {/* Day + Date pill */}
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-[#D4A84F]/12 border border-[#D4A84F]/30
              font-manrope font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#D4A84F]">
              <Sparkles size={10} className="shrink-0" />
              Day {event.day} of 10
            </span>
            <span className="font-manrope text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F8F2E3]/50">
              {event.date.toUpperCase()}
            </span>
          </div>

          {/* Deity name */}
          <div className="text-center space-y-1">
            <h2 className="font-cormorant font-semibold leading-tight text-[#F8EFDD]
              text-[22px] min-[360px]:text-[24px] sm:text-[30px] md:text-[34px]
              [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              {event.title}
            </h2>
            <p className="font-manrope text-[11px] sm:text-[12px] text-[#E6C27A]/80 tracking-wide">
              {event.navadurga.title}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4A84F]/40" />
            <span className="text-[#D4A84F]/60 text-[10px]">✦</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4A84F]/40" />
          </div>

          {/* Virtues */}
          <p className="text-center font-manrope text-[10.5px] sm:text-[11.5px] text-[#F5D58A]/90 tracking-wide">
            {event.navadurga.virtues}
          </p>

          {/* Tagline */}
          <p className="text-center font-sourceserif italic text-[13px] sm:text-[14.5px] md:text-[15px]
            text-[#F8F2E3]/80 leading-relaxed px-2">
            "{event.tagline}"
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5
            font-manrope text-[10px] sm:text-[11px] text-[#F8F2E3]/60 pt-0.5">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-[#D4A84F] shrink-0" />
              {event.time}
            </span>
            <span className="text-[#D4A84F]/30 hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-[#D4A84F] shrink-0" />
              {event.location}
            </span>
            <span className="text-[#D4A84F]/30 hidden sm:inline">·</span>
            <span className="text-[#F5D58A]/80">{event.entryType.split('·')[0].trim()}</span>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2 pt-1">
            <button
              id={`btn-view-details-day-${event.day}`}
              onClick={() => onViewDetails(event)}
              className="inline-flex items-center gap-2 px-5 py-2 sm:px-7 sm:py-2.5 rounded-full
                bg-gradient-to-r from-[#C9943E] via-[#F5D58A] to-[#C9943E]
                text-[#061426] font-manrope font-bold
                text-[10px] sm:text-[11px] uppercase tracking-widest
                shadow-[0_0_20px_rgba(212,168,79,0.28)]
                hover:shadow-[0_0_32px_rgba(245,213,138,0.5)]
                hover:scale-[1.04] active:scale-[0.97]
                transition-all duration-200 cursor-pointer"
            >
              View Event Details
              <ArrowRight size={13} />
            </button>

            {event.day === 10 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                bg-[#D4A84F]/12 border border-[#D4A84F]/50
                font-manrope text-[9.5px] sm:text-[10.5px] font-bold text-[#F5D58A]
                uppercase tracking-widest animate-pulse">
                <Flame size={12} />
                Vijayadashami Grand Finale
              </div>
            )}
          </div>
        </div>

        {/* Gold bottom accent bar */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4A84F]/40 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
};

interface CenterEventDisplayProps {
  event: FestivalEvent;
  onViewDetails: (event: FestivalEvent) => void;
  isFinalNightReached?: boolean;
}

export const CenterEventDisplay: React.FC<CenterEventDisplayProps> = ({
  event,
  onViewDetails,
  isFinalNightReached = false,
}) => {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-sm mx-auto relative z-10">
      <CenterEventImage event={event} />
      <CenterEventInfo
        event={event}
        onViewDetails={onViewDetails}
        isFinalNightReached={isFinalNightReached}
      />
    </div>
  );
};

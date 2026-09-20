import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Sparkles, ArrowRight, Shield, Flame } from 'lucide-react';
import { FestivalEvent } from '../types';

interface CenterEventImageProps {
  event: FestivalEvent;
}

export const CenterEventImage: React.FC<CenterEventImageProps> = ({ event }) => {
  return (
    <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-88 md:h-88 lg:w-96 lg:h-96 flex items-center justify-center select-none">
      {/* Outer Rotating Mandala Filigree Ring */}
      <div className="absolute inset-[-16px] sm:inset-[-20px] rounded-full border border-[#D4A84F]/35 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4A84F]/45 fill-none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.25" />
          {/* 8 sacred lotus petals along ring */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={50 + 46 * Math.cos((i * 45 * Math.PI) / 180)}
              cy={50 + 46 * Math.sin((i * 45 * Math.PI) / 180)}
              r="1.5"
              fill="#F5D58A"
            />
          ))}
        </svg>
      </div>

      {/* Counter-Rotating Fine Ring */}
      <div className="absolute inset-[-8px] sm:inset-[-10px] rounded-full border border-dashed border-[#F5D58A]/40 pointer-events-none animate-spin-reverse-slow" />

      {/* Golden Halo Breathing Shadow */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(212,168,79,0.4)] pointer-events-none" />

      {/* Circular Masked Image with Crossfade & Subtle Zoom Transition */}
      <div className="w-full h-full rounded-full overflow-hidden border-[2.5px] border-[#D4A84F] relative bg-[#0B1F3A] shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.day}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={event.image}
              alt={`${event.title} - ${event.date}`}
              className="w-full h-full object-cover object-[center_18%]"
              loading="eager"
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

export const CenterEventInfo: React.FC<CenterEventInfoProps> = ({
  event,
  onViewDetails,
  isFinalNightReached = false,
}) => {
  return (
    <div className="w-full relative z-10 select-none p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#142B4F]/85 via-[#0B1F3A]/90 to-[#040D1A]/95 border border-[#D4A84F]/35 backdrop-blur-md shadow-[0_0_30px_rgba(212,168,79,0.18)]">
      {/* Event Details Content with Smooth Text Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={event.day}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-3.5 text-center"
        >
          {/* Day & Date Header: Manrope SemiBold — 11px */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 font-manrope font-semibold text-[11px] uppercase tracking-[0.22em] text-[#D4A84F]">
              <span>DAY {event.day}</span>
              <span>·</span>
              <span>{event.date.toUpperCase()}</span>
            </div>

            {/* Deity: Cormorant Garamond SemiBold — 28–34px */}
            <h2 className="font-cormorant font-semibold text-[28px] sm:text-[32px] md:text-[34px] text-[#F8F2E3] leading-tight drop-shadow-md">
              {event.title}
            </h2>

            {/* Navadurga Virtue Badge */}
            <p className="font-manrope text-[11px] sm:text-xs text-[#F5D58A] font-medium tracking-wide flex items-center justify-center gap-1.5">
              <Sparkles size={12} className="text-[#D4A84F] flex-shrink-0" />
              <span>{event.navadurga.virtues}</span>
            </p>
          </div>

          {/* Description (Tagline): Source Serif 4 Italic — 15–16px */}
          <p className="font-sourceserif italic text-[15px] sm:text-[16px] text-[#F8F2E3]/90 leading-snug px-2">
            “{event.tagline}”
          </p>

          {/* Time, Location & Entry Info */}
          <div className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-3 font-manrope text-[11px] sm:text-xs text-[#F8F2E3]/75 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#D4A84F]" />
              <span>{event.time}</span>
            </div>
            <span className="text-[#D4A84F]/40 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D4A84F]" />
              <span>{event.location}</span>
            </div>
            <span className="text-[#D4A84F]/40 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-[#F5D58A]">
              <Shield size={13} />
              <span>{event.entryType.split('·')[0].trim()}</span>
            </div>
          </div>

          {/* Action Buttons: Manrope SemiBold — 11–12px */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              id={`btn-view-details-day-${event.day}`}
              onClick={() => onViewDetails(event)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F] text-[#061426] font-manrope font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider shadow-[0_0_20px_rgba(212,168,79,0.3)] hover:shadow-[0_0_30px_rgba(245,213,138,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>VIEW EVENT DETAILS</span>
              <ArrowRight size={14} />
            </button>

            {/* Final Night Indicator Badge if on Day 10 */}
            {event.day === 10 && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4A84F]/15 border border-[#D4A84F]/60 font-manrope text-[11px] font-bold text-[#F5D58A] uppercase tracking-widest animate-pulse">
                <Flame size={14} className="text-[#F5D58A]" />
                <span>VIJAYADASHAMI GRAND FINALE</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
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
    <div className="flex flex-col items-center text-center max-w-md mx-auto relative z-10 select-none space-y-6">
      <CenterEventImage event={event} />
      <CenterEventInfo
        event={event}
        onViewDetails={onViewDetails}
        isFinalNightReached={isFinalNightReached}
      />
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight, Flame, Shield, Compass } from 'lucide-react';
import { FESTIVAL_EVENTS } from '../data/festivalData';
import { MoonPhaseGraphic } from './MoonPhaseGraphic';
import { FestivalEvent } from '../types';

interface NavadurgaGuideProps {
  activeDay: number;
  onSelectDay: (day: number) => void;
  onViewDetails: (event: FestivalEvent) => void;
}

export const NavadurgaGuide: React.FC<NavadurgaGuideProps> = ({
  activeDay,
  onSelectDay,
  onViewDetails,
}) => {
  const totalEvents = FESTIVAL_EVENTS.length || 10;
  const currentEvent = FESTIVAL_EVENTS.find((e) => e.day === activeDay) || FESTIVAL_EVENTS[0];

  const handlePrev = () => {
    onSelectDay(activeDay === 1 ? totalEvents : activeDay - 1);
  };

  const handleNext = () => {
    onSelectDay(activeDay === totalEvents ? 1 : activeDay + 1);
  };

  return (
    <section className="relative z-20 w-full flex flex-col select-none space-y-4">
      {/* Section Header & Carousel Controls */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A84F] mb-1">
            <Sparkles size={12} className="text-[#D4A84F]" />
            <span>SACRED INVOCATION</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F8F2E3] tracking-wide">
            10 Sacred Alankarams & Deities
          </h3>
        </div>

        {/* Carousel Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            id="btn-navadurga-prev"
            onClick={handlePrev}
            className="p-2 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/70 text-[#F8F2E3] hover:text-[#F5D58A] hover:bg-[#142B4F] hover:border-[#D4A84F] transition-all cursor-pointer active:scale-95 shadow-md"
            aria-label="Previous Goddess"
          >
            <ChevronLeft size={16} className="text-[#D4A84F]" />
          </button>

          <span className="text-xs font-bold text-[#F5D58A] px-2 py-0.5 rounded-full bg-[#0B1F3A]/90 border border-[#D4A84F]/20 font-heading">
            {activeDay} / {totalEvents}
          </span>

          <button
            id="btn-navadurga-next"
            onClick={handleNext}
            className="p-2 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/70 text-[#F8F2E3] hover:text-[#F5D58A] hover:bg-[#142B4F] hover:border-[#D4A84F] transition-all cursor-pointer active:scale-95 shadow-md"
            aria-label="Next Goddess"
          >
            <ChevronRight size={16} className="text-[#D4A84F]" />
          </button>
        </div>
      </div>

      {/* 1x1 Carousel Card for the Active Goddess */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.day}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#142B4F]/90 via-[#0B1F3A]/95 to-[#040D1A]/95 border border-[#D4A84F]/40 shadow-[0_0_30px_rgba(212,168,79,0.2)] backdrop-blur-md relative overflow-hidden"
          >
            {/* Header: Moon graphic + Goddess Name & Title */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0">
                  <MoonPhaseGraphic
                    phase={currentEvent.lunarPhase}
                    isActive={true}
                    size={48}
                    dayNumber={currentEvent.day}
                  />
                </div>

                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-[#D4A84F]">
                    DAY {currentEvent.day} OF {totalEvents} · {currentEvent.date.split(',')[0]}
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#F8F2E3]">
                    {currentEvent.navadurga.name}
                  </h4>
                  <div className="text-xs text-[#F5D58A] italic font-subheading">
                    {currentEvent.navadurga.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Virtues Tag */}
            <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-[#061426]/80 border border-[#D4A84F]/20 text-xs text-[#F5D58A] font-medium flex items-center gap-2">
              <Sparkles size={13} className="text-[#D4A84F] flex-shrink-0" />
              <span className="font-semibold text-[#F8F2E3]/80">Virtues:</span>
              <span className="truncate">{currentEvent.navadurga.virtues}</span>
            </div>

            {/* Sacred Lore / Spiritual Significance */}
            <div className="mb-4 text-xs sm:text-sm text-[#F8F2E3]/85 font-subheading leading-relaxed bg-[#0B1F3A]/40 p-3.5 rounded-xl border border-[#D4A84F]/10">
              <p>{currentEvent.navadurga.significance}</p>
            </div>

            {/* Highlights & Dress Code Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2.5 rounded-lg bg-[#061426]/60 border border-[#D4A84F]/10 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A84F] flex items-center gap-1">
                  <Compass size={11} />
                  <span>Key Ritual / Highlight</span>
                </span>
                <p className="text-[#F8F2E3]/90 truncate font-medium">
                  {currentEvent.highlights[0]}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#061426]/60 border border-[#D4A84F]/10 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A84F] flex items-center gap-1">
                  <Shield size={11} />
                  <span>Sacred Dress Code</span>
                </span>
                <p className="text-[#F8F2E3]/90 truncate font-medium">
                  {currentEvent.dressCode}
                </p>
              </div>
            </div>

            {/* Card Footer: Event linkage */}
            <div className="pt-3 border-t border-[#D4A84F]/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-[#F8F2E3]/60">Festival Event:</span>
                <span className="font-bold text-[#F5D58A] truncate">
                  {currentEvent.title}
                </span>
              </div>

              <button
                id={`btn-carousel-view-details-${currentEvent.day}`}
                onClick={() => onViewDetails(currentEvent)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4A84F]/15 hover:bg-[#D4A84F]/30 border border-[#D4A84F]/40 text-[#F5D58A] text-xs font-semibold tracking-wide transition-all cursor-pointer flex-shrink-0"
              >
                <span>Full Event Details</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 9-Dot Carousel Pagination */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {FESTIVAL_EVENTS.map((evt) => {
          const isCurrent = evt.day === activeDay;
          return (
            <button
              key={evt.day}
              id={`carousel-dot-day-${evt.day}`}
              onClick={() => onSelectDay(evt.day)}
              className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-bold ${
                isCurrent
                  ? 'w-7 h-5 bg-[#D4A84F] text-[#061426] shadow-[0_0_10px_rgba(212,168,79,0.6)]'
                  : 'w-2.5 h-2.5 bg-[#142B4F] text-transparent hover:bg-[#D4A84F]/50'
              }`}
              title={`Day ${evt.day}: ${evt.navadurga.name}`}
              aria-label={`Jump to Day ${evt.day}`}
            >
              {isCurrent && evt.day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

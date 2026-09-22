import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Clock, Flame, MapPin, Sparkles, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { FestivalEvent } from '../../types';

interface HeroEventCardProps {
  event: FestivalEvent;
  onViewDetails: (event: FestivalEvent) => void;
}

/**
 * The active event, presented for the Home hero. Scaled for responsive
 * desktop & mobile viewing with click to open/close accordion toggle.
 */
export const HeroEventCard: React.FC<HeroEventCardProps> = ({ event, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <article className="hero-event-card" aria-labelledby="hero-event-title" aria-live="polite">
      {/* Header bar with Click-to-Open/Close toggle */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#D4A84F]/20 mb-1">
        <button
          id={`btn-toggle-hero-card-day-${event.day}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between gap-2 text-left cursor-pointer group py-0.5"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close event card" : "Open event card"}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[#D4A84F] text-[10px] sm:text-xs font-bold uppercase tracking-wider font-manrope whitespace-nowrap">
              ✦ Day {event.day}
            </span>
            <span className="text-[#F8F2E3]/50 text-[10px] sm:text-xs">·</span>
            <span className="text-[#F5D58A] text-[11px] sm:text-xs font-semibold truncate font-heading">
              {event.title}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4A84F]/15 border border-[#D4A84F]/35 text-[9.5px] sm:text-[11px] font-bold text-[#F5D58A] group-hover:bg-[#D4A84F]/25 transition-all shrink-0">
            <span>{isOpen ? 'Close' : 'Open'}</span>
            {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`hero-body-${event.day}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="hero-event-card__body pt-2">
              <p className="hero-event-card__date">
                Day {event.day} · {event.date}
              </p>

              <h2 id="hero-event-title" className="hero-event-card__title">
                {event.title}
              </h2>

              <p className="hero-event-card__virtues">
                <Sparkles aria-hidden="true" />
                <span>{event.navadurga.virtues}</span>
              </p>

              <p className="hero-event-card__tagline">“{event.tagline}”</p>

              <ul className="hero-event-card__meta">
                <li>
                  <Clock aria-hidden="true" />
                  <span>{event.time}</span>
                </li>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>{event.location}</span>
                </li>
                <li>
                  <Users aria-hidden="true" />
                  <span>{event.entryType.split('·')[0].trim()}</span>
                </li>
              </ul>

              <div className="hero-event-card__actions">
                <button
                  id={`btn-hero-view-details-day-${event.day}`}
                  type="button"
                  onClick={() => onViewDetails(event)}
                  className="hero-event-card__cta"
                >
                  <span>View Event Details</span>
                  <ArrowRight aria-hidden="true" />
                </button>

                {event.day === 10 && (
                  <span className="hero-event-card__badge">
                    <Flame aria-hidden="true" />
                    Vijayadashami Grand Finale
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

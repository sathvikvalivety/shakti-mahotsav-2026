import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Clock, Flame, MapPin, Sparkles, Users } from 'lucide-react';
import { FestivalEvent } from '../../types';

interface HeroEventCardProps {
  event: FestivalEvent;
  onViewDetails: (event: FestivalEvent) => void;
}

/**
 * The active event, presented for the Home hero. Same data as the lineup's
 * CenterEventInfo card, but its type and spacing scale with the hero height
 * (see .hero-event-card in home-hero.css) so it always fits beside the goddess.
 * It stays anchored: only its content crossfades when the active day changes.
 */
export const HeroEventCard: React.FC<HeroEventCardProps> = ({ event, onViewDetails }) => (
  <article className="hero-event-card" aria-labelledby="hero-event-title" aria-live="polite">
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={event.day}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="hero-event-card__body"
      >
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
      </motion.div>
    </AnimatePresence>
  </article>
);

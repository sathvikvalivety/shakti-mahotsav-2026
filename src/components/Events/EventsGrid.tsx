import React, { useState } from 'react';
import { SHAKTI_FESTIVAL_EVENTS, ShaktiFestivalEvent } from '../../data/shaktiEvents';
import { EventCard } from './EventCard';
import { ShaktiEventDetailModal } from './ShaktiEventDetailModal';
import { LotusIcon } from '../icons/FestivalIcons';

interface EventsGridProps {
  events?: ShaktiFestivalEvent[];
  className?: string;
}

/** Thin gold line with a small lotus in the middle */
const LotusDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-2.5 text-[#C49746] ${className}`} aria-hidden="true">
    <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C49746]/60 sm:w-20" />
    <LotusIcon className="h-3.5 w-3.5" />
    <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C49746]/60 sm:w-20" />
  </div>
);

export const EventsGrid: React.FC<EventsGridProps> = ({
  events = SHAKTI_FESTIVAL_EVENTS,
  className = '',
}) => {
  const [selectedEvent, setSelectedEvent] = useState<ShaktiFestivalEvent | null>(null);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState<number>(0);

  const handleOpenDetail = (event: ShaktiFestivalEvent, initialImageIndex = 0) => {
    setSelectedEvent(event);
    setLightboxInitialIndex(initialImageIndex);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <section
      id="shakti-events-section"
      aria-labelledby="shakti-events-heading"
      className={`relative scroll-mt-24 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 ${className}`}
    >
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3 select-none">
        {/* Top Tagline */}
        <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C49746]">
          10-Day Festival Guide
        </p>

        {/* Section Heading */}
        <h2
          id="shakti-events-heading"
          className="font-cormorant font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF6EE] leading-tight"
        >
          Shakti Mahotsav 2026
        </h2>

        {/* Lotus Divider */}
        <LotusDivider className="my-2" />

        {/* Subtitle */}
        <p className="font-sourceserif italic text-[15px] sm:text-[17px] text-[#DDD3C1]/85 max-w-2xl mx-auto leading-relaxed">
          Ten sacred days celebrating cultural confluence, folk heritage, classical arts, and collegiate harmony.
        </p>
      </div>

      {/* 2-Column × 5-Row Responsive Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 items-stretch">
        {events.map((event, index) => (
          <div key={event.id || event.day} className="h-full">
            <EventCard
              event={event}
              index={index}
              onExplore={handleOpenDetail}
            />
          </div>
        ))}
      </div>

      {/* Accessible Editorial Detail Modal / Lightbox */}
      <ShaktiEventDetailModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={handleCloseDetail}
        initialImageIndex={lightboxInitialIndex}
      />
    </section>
  );
};

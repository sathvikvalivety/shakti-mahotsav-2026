import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ShaktiFestivalEvent } from '../../data/shaktiEvents';
import { EventGallery } from './EventGallery';

interface EventCardProps {
  event: ShaktiFestivalEvent;
  onExplore: (event: ShaktiFestivalEvent, initialImageIndex?: number) => void;
  index?: number;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onExplore,
  index = 0,
}) => {
  const {
    day,
    title,
    tagline,
    subtitle,
    description,
    highlights = [],
    images = [],
    imagePositions,
    date,
    timing,
    location,
  } = event;

  const formattedDay = String(day).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full rounded-2xl bg-[#0F1219]/95 border border-[#C49746]/20 hover:border-[#C49746]/45 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden"
    >
      {/* 1. Header: Editorial Day / Date on Left & Cultural Phrase on Right */}
      <div className="px-5 sm:px-7 pt-5 pb-3.5 border-b border-[#C49746]/15 flex items-center justify-between gap-4">
        {/* Left: DAY 01 & Date */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="font-manrope font-semibold text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C49746]">
            DAY {formattedDay}
          </span>
          {date && (
            <>
              <span className="text-[#C49746]/35 text-xs">|</span>
              <span className="font-manrope text-[11px] sm:text-xs text-[#E8DFD1]/65 font-normal">
                {date.split(',')[0]}
              </span>
            </>
          )}
        </div>

        {/* Right: Cultural Phrase / Tagline */}
        <div className="text-right">
          <span className="font-manrope uppercase tracking-[0.22em] text-[10.5px] sm:text-[11px] text-[#BF573B] font-medium">
            {tagline}
          </span>
        </div>
      </div>

      {/* 2. Card Body with Generous Breathing Room */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        {/* Title, Category Eyebrow & Description */}
        <div className="space-y-2">
          {subtitle && (
            <p className="font-manrope text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.25em] text-[#BF573B]">
              {subtitle}
            </p>
          )}

          <h3 className="font-cormorant font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#FAF6EE] group-hover:text-[#F7F2E7] transition-colors leading-[1.12]">
            {title}
          </h3>

          <p className="font-sourceserif text-[13.5px] sm:text-[14.5px] text-[#DDD3C1]/85 leading-relaxed pt-1">
            {description}
          </p>
        </div>

        {/* 3. Curated Image Collage */}
        <div className="my-0.5">
          <EventGallery
            images={images}
            imagePositions={imagePositions}
            title={title}
            day={day}
            onOpenLightbox={(initialIndex) => onExplore(event, initialIndex)}
          />
        </div>

        {/* 4. Key Programs (Clean Editorial Numbered Treatment) */}
        {highlights.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-[#C49746]/15">
            <p className="font-manrope text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C49746]/90">
              KEY PROGRAMS
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-manrope text-xs text-[#E8DFD1]/85">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-[#BF573B] font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#FAF6EE]/90">{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Bottom Info & Editorial Explore CTA */}
        <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#C49746]/15">
          {/* Left: Time & Location */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-manrope text-[11px] text-[#E8DFD1]/65 uppercase tracking-wider">
            {timing && <span>{timing.split('–')[0].trim()}</span>}
            {timing && location && <span className="text-[#C49746]/40">·</span>}
            {location && <span>{location}</span>}
          </div>

          {/* Right: Clean Editorial Button */}
          <button
            type="button"
            onClick={() => onExplore(event)}
            className="group/btn inline-flex items-center gap-1.5 font-manrope font-semibold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#E6C27A] hover:text-[#FAF6EE] transition-colors cursor-pointer py-1"
            aria-label={`Explore details for Day ${day} — ${title}`}
          >
            <span>EXPLORE DAY</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1 text-[#C49746]" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

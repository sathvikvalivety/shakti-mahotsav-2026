import React from 'react';
import { Sparkles } from 'lucide-react';

interface EventGalleryProps {
  images: string[];
  title: string;
  day: number;
  onOpenLightbox?: (initialIndex: number) => void;
  className?: string;
}

export const EventGallery: React.FC<EventGalleryProps> = ({
  images = [],
  title,
  day,
  onOpenLightbox,
  className = '',
}) => {
  const count = images.length;

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenLightbox) {
      onOpenLightbox(index);
    }
  };

  // State 0: Zero images placeholder (tasteful festival heritage treatment)
  if (count === 0) {
    return (
      <div
        className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#10131A] border border-[#C49746]/20 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        {/* Subtle mandala background linework */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-40 h-40 text-[#C49746] fill-none">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
            <path d="M50 4 L50 96 M4 50 L96 50 M17 17 L83 83 M17 83 L83 17" stroke="currentColor" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="relative z-10 space-y-2">
          <div className="w-10 h-10 rounded-full mx-auto bg-[#C49746]/10 border border-[#C49746]/30 flex items-center justify-center text-[#E6C27A]">
            <Sparkles size={16} className="text-[#C49746]" />
          </div>
          <p className="font-cormorant text-lg sm:text-xl font-semibold text-[#F7F2E7] tracking-wide">
            Consecration &amp; Sacred Vandana
          </p>
          <p className="font-manrope text-[11px] text-[#E8DFD1]/70 max-w-xs mx-auto">
            Ceremonial blessings across university campus departments · Day {day}
          </p>
        </div>
      </div>
    );
  }

  // State 1: One large hero image
  if (count === 1) {
    return (
      <div
        className={`relative w-full aspect-[16/9] sm:aspect-[16/9.5] rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer ${className}`}
        onClick={(e) => handleImageClick(0, e)}
        role="button"
        tabIndex={0}
        aria-label={`View photo for ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageClick(0, e as unknown as React.MouseEvent);
          }
        }}
      >
        <img
          src={images[0]}
          alt={`${title} - Photo`}
          className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
    );
  }

  // State 2: Two balanced side-by-side images
  if (count === 2) {
    return (
      <div className={`grid grid-cols-2 gap-2.5 sm:gap-3 w-full aspect-[16/9] sm:aspect-[16/9.5] ${className}`}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
            onClick={(e) => handleImageClick(idx, e)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 1} of 2 for ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(idx, e as unknown as React.MouseEvent);
              }
            }}
          >
            <img
              src={img}
              alt={`${title} - Photo ${idx + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  }

  // State 3: Curated 3-image collage
  // Desktop: Large dominant image (~58-60% width) + 2 stacked images (40-42%)
  // Mobile: Large hero on top + 2 side-by-side images underneath
  if (count === 3) {
    return (
      <div className={`w-full ${className}`}>
        {/* Desktop & Tablet Layout (sm and up) */}
        <div className="hidden sm:grid grid-cols-12 gap-2.5 sm:gap-3 w-full aspect-[16/9.5]">
          {/* Dominant Hero Image (7 cols ~ 58.3%) */}
          <div
            className="col-span-7 h-full relative rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
            onClick={(e) => handleImageClick(0, e)}
            role="button"
            tabIndex={0}
            aria-label={`View primary photo for ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(0, e as unknown as React.MouseEvent);
              }
            }}
          >
            <img
              src={images[0]}
              alt={`${title} - Primary visual`}
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity duration-300" />
          </div>

          {/* 2 Supporting Stacked Images (5 cols ~ 41.7%) */}
          <div className="col-span-5 grid grid-rows-2 gap-2.5 sm:gap-3 h-full">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx + 1}
                className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
                onClick={(e) => handleImageClick(idx + 1, e)}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${idx + 2} for ${title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(idx + 1, e as unknown as React.MouseEvent);
                  }
                }}
              >
                <img
                  src={img}
                  alt={`${title} - Photo ${idx + 2}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout (<sm): Hero on top + 2 side-by-side underneath */}
        <div className="sm:hidden space-y-2 w-full">
          <div
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
            onClick={(e) => handleImageClick(0, e)}
            role="button"
            tabIndex={0}
            aria-label={`View primary photo for ${title}`}
          >
            <img
              src={images[0]}
              alt={`${title} - Primary visual`}
              className="w-full h-full object-cover object-[center_28%]"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full aspect-[16/7]">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx + 1}
                className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
                onClick={(e) => handleImageClick(idx + 1, e)}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${idx + 2} for ${title}`}
              >
                <img
                  src={img}
                  alt={`${title} - Photo ${idx + 2}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // State 4: Balanced 2 × 2 editorial grid
  if (count === 4) {
    return (
      <div className={`grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 w-full aspect-[16/9] sm:aspect-[16/9.5] ${className}`}>
        {images.slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
            onClick={(e) => handleImageClick(idx, e)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 1} of 4 for ${title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(idx, e as unknown as React.MouseEvent);
              }
            }}
          >
            <img
              src={img}
              alt={`${title} - Photo ${idx + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  }

  // State 5+: Dominant hero or 4-image grid with refined editorial "+N MORE" overlay
  const extraCount = count - 4;
  return (
    <div className={`grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 w-full aspect-[16/9] sm:aspect-[16/9.5] ${className}`}>
      {images.slice(0, 3).map((img, idx) => (
        <div
          key={idx}
          className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/20 group cursor-pointer"
          onClick={(e) => handleImageClick(idx, e)}
          role="button"
          tabIndex={0}
          aria-label={`View photo ${idx + 1} of ${count} for ${title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleImageClick(idx, e as unknown as React.MouseEvent);
            }
          }}
        >
          <img
            src={img}
            alt={`${title} - Photo ${idx + 1}`}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
      ))}

      {/* 4th image with quiet editorial overlay */}
      <div
        className="relative h-full rounded-xl overflow-hidden bg-[#0D1017] border border-[#C49746]/25 group cursor-pointer"
        onClick={(e) => handleImageClick(3, e)}
        role="button"
        tabIndex={0}
        aria-label={`View all ${count} photos for ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageClick(3, e as unknown as React.MouseEvent);
          }
        }}
      >
        <img
          src={images[3]}
          alt={`${title} - Photo 4`}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* Refined editorial overlay */}
        <div className="absolute inset-0 bg-[#0E1118]/75 backdrop-blur-[1.5px] flex flex-col items-center justify-center text-center p-2 group-hover:bg-[#0E1118]/60 transition-colors">
          <span className="font-manrope font-semibold text-xs sm:text-sm text-[#F7F2E7] tracking-widest uppercase">
            +{extraCount + 1} More
          </span>
          <span className="font-manrope text-[9px] sm:text-[10px] text-[#C49746] tracking-wider uppercase mt-0.5">
            View Gallery
          </span>
        </div>
      </div>
    </div>
  );
};

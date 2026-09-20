import React from 'react';

interface HangingOrnamentsProps {
  className?: string;
}

export const HangingOrnaments: React.FC<HangingOrnamentsProps> = ({ className = '' }) => {
  return (
    <div
      id="hanging-ornaments-layer"
      className={`absolute top-0 left-0 right-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-full flex justify-between px-4 sm:px-8 md:px-14 lg:px-20 max-w-7xl mx-auto">
        {/* Left corner hanging ornaments cascade */}
        <div className="flex gap-4 sm:gap-7 md:gap-9 origin-top animate-ornament-sway" style={{ animationDuration: '9s' }}>
          {/* Strut 1: Short with lotus & droplet */}
          <div className="flex flex-col items-center">
            {/* Thread */}
            <div className="w-[1px] h-12 sm:h-20 md:h-28 bg-gradient-to-b from-[#D4A84F]/50 via-[#D4A84F]/30 to-[#F5D58A]" />
            {/* Lotus charm */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5D58A] opacity-75 -mt-0.5">
              <path
                d="M12 3 C10 8 5 11 3 15 C7 16 11 14 12 18 C13 14 17 16 21 15 C19 11 14 8 12 3 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="12" cy="11" r="1.5" fill="currentColor" />
            </svg>
            <div className="w-[1px] h-4 sm:h-6 bg-[#D4A84F]/40" />
            {/* Small golden diamond bead */}
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-[#F5D58A] bg-[#D4A84F]/40 shadow-[0_0_4px_#D4A84F]" />
          </div>

          {/* Strut 2: Long with sacred geometric tiers */}
          <div className="flex flex-col items-center animate-ornament-float-gentle" style={{ animationDuration: '6s', animationDelay: '0.8s' }}>
            <div className="w-[1px] h-20 sm:h-32 md:h-44 bg-gradient-to-b from-[#D4A84F]/40 via-[#D4A84F]/35 to-[#F5D58A]" />
            {/* Mini chakra circle */}
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-[#F5D58A]/80 flex items-center justify-center opacity-80">
              <div className="w-1 h-1 rounded-full bg-[#F5D58A]" />
            </div>
            <div className="w-[1px] h-5 sm:h-8 bg-[#D4A84F]/40" />
            {/* Bell/Ghungroo ornament */}
            <svg width="20" height="20" viewBox="0 0 20 20" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5D58A] opacity-80">
              <path
                d="M10 2 C7 2 5 7 5 11 C5 14 6 15 10 16 C14 15 15 14 15 11 C15 7 13 2 10 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <circle cx="10" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Strut 3: Medium (visible on sm+) */}
          <div className="hidden sm:flex flex-col items-center animate-ornament-float-gentle" style={{ animationDuration: '7.5s', animationDelay: '1.4s' }}>
            <div className="w-[1px] h-14 md:h-24 bg-gradient-to-b from-[#D4A84F]/30 via-[#D4A84F]/25 to-[#F5D58A]" />
            <div className="w-2 h-2 rotate-45 border border-[#D4A84F] bg-[#F5D58A]/30" />
            <div className="w-[1px] h-3 bg-[#D4A84F]/40" />
            <div className="w-1 h-1 rounded-full bg-[#F5D58A]/90 shadow-[0_0_3px_#F5D58A]" />
          </div>
        </div>

        {/* Center top subtle toran / sacred garland arch motif */}
        <div className="hidden md:flex flex-col items-center pt-0 opacity-40">
          <svg width="260" height="36" viewBox="0 0 260 36" fill="none" className="text-[#D4A84F]">
            {/* Delicate scallop garland line */}
            <path
              d="M 0 0 Q 32 20, 65 6 Q 97 20, 130 6 Q 162 20, 195 6 Q 227 20, 260 0"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
            {/* Tiny hanging dots along arches */}
            <circle cx="32" cy="18" r="1.5" fill="#F5D58A" />
            <circle cx="97" cy="18" r="1.5" fill="#F5D58A" />
            <circle cx="162" cy="18" r="1.5" fill="#F5D58A" />
            <circle cx="227" cy="18" r="1.5" fill="#F5D58A" />
            {/* Center miniature lotus motif */}
            <path
              d="M 130 10 C 126 14 122 17 120 22 C 124 22 128 20 130 24 C 132 20 136 22 140 22 C 138 17 134 14 130 10 Z"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
            />
          </svg>
        </div>

        {/* Right corner hanging ornaments cascade (mirrored) */}
        <div className="flex gap-4 sm:gap-7 md:gap-9 origin-top animate-ornament-sway" style={{ animationDuration: '9.5s', animationDelay: '-3s' }}>
          {/* Strut 3: Medium (visible on sm+) */}
          <div className="hidden sm:flex flex-col items-center animate-ornament-float-gentle" style={{ animationDuration: '8s', animationDelay: '1.2s' }}>
            <div className="w-[1px] h-16 md:h-26 bg-gradient-to-b from-[#D4A84F]/30 via-[#D4A84F]/25 to-[#F5D58A]" />
            <div className="w-2 h-2 rotate-45 border border-[#D4A84F] bg-[#F5D58A]/30" />
            <div className="w-[1px] h-3 bg-[#D4A84F]/40" />
            <div className="w-1 h-1 rounded-full bg-[#F5D58A]/90 shadow-[0_0_3px_#F5D58A]" />
          </div>

          {/* Strut 2: Long with bell & chakra */}
          <div className="flex flex-col items-center animate-ornament-float-gentle" style={{ animationDuration: '6.5s', animationDelay: '0.4s' }}>
            <div className="w-[1px] h-20 sm:h-32 md:h-44 bg-gradient-to-b from-[#D4A84F]/40 via-[#D4A84F]/35 to-[#F5D58A]" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-[#F5D58A]/80 flex items-center justify-center opacity-80">
              <div className="w-1 h-1 rounded-full bg-[#F5D58A]" />
            </div>
            <div className="w-[1px] h-5 sm:h-8 bg-[#D4A84F]/40" />
            <svg width="20" height="20" viewBox="0 0 20 20" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5D58A] opacity-80">
              <path
                d="M10 2 C7 2 5 7 5 11 C5 14 6 15 10 16 C14 15 15 14 15 11 C15 7 13 2 10 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <circle cx="10" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Strut 1: Short with lotus charm */}
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-12 sm:h-20 md:h-28 bg-gradient-to-b from-[#D4A84F]/50 via-[#D4A84F]/30 to-[#F5D58A]" />
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5D58A] opacity-75 -mt-0.5">
              <path
                d="M12 3 C10 8 5 11 3 15 C7 16 11 14 12 18 C13 14 17 16 21 15 C19 11 14 8 12 3 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="12" cy="11" r="1.5" fill="currentColor" />
            </svg>
            <div className="w-[1px] h-4 sm:h-6 bg-[#D4A84F]/40" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-[#F5D58A] bg-[#D4A84F]/40 shadow-[0_0_4px_#D4A84F]" />
          </div>
        </div>
      </div>
    </div>
  );
};

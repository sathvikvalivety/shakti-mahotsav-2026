import React from 'react';
import {
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { MoonPhaseGraphic } from './MoonPhaseGraphic';
import { FestivalEvent } from '../types';

interface CulturalNightCardProps {
  event?: FestivalEvent;
  className?: string;
  onBookPass?: () => void;
}

export const CulturalNightCard: React.FC<CulturalNightCardProps> = ({
  event,
  className = '',
  onBookPass,
}) => {
  const dayNumber = event?.day || 1;
  const title = event?.title.toUpperCase() || 'SRI BALA TRIPURA SUNDARI DEVI';
  const subtitle = event?.subTitle?.toUpperCase() || event?.navadurga.title.toUpperCase() || 'THE YOUTHFUL DIVINE BEAUTY';
  const dateStr = event?.date.toUpperCase() || 'OCTOBER 11, 2026';
  const dayOfWeek = event?.dayOfWeek || 'Sunday';
  const timeStr = event?.time || 'After 4:00 PM';
  const locationTitle = event?.location.toUpperCase() || 'NEAR FLAG POLE';
  const locationSub = event?.category || 'Alankaram';
  const dressCode = event?.dressCode || 'Light Pink / Silk Traditional Attire';
  
  const aboutText = event?.description || 'Sri Bala Tripura Sundari Devi represents the divine innocence, beauty, and youthful radiance of Shakti, embodying purity, grace, and spiritual awakening.';

  const heroImage = event?.image || 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%201.png';

  const lunarPhaseType = event?.lunarPhase.type || 'new';
  const lunarPhaseName = event?.lunarPhase.phaseName.toUpperCase() || 'NEW MOON';

  const deityName = event?.navadurga.name.toUpperCase() || 'SRI BALA TRIPURA SUNDARI DEVI';
  const deityTitle = event?.navadurga.title.toUpperCase() || 'THE YOUTHFUL DIVINE BEAUTY';
  const deityDescription = event?.navadurga.significance || 'Bala Tripura Sundari is revered as the youthful manifestation of the Divine Mother, symbolizing pure and radiant consciousness, spiritual awakening, and divine grace.';

  const attractions = (event?.highlights || [
    'Saree Colour: Light Pink',
    'Naivedyam: Sweet Boondi and Chickpeas (Senagalu)',
    'Alankaram Darshanam after 4:00 PM',
    'Special Sahasranama Archana'
  ]).map((h, i) => ({
    symbol: ['❖', '✦', '❀', '✺'][i % 4],
    title: h,
    desc: h.includes('Saree') ? 'Sacred Alankaram Color' : h.includes('Naivedyam') ? 'Prasadam Offering' : 'Sacred Ritual / Darshan',
  }));

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* =========================================================================
          MAIN CARD CONTAINER: 
          - Dark translucent navy surface (#06152D / #081B36)
          - Thin antique-gold border (#D4A84F)
          - Edge glow & 18-20px rounded corners
          - Corner Mandala fragments
      ========================================================================= */}
      <div className="relative rounded-[18px] bg-gradient-to-b from-[#081B36]/95 via-[#06152D]/95 to-[#040E1E]/98 border border-[#D4A84F]/40 shadow-[0_0_40px_rgba(212,168,79,0.12),0_20px_50px_-10px_rgba(2,8,23,0.85)] backdrop-blur-xl overflow-hidden select-none">
        
        {/* Subtle Decorative Gold Mandala Corner Fragments */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-35 z-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4A84F] fill-none">
            <path d="M 0 0 L 0 50 A 50 50 0 0 0 50 0 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 0 0 L 0 32 A 32 32 0 0 0 32 0 Z" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="35" y2="35" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="35" cy="35" r="2" fill="#F5D58A" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-35 z-20 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4A84F] fill-none">
            <path d="M 0 0 L 0 50 A 50 50 0 0 0 50 0 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 0 0 L 0 32 A 32 32 0 0 0 32 0 Z" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="35" y2="35" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="35" cy="35" r="2" fill="#F5D58A" />
          </svg>
        </div>

        {/* =========================================================================
            TOP HERO (COMPACT & BALANCED):
            - Wide photographic cultural concert image
            - Smooth dark navy gradient blending into card
            - Overlays: Night & phase pill, Title, Subtitle & Quote
        ========================================================================= */}
        <div className="relative w-full h-40 sm:h-48 overflow-hidden">
          <img
            src={heroImage}
            alt={`${title} - Shakti Mahotsav 2026`}
            className="w-full h-full object-cover object-[center_20%] scale-[1.02]"
          />

          {/* Deep Navy Gradient Blends */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06152D] via-[#06152D]/60 via-45% to-[#081B36]/30" />

          {/* Top Floating Badge Row */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06152D]/85 border border-[#D4A84F]/60 backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D58A] animate-pulse" />
              <span className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#F5D58A] uppercase">
                NIGHT {dayNumber}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4A84F]/50" />
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <MoonPhaseGraphic
                    phase={{ phaseName: lunarPhaseName, illumination: 0.75, type: lunarPhaseType as any }}
                    isActive={true}
                    size={14}
                  />
                </div>
                <span className="font-sans text-[10px] font-semibold tracking-wider text-[#FFF4D6]/90 uppercase">
                  {lunarPhaseName}
                </span>
              </div>
            </div>

            {/* Right Quote */}
            <p className="hidden sm:block font-garamond italic text-[11px] text-[#FFF4D6]/80 text-right leading-tight max-w-[180px] drop-shadow">
              “Where tradition meets the present, culture lights the way.”
            </p>
          </div>

          {/* Bottom Hero Overlay: Title & Subtitle */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-center sm:text-left">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wider text-[#FFF4D6] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-1">
              {title}
            </h1>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#F5D58A] uppercase drop-shadow">
              <span className="hidden sm:inline-block w-4 h-[1px] bg-[#D4A84F]" />
              <span>{subtitle}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INNER CARD CONTENT
        ========================================================================= */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* =======================================================================
              DEITY SECTION: MAA KUSHMANDA
              - Refined framed section
              - Left: circular gold sacred-geometry illustration
              - Right: title, subtitle, and philosophical significance
          ======================================================================= */}
          <div className="relative rounded-xl bg-gradient-to-r from-[#081B36]/80 via-[#102B50]/50 to-[#081B36]/80 border border-[#D4A84F]/30 p-4 sm:p-4.5 backdrop-blur-md overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              
              {/* Left: Circular Gold Sacred-Geometry Illustration */}
              <div className="relative flex-shrink-0 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#D4A84F]/30 animate-spin-slow" />
                <div className="absolute inset-1 rounded-full border border-dashed border-[#F5D58A]/35 animate-spin-reverse-slow" />
                
                <svg viewBox="0 0 120 120" className="w-full h-full text-[#F5D58A] drop-shadow-[0_0_8px_rgba(212,168,79,0.4)]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line
                      key={i}
                      x1="60"
                      y1="60"
                      x2={60 + 54 * Math.cos((i * 22.5 * Math.PI) / 180)}
                      y2={60 + 54 * Math.sin((i * 22.5 * Math.PI) / 180)}
                      stroke="#D4A84F"
                      strokeWidth="0.75"
                      strokeOpacity="0.4"
                    />
                  ))}
                  <polygon
                    points="60,18 72,48 102,48 78,66 88,96 60,78 32,96 42,66 18,48 48,48"
                    fill="none"
                    stroke="#D4A84F"
                    strokeWidth="1.1"
                  />
                  <polygon
                    points="60,24 68,48 94,48 74,62 82,88 60,72 38,88 46,62 26,48 52,48"
                    fill="#F5D58A"
                    fillOpacity="0.12"
                    stroke="#F5D58A"
                    strokeWidth="0.8"
                  />
                  <circle cx="60" cy="60" r="22" fill="none" stroke="#F5D58A" strokeWidth="0.9" />
                  <circle cx="60" cy="60" r="13" fill="url(#kushmandaSunCoreCompact)" stroke="#FFF4D6" strokeWidth="0.8" />
                  <circle cx="60" cy="60" r="2.5" fill="#FFEAA0" />
                  <defs>
                    <radialGradient id="kushmandaSunCoreCompact" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF4D6" />
                      <stop offset="50%" stopColor="#F5D58A" />
                      <stop offset="90%" stopColor="#D4A84F" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Right: Deity Details */}
              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
                  <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#F5D58A]">
                    {deityName}
                  </h2>
                  <span className="hidden sm:inline text-[#D4A84F]/40">|</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#D4A84F] uppercase">
                    {deityTitle}
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#D4A84F]/50 my-1">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4A84F]" />
                  <span className="text-[9px] text-[#F5D58A]">❖</span>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4A84F] to-transparent" />
                </div>

                <p className="font-sans text-xs text-[#FFF4D6]/85 leading-relaxed">
                  {deityDescription}
                </p>
              </div>

            </div>
          </div>

          {/* =======================================================================
              EVENT INFORMATION:
              - Clean 4-column information row
              - Thin vertical gold separators (NO heavy boxes)
          ======================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 py-1">
            
            {/* Column 1: CALENDAR */}
            <div className="flex items-start gap-2.5 lg:pr-4 lg:border-r border-[#D4A84F]/25">
              <div className="w-7 h-7 rounded-full bg-[#102B50]/60 border border-[#D4A84F]/40 flex items-center justify-center text-[#F5D58A] flex-shrink-0">
                <CalendarIcon size={14} />
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#D4A84F] uppercase mb-0.5">
                  CALENDAR
                </span>
                <p className="font-cinzel text-xs font-bold text-[#FFF4D6] leading-tight">
                  {dateStr}
                </p>
                <p className="text-[10px] text-[#FFF4D6]/65">
                  {dayOfWeek}
                </p>
              </div>
            </div>

            {/* Column 2: CLOCK */}
            <div className="flex items-start gap-2.5 lg:px-4 lg:border-r border-[#D4A84F]/25">
              <div className="w-7 h-7 rounded-full bg-[#102B50]/60 border border-[#D4A84F]/40 flex items-center justify-center text-[#F5D58A] flex-shrink-0">
                <ClockIcon size={14} />
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#D4A84F] uppercase mb-0.5">
                  CLOCK
                </span>
                <p className="font-cinzel text-xs font-bold text-[#FFF4D6] leading-tight">
                  {timeStr}
                </p>
                <p className="text-[10px] text-[#FFF4D6]/65">
                  Doors open 45m prior
                </p>
              </div>
            </div>

            {/* Column 3: LOCATION */}
            <div className="flex items-start gap-2.5 lg:px-4 lg:border-r border-[#D4A84F]/25">
              <div className="w-7 h-7 rounded-full bg-[#102B50]/60 border border-[#D4A84F]/40 flex items-center justify-center text-[#F5D58A] flex-shrink-0">
                <MapPin size={14} />
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#D4A84F] uppercase mb-0.5">
                  LOCATION
                </span>
                <p className="font-cinzel text-xs font-bold text-[#FFF4D6] leading-tight">
                  {locationTitle}
                </p>
                <p className="text-[10px] text-[#FFF4D6]/65">
                  {locationSub}
                </p>
              </div>
            </div>

            {/* Column 4: DRESS CODE */}
            <div className="flex items-start gap-2.5 lg:pl-4">
              <div className="w-7 h-7 rounded-full bg-[#102B50]/60 border border-[#D4A84F]/40 flex items-center justify-center text-[#F5D58A] flex-shrink-0">
                <Sparkles size={14} />
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.18em] text-[#D4A84F] uppercase mb-0.5">
                  DRESS CODE
                </span>
                <p className="font-sans text-xs font-semibold text-[#FFF4D6] leading-snug">
                  {dressCode}
                </p>
              </div>
            </div>

          </div>

          {/* =======================================================================
              DESCRIPTION SECTION
          ======================================================================= */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A84F]" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#F5D58A] uppercase">
                ABOUT TONIGHT’S CELEBRATION
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#D4A84F]/30 to-transparent" />
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#FFF4D6]/85 leading-relaxed pl-3.5 border-l border-[#D4A84F]/30">
              {aboutText}
            </p>
          </div>

          {/* =======================================================================
              KEY ATTRACTIONS & SCHEDULE
          ======================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A84F]" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#F5D58A] uppercase">
                KEY ATTRACTIONS & SCHEDULE
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#D4A84F]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {attractions.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-gradient-to-br from-[#0B213F]/70 to-[#081B36]/85 border border-[#D4A84F]/25 p-3 hover:border-[#D4A84F]/50 transition-all shadow-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded bg-[#102B50] border border-[#D4A84F]/40 flex items-center justify-center text-xs font-serif font-bold text-[#F5D58A] flex-shrink-0">
                      {item.symbol}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-cinzel text-xs font-bold text-[#FFF4D6] tracking-wide leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[11px] text-[#FFF4D6]/65 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

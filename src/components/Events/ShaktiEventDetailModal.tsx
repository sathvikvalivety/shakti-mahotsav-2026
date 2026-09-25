import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShaktiFestivalEvent } from '../../data/shaktiEvents';

interface ShaktiEventDetailModalProps {
  event: ShaktiFestivalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  initialImageIndex?: number;
}

export const ShaktiEventDetailModal: React.FC<ShaktiEventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  initialImageIndex = 0,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(initialImageIndex);

  // Sync initial index when modal opens
  useEffect(() => {
    setActiveImgIndex(initialImageIndex);
  }, [initialImageIndex, event]);

  // Handle ESC key, arrow navigation, and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && event?.images?.length) {
        setActiveImgIndex((prev) => (prev + 1) % event.images.length);
      } else if (e.key === 'ArrowLeft' && event?.images?.length) {
        setActiveImgIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, event]);

  if (!isOpen || !event) return null;

  const images = event.images || [];
  const hasImages = images.length > 0;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-event-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020817]/90 backdrop-blur-md cursor-pointer"
          aria-label="Close modal backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl z-10 my-auto rounded-2xl bg-[#0E1118]/98 border border-[#C49746]/30 shadow-[0_12px_48px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col overflow-hidden text-[#FAF6EE]"
        >
          {/* Top Editorial Bar */}
          <div className="px-6 sm:px-8 py-4 border-b border-[#C49746]/15 flex items-center justify-between gap-4 bg-[#0A0D14]/80 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-manrope font-semibold text-xs uppercase tracking-[0.25em] text-[#C49746]">
                DAY {String(event.day).padStart(2, '0')}
              </span>
              <span className="text-[#C49746]/30">|</span>
              <span className="font-manrope text-[11px] sm:text-xs text-[#BF573B] uppercase tracking-[0.2em] font-medium">
                {event.tagline}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#E8DFD1]/70 hover:text-[#FAF6EE] hover:bg-[#C49746]/10 transition-colors cursor-pointer"
              aria-label="Close modal (Esc)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-7 flex-1">
            {/* Header Titles */}
            <div className="space-y-1.5">
              {event.subtitle && (
                <p className="font-manrope text-[10.5px] font-semibold uppercase tracking-[0.25em] text-[#BF573B]">
                  {event.subtitle}
                </p>
              )}

              <h2
                id="modal-event-title"
                className="font-cormorant font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAF6EE] leading-tight"
              >
                {event.title}
              </h2>

              <p className="font-sourceserif italic text-[15px] sm:text-base text-[#DDD3C1]/85 pt-1">
                {event.description}
              </p>
            </div>

            {/* Event Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-[#090C12] border border-[#C49746]/15 font-manrope text-xs text-[#E8DFD1]">
              {event.date && (
                <div className="flex items-start gap-2.5">
                  <Calendar size={14} className="text-[#C49746] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#E8DFD1]/50 block uppercase text-[9.5px] tracking-wider">Date</span>
                    <span className="font-medium text-[#FAF6EE]">{event.date}</span>
                  </div>
                </div>
              )}
              {event.timing && (
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-[#C49746] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#E8DFD1]/50 block uppercase text-[9.5px] tracking-wider">Timing</span>
                    <span className="font-medium text-[#FAF6EE]">{event.timing}</span>
                  </div>
                </div>
              )}
              {event.location && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-[#C49746] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#E8DFD1]/50 block uppercase text-[9.5px] tracking-wider">Location</span>
                    <span className="font-medium text-[#FAF6EE]">{event.location}</span>
                  </div>
                </div>
              )}
              {event.participation && (
                <div className="flex items-start gap-2.5">
                  <Users size={14} className="text-[#C49746] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#E8DFD1]/50 block uppercase text-[9.5px] tracking-wider">Participation</span>
                    <span className="font-medium text-[#FAF6EE]">{event.participation}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Photo Grid */}
            {hasImages && (
              <div className="space-y-2">
                {/* Label */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C49746] shrink-0" />
                  <p className="font-manrope text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C49746]">
                    Event Gallery
                  </p>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#C49746]/30 to-transparent" />
                </div>

                {/* 1 image — full width */}
                {images.length === 1 && (
                  <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-[#C49746]/20">
                    <img src={images[0]} alt={`${event.title} — 1`} className="w-full h-full object-cover object-top" />
                  </div>
                )}

                {/* 2 images — side by side */}
                {images.length === 2 && (
                  <div className="grid grid-cols-2 gap-2 h-64 sm:h-80">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImgIndex === idx ? 'border-[#C49746]' : 'border-transparent hover:border-[#C49746]/50'}`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img src={img} alt={`${event.title} — ${idx + 1}`} className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                )}

                {/* 3 images — 1 large left + 2 stacked right */}
                {images.length === 3 && (
                  <div className="grid grid-cols-3 gap-2 h-64 sm:h-80 md:h-[360px]">
                    <button
                      onClick={() => setActiveImgIndex(0)}
                      className={`col-span-2 relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImgIndex === 0 ? 'border-[#C49746]' : 'border-transparent hover:border-[#C49746]/50'}`}
                      aria-label="View photo 1"
                    >
                      <img src={images[0]} alt={`${event.title} — 1`} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </button>
                    <div className="flex flex-col gap-2">
                      {images.slice(1).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIndex(idx + 1)}
                          className={`flex-1 relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImgIndex === idx + 1 ? 'border-[#C49746]' : 'border-transparent hover:border-[#C49746]/50'}`}
                          aria-label={`View photo ${idx + 2}`}
                        >
                          <img src={img} alt={`${event.title} — ${idx + 2}`} className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4+ images — large featured + scrollable row below */}
                {images.length >= 4 && (
                  <div className="space-y-2">
                    {/* Featured */}
                    <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-[#C49746]/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImgIndex}
                          src={images[activeImgIndex]}
                          alt={`${event.title} — ${activeImgIndex + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full object-cover object-top"
                        />
                      </AnimatePresence>
                      {/* nav arrows */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveImgIndex((p) => (p - 1 + images.length) % images.length); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#C49746] hover:text-[#0A0D14] transition-colors cursor-pointer"
                        aria-label="Previous image"
                      ><ChevronLeft size={18} /></button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveImgIndex((p) => (p + 1) % images.length); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#C49746] hover:text-[#0A0D14] transition-colors cursor-pointer"
                        aria-label="Next image"
                      ><ChevronRight size={18} /></button>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 font-manrope text-[11px] text-white tracking-wider">
                        {activeImgIndex + 1} / {images.length}
                      </div>
                    </div>
                    {/* Strip */}
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIndex(idx)}
                          className={`relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activeImgIndex === idx ? 'border-[#C49746]' : 'border-transparent opacity-55 hover:opacity-90 hover:border-[#C49746]/40'}`}
                          aria-label={`View photo ${idx + 1}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expanded view of active image (click any grid photo to see it large) */}
                {images.length > 1 && images.length <= 3 && (
                  <AnimatePresence>
                    {activeImgIndex !== null && (
                      <motion.div
                        key={activeImgIndex}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden rounded-xl"
                      >
                        <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#C49746]/30">
                          <img
                            src={images[activeImgIndex]}
                            alt={`${event.title} — expanded`}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 font-manrope text-[11px] text-white">
                            Photo {activeImgIndex + 1} of {images.length}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )}

            {/* Cultural Context */}
            {event.culturalContext && (
              <div className="p-5 rounded-xl bg-[#090C12] border border-[#C49746]/20 space-y-1.5">
                <p className="font-manrope text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C49746]">
                  Cultural Ethos &amp; Significance
                </p>
                <p className="font-sourceserif text-[14px] sm:text-[15px] text-[#DDD3C1]/90 leading-relaxed">
                  {event.culturalContext}
                </p>
              </div>
            )}

            {/* Detailed Programs */}
            <div className="space-y-3">
              <h3 className="font-cormorant font-bold text-2xl text-[#FAF6EE]">
                Festival Programs &amp; Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.programs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#090C12] border border-[#C49746]/15 space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-manrope font-semibold text-sm text-[#FAF6EE] flex items-center gap-2">
                        <span className="text-xs text-[#BF573B] font-mono">{String(idx + 1).padStart(2, '0')}</span>
                        <span>{item.name}</span>
                      </span>
                      {item.category && (
                        <span className="font-manrope text-[10px] font-medium text-[#C49746] uppercase tracking-wider">
                          {item.category}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="font-sourceserif text-xs sm:text-[13px] text-[#DDD3C1]/75 leading-relaxed pl-6">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#C49746]/15 flex items-center justify-between gap-4 bg-[#0A0D14]/90 shrink-0">
            <span className="font-manrope text-[11px] text-[#E8DFD1]/55 hidden sm:inline">
              Amrita Vishwa Vidyapeetham · Shakti Mahotsav 2026
            </span>

            <button
              onClick={onClose}
              className="ml-auto px-5 py-1.5 rounded-lg border border-[#C49746]/40 hover:border-[#C49746] text-[#FAF6EE] hover:text-[#E6C27A] font-manrope font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

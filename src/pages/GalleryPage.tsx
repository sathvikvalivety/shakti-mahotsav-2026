import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FestivalBackground } from '../components/FestivalBackground/FestivalBackground';

const BASE = 'https://ik.imagekit.io/2ecf22k5j/shakti%20mahotsav';

interface GalleryItem {
  id: number;
  title: string;
  img: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1,  title: 'Midnight Garba Circles',         img: `${BASE}/1.png`  },
  { id: 2,  title: 'Circle of Devotion',              img: `${BASE}/2.png`  },
  { id: 3,  title: 'Rang de Basanti Garba',           img: `${BASE}/3.png`  },
  { id: 4,  title: 'Dandia — A Sacred Rhythm',        img: `${BASE}/4.png`  },
  { id: 5,  title: 'Devi Alankaram & Floral Darshan', img: `${BASE}/5.png`  },
  { id: 6,  title: 'Classical Odissi Dance Recital',  img: `${BASE}/6.png`  },
  { id: 7,  title: 'Floral Mandala Offering',         img: `${BASE}/7.png`  },
  { id: 8,  title: 'Devi Shringar',                   img: `${BASE}/8.png`  },
  { id: 9,  title: 'Bharatanatyam on Sacred Soil',    img: `${BASE}/9.png`  },
  { id: 10, title: 'Panchaloha Idol Darshan',         img: `${BASE}/10.png` },
  { id: 11, title: 'Grand Maha Aarti',                img: `${BASE}/11.png` },
  { id: 12, title: 'Deepotsav — 10,000 Lamps',        img: `${BASE}/12.png` },
  // Row 5: wide(13) + portrait(15) = 3 cols
  { id: 13, title: 'Shodasha Upachara Puja',          img: `${BASE}/13.png` },
  { id: 15, title: 'Vijayadashami Procession',        img: `${BASE}/15.png` },
  // Row 6: wide(14) + portrait(16) = 3 cols
  { id: 14, title: 'Ksheerabdhi Dwadashi Aarti',      img: `${BASE}/14.png` },
  { id: 16, title: 'Sacred Celebration',              img: 'https://ik.imagekit.io/2ecf22k5j/16.png' },
];

const GalleryCard: React.FC<{
  item: GalleryItem;
  onClick: () => void;
  aspect?: string;
  objPos?: string;
}> = ({ item, onClick, aspect = 'aspect-[3/4]', objPos = 'object-center' }) => (
  <div
    onClick={onClick}
    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${aspect} bg-[#050E1D]`}
  >
    <img
      src={item.img}
      alt={item.title}
      loading="lazy"
      className={`absolute inset-0 w-full h-full object-cover ${objPos}
        transition-transform duration-700 ease-out group-hover:scale-105`}
    />
    {/* Subtle dark vignette — keeps corners grounded */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(2,8,23,0.55)_100%)]" />
    {/* Gold ring on hover */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent
      group-hover:ring-[#D4A84F]/50 transition-all duration-500 pointer-events-none" />
  </div>
);

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const total = GALLERY_ITEMS.length;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => prev === null ? null : (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => prev === null ? null : (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setLightboxIndex(null);
      if (e.key === 'ArrowLeft')  handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, handlePrev, handleNext]);

  const currentItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <div className="relative min-h-screen bg-[#020817] text-[#F8F2E3] overflow-x-clip">
      <FestivalBackground />

      {/* ── Sticky navbar ── */}
      <header className="hidden md:flex sticky top-0 z-40 w-full
        bg-[rgba(3,10,28,0.55)] backdrop-blur-md
        border-b border-[#D4A84F]/15 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center gap-4
          px-[clamp(14px,2.4vw,52px)]">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#E6C27A] hover:text-[#F5D58A]
              transition-colors cursor-pointer group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.2em]">Back</span>
          </button>
          <div className="h-5 w-px bg-[#D4A84F]/30 mx-1" />
          <span className="font-cormorant font-semibold text-[18px] tracking-wide text-[#F8EFDD]">
            Shakti Mahotsav 2026
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Images size={16} className="text-[#D4A84F]" />
            <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A84F]">
              Gallery
            </span>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto
        px-4 sm:px-6 lg:px-10
        pt-8 md:pt-12 pb-20">

        {/* Mobile back */}
        <button
          onClick={() => navigate('/')}
          className="md:hidden flex items-center gap-2 mb-6
            text-[#E6C27A] hover:text-[#F5D58A] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.2em]">
            Back to Home
          </span>
        </button>

        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <p className="font-manrope text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A84F] mb-2">
            Shakti Mahotsav 2026
          </p>
          <h1 className="font-cormorant font-semibold
            text-[clamp(34px,5.5vw,64px)] leading-tight
            text-[#F0DDB0] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            Festival Gallery
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A84F]/50" />
            <span className="text-[#D4A84F] text-xs">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A84F]/50" />
          </div>
        </div>

        {/* Gallery grid — 3 cols on all screens ≥ sm, 2 cols on mobile */}
        {/* 15 items × 3 cols = 5 perfect rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, i) => {
            const isWide    = i === 12 || i === 14;
            // Last 4 items share a fixed height so wide + portrait cards align perfectly
            const isLastFour = i >= 12;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.32) }}
                className={
                  isWide       ? 'col-span-2' :
                  isLastFour   ? 'col-span-2 sm:col-span-1' : ''
                }
              >
                <GalleryCard
                  item={item}
                  onClick={() => setLightboxIndex(i)}
                  aspect={isLastFour ? 'h-48 sm:h-56 md:h-64' : 'aspect-[3/4]'}
                  objPos={i === 13 ? 'object-top' : 'object-center'}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Instagram footer */}
        <div className="flex items-center gap-3 mt-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A84F]/20" />
          <p className="text-[11px] text-center text-[#F8F2E3]/40 shrink-0 px-2">
            Have photos? Tag{' '}
            <span className="text-[#F5D58A] font-semibold">#ShaktiMahotsav2026</span>
            {' '}on Instagram to get featured
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A84F]/20" />
        </div>
      </main>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center
              bg-[#010610]/97 backdrop-blur-2xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full
                border border-[#D4A84F]/30 bg-[#040D1A]/70
                text-[#F8F2E3]/70 hover:text-[#F8F2E3] hover:border-[#D4A84F]/60
                transition-all cursor-pointer z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 sm:left-6 p-2.5 sm:p-3 rounded-full
                border border-[#D4A84F]/30 bg-[#040D1A]/70
                text-[#F8F2E3]/70 hover:text-[#F8F2E3] hover:border-[#D4A84F]/60
                transition-all cursor-pointer z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-4 mx-14 sm:mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.img}
                alt={currentItem.title}
                className="max-h-[82vh] max-w-full rounded-2xl object-contain
                  shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 sm:right-6 p-2.5 sm:p-3 rounded-full
                border border-[#D4A84F]/30 bg-[#040D1A]/70
                text-[#F8F2E3]/70 hover:text-[#F8F2E3] hover:border-[#D4A84F]/60
                transition-all cursor-pointer z-10"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { FestivalEvent } from '../types';
import { CulturalNightCard } from './CulturalNightCard';

interface EventDetailsModalProps {
  event: FestivalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (dayNumber: number) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
  onRegister,
}) => {
  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020817]/90 backdrop-blur-xl"
        />

        {/* Modal Window hosting the Cultural Festival Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl z-10 my-6"
        >
          {/* Floating Close Button */}
          <button
            id="btn-close-event-modal"
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-[#06152D]/90 text-[#FFF4D6] hover:text-[#F5D58A] border border-[#D4A84F]/50 hover:border-[#D4A84F] shadow-xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close event card"
          >
            <X size={18} />
          </button>

          {/* Master Cultural Night Detail Card */}
          <CulturalNightCard
            event={event}
            onBookPass={() => onRegister(event.day)}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

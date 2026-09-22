import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { FestivalEvent } from '../types';
import { CulturalNightCard } from './CulturalNightCard';

interface EventDetailsModalProps {
  event: FestivalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (dayNumber: number) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  // Close on Escape key & manage scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020817]/90 backdrop-blur-xl cursor-pointer"
          aria-label="Close modal background"
        />

        {/* Modal Window hosting the Cultural Festival Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl z-10 my-auto py-2"
        >
          {/* Master Cultural Night Detail Card */}
          <CulturalNightCard
            event={event}
            onClose={onClose}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
